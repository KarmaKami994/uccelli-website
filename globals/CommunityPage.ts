import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../lib/access";

export const CommunityPage: GlobalConfig = {
  slug: "community-items-page",
  label: "Community-Seite",
  access: { read: anyone, update: authenticated },
  admin: {
    group: false,
    description: "Einstellungen für die Community-Hauptseite /community.",
    hideAPIURL: true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero & Einleitung",
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              label: "Hero-Bild",
              admin: {
                description: "Empfohlen: breites Bild im Format 16:9, mindestens ca. 1600 px breit.",
              },
            },
            {
              name: "title",
              type: "text",
              label: "Titel",
              localized: true,
              admin: {
                description: "Leer lassen, um den bisherigen Standardtitel zu verwenden.",
              },
            },
            {
              name: "subtitle",
              type: "text",
              label: "Untertitel",
              localized: true,
              admin: {
                description: "Leer lassen, um den bisherigen Standarduntertitel zu verwenden.",
              },
            },
            {
              name: "intro",
              type: "textarea",
              label: "Einleitung",
              localized: true,
              admin: {
                description: "Text direkt unter dem Hero und oberhalb der Community-Filter.",
              },
            },
          ],
        },
      ],
    },
  ],
};
