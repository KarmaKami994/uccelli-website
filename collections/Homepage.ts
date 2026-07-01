import type { CollectionConfig } from "payload";

export const Homepage: CollectionConfig = {
  slug: "homepage",
  admin: {
    useAsTitle: "title",
    description: "Homepage-Inhalte. Es sollte nur einen Eintrag geben.",
  },
  fields: [
    { name: "title", type: "text", defaultValue: "Homepage", admin: { readOnly: true } },

    // Hero Section
    {
      name: "hero",
      type: "group",
      label: "Hero-Sektion",
      fields: [
        { name: "title", type: "text", required: true, label: "Titel" },
        { name: "subtitle", type: "text", label: "Untertitel / Claim" },
        { name: "ctaText", type: "text", label: "Button-Text" },
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
        { name: "eyebrow", type: "text", label: "Eyebrow (klein über Titel)" },
        { name: "title", type: "text", required: true, label: "Titel" },
        { name: "text", type: "textarea", required: true, label: "Text" },
        { name: "ctaText", type: "text", label: "Button-Text" },
        { name: "ctaHref", type: "text", label: "Button-Link" },
      ],
    },

    // Hauptaufgaben (Cards)
    {
      name: "tasks",
      type: "group",
      label: "Hauptaufgaben",
      fields: [
        { name: "title", type: "text", required: true, label: "Sektions-Titel" },
        {
          name: "cards",
          type: "array",
          label: "Karten",
          maxRows: 6,
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
        { name: "title", type: "text", required: true, label: "Titel" },
        { name: "text", type: "textarea", label: "Text" },
        { name: "buttonText", type: "text", label: "Button-Text" },
        { name: "buttonHref", type: "text", label: "Button-Link" },
      ],
    },
  ],
};