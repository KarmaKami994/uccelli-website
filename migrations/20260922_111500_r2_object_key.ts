import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-d1-sqlite";
import { sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    ALTER TABLE media
    ADD COLUMN _object_key text;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`
    ALTER TABLE media
    DROP COLUMN _object_key;
  `);
}
