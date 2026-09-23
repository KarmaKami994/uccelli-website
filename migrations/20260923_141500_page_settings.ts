import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-d1-sqlite";
import { sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS projects_page (
      id integer PRIMARY KEY NOT NULL,
      hero_image_id integer,
      updated_at text,
      created_at text,
      FOREIGN KEY (hero_image_id) REFERENCES media(id) ON UPDATE no action ON DELETE set null
    );
  `);
  await db.run(sql`
    CREATE INDEX IF NOT EXISTS projects_page_hero_image_idx
    ON projects_page (hero_image_id);
  `);
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS projects_page_locales (
      title text,
      subtitle text,
      intro text,
      id integer PRIMARY KEY NOT NULL,
      _locale text NOT NULL,
      _parent_id integer NOT NULL,
      FOREIGN KEY (_parent_id) REFERENCES projects_page(id) ON UPDATE no action ON DELETE cascade
    );
  `);
  await db.run(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS projects_page_locales_locale_parent_id_unique
    ON projects_page_locales (_locale, _parent_id);
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS community_items_page (
      id integer PRIMARY KEY NOT NULL,
      hero_image_id integer,
      updated_at text,
      created_at text,
      FOREIGN KEY (hero_image_id) REFERENCES media(id) ON UPDATE no action ON DELETE set null
    );
  `);
  await db.run(sql`
    CREATE INDEX IF NOT EXISTS community_items_page_hero_image_idx
    ON community_items_page (hero_image_id);
  `);
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS community_items_page_locales (
      title text,
      subtitle text,
      intro text,
      id integer PRIMARY KEY NOT NULL,
      _locale text NOT NULL,
      _parent_id integer NOT NULL,
      FOREIGN KEY (_parent_id) REFERENCES community_items_page(id) ON UPDATE no action ON DELETE cascade
    );
  `);
  await db.run(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS community_items_page_locales_locale_parent_id_unique
    ON community_items_page_locales (_locale, _parent_id);
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS community_items_page_locales;`);
  await db.run(sql`DROP TABLE IF EXISTS community_items_page;`);
  await db.run(sql`DROP TABLE IF EXISTS projects_page_locales;`);
  await db.run(sql`DROP TABLE IF EXISTS projects_page;`);
}
