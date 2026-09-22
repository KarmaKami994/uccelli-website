#!/usr/bin/env python3
"""
Publish the home-server Payload content to Cloudflare D1/R2.

The home SQLite database is the editorial source of truth for CMS content.
Cloud-only runtime tables (users, sessions, contact submissions, Payload internals)
are deliberately not overwritten.

Required environment:
  CLOUDFLARE_API_TOKEN

Optional environment:
  UCCELLI_DB_PATH       default: /opt/uccelli-website/data/uccelli.db
  UCCELLI_MEDIA_DIR     default: /opt/uccelli-website/media
  UCCELLI_D1_DATABASE   default: uccelli-prod
  UCCELLI_R2_BUCKET     default: uccelli-media
  UCCELLI_SYNC_STATE    default: /var/lib/uccelli-cloud-sync/state.json
  UCCELLI_WRANGLER      default: 4.136.1
"""

from __future__ import annotations

import argparse
import fcntl
import hashlib
import json
import math
import mimetypes
import os
from pathlib import Path
import sqlite3
import subprocess
import sys
import tempfile
from typing import Iterable

CONTENT_ROOTS = (
    "media",
    "projects",
    "posts",
    "events",
    "team_members",
    "partners",
    "faqs",
    "networks",
    "werte",
    "courses",
    "pages",
    "community_items",
    "homepage",
    "navigation",
)

DB_PATH = Path(os.environ.get("UCCELLI_DB_PATH", "/opt/uccelli-website/data/uccelli.db"))
MEDIA_DIR = Path(os.environ.get("UCCELLI_MEDIA_DIR", "/opt/uccelli-website/media"))
D1_DATABASE = os.environ.get("UCCELLI_D1_DATABASE", "uccelli-prod")
R2_BUCKET = os.environ.get("UCCELLI_R2_BUCKET", "uccelli-media")
STATE_PATH = Path(
    os.environ.get("UCCELLI_SYNC_STATE", "/var/lib/uccelli-cloud-sync/state.json")
)
WRANGLER_VERSION = os.environ.get("UCCELLI_WRANGLER", "4.136.1")
LOCK_PATH = STATE_PATH.with_suffix(".lock")


def log(message: str) -> None:
    print(f"[uccelli-sync] {message}", flush=True)


def qident(value: str) -> str:
    return '"' + value.replace('"', '""') + '"'


def sql_value(value: object) -> str:
    if value is None:
        return "NULL"
    if isinstance(value, bool):
        return "1" if value else "0"
    if isinstance(value, int):
        return str(value)
    if isinstance(value, float):
        if not math.isfinite(value):
            raise ValueError("Non-finite float cannot be published to D1")
        return repr(value)
    if isinstance(value, bytes):
        return "X'" + value.hex() + "'"
    text = str(value).replace("'", "''")
    return "'" + text + "'"


def is_content_table(name: str) -> bool:
    if name.startswith("sqlite_") or name.startswith("payload_"):
        return False
    if name == "users" or name.startswith("users_"):
        return False
    if name == "contact_submissions" or name.startswith("contact_submissions_"):
        return False
    return any(name == root or name.startswith(root + "_") for root in CONTENT_ROOTS)


def get_tables(conn: sqlite3.Connection) -> list[str]:
    rows = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
    ).fetchall()
    tables = [row[0] for row in rows if is_content_table(row[0])]
    if not tables:
        raise RuntimeError("No publishable content tables found in local SQLite database")
    return tables


def dependency_order(conn: sqlite3.Connection, tables: Iterable[str]) -> list[str]:
    selected = set(tables)
    dependencies: dict[str, set[str]] = {table: set() for table in selected}

    for table in selected:
        rows = conn.execute(f"PRAGMA foreign_key_list({qident(table)})").fetchall()
        for row in rows:
            referenced = row[2]
            if referenced in selected and referenced != table:
                dependencies[table].add(referenced)

    remaining = {table: set(deps) for table, deps in dependencies.items()}
    ordered: list[str] = []

    while remaining:
        ready = sorted(table for table, deps in remaining.items() if not deps)
        if not ready:
            # Payload schemas should not have cycles between these content tables.
            # Fall back to a deterministic order rather than silently omitting data.
            ordered.extend(sorted(remaining))
            break

        for table in ready:
            ordered.append(table)
            del remaining[table]
        for deps in remaining.values():
            deps.difference_update(ready)

    return ordered


def table_columns(conn: sqlite3.Connection, table: str) -> list[str]:
    rows = conn.execute(f"PRAGMA table_info({qident(table)})").fetchall()
    return [row[1] for row in rows]


def table_order_clause(conn: sqlite3.Connection, table: str) -> str:
    rows = conn.execute(f"PRAGMA table_info({qident(table)})").fetchall()
    primary = [row for row in rows if row[5]]
    if not primary:
        return ""
    primary.sort(key=lambda row: row[5])
    return " ORDER BY " + ", ".join(qident(row[1]) for row in primary)


def build_sql(conn: sqlite3.Connection) -> tuple[str, list[str]]:
    tables = get_tables(conn)
    insert_order = dependency_order(conn, tables)
    delete_order = list(reversed(insert_order))

    lines = [
        "-- Uccelli home CMS -> Cloudflare D1 publication",
        "-- Generated automatically. Do not commit this file.",
        "PRAGMA defer_foreign_keys = true;",
        "",
    ]

    for table in delete_order:
        lines.append(f"DELETE FROM {qident(table)};")

    lines.append("")

    for table in insert_order:
        columns = table_columns(conn, table)
        if not columns:
            continue
        column_sql = ", ".join(qident(column) for column in columns)
        query = (
            f"SELECT {column_sql} FROM {qident(table)}"
            + table_order_clause(conn, table)
        )
        for row in conn.execute(query):
            values = ", ".join(sql_value(value) for value in row)
            lines.append(
                f"INSERT INTO {qident(table)} ({column_sql}) VALUES ({values});"
            )

    lines.extend(["", "PRAGMA optimize;", ""])
    return "\n".join(lines), insert_order


def load_state() -> dict:
    try:
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return {}
    except json.JSONDecodeError:
        log(f"State file {STATE_PATH} is invalid; rebuilding state")
        return {}


def save_state(state: dict) -> None:
    STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    temp = STATE_PATH.with_suffix(".tmp")
    temp.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    os.replace(temp, STATE_PATH)


def wrangler_base() -> list[str]:
    return ["npx", "--yes", f"wrangler@{WRANGLER_VERSION}"]


def run(command: list[str], *, dry_run: bool = False) -> None:
    if dry_run:
        log("DRY RUN: " + " ".join(command))
        return
    subprocess.run(command, check=True)


def media_signature(path: Path) -> str:
    stat = path.stat()
    return f"{stat.st_size}:{stat.st_mtime_ns}"


def get_media_records() -> list[tuple[str, str | None]]:
    if not DB_PATH.exists():
        raise FileNotFoundError(f"Local database not found: {DB_PATH}")

    conn = sqlite3.connect(f"file:{DB_PATH}?mode=ro", uri=True)
    try:
        rows = conn.execute(
            """
            SELECT filename, mime_type
            FROM media
            WHERE filename IS NOT NULL
              AND filename <> ''
            ORDER BY id
            """
        ).fetchall()
    finally:
        conn.close()

    return [
        (str(filename), str(mime_type) if mime_type else None)
        for filename, mime_type in rows
    ]


def sync_media(state: dict, *, dry_run: bool = False) -> int:
    if not MEDIA_DIR.exists():
        log(f"Media directory {MEDIA_DIR} does not exist; skipping R2 sync")
        return 0

    media_state = state.setdefault("media", {})
    uploads = 0

    for filename, stored_mime_type in get_media_records():
        path = MEDIA_DIR / filename

        if not path.is_file():
            log(f"Media referenced by database is missing locally: {filename}")
            continue

        signature = media_signature(path)

        if media_state.get(filename) == signature:
            continue

        mime_type = (
            stored_mime_type
            or mimetypes.guess_type(path.name)[0]
            or "application/octet-stream"
        )

        target = f"{R2_BUCKET}/{filename}"

        log(f"Uploading media: {filename} ({mime_type})")

        run(
            wrangler_base()
            + [
                "r2",
                "object",
                "put",
                target,
                f"--file={path}",
                f"--content-type={mime_type}",
                "--remote",
            ],
            dry_run=dry_run,
        )

        if not dry_run:
            media_state[filename] = signature

        uploads += 1

    return uploads


def sync_database(state: dict, *, force: bool = False, dry_run: bool = False) -> bool:
    if not DB_PATH.exists():
        raise FileNotFoundError(f"Local database not found: {DB_PATH}")

    conn = sqlite3.connect(f"file:{DB_PATH}?mode=ro", uri=True)
    try:
        sql_text, tables = build_sql(conn)
    finally:
        conn.close()

    digest = hashlib.sha256(sql_text.encode("utf-8")).hexdigest()
    if not force and state.get("database_sha256") == digest:
        log("D1 content is unchanged; skipping database publish")
        return False

    log(f"Publishing {len(tables)} content tables to D1 database {D1_DATABASE}")

    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=".sql",
        prefix="uccelli-cloud-sync-",
        encoding="utf-8",
        delete=False,
    ) as temp:
        temp.write(sql_text)
        sql_path = Path(temp.name)

    try:
        run(
            wrangler_base()
            + [
                "d1",
                "execute",
                D1_DATABASE,
                "--remote",
                f"--file={sql_path}",
                "--yes",
            ],
            dry_run=dry_run,
        )
    finally:
        sql_path.unlink(missing_ok=True)

    if not dry_run:
        state["database_sha256"] = digest
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description="Publish Uccelli CMS content to Cloudflare")
    parser.add_argument("--force", action="store_true", help="publish D1 even if content is unchanged")
    parser.add_argument("--dry-run", action="store_true", help="show actions without changing Cloudflare")
    args = parser.parse_args()

    if not args.dry_run and not os.environ.get("CLOUDFLARE_API_TOKEN"):
        log("CLOUDFLARE_API_TOKEN is not set")
        return 2

    LOCK_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOCK_PATH.open("w") as lock:
        try:
            fcntl.flock(lock.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            log("Another sync is already running; exiting")
            return 0

        state = load_state()

        try:
            uploads = sync_media(state, dry_run=args.dry_run)
            db_changed = sync_database(
                state,
                force=args.force,
                dry_run=args.dry_run,
            )
        except subprocess.CalledProcessError as error:
            log(f"Cloudflare command failed with exit code {error.returncode}")
            return error.returncode or 1
        except Exception as error:
            log(f"Sync failed: {error}")
            return 1

        if not args.dry_run:
            save_state(state)

        log(
            "Sync complete: "
            f"{uploads} media upload(s), "
            f"D1 {'published' if db_changed else 'unchanged'}"
        )
        return 0


if __name__ == "__main__":
    sys.exit(main())
