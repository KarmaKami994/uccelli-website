import type { CollectionConfig } from "payload";

export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
    { name: "locale", type: "select", options: ["de", "en"], defaultValue: "de", admin: { position: "sidebar" } },
  ],
};
