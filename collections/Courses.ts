import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const Courses: CollectionConfig = {
  slug: "courses",
  labels: { singular: "Kurs (Archiv)", plural: "Kurse (Archiv)" },
  access: contentAccess,
  admin: {
    group: false,
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "description", type: "textarea", required: true, localized: true },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
