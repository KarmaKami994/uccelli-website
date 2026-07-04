import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Partners: CollectionConfig = {
  slug: "partners",
  access: contentAccess,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "updatedAt"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Partner", value: "partner" },
        { label: "Sponsor", value: "sponsor" },
      ],
    },
    { name: "description", type: "richText", required: true, label: "Beschreibung", localized: true },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "url", type: "text", label: "Website URL" },
    {
      name: "socials",
      type: "group",
      label: "Social Media",
      fields: [
        { name: "linkedin", type: "text" },
        { name: "instagram", type: "text" },
        { name: "facebook", type: "text" },
      ],
    },
  ],
};
