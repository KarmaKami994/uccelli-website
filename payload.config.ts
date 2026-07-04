import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));
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
import { Pages } from "./collections/Pages";
import { Media } from "./collections/Media";
import { Homepage } from "./globals/Homepage";
import { Navigation } from "./globals/Navigation";
import { adminOnly, adminOrSelf, adminOnlyField, authenticated } from "./lib/access";

// ─── Secret handling ─────────────────────────────────────
// Fail fast at runtime if PAYLOAD_SECRET is missing in production.
// (During `next build` a placeholder is tolerated — the real secret is
// read from the environment when the server starts.)
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
      url: process.env.DATABASE_URI || "file:./data/uccelli.db",
    },
  }),
  // Native content localization: one document per entity, translated fields.
  // The frontend requests documents with `locale`; missing EN translations
  // fall back to German.
  localization: {
    locales: [
      { label: "Deutsch", code: "de" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "de",
    fallback: true,
  },
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
    Pages,
    Media,
    // Auth — role-based: editors manage content, only admins manage users.
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
          // Editors may update their own profile, but never their role.
          access: { create: adminOnlyField, update: adminOnlyField },
        },
      ],
    },
  ],
  globals: [Homepage, Navigation],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  secret: secret || "insecure-dev-only-secret",
});
