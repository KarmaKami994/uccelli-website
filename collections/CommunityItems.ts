import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const CommunityItems: CollectionConfig = {
  slug: "community-items",
  labels: {
    singular: "Community-Angebot",
    plural: "Community",
  },
  access: contentAccess,
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "type", "status", "featured", "order"],
    description: "Tools, Games und Ressourcen im Community Hub. Status und Reihenfolge steuern die öffentliche Darstellung.",
    hideAPIURL: true,
  },
  defaultSort: "order",
  fields: [
    { name: "slug", type: "text", required: true, unique: true, admin: { position: "sidebar", description: "URL-Teil für die Detailseite." } },
    { name: "featured", type: "checkbox", label: "Auf Startseite hervorheben", defaultValue: false, admin: { position: "sidebar" } },
    { name: "order", type: "number", label: "Reihenfolge", defaultValue: 0, admin: { position: "sidebar" } },
    {
      type: "tabs",
      tabs: [
        {
          label: "Inhalt",
          fields: [
            { name: "title", type: "text", label: "Titel", required: true, localized: true },
            { name: "summary", type: "textarea", label: "Kurzbeschreibung", required: true, localized: true },
            { name: "body", type: "richText", label: "Beschreibung", localized: true },
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
              type: "row",
              fields: [
                {
                  name: "type",
                  type: "select",
                  label: "Typ",
                  required: true,
                  options: [
                    { label: "Tool", value: "tool" },
                    { label: "Game", value: "game" },
                    { label: "Ressource", value: "resource" },
                  ],
                  admin: { width: "50%" },
                },
                {
                  name: "status",
                  type: "select",
                  label: "Status",
                  required: true,
                  defaultValue: "coming-soon",
                  options: [
                    { label: "Verfügbar", value: "available" },
                    { label: "Beta", value: "beta" },
                    { label: "Demnächst", value: "coming-soon" },
                  ],
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "href",
              type: "text",
              label: "Externer oder interner Link",
              admin: { description: "Leer lassen, um die interne Detailseite zu verwenden." },
            },
          ],
        },
      ],
    },
  ],
};
