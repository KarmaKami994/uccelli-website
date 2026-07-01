import type { CollectionConfig } from "payload";

export const Navigation: CollectionConfig = {
  slug: "navigation",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "href", "order"],
    description: "Haupt-Navigation der Website. Jeder Eintrag ist ein Top-Level-Menüpunkt.",
  },
  fields: [
    { name: "label", type: "text", required: true, label: "Menü-Label" },
    { name: "href", type: "text", label: "Link URL", admin: { description: "Wohin der Titel selbst verlinkt (z.B. /programm/projekte). Leer lassen wenn nur Dropdown." } },
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
    { name: "openInNewTab", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
    {
      name: "children",
      type: "array",
      label: "Untermenü-Einträge",
      admin: { description: "Sub-Navigation (Dropdown auf Desktop, Akkordeon auf Mobile)" },
      fields: [
        { name: "label", type: "text", required: true, label: "Label" },
        { name: "href", type: "text", required: true, label: "Link URL" },
      ],
    },
  ],
};
