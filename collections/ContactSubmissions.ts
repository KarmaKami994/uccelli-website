import type { CollectionConfig } from "payload";
import { adminOnly, authenticated } from "../lib/access";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: {
    singular: "Anfrage",
    plural: "Anmeldungen & Anfragen",
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  admin: {
    group: "Kommunikation",
    useAsTitle: "name",
    defaultColumns: ["createdAt", "source", "name", "email", "status", "emailStatus"],
    description:
      "Alle Eingänge aus dem Kontakt- und Teil-werden-Formular. Neue Anfragen zuerst bearbeiten und danach auf «Erledigt» setzen.",
    hideAPIURL: true,
  },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "source",
          type: "select",
          label: "Formular",
          required: true,
          defaultValue: "contact",
          options: [
            { label: "Kontakt", value: "contact" },
            { label: "Teil werden", value: "join" },
          ],
          admin: { width: "50%" },
        },
        {
          name: "locale",
          type: "select",
          label: "Sprache",
          required: true,
          defaultValue: "de",
          options: [
            { label: "Deutsch", value: "de" },
            { label: "English", value: "en" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        { name: "email", type: "email", required: true, admin: { width: "50%" } },
      ],
    },
    { name: "subject", type: "text", label: "Betreff", required: true },
    { name: "message", type: "textarea", label: "Nachricht", required: true },
    {
      type: "collapsible",
      label: "Teil-werden-Angaben",
      admin: { initCollapsed: false },
      fields: [
        {
          name: "interest",
          type: "select",
          label: "Interesse",
          options: [
            { label: "In einem Projekt mitmachen", value: "project" },
            { label: "Freiwillig mithelfen", value: "volunteer" },
            { label: "Mitglied werden", value: "membership" },
            { label: "Partnerschaft", value: "partnership" },
            { label: "Finanziell unterstützen", value: "support" },
            { label: "Allgemeine Anfrage", value: "general" },
          ],
        },
        { name: "project", type: "text", label: "Ausgewähltes Projekt" },
      ],
    },
    {
      name: "status",
      type: "select",
      label: "Bearbeitungsstatus",
      required: true,
      defaultValue: "new",
      options: [
        { label: "Neu", value: "new" },
        { label: "In Bearbeitung", value: "in-progress" },
        { label: "Erledigt", value: "done" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "internalNote",
      type: "textarea",
      label: "Interne Notiz",
      admin: {
        description: "Nur im CMS sichtbar. Wird nicht per E-Mail versendet.",
      },
    },
    {
      type: "collapsible",
      label: "E-Mail-Zustellung",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "emailStatus",
          type: "select",
          label: "Versandstatus",
          required: true,
          defaultValue: "pending",
          options: [
            { label: "Ausstehend", value: "pending" },
            { label: "Versendet", value: "sent" },
            { label: "Nicht konfiguriert", value: "skipped" },
            { label: "Fehlgeschlagen", value: "failed" },
          ],
          admin: { readOnly: true },
        },
        { name: "emailId", type: "text", label: "Resend-ID", admin: { readOnly: true } },
        { name: "emailError", type: "textarea", label: "Versandfehler", admin: { readOnly: true } },
      ],
    },
  ],
};
