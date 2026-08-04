import { getPayload } from "payload";
import config from "@payload-config";
import { richText } from "../content/legacy";
import type { CommunityItem } from "../payload-types";

const slug = "cv-creator";

const copy = {
  de: {
    title: "CV Generator",
    summary: "Erstelle Schritt für Schritt einen übersichtlichen Lebenslauf und exportiere ihn als PDF.",
    body: richText(
      [
        {
          heading: { de: "Professioneller Lebenslauf im Browser", en: "Professional CV in your browser" },
          text: {
            de: "Der CV Generator führt strukturiert durch Profil, Ausbildung, Berufserfahrung, Skills, Projekte und Auszeichnungen. Daten können als JSON gesichert und wieder importiert werden. Für den PDF-Export stehen mehrere Vorlagen zur Verfügung.",
            en: "The CV Generator guides users through profile details, education, experience, skills, projects and awards. Data can be saved as JSON and imported again. Several templates are available for PDF export.",
          },
        },
      ],
      "de",
    ) as CommunityItem["body"],
  },
  en: {
    title: "CV Generator",
    summary: "Create a clear CV step by step and export it as a PDF.",
    body: richText(
      [
        {
          heading: { de: "Professioneller Lebenslauf im Browser", en: "Professional CV in your browser" },
          text: {
            de: "Der CV Generator führt strukturiert durch Profil, Ausbildung, Berufserfahrung, Skills, Projekte und Auszeichnungen. Daten können als JSON gesichert und wieder importiert werden. Für den PDF-Export stehen mehrere Vorlagen zur Verfügung.",
            en: "The CV Generator guides users through profile details, education, experience, skills, projects and awards. Data can be saved as JSON and imported again. Several templates are available for PDF export.",
          },
        },
      ],
      "en",
    ) as CommunityItem["body"],
  },
} as const;

async function run() {
  const payload = await getPayload({ config });
  const found = await payload.find({
    collection: "community-items",
    where: { slug: { equals: slug } },
    limit: 1,
    locale: "de",
    fallbackLocale: "de",
    overrideAccess: true,
  });

  const base = {
    slug,
    type: "tool" as const,
    status: "available" as const,
    featured: true,
    order: 1,
  };

  const document = found.docs[0]
    ? await payload.update({
        collection: "community-items",
        id: found.docs[0].id,
        locale: "de",
        overrideAccess: true,
        data: { ...base, ...copy.de },
      })
    : await payload.create({
        collection: "community-items",
        locale: "de",
        overrideAccess: true,
        data: { ...base, ...copy.de },
      });

  await payload.update({
    collection: "community-items",
    id: document.id,
    locale: "en",
    overrideAccess: true,
    data: { ...base, ...copy.en },
  });

  console.log("[content:sync:cv] CV Generator is available in the Community Hub");
}

run().catch((error) => {
  console.error("[content:sync:cv] failed", error);
  process.exitCode = 1;
});
