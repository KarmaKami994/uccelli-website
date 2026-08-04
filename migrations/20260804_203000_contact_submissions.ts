import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`contact_submissions\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`source\` text DEFAULT 'contact' NOT NULL,
    \`locale\` text DEFAULT 'de' NOT NULL,
    \`name\` text NOT NULL,
    \`email\` text NOT NULL,
    \`subject\` text NOT NULL,
    \`message\` text NOT NULL,
    \`interest\` text,
    \`project\` text,
    \`status\` text DEFAULT 'new' NOT NULL,
    \`internal_note\` text,
    \`email_status\` text DEFAULT 'pending' NOT NULL,
    \`email_id\` text,
    \`email_error\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );`);

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`contact_submissions_status_idx\` ON \`contact_submissions\` (\`status\`);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`contact_submissions_email_status_idx\` ON \`contact_submissions\` (\`email_status\`);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`contact_submissions_updated_at_idx\` ON \`contact_submissions\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`contact_submissions_created_at_idx\` ON \`contact_submissions\` (\`created_at\`);`);

  try {
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`contact_submissions_id\` integer;`);
  } catch {
    // Idempotency for databases where the column already exists.
  }
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_contact_submissions_id_idx\`;`);
  try {
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` DROP COLUMN \`contact_submissions_id\`;`);
  } catch {
    // Older SQLite builds may not support DROP COLUMN.
  }
  await db.run(sql`DROP TABLE IF EXISTS \`contact_submissions\`;`);
}
