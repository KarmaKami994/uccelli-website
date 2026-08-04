import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../lib/access";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  access: { read: anyone, update: authenticated },
  admin: {
    group: "Website",
    description: "Texte und Hero-Bild der Startseite. Projekte, Community, News und Partner werden in ihren eigenen Bereichen gepflegt.",
    hideAPIURL: true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Einstiegsbereich",
              admin: { hideGutter: true },
              fields: [
                { name: "title", type: "text", required: true, label: "Titel", localized: true },
                { name: "subtitle", type: "text", label: "Untertitel / Claim", localized: true },
                { name: "ctaText", type: "text", label: "Button-Text", localized: true },
                { name: "ctaHref", type: "text", label: "Button-Link", admin: { description: "Interner Pfad, z. B. /projekte" } },
                { name: "image", type: "upload", relationTo: "media", label: "Hintergrundbild" },
              ],
            },
          ],
        },
        {
          label: "Über-uns-Teaser",
          fields: [
            {
              name: "about",
              type: "group",
              label: "Über-uns-Teaser",
              admin: { hideGutter: true },
              fields: [
                { name: "eyebrow", type: "text", label: "Kleine Überschrift", localized: true },
                { name: "title", type: "text", required: true, label: "Titel", localized: true },
                { name: "text", type: "textarea", required: true, label: "Text", localized: true },
                { name: "ctaText", type: "text", label: "Button-Text", localized: true },
                { name: "ctaHref", type: "text", label: "Button-Link", admin: { description: "Interner Pfad, z. B. /ueber-uns" } },
              ],
            },
          ],
        },
        {
          label: "Abschluss-CTA",
          fields: [
            {
              name: "cta",
              type: "group",
              label: "Abschließender Aufruf",
              admin: { hideGutter: true },
              fields: [
                { name: "title", type: "text", required: true, label: "Titel", localized: true },
                { name: "text", type: "textarea", label: "Text", localized: true },
                { name: "buttonText", type: "text", label: "Button-Text", localized: true },
                { name: "buttonHref", type: "text", label: "Button-Link", admin: { description: "Interner Pfad, z. B. /teil-werden" } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "tasks",
      type: "group",
      label: "Historische Hauptaufgaben",
      admin: { hidden: true },
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
  ],
};
