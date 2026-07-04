import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  access: contentAccess,
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "order"],
  },
  fields: [
    { name: "question", type: "text", required: true, localized: true },
    { name: "answer", type: "richText", required: true, label: "Antwort", localized: true },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
