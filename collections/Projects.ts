import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Projects: CollectionConfig = {
  slug: "projects",
  access: contentAccess,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "updatedAt"],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
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
    { name: "summary", type: "textarea", required: true, localized: true },
    { name: "body", type: "richText", localized: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
};
