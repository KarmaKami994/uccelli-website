import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Networks: CollectionConfig = {
  slug: "networks",
  access: contentAccess,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    { name: "description", type: "richText", required: true, localized: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
