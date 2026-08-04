/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from "payload";
import config from "@payload-config";
import { richText } from "../content/legacy";

const VERSION_KEY = "uccelli-content:2026-08-cv-creator-v1";
type Locale = "de" | "en";

const content = {
  de: {
    title: "CV Creator",
    summary: "Erstelle, speichere und exportiere einen professionellen Lebenslauf direkt im Browser.",
    body: richText(
      [
        {
          heading: { de: "Dein Lebenslauf, Schritt für Schritt", en: "Your CV, step by step" },
          text: {
            de: "Erfasse Ausbildung, Berufserfahrung, Skills, Projekte und Auszeichnungen. Du kannst deinen Zwischenstand im Browser speichern sowie als JSON importieren oder exportieren.",
            en: "Enter education, work experience, skills, projects and awards. You can save progress in the browser and import or export it as JSON.",
          },
        },
        {
          heading: { de: "Drei PDF-Vorlagen", en: "Three PDF templates" },
          text: {
            de: "Wähle zwischen dem Awesome-CV-Beispielstil und zwei weiteren LaTeX-Vorlagen. Die PDF-Vorschau wird direkt im Tool angezeigt und kann heruntergeladen werden.",
            en: "Choose between the Awesome-CV example style and two additional LaTeX templates. The PDF preview is displayed directly in the tool and can be downloaded.",
          },
        },
      ],
      "de",
    ),
  },
  en: {
    title: "CV Creator",
    summary: "Create, save and export a professional CV directly in your browser.",
    body: richText(
      [
        {
          heading: { de: "Dein Lebenslauf, Schritt für Schritt", en: "Your CV, step by step" },
          text: {
            de: "Erfasse Ausbildung, Berufserfahrung, Skills, Projekte und Auszeichnungen. Du kannst deinen Zwischenstand im Browser speichern sowie als JSON importieren oder exportieren.",
            en: "Enter education, work experience, skills, projects and awards. You can save progress in the browser and import or export it as JSON.",
          },
        },
        {
          heading: { de: "Drei PDF-Vorlagen", en: "Three PDF templates" },
          text: {
            de: "Wähle zwischen dem Awesome-CV-Beispielstil und zwei weiteren LaTeX-Vorlagen. Die PDF-Vorschau wird direkt im Tool angezeigt und kann heruntergeladen werden.",
            en: "Choose between the Awesome-CV example style and two additional LaTeX templates. The PDF preview is displayed directly in the tool and can be downloaded.",
          },
        },
      ],
      "en",
    ),
  },
} satisfies Record<Locale, { title: string; summary: string; body: ReturnType<typeof richText> }>;

const base = {
  slug: "cv-creator",
  type: "tool",
  status: "available",
  href: "/community/cv-creator",
  featured: true,
  order: 1,
} as const;

async function run() {
  const payload = await getPayload({ config });
  const cms = payload as any;

  const marker = await cms.find({
    collection: "payload-kv",
    where: { key: { equals: VERSION_KEY } },
    limit: 1,
    overrideAccess: true,
  });

  const found = await cms.find({
    collection: "community-items",
    where: { slug: { equals: "cv-creator" } },
    limit: 1,
    locale: "de",
    fallbackLocale: "de",
    overrideAccess: true,
  });

  const existing = found.docs[0];

  if (marker.docs[0] && existing) {
    await cms.update({
      collection: "community-items",
      id: existing.id,
      locale: "de",
      overrideAccess: true,
      data: base,
    });
    console.log(`[cv-creator] ${VERSION_KEY} already applied; availability verified`);
    process.exit(0);
  }

  const document = existing
    ? await cms.update({
        collection: "community-items",
        id: existing.id,
        locale: "de",
        overrideAccess: true,
        data: { ...base, ...content.de },
      })
    : await cms.create({
        collection: "community-items",
        locale: "de",
        overrideAccess: true,
        data: { ...base, ...content.de },
      });

  await cms.update({
    collection: "community-items",
    id: document.id,
    locale: "en",
    overrideAccess: true,
    data: { ...base, ...content.en },
  });

  const markerData = {
    key: VERSION_KEY,
    data: {
      appliedAt: new Date().toISOString(),
      repairedMissingEntry: Boolean(marker.docs[0] && !existing),
    },
  };

  if (marker.docs[0]) {
    await cms.update({
      collection: "payload-kv",
      id: marker.docs[0].id,
      overrideAccess: true,
      data: markerData,
    });
  } else {
    await cms.create({
      collection: "payload-kv",
      overrideAccess: true,
      data: markerData,
    });
  }

  console.log(`[cv-creator] applied ${VERSION_KEY}${existing ? "" : " and created the missing CMS entry"}`);
  process.exit(0);
}

run().catch((error) => {
  console.error("[cv-creator] failed", error);
  process.exit(1);
});
