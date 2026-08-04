import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    UPDATE \`community_items\`
    SET \`status\` = 'available',
        \`href\` = '/community/cv-creator',
        \`featured\` = true,
        \`updated_at\` = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
    WHERE \`slug\` = 'cv-creator';
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`
    UPDATE \`community_items\`
    SET \`status\` = 'coming-soon',
        \`href\` = NULL,
        \`updated_at\` = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
    WHERE \`slug\` = 'cv-creator';
  `);
}
