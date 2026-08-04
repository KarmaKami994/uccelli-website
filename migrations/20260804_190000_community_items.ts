import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`community_items\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`slug\` text NOT NULL,
    \`type\` text NOT NULL,
    \`image_id\` integer,
    \`status\` text DEFAULT 'coming-soon' NOT NULL,
    \`href\` text,
    \`featured\` integer DEFAULT false,
    \`order\` numeric DEFAULT 0,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );`);
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`community_items_slug_idx\` ON \`community_items\` (\`slug\`);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`community_items_image_idx\` ON \`community_items\` (\`image_id\`);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`community_items_updated_at_idx\` ON \`community_items\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`community_items_created_at_idx\` ON \`community_items\` (\`created_at\`);`);

  await db.run(sql`CREATE TABLE IF NOT EXISTS \`community_items_locales\` (
    \`title\` text NOT NULL,
    \`summary\` text NOT NULL,
    \`body\` text,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`_locale\` text NOT NULL,
    \`_parent_id\` integer NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`community_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`);
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`community_items_locales_locale_parent_id_unique\` ON \`community_items_locales\` (\`_locale\`, \`_parent_id\`);`);

  // Payload stores document-lock relationships in one polymorphic table.
  // SQLite cannot add a foreign-key constraint with ALTER TABLE, but the
  // nullable relation column and index are sufficient for Payload locking.
  try {
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`community_items_id\` integer;`);
  } catch {
    // Idempotency for databases where the column already exists.
  }
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_community_items_id_idx\` ON \`payload_locked_documents_rels\` (\`community_items_id\`);`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_community_items_id_idx\`;`);
  try {
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` DROP COLUMN \`community_items_id\`;`);
  } catch {
    // Older SQLite builds may not support DROP COLUMN. Leaving an unused,
    // nullable column is safer than rebuilding Payload's lock table.
  }
  await db.run(sql`DROP TABLE IF EXISTS \`community_items_locales\`;`);
  await db.run(sql`DROP TABLE IF EXISTS \`community_items\`;`);
}
