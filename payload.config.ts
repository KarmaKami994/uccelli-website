import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteD1Adapter } from "@payloadcms/db-d1-sqlite";
import {
  lexicalEditor,
  FixedToolbarFeature,
  HeadingFeature,
} from "@payloadcms/richtext-lexical";
import {
  getCloudflareContext,
  type CloudflareContext,
} from "@opennextjs/cloudflare";
import type { GetPlatformProxyOptions } from "wrangler";
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
import { ProjectsPage } from "./globals/ProjectsPage";
import { CommunityPage } from "./globals/CommunityPage";
import {
  adminOnly,
  adminOrSelf,
  adminOnlyField,
  authenticated,
} from "./lib/access";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const isProduction = process.env.NODE_ENV === "production";

const realpath = (value: string) => {
  try {
    return fs.existsSync(value) ? fs.realpathSync(value) : undefined;
  } catch {
    return undefined;
  }
};

const isCLI = process.argv.some((value) => {
  const resolved = realpath(value);
  if (!resolved) return false;

  return (
    resolved.endsWith(path.join("payload", "bin.js")) ||
    resolved.endsWith(path.join("next", "dist", "bin", "next"))
  );
});

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
        }),
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
// Payload accepts a Pino-compatible logger; this lightweight adapter intentionally mirrors that runtime shape.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true });

// Wrangler/OpenNext inject D1 and R2 bindings at runtime; the generated context type is intentionally generic here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  plugins: [
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
  globals: [Homepage, Navigation, ProjectsPage, CommunityPage],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  secret: process.env.PAYLOAD_SECRET || "",
});

async function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(
    /* webpackIgnore: true */ `${"__wrangler".replaceAll("_", "")}`
  ).then(({ getPlatformProxy }) =>
    getPlatformProxy({
      environment: process.env.CLOUDFLARE_ENV,
      remoteBindings: isProduction,
    } satisfies GetPlatformProxyOptions),
  );
}
