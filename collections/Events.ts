import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Events: CollectionConfig = {
  slug: "events",
  access: contentAccess,
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "location"],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "date", type: "date", required: true },
    { name: "endDate", type: "date" },
    { name: "location", type: "text" },
    { name: "description", type: "richText", localized: true },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};
