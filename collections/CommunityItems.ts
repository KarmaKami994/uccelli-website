import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const CommunityItems: CollectionConfig = {
  slug: "community-items",
  labels: {
    singular: "Community-Angebot",
    plural: "Community-Angebote",
  },
  access: contentAccess,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "status", "featured", "updatedAt"],
  },
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Tool", value: "tool" },
        { label: "Game", value: "game" },
        { label: "Ressource", value: "resource" },
      ],
    },
    { name: "summary", type: "textarea", required: true, localized: true },
    { name: "body", type: "richText", localized: true },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "coming-soon",
      options: [
        { label: "Verfügbar", value: "available" },
        { label: "Beta", value: "beta" },
        { label: "Demnächst", value: "coming-soon" },
      ],
    },
    {
      name: "href",
      type: "text",
      label: "Externer oder interner Link",
      admin: { description: "Leer lassen, um die interne Detailseite zu verwenden." },
    },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
