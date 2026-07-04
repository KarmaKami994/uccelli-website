import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: contentAccess,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "updatedAt"],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    { name: "date", type: "date", required: true },
    { name: "summary", type: "textarea", required: true, localized: true },
    { name: "body", type: "richText", localized: true },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};
