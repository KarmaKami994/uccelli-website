import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  access: contentAccess,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true, localized: true },
    { name: "bio", type: "richText", label: "Biografie", localized: true },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
