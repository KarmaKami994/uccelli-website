import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "bio", type: "richText", label: "Biografie" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
