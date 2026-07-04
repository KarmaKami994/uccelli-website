import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../lib/access";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: { read: anyone, update: authenticated },
  fields: [
    // Hero Section
    {
      name: "hero",
      type: "group",
      label: "Hero-Sektion",
      fields: [
        { name: "title", type: "text", required: true, label: "Titel", localized: true },
        { name: "subtitle", type: "text", label: "Untertitel / Claim", localized: true },
        { name: "ctaText", type: "text", label: "Button-Text", localized: true },
        { name: "ctaHref", type: "text", label: "Button-Link" },
        { name: "image", type: "upload", relationTo: "media", label: "Hintergrundbild" },
      ],
    },

    // About Teaser
    {
      name: "about",
      type: "group",
      label: "Über-uns-Teaser",
      fields: [
        { name: "eyebrow", type: "text", label: "Eyebrow (klein über Titel)", localized: true },
        { name: "title", type: "text", required: true, label: "Titel", localized: true },
        { name: "text", type: "textarea", required: true, label: "Text", localized: true },
        { name: "ctaText", type: "text", label: "Button-Text", localized: true },
        { name: "ctaHref", type: "text", label: "Button-Link" },
      ],
    },

    // Hauptaufgaben (Cards)
    {
      name: "tasks",
      type: "group",
      label: "Hauptaufgaben",
      fields: [
        { name: "title", type: "text", required: true, label: "Sektions-Titel", localized: true },
        {
          name: "cards",
          type: "array",
          label: "Karten",
          maxRows: 6,
          localized: true,
          fields: [
            { name: "title", type: "text", required: true, label: "Titel" },
            { name: "text", type: "textarea", required: true, label: "Text" },
            { name: "buttonText", type: "text", label: "Button-Text" },
            { name: "buttonHref", type: "text", label: "Button-Link" },
            { name: "image", type: "upload", relationTo: "media", label: "Bild" },
          ],
        },
      ],
    },

    // CTA Section
    {
      name: "cta",
      type: "group",
      label: "Call-to-Action",
      fields: [
        { name: "title", type: "text", required: true, label: "Titel", localized: true },
        { name: "text", type: "textarea", label: "Text", localized: true },
        { name: "buttonText", type: "text", label: "Button-Text", localized: true },
        { name: "buttonHref", type: "text", label: "Button-Link" },
      ],
    },
  ],
};
