/**
 * Bootstrap data that is required by active archive pages but is not managed
 * by scripts/sync-content.ts.
 *
 * This command is deliberately restricted to a fresh editorial database. It
 * refuses to write when collections managed by the versioned content sync
 * already contain data, and it never updates documents in the collections it
 * owns. Each bootstrap collection is populated only while it is empty.
 */
import { pathToFileURL } from "node:url";

type BootstrapCollection = "networks" | "werte" | "courses" | "events";
type GuardCollection =
  | "projects"
  | "community-items"
  | "posts"
  | "pages"
  | "partners"
  | "team-members"
  | "faqs";

type BootstrapDocument = Record<string, unknown>;

export interface BootstrapPayload {
  find(args: {
    collection: BootstrapCollection | GuardCollection;
    limit: number;
    depth: number;
    overrideAccess: boolean;
  }): Promise<{ docs: unknown[]; totalDocs?: number }>;
  create(args: {
    collection: BootstrapCollection;
    data: BootstrapDocument;
    overrideAccess: boolean;
  }): Promise<unknown>;
  findGlobal(args: {
    slug: "homepage" | "navigation";
    locale: "de";
    fallbackLocale: "de";
    depth: number;
    overrideAccess: boolean;
  }): Promise<Record<string, unknown>>;
}

interface BootstrapDefinition {
  collection: BootstrapCollection;
  label: string;
  items: readonly BootstrapDocument[];
}

export interface BootstrapResult {
  created: Array<{ collection: BootstrapCollection; count: number }>;
  skipped: Array<{ collection: BootstrapCollection; existing: number }>;
}

const SYNC_MANAGED_COLLECTIONS: readonly GuardCollection[] = [
  "projects",
  "community-items",
  "posts",
  "pages",
  "partners",
  "team-members",
  "faqs",
];

function toRichText(text: string) {
  return {
    root: {
      type: "root",
      children: text
        .split("\n")
        .filter((paragraph) => paragraph.trim().length > 0)
        .map((paragraph) => ({
          type: "paragraph",
          children: [{
            type: "text",
            text: paragraph.trim(),
            format: 0,
            mode: "normal",
            style: "",
            detail: 0,
            version: 1,
          }],
          direction: "ltr",
          format: "",
          indent: 0,
          textFormat: 0,
          textStyle: "",
          version: 1,
        })),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

const networks = [
  {
    name: "Uccelli Ghana",
    slug: "uccelli-ghana",
    order: 1,
    description: "Unser Bestreben, die Gemeinschaft zu stärken, geht über die nationalen Grenzen hinaus. Der Fokus dieser Initiative liegt daran, die Selbstwirksamkeit zu stärken und Menschen dazu zu ermutigen, andere zu stützen.",
  },
  {
    name: "Uccelli Women",
    slug: "uccelli-women",
    order: 2,
    description: "Wir möchten eine eigenständige Subgruppe namens Uccelli Women ins Leben rufen. Diese Gruppe dient als spezielles Netzwerk für unsere weibliche Zielgruppe und bietet eine Anlaufstelle für Frauen innerhalb des Vereins.",
  },
  {
    name: "Uccelli FC",
    slug: "uccelli-fc",
    order: 3,
    description: "Der Aufbau von Uccelli FC war für uns nicht nur die Schaffung einer Fussballmannschaft, sondern auch die Erkenntnis, dass Fussball Menschen verbindet.",
  },
  {
    name: "Nightshift Music",
    slug: "nightshift",
    order: 4,
    description: "Nightshift Music ist unsere Konzert- und Musikplattform, die neuen Artists eine Bühne bietet. Durch regelmässige Events schaffen wir Raum für kreative Entfaltung.",
  },
] as const;

const values = [
  {
    title: "Schutz der Umwelt",
    slug: "schutz-der-umwelt",
    body: "Der Verein Uccelli setzt sich aktiv für den Schutz der Umwelt ein. Wir glauben, dass Nachhaltigkeit und Umweltbewusstsein zentrale Werte unserer Gemeinschaft sind.\n\nDurch bewusstes Handeln, Recycling-Initiativen und die Förderung umweltfreundlicher Praktiken tragen wir dazu bei, unseren ökologischen Fussabdruck zu minimieren.",
  },
  {
    title: "Datenschutz",
    slug: "datenschutz",
    body: "Der Schutz personenbezogener Daten ist für den Verein Uccelli von höchster Bedeutung. Wir behandeln alle Daten unserer Mitglieder und Partner mit grösster Sorgfalt und in Übereinstimmung mit dem Schweizer Datenschutzgesetz (nDSG).\n\nWir sammeln nur die Daten, die für unsere Vereinstätigkeiten notwendig sind, und geben keine Informationen an Dritte weiter.",
  },
  {
    title: "Diskriminierungsverbot",
    slug: "diskriminierungsverbot",
    body: "Der Verein Uccelli steht für eine inklusive Gemeinschaft, in der jeder Mensch willkommen ist — unabhängig von Herkunft, Geschlecht, Religion, sexueller Orientierung oder sozialem Status.\n\nDiskriminierung in jeglicher Form hat in unserem Verein keinen Platz. Wir fördern aktiv Respekt, Toleranz und gegenseitige Wertschätzung.",
  },
  {
    title: "Freiheit und Autonomie",
    slug: "freiheit-und-autonomie",
    body: "Der Name Uccelli — Vögel — steht symbolisch für Freiheit. Wir glauben an die Freiheit jedes Einzelnen, seinen eigenen Weg zu gehen und eigene Entscheidungen zu treffen.\n\nGleichzeitig fördern wir Autonomie: die Fähigkeit, selbstständig zu handeln, Verantwortung zu übernehmen und das eigene Leben aktiv zu gestalten.",
  },
  {
    title: "Solidarität und Kohäsion",
    slug: "solidaritaet-und-kohaesion",
    body: "Solidarität ist ein Grundpfeiler unseres Vereins. Wir stehen füreinander ein und unterstützen uns gegenseitig — in guten wie in schwierigen Zeiten.\n\nKohäsion bedeutet für uns Zusammenhalt innerhalb unserer vielfältigen Gemeinschaft. Unterschiedliche Hintergründe und Perspektiven bereichern unser Netzwerk.",
  },
  {
    title: "Integrität",
    slug: "integritaet",
    body: "Integrität ist die Grundlage allen Handelns im Verein Uccelli. Wir stehen zu unseren Werten, handeln transparent und ehrlich.\n\nUnsere Mitglieder, Partner und Sponsoren können darauf vertrauen, dass wir verantwortungsvoll mit Ressourcen umgehen und unsere Versprechen einhalten.",
  },
] as const;

const courses = [
  { name: "Kurse zu Psychologie", description: "Laufbahnberatung, Motivation, Persönlichkeit und psychische Gesundheit.", order: 1 },
  { name: "Kurse zu Sport", description: "Fitness, Ernährung und Wohlbefinden.", order: 2 },
  { name: "Kurse zu Finanzen", description: "Steuern, Versicherungen, Budgetplanung.", order: 3 },
  { name: "Kurse zu IT & Business", description: "Webentwicklung, Business-Aufbau, digitale Kompetenzen.", order: 4 },
] as const;

const events = [
  {
    title: "Uccelli Sommerfest",
    date: "2026-08-15",
    location: "GZ Höngg, Zürich",
    description: "Unser jährliches Sommerfest mit Musik, Essen und Gemeinschaft.",
  },
  {
    title: "Skills4Growth Workshop",
    date: "2026-09-22",
    location: "GZ Höngg, Zürich",
    description: "Workshop zu Steuern und Versicherungen für junge Erwachsene.",
  },
  {
    title: "Nightshift Music #4",
    date: "2026-10-10",
    location: "TBA",
    description: "Die vierte Ausgabe unserer Konzertreihe mit aufstrebenden Artists.",
  },
] as const;

export const EMPTY_DB_BOOTSTRAP: readonly BootstrapDefinition[] = [
  {
    collection: "networks",
    label: "Netzwerke",
    items: networks.map((network) => ({
      name: network.name,
      slug: network.slug,
      description: toRichText(network.description),
      order: network.order,
    })),
  },
  {
    collection: "werte",
    label: "Werte",
    items: values.map((value) => ({
      title: value.title,
      slug: value.slug,
      body: toRichText(value.body),
    })),
  },
  {
    collection: "courses",
    label: "Kurse",
    items: courses,
  },
  {
    collection: "events",
    label: "Events",
    items: events.map((event) => ({
      title: event.title,
      date: event.date,
      location: event.location,
      description: toRichText(event.description),
    })),
  },
];

function documentCount(result: { docs: unknown[]; totalDocs?: number }) {
  return result.totalDocs ?? result.docs.length;
}

function hasContent(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return true;
  if (Array.isArray(value)) return value.some(hasContent);
  if (!value || typeof value !== "object") return false;

  return Object.entries(value).some(([key, nested]) => {
    if (["id", "createdAt", "updatedAt"].includes(key)) return false;
    return hasContent(nested);
  });
}

export async function bootstrapEmptyDb(payload: BootstrapPayload): Promise<BootstrapResult> {
  const populated: string[] = [];

  for (const collection of SYNC_MANAGED_COLLECTIONS) {
    const existing = await payload.find({
      collection,
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    if (documentCount(existing) > 0) populated.push(collection);
  }

  const [homepage, navigation] = await Promise.all([
    payload.findGlobal({
      slug: "homepage",
      locale: "de",
      fallbackLocale: "de",
      depth: 0,
      overrideAccess: true,
    }),
    payload.findGlobal({
      slug: "navigation",
      locale: "de",
      fallbackLocale: "de",
      depth: 0,
      overrideAccess: true,
    }),
  ]);
  if (hasContent(homepage)) populated.push("homepage (Global)");
  if (hasContent(navigation.items)) populated.push("navigation (Global)");

  if (populated.length > 0) {
    throw new Error(
      `[bootstrap] Abbruch: Die Datenbank enthält bereits redaktionelle Inhalte (${populated.join(", ")}). ` +
      "Der Empty-DB-Bootstrap darf nur für eine neue Datenbank verwendet werden.",
    );
  }

  const result: BootstrapResult = { created: [], skipped: [] };

  for (const definition of EMPTY_DB_BOOTSTRAP) {
    const existing = await payload.find({
      collection: definition.collection,
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    const existingCount = documentCount(existing);

    if (existingCount > 0) {
      result.skipped.push({ collection: definition.collection, existing: existingCount });
      continue;
    }

    for (const data of definition.items) {
      await payload.create({
        collection: definition.collection,
        data: { ...data },
        overrideAccess: true,
      });
    }
    result.created.push({ collection: definition.collection, count: definition.items.length });
  }

  return result;
}

async function run() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  const payload = await getPayload({ config });
  const result = await bootstrapEmptyDb(payload as unknown as BootstrapPayload);

  for (const entry of result.created) {
    console.log(`[bootstrap] ${entry.collection}: ${entry.count} erstellt`);
  }
  for (const entry of result.skipped) {
    console.log(`[bootstrap] ${entry.collection}: ${entry.existing} vorhanden, übersprungen`);
  }

  process.exit(0);
}

const entryPoint = process.argv[1];
if (entryPoint && import.meta.url === pathToFileURL(entryPoint).href) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
