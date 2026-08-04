import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: { singular: "Teammitglied", plural: "Team" },
  access: contentAccess,
  admin: {
    group: "Verein",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    description: "Personen, die auf der Über-uns-Seite als Team dargestellt werden.",
    hideAPIURL: true,
  },
  defaultSort: "order",
  fields: [
    { name: "order", type: "number", label: "Reihenfolge", defaultValue: 0, admin: { position: "sidebar" } },
    {
      type: "tabs",
      tabs: [
        {
          label: "Profil",
          fields: [
            { name: "name", type: "text", label: "Name", required: true },
            { name: "role", type: "text", label: "Funktion", required: true, localized: true },
            { name: "bio", type: "richText", label: "Biografie", localized: true },
          ],
        },
        {
          label: "Bild",
          fields: [{ name: "image", type: "upload", relationTo: "media", label: "Porträt" }],
        },
      ],
    },
  ],
};
