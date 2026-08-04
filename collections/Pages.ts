import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Seite", plural: "Allgemeine Seiten" },
  access: contentAccess,
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    description: "Allgemeine Inhalte wie Datenschutz und Impressum. Strukturierte Bereiche werden in ihren eigenen Collections gepflegt.",
    hideAPIURL: true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar", readOnly: true, description: "Technischer Seitenbezeichner." } },
    { name: "title", type: "text", label: "Titel", required: true, localized: true },
    { name: "body", type: "richText", label: "Inhalt", localized: true },
  ],
};
