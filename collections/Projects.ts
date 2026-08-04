import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Projekt", plural: "Projekte" },
  access: contentAccess,
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured", "updatedAt"],
    description: "Projekte der Uccelli Society. «Hervorgehoben» steuert die Auswahl auf der Startseite.",
    hideAPIURL: true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar", description: "URL-Teil, z. B. nightshift-music" } },
    { name: "featured", type: "checkbox", label: "Auf Startseite hervorheben", defaultValue: false, admin: { position: "sidebar" } },
    {
      type: "tabs",
      tabs: [
        {
          label: "Inhalt",
          fields: [
            { name: "title", type: "text", label: "Titel", required: true, localized: true },
            { name: "summary", type: "textarea", label: "Kurzbeschreibung", required: true, localized: true, admin: { description: "Wird auf Projektkarten angezeigt." } },
            { name: "body", type: "richText", label: "Projektbeschreibung", localized: true },
          ],
        },
        {
          label: "Medien",
          fields: [
            { name: "image", type: "upload", relationTo: "media", label: "Titelbild" },
          ],
        },
        {
          label: "Anzeige",
          fields: [
            {
              name: "category",
              type: "select",
              label: "Kategorie",
              required: true,
              options: [
                { label: "Sozialprojekt", value: "sozial" },
                { label: "Bildungsprojekt", value: "bildung" },
                { label: "Gemeinschaftsprojekt", value: "gemeinschaft" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
