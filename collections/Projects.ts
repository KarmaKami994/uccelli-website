import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "locale", "updatedAt"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar" } },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Sozialprojekt", value: "sozial" },
        { label: "Bildungsprojekt", value: "bildung" },
        { label: "Gemeinschaftsprojekt", value: "gemeinschaft" },
      ],
    },
    { name: "summary", type: "textarea", required: true },
    { name: "body", type: "richText" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "locale", type: "select", options: ["de", "en"], defaultValue: "de", admin: { position: "sidebar" } },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};
