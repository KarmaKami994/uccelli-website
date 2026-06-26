import path from "path";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Projects } from "./collections/Projects";
import { Posts } from "./collections/Posts";
import { Events } from "./collections/Events";
import { TeamMembers } from "./collections/TeamMembers";
import { Partners } from "./collections/Partners";
import { FAQs } from "./collections/FAQs";
import { Pages } from "./collections/Pages";
import { Media } from "./collections/Media";

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " – Uccelli CMS",
    },
  },
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/uccelli",
  }),
  collections: [
    // Content
    Projects,
    Posts,
    Events,
    TeamMembers,
    Partners,
    FAQs,
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
