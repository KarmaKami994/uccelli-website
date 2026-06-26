import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "location"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "date", type: "date", required: true },
    { name: "endDate", type: "date" },
    { name: "location", type: "text" },
    { name: "description", type: "richText" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "locale", type: "select", options: ["de", "en"], defaultValue: "de", admin: { position: "sidebar" } },
  ],
};
