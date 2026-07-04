import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "../lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  // Public read is required so the website (and /api/media/file/*) works for anonymous visitors.
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
    useAsTitle: "alt",
  },
  fields: [
    { name: "alt", type: "text", required: true, localized: true },
  ],
};
