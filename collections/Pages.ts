import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: contentAccess,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    { name: "body", type: "richText", localized: true },
  ],
};
