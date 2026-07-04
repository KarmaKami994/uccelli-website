import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../lib/access";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  access: { read: anyone, update: authenticated },
  admin: {
    description:
      "Haupt-Navigation der Website. Reihenfolge per Drag & Drop. Labels sind pro Sprache übersetzbar (DE/EN oben rechts umschalten).",
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Menüpunkte",
      fields: [
        { name: "label", type: "text", required: true, label: "Menü-Label", localized: true },
        {
          name: "href",
          type: "text",
          label: "Link URL",
          admin: {
            description:
              "Wohin der Titel selbst verlinkt (z.B. /programm/projekte). Leer lassen wenn nur Dropdown.",
          },
        },
        { name: "openInNewTab", type: "checkbox", defaultValue: false },
        {
          name: "children",
          type: "array",
          label: "Untermenü-Einträge",
          admin: { description: "Sub-Navigation (Dropdown auf Desktop, Akkordeon auf Mobile)" },
          fields: [
            { name: "label", type: "text", required: true, label: "Label", localized: true },
            { name: "href", type: "text", required: true, label: "Link URL" },
          ],
        },
      ],
    },
  ],
};
