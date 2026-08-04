import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../lib/access";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation (Archiv)",
  access: { read: anyone, update: authenticated },
  admin: {
    group: false,
    description: "Historische Navigationsdaten. Die öffentliche Hauptnavigation wird aktuell aus der vereinfachten Website-Struktur erzeugt.",
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Menüpunkte",
      fields: [
        { name: "label", type: "text", required: true, label: "Menü-Label", localized: true },
        { name: "href", type: "text", label: "Link URL" },
        { name: "openInNewTab", type: "checkbox", defaultValue: false },
        {
          name: "children",
          type: "array",
          label: "Untermenü-Einträge",
          fields: [
            { name: "label", type: "text", required: true, label: "Label", localized: true },
            { name: "href", type: "text", required: true, label: "Link URL" },
          ],
        },
      ],
    },
  ],
};
