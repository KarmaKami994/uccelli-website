import type { CollectionConfig } from "payload";

export const Werte: CollectionConfig = {
  slug: "werte",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "locale"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    { name: "body", type: "richText", required: true },
    { name: "locale", type: "select", options: ["de", "en"], defaultValue: "de", admin: { position: "sidebar" } },
  ],
};
