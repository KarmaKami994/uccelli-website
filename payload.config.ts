import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";

const dirname = path.dirname(fileURLToPath(import.meta.url));
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor, FixedToolbarFeature, HeadingFeature } from "@payloadcms/richtext-lexical";

import { Projects } from "./collections/Projects";
import { Posts } from "./collections/Posts";
import { CommunityItems } from "./collections/CommunityItems";
import { ContactSubmissions } from "./collections/ContactSubmissions";
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
    meta: {
      titleSuffix: " – Uccelli CMS",
      description: "Redaktionssystem für die Website des Vereins Uccelli.",
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
    CommunityItems,
    Posts,
    Pages,
    TeamMembers,
    Partners,
    FAQs,
    ContactSubmissions,
    Media,
    Events,
    Networks,
    Werte,
    Courses,
    {
      slug: "users",
      labels: {
        singular: "Benutzer",
        plural: "Benutzer",
      },
      auth: true,
      access: {
        read: authenticated,
        create: adminOnly,
        update: adminOrSelf,
        delete: adminOnly,
      },
      admin: {
        group: "Verwaltung",
        useAsTitle: "email",
        defaultColumns: ["email", "name", "role", "updatedAt"],
        description: "Zugänge und Rollen für das Uccelli CMS.",
        hideAPIURL: true,
      },
      fields: [
        { name: "name", type: "text", label: "Name" },
        {
          name: "role",
          type: "select",
          label: "Rolle",
          options: [
            { label: "Administrator", value: "admin" },
            { label: "Redaktion", value: "editor" },
          ],
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
