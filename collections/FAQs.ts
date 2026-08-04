import type { CollectionConfig } from "payload";
import { contentAccess } from "../lib/access";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQ" },
  access: contentAccess,
  admin: {
    group: "Verein",
    useAsTitle: "question",
    defaultColumns: ["question", "order"],
    description: "Häufige Fragen für die Über-uns-Seite.",
    hideAPIURL: true,
  },
  defaultSort: "order",
  fields: [
    { name: "order", type: "number", label: "Reihenfolge", defaultValue: 0, admin: { position: "sidebar" } },
    { name: "question", type: "text", label: "Frage", required: true, localized: true },
    { name: "answer", type: "richText", required: true, label: "Antwort", localized: true },
  ],
};
