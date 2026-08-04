import { getPayload } from "payload";
import config from "@payload-config";
import { communityItems, faqs, partners, posts, projects, richText, team } from "../content/legacy";

const VERSION_KEY = "uccelli-content:2026-08-site-restructure-v1";
type Locale = "de" | "en";

async function run() {
  const payload = await getPayload({ config });
  const cms = payload as any;
  const force = process.env.FORCE_CONTENT_SYNC === "1";

  const marker = await cms.find({
    collection: "payload-kv",
    where: { key: { equals: VERSION_KEY } },
    limit: 1,
    overrideAccess: true,
  });

  if (!force && marker.docs.length > 0) {
    console.log(`[content:sync] ${VERSION_KEY} already applied`);
    process.exit(0);
  }

  async function upsertLocalized(
    collection: string,
    field: string,
    value: string | number,
    base: Record<string, unknown>,
    de: Record<string, unknown>,
    en: Record<string, unknown>,
  ) {
    const found = await cms.find({
      collection,
      where: { [field]: { equals: value } },
      limit: 1,
      locale: "de",
      fallbackLocale: "de",
      overrideAccess: true,
    });

    const document = found.docs[0]
      ? await cms.update({
          collection,
          id: found.docs[0].id,
          locale: "de",
          data: { ...base, ...de },
          overrideAccess: true,
        })
      : await cms.create({
          collection,
          locale: "de",
          data: { ...base, ...de },
          overrideAccess: true,
        });

    await cms.update({
      collection,
      id: document.id,
      locale: "en",
      data: { ...base, ...en },
      overrideAccess: true,
    });

    return document;
  }

  for (const project of projects) {
    await upsertLocalized(
      "projects",
      "slug",
      project.slug,
      {
        slug: project.slug,
        category: project.category,
        featured: project.featured,
      },
      {
        title: project.title.de,
        summary: project.summary.de,
        body: richText([...project.sections], "de"),
      },
      {
        title: project.title.en,
        summary: project.summary.en,
        body: richText([...project.sections], "en"),
      },
    );
  }

  // These entries represented a one-off event and a course, both of which
  // were intentionally removed from the new public information architecture.
  for (const slug of ["meet-and-greet", "steuern-versicherung"]) {
    const found = await cms.find({ collection: "projects", where: { slug: { equals: slug } }, limit: 1, overrideAccess: true });
    if (found.docs[0]) await cms.delete({ collection: "projects", id: found.docs[0].id, overrideAccess: true });
  }

  for (const post of posts) {
    await upsertLocalized(
      "posts",
      "slug",
      post.slug,
      { slug: post.slug, date: post.date },
      {
        title: post.title.de,
        summary: post.summary.de,
        body: richText([...post.sections], "de"),
      },
      {
        title: post.title.en,
        summary: post.summary.en,
        body: richText([...post.sections], "en"),
      },
    );
  }

  const obsoletePost = await cms.find({
    collection: "posts",
    where: { slug: { equals: "danke-gruendungsmitglieder" } },
    limit: 1,
    overrideAccess: true,
  });
  if (obsoletePost.docs[0]) await cms.delete({ collection: "posts", id: obsoletePost.docs[0].id, overrideAccess: true });

  for (const item of communityItems) {
    await upsertLocalized(
      "community-items",
      "slug",
      item.slug,
      {
        slug: item.slug,
        type: item.type,
        status: item.status,
        featured: item.featured,
        order: item.order,
      },
      {
        title: item.title.de,
        summary: item.summary.de,
        body: richText([...item.sections], "de"),
      },
      {
        title: item.title.en,
        summary: item.summary.en,
        body: richText([...item.sections], "en"),
      },
    );
  }

  for (const partner of partners) {
    await upsertLocalized(
      "partners",
      "name",
      partner.name,
      { name: partner.name, type: partner.type, ...(partner.url ? { url: partner.url } : {}) },
      { description: richText([{ text: { de: partner.description.de, en: partner.description.en } }], "de") },
      { description: richText([{ text: { de: partner.description.de, en: partner.description.en } }], "en") },
    );
  }

  for (const member of team) {
    await upsertLocalized(
      "team-members",
      "name",
      member.name,
      { name: member.name, order: member.order },
      {
        role: member.role.de,
        bio: richText([{ text: { de: member.bio.de, en: member.bio.en } }], "de"),
      },
      {
        role: member.role.en,
        bio: richText([{ text: { de: member.bio.de, en: member.bio.en } }], "en"),
      },
    );
  }

  for (const faq of faqs) {
    await upsertLocalized(
      "faqs",
      "order",
      faq.order,
      { order: faq.order },
      {
        question: faq.question.de,
        answer: richText([{ text: { de: faq.answer.de, en: faq.answer.en } }], "de"),
      },
      {
        question: faq.question.en,
        answer: richText([{ text: { de: faq.answer.de, en: faq.answer.en } }], "en"),
      },
    );
  }

  const privacySections = [
    {
      heading: { de: "Datenschutz", en: "Privacy" },
      text: {
        de: "Der Verein Uccelli behandelt personenbezogene Daten vertraulich und gemäss dem Schweizer Datenschutzrecht. Wir erheben nur Daten, die für Kontaktanfragen und die Vereinsarbeit erforderlich sind. Daten werden nicht verkauft und nur an technische Dienstleister weitergegeben, soweit dies für den Betrieb notwendig ist.",
        en: "The Uccelli association treats personal data confidentially and in accordance with Swiss data-protection law. We only collect data required for enquiries and association activities. Data is not sold and is only shared with technical service providers where necessary for operation.",
      },
    },
    {
      heading: { de: "Kontakt", en: "Contact" },
      text: {
        de: "Fragen zum Datenschutz können an uccelli.society@gmail.com gesendet werden.",
        en: "Questions about privacy can be sent to uccelli.society@gmail.com.",
      },
    },
  ];
  await upsertLocalized(
    "pages",
    "slug",
    "datenschutz",
    { slug: "datenschutz" },
    { title: "Datenschutz", body: richText(privacySections, "de") },
    { title: "Privacy policy", body: richText(privacySections, "en") },
  );

  const imprintSections = [
    {
      heading: { de: "Verantwortliche Organisation", en: "Responsible organisation" },
      text: {
        de: "Verein Uccelli\nRiedhofstrasse 364\n8049 Zürich, Schweiz\nuccelli.society@gmail.com",
        en: "Uccelli Association\nRiedhofstrasse 364\n8049 Zurich, Switzerland\nuccelli.society@gmail.com",
      },
    },
  ];
  await upsertLocalized(
    "pages",
    "slug",
    "impressum",
    { slug: "impressum" },
    { title: "Impressum", body: richText(imprintSections, "de") },
    { title: "Imprint", body: richText(imprintSections, "en") },
  );

  const homepageByLocale: Record<Locale, any> = {
    de: {
      hero: {
        title: "Gemeinsam lernen. Projekte umsetzen. Wirkung schaffen.",
        subtitle: "Uccelli verbindet Menschen, die sich weiterentwickeln, Ideen verwirklichen und andere unterstützen möchten.",
        ctaText: "Projekte entdecken",
        ctaHref: "/projekte",
      },
      about: {
        eyebrow: "Über Uccelli",
        title: "Eine offene Gemeinschaft für Entwicklung und Austausch",
        text: "Uccelli schafft ein integratives Netzwerk, das Bildung, soziale Teilhabe und persönliche Entwicklung fördert – offen für alle, unabhängig von Hintergrund oder sozialer Lage.",
        ctaText: "Uccelli kennenlernen",
        ctaHref: "/ueber-uns",
      },
      tasks: { title: "Unsere Bereiche", cards: [] },
      cta: {
        title: "Möchtest du Teil von Uccelli werden?",
        text: "Lerne unsere Projekte kennen, bring deine Fähigkeiten ein oder unterstütze unsere Arbeit.",
        buttonText: "Teil werden",
        buttonHref: "/teil-werden",
      },
    },
    en: {
      hero: {
        title: "Learn together. Build projects. Create impact.",
        subtitle: "Uccelli connects people who want to grow, realise ideas and support others.",
        ctaText: "Discover projects",
        ctaHref: "/en/projekte",
      },
      about: {
        eyebrow: "About Uccelli",
        title: "An open community for growth and exchange",
        text: "Uccelli creates an inclusive network that supports education, social participation and personal development – open to everyone, regardless of background or social situation.",
        ctaText: "Get to know Uccelli",
        ctaHref: "/en/ueber-uns",
      },
      tasks: { title: "Our areas", cards: [] },
      cta: {
        title: "Would you like to become part of Uccelli?",
        text: "Discover our projects, contribute your skills or support our work.",
        buttonText: "Join Uccelli",
        buttonHref: "/en/teil-werden",
      },
    },
  };

  for (const locale of ["de", "en"] as Locale[]) {
    const current = await cms.findGlobal({ slug: "homepage", locale, fallbackLocale: "de", overrideAccess: true });
    const copy = homepageByLocale[locale];
    await cms.updateGlobal({
      slug: "homepage",
      locale,
      overrideAccess: true,
      data: {
        ...copy,
        hero: { ...copy.hero, image: current?.hero?.image ?? null },
      },
    });
  }

  const navByLocale: Record<Locale, any[]> = {
    de: [
      { label: "Projekte", href: "/projekte", children: [] },
      { label: "Community", href: "/community", children: [] },
      { label: "News", href: "/news", children: [] },
      { label: "Über uns", href: "/ueber-uns", children: [] },
      { label: "Teil werden", href: "/teil-werden", children: [] },
    ],
    en: [
      { label: "Projects", href: "/en/projekte", children: [] },
      { label: "Community", href: "/en/community", children: [] },
      { label: "News", href: "/en/news", children: [] },
      { label: "About us", href: "/en/ueber-uns", children: [] },
      { label: "Join", href: "/en/teil-werden", children: [] },
    ],
  };

  for (const locale of ["de", "en"] as Locale[]) {
    await cms.updateGlobal({
      slug: "navigation",
      locale,
      overrideAccess: true,
      data: { items: navByLocale[locale] },
    });
  }

  if (marker.docs[0]) {
    await cms.update({
      collection: "payload-kv",
      id: marker.docs[0].id,
      data: { key: VERSION_KEY, data: { appliedAt: new Date().toISOString() } },
      overrideAccess: true,
    });
  } else {
    await cms.create({
      collection: "payload-kv",
      data: { key: VERSION_KEY, data: { appliedAt: new Date().toISOString() } },
      overrideAccess: true,
    });
  }

  console.log(`[content:sync] applied ${VERSION_KEY}`);
  process.exit(0);
}

run().catch((error) => {
  console.error("[content:sync] failed", error);
  process.exit(1);
});
