import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Medium", plural: "Medien" },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    mimeTypes: ["image/*", "application/pdf"],
  },
  admin: {
    group: "Kommunikation",
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "mimeType", "updatedAt"],
    description: "Zentrale Bibliothek für Bilder, Logos und PDF-Dateien.",
    hideAPIURL: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alternativtext",
      required: true,
      localized: true,
      admin: { description: "Beschreibt den Bildinhalt für Barrierefreiheit und Suchmaschinen." },
    },
  ],
};
