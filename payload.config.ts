import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor, FixedToolbarFeature, HeadingFeature } from "@payloadcms/richtext-lexical";

import { Projects } from "./collections/Projects";
import { Posts } from "./collections/Posts";
import { CommunityItems } from "./collections/CommunityItems";
import { Events } from "./collections/Events";
import { TeamMembers } from "./collections/TeamMembers";
import { Partners } from "./collections/Partners";
import { FAQs } from "./collections/FAQs";
import { Networks } from "./collections/Networks";
import { Werte } from "./collections/Werte";
import { Courses } from "./collections/Courses";
import { Pages } from "./collections/Pages";
import { Media } from "./collections/Media";
import { Homepage } from "./globals/Homepage";
import { Navigation } from "./globals/Navigation";
import { adminOnly, adminOrSelf, adminOnlyField, authenticated } from "./lib/access";

const secret = process.env.PAYLOAD_SECRET;
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
if (!secret && process.env.NODE_ENV === "production" && !isBuildPhase) {
  throw new Error(
    "PAYLOAD_SECRET is not set. Refusing to start with an insecure default — set it in the environment (see .env.example)."
  );
}

export default buildConfig({
  admin: {
    user: "users",
    meta: { titleSuffix: " – Uccelli CMS" },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    ],
  }),
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./data/uccelli.db" },
  }),
  localization: {
    locales: [
      { label: "Deutsch", code: "de" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "de",
    fallback: true,
  },
  collections: [
    Projects,
    Posts,
    CommunityItems,
    Events,
    TeamMembers,
    Partners,
    FAQs,
    Networks,
    Werte,
    Courses,
    Pages,
    Media,
    {
      slug: "users",
      auth: true,
      access: {
        read: authenticated,
        create: adminOnly,
        update: adminOrSelf,
        delete: adminOnly,
      },
      admin: { useAsTitle: "email" },
      fields: [
        { name: "name", type: "text" },
        {
          name: "role",
          type: "select",
          options: ["admin", "editor"],
          defaultValue: "editor",
          saveToJWT: true,
          access: { create: adminOnlyField, update: adminOnlyField },
        },
      ],
    },
  ],
  globals: [Homepage, Navigation],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  secret: secret || "insecure-dev-only-secret",
});
