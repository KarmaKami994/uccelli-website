import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import { lexicalEditor, FixedToolbarFeature, HeadingFeature } from "@payloadcms/richtext-lexical";
import { getCloudflareContext, type CloudflareContext } from "@opennextjs/cloudflare";
import { r2Storage } from "@payloadcms/storage-r2";

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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const isProduction = process.env.NODE_ENV === "production";
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : "");
const isCLI = process.argv.some((value) =>
  realpath(value).endsWith(path.join("payload", "bin.js"))
);

const secret = process.env.PAYLOAD_SECRET;
if (!secret && isProduction && !isBuildPhase && !isCLI) {
  throw new Error(
    "PAYLOAD_SECRET is not set. Configure it as a Cloudflare Worker secret before serving production traffic."
  );
}

const createLog =
  (level: string, fn: typeof console.log) =>
  (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === "string") {
      fn(JSON.stringify({ level, msg: objOrMsg }));
    } else {
      fn(
        JSON.stringify({
          level,
          ...objOrMsg,
          msg: msg ?? (objOrMsg as { msg?: string }).msg,
        })
      );
    }
  };

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || "info",
  trace: createLog("trace", console.debug),
  debug: createLog("debug", console.debug),
  info: createLog("info", console.log),
  warn: createLog("warn", console.warn),
  error: createLog("error", console.error),
  fatal: createLog("fatal", console.error),
  silent: () => {},
} as any;

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true });

const env = cloudflare.env as any;

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " – Uccelli CMS",
      description: "Redaktionssystem für die Website des Vereins Uccelli.",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    ],
  }),
  db: sqliteD1Adapter({
    binding: env.D1,
  }),
  storage: [
    r2Storage({
      bucket: env.R2,
      collections: {
        media: true,
      },
    }),
  ],
  logger: isProduction ? cloudflareLogger : undefined,
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
  secret: secret || "cloudflare-build-only-secret",
});

async function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  const { getPlatformProxy } = await import(
    /* webpackIgnore: true */ `${"__wrangler".replaceAll("_", "")}`
  );

  return getPlatformProxy({
    remoteBindings: process.env.CLOUDFLARE_REMOTE === "1",
  });
}
