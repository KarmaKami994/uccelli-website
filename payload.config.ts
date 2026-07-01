import path from "path";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor, FixedToolbarFeature, HeadingFeature } from "@payloadcms/richtext-lexical";

import { Projects } from "./collections/Projects";
import { Posts } from "./collections/Posts";
import { Events } from "./collections/Events";
import { TeamMembers } from "./collections/TeamMembers";
import { Partners } from "./collections/Partners";
import { FAQs } from "./collections/FAQs";
import { Networks } from "./collections/Networks";
import { Werte } from "./collections/Werte";
import { Courses } from "./collections/Courses";
import { Navigation } from "./collections/Navigation";
import { Pages } from "./collections/Pages";
import { Media } from "./collections/Media";

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " – Uccelli CMS",
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    ],
  }),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./uccelli.db",
    },
  }),
  collections: [
    // Content
    Projects,
    Posts,
    Events,
    TeamMembers,
    Partners,
    FAQs,
    Networks,
    Werte,
    Courses,
    Navigation,
    Pages,
    Media,
    // Auth
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [
        { name: "name", type: "text" },
        { name: "role", type: "select", options: ["admin", "editor"], defaultValue: "editor" },
      ],
    },
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-PRODUCTION",
});
