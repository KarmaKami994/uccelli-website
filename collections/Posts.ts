import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Newsbeitrag", plural: "News" },
  access: contentAccess,
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "date", "updatedAt"],
    description: "Neuigkeiten und Mitteilungen der Uccelli Society. Die neuesten Beiträge erscheinen automatisch auf der Startseite.",
    hideAPIURL: true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar", description: "URL-Teil, z. B. neue-partnerschaft" } },
    { name: "date", type: "date", label: "Veröffentlichungsdatum", required: true, admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } } },
    {
      type: "tabs",
      tabs: [
        {
          label: "Inhalt",
          fields: [
            { name: "title", type: "text", label: "Titel", required: true, localized: true },
            { name: "summary", type: "textarea", label: "Kurzbeschreibung", required: true, localized: true, admin: { description: "Wird auf News-Karten angezeigt." } },
            { name: "body", type: "richText", label: "Beitrag", localized: true },
          ],
        },
        {
          label: "Medien",
          fields: [
            { name: "image", type: "upload", relationTo: "media", label: "Titelbild" },
          ],
        },
      ],
    },
  ],
};
