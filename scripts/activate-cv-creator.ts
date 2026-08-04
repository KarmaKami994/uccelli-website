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

async function run() {
  const payload = await getPayload({ config });
  const cms = payload as any;

  const marker = await cms.find({
    collection: "payload-kv",
    where: { key: { equals: VERSION_KEY } },
    limit: 1,
    overrideAccess: true,
  });
  if (marker.docs.length > 0) {
    console.log(`[cv-creator] ${VERSION_KEY} already applied`);
    process.exit(0);
  }

  const found = await cms.find({
    collection: "community-items",
    where: { slug: { equals: "cv-creator" } },
    limit: 1,
    locale: "de",
    fallbackLocale: "de",
    overrideAccess: true,
  });

  if (!found.docs[0]) {
    throw new Error("Community item cv-creator was not created by the canonical content sync.");
  }

  const id = found.docs[0].id;
  for (const locale of ["de", "en"] as Locale[]) {
    await cms.update({
      collection: "community-items",
      id,
      locale,
      overrideAccess: true,
      data: {
        slug: "cv-creator",
        type: "tool",
        status: "available",
        href: "/community/cv-creator",
        featured: true,
        order: 1,
        ...content[locale],
      },
    });
  }

  await cms.create({
    collection: "payload-kv",
    overrideAccess: true,
    data: { key: VERSION_KEY, data: { appliedAt: new Date().toISOString() } },
  });

  console.log(`[cv-creator] applied ${VERSION_KEY}`);
  process.exit(0);
}

run().catch((error) => {
  console.error("[cv-creator] failed", error);
  process.exit(1);
});
