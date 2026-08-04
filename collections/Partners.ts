import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: { singular: "Partner", plural: "Partner & Sponsoren" },
  access: contentAccess,
  admin: {
    group: "Verein",
    useAsTitle: "name",
    defaultColumns: ["name", "type", "updatedAt"],
    description: "Partner und Sponsoren für die Über-uns-Seite und das Logo-Banner auf der Startseite.",
    hideAPIURL: true,
  },
  fields: [
    {
      name: "type",
      type: "select",
      label: "Typ",
      required: true,
      options: [
        { label: "Partner", value: "partner" },
        { label: "Sponsor", value: "sponsor" },
      ],
      admin: { position: "sidebar" },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Inhalt",
          fields: [
            { name: "name", type: "text", label: "Name", required: true },
            { name: "description", type: "richText", required: true, label: "Beschreibung", localized: true },
            { name: "url", type: "text", label: "Website URL" },
          ],
        },
        {
          label: "Logo",
          fields: [{ name: "logo", type: "upload", relationTo: "media", label: "Logo" }],
        },
        {
          label: "Social Media",
          fields: [
            {
              name: "socials",
              type: "group",
              label: "Profile",
              fields: [
                { name: "linkedin", type: "text", label: "LinkedIn" },
                { name: "instagram", type: "text", label: "Instagram" },
                { name: "facebook", type: "text", label: "Facebook" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
