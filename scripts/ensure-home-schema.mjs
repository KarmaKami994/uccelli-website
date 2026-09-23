import { createClient } from "@libsql/client";

const url = process.env.DATABASE_URI || "file:/app/data/uccelli.db";
const db = createClient({ url });

async function ensureColumn(table, column, definition) {
  const result = await db.execute(`PRAGMA table_info("${table}")`);
  const exists = result.rows.some((row) => row.name === column);

  if (exists) {
    console.log(`[home-schema] ${table}.${column} already present`);
    return;
  }

  console.log(`[home-schema] adding ${table}.${column}`);
  await db.execute(
    `ALTER TABLE "${table}" ADD COLUMN "${column}" ${definition}`,
  );
}

async function ensurePageSettingsGlobal(table) {
  const locales = `${table}_locales`;

  console.log(`[home-schema] ensuring ${table}`);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS "${table}" (
      "id" integer PRIMARY KEY NOT NULL,
      "hero_image_id" integer,
      "updated_at" text,
      "created_at" text,
      FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON UPDATE no action ON DELETE set null
    )
  `);
  await db.execute(
    `CREATE INDEX IF NOT EXISTS "${table}_hero_image_idx" ON "${table}" ("hero_image_id")`,
  );

  await db.execute(`
    CREATE TABLE IF NOT EXISTS "${locales}" (
      "title" text,
      "subtitle" text,
      "intro" text,
      "id" integer PRIMARY KEY NOT NULL,
      "_locale" text NOT NULL,
      "_parent_id" integer NOT NULL,
      FOREIGN KEY ("_parent_id") REFERENCES "${table}"("id") ON UPDATE no action ON DELETE cascade
    )
  `);
  await db.execute(
    `CREATE UNIQUE INDEX IF NOT EXISTS "${locales}_locale_parent_id_unique" ON "${locales}" ("_locale", "_parent_id")`,
  );
}

try {
  await ensureColumn(
    "users",
    "reset_password_requested_at",
    "text",
  );
  await ensurePageSettingsGlobal("projects_page");
  await ensurePageSettingsGlobal("community_items_page");
} finally {
  db.close();
}
