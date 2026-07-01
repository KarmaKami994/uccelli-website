import type { CollectionConfig } from "payload";

export const Networks: CollectionConfig = {
  slug: "networks",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    { name: "description", type: "richText", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
    { name: "locale", type: "select", options: ["de", "en"], defaultValue: "de", admin: { position: "sidebar" } },
  ],
};
