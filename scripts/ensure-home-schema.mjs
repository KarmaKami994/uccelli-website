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

try {
  await ensureColumn(
    "users",
    "reset_password_requested_at",
    "text",
  );
} finally {
  db.close();
}
