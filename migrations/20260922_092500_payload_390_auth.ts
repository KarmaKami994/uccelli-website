import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    ALTER TABLE `users`
    ADD COLUMN `reset_password_requested_at` text;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`
    ALTER TABLE `users`
    DROP COLUMN `reset_password_requested_at`;
  `);
}
