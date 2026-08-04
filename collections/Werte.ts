import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Werte: CollectionConfig = {
  slug: "werte",
  labels: { singular: "Wert (Archiv)", plural: "Werte (Archiv)" },
  access: contentAccess,
  admin: {
    group: false,
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    { name: "body", type: "richText", localized: true },
  ],
};
