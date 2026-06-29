import { fetchCollection, fetchBySlug } from "./payload";

// ─── Types ───────────────────────────────────────────────
export type TeamMember = { name: string; role: string; image?: string; bio?: any; order?: number };
export type FAQ = { question: string; answer: string; order?: number };
export type Partner = { name: string; type: "partner" | "sponsor"; description: string; logo?: string; url?: string };
export type Project = { title: string; slug: string; category: string; summary: string; body?: string[]; image?: string };
export type Post = { title: string; slug: string; date: string; summary: string; body?: string[]; image?: string };
export type Event = { title: string; date: string; location?: string; description?: string };

// ─── Static Fallbacks ────────────────────────────────────
const TEAM_FALLBACK: TeamMember[] = [
  { name: "Ato Akrofi", role: "Vereinspräsident", order: 1 },
  { name: "Hatice Aksüt", role: "Head of Project Management", order: 2 },
  { name: "Karim Moutiq", role: "Head of IT", order: 3 },
];

const FAQ_FALLBACK: FAQ[] = [
  { question: "Was ist der Verein Uccelli?", answer: "Der Verein Uccelli ist ein integratives Netzwerk mit Sitz in Zürich, das Bildung, sozialen Austausch und persönliche Entwicklung fördert." },
  { question: "Wie kann ich Mitglied werden?", answer: "Du kannst dich über unser Kontaktformular oder direkt per E-Mail an uccelli.society@gmail.com anmelden." },
  { question: "Was kostet eine Mitgliedschaft?", answer: "Die Mitgliedschaft ist kostenlos. Wir finanzieren uns über Spenden, Sponsoren und Partnerschaften." },
  { question: "Welche Projekte bietet Uccelli an?", answer: "Wir bieten Sozialprojekte, Bildungsprojekte wie LifeLab und Gemeinschaftsprojekte wie die Nightshift Music Konzertreihe." },
  { question: "Wo finden die Veranstaltungen statt?", answer: "Die meisten unserer Veranstaltungen finden in Zürich statt, oft im GZ Höngg oder an wechselnden Locations." },
  { question: "Kann ich den Verein finanziell unterstützen?", answer: "Ja! Empfänger: Verein Uccelli, Konto Nr: 1148-5358.899, IBAN: CH53 0070 0114 8053 5889 9." },
  { question: "Was bedeutet der Name Uccelli?", answer: "Uccelli ist das italienische Wort für Vögel. Der Name steht für Freiheit, Individualität und die Überzeugung, dass Vielfalt eine Stärke ist." },
];

const PARTNERS_FALLBACK: Partner[] = [
  { name: "GZ Höngg", type: "partner", description: "Mit dem GZ Höngg verbindet uns eine enge Partnerschaft, die auf gegenseitigem Vertrauen und gemeinsamen Werten beruht." },
  { name: "Royal Studio", type: "partner", description: "Royal Studio – Kreative Event-Erlebnisse aus Zürich, spezialisiert auf innovativen Foto- und Videobooth-Entertainment." },
  { name: "Anker Swiss AG", type: "partner", description: "Ein etabliertes Schweizer Personalvermittlungsunternehmen mit langjähriger Erfahrung." },
  { name: "Hosttech GmbH", type: "sponsor", description: "Zuverlässiger Partner für Hosting unserer Website und Bereitstellung unserer Domainserver." },
  { name: "GymOne", type: "sponsor", description: "Modernes Fitnessstudio in Zürich Affoltern mit perfekten Voraussetzungen für effektives Training." },
  { name: "Fröhliche Info", type: "sponsor", description: "Innovatives Unternehmen in Züllikon für Kommunikation und Medienproduktion." },
];

const POSTS_FALLBACK: Post[] = [
  { title: "Neue Partnerschaft mit Royal Studio", slug: "partnerschaft-royal-studio", date: "15. April 2025", summary: "Wir dürfen eine aufregende neue Partnerschaft bekannt geben." },
  { title: "Danke an unsere Gründungsmitglieder", slug: "danke-gruendungsmitglieder", date: "20. März 2025", summary: "In der Hektik neuer Projekte vergisst man manchmal, innezuhalten und zu danken." },
  { title: "Partnerschaft mit Anker Swiss AG", slug: "partnerschaft-anker-swiss", date: "28. Februar 2025", summary: "Wir arbeiten jeden Tag daran, unser Netzwerk zu erweitern." },
];

const EVENTS_FALLBACK: Event[] = [];

// Helper: Extract image URL from Payload media relation
function resolveImageUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return media; // Already a URL
  if (media.url) return media.url; // Payload media object
  if (media.filename) return `/api/media/file/${media.filename}`; // Fallback
  return undefined;
}

// ─── Data Fetching (Payload → Fallback) ──────────────────
export async function getTeam(): Promise<TeamMember[]> {
  const docs = await fetchCollection<any>("team-members", { sort: "order" });
  if (docs.length > 0) {
    return docs.map((d: any) => ({
      name: d.name,
      role: d.role,
      bio: d.bio || undefined,
      image: resolveImageUrl(d.image),
      order: d.order,
    }));
  }
  return TEAM_FALLBACK;
}

export async function getFAQs(): Promise<FAQ[]> {
  const docs = await fetchCollection<FAQ>("faqs", { sort: "order" });
  if (docs.length > 0) return docs.map((d: any) => ({ question: d.question, answer: d.answer }));
  return FAQ_FALLBACK;
}

export async function getPartners(): Promise<{ partners: Partner[]; sponsors: Partner[] }> {
  const docs = await fetchCollection<Partner>("partners");
  const all = docs.length > 0 ? docs : PARTNERS_FALLBACK;
  return {
    partners: all.filter((p) => p.type === "partner"),
    sponsors: all.filter((p) => p.type === "sponsor"),
  };
}

export async function getPosts(): Promise<Post[]> {
  const docs = await fetchCollection<Post>("posts", { sort: "-date" });
  if (docs.length > 0) return docs.map((d: any) => ({ title: d.title, slug: d.slug, date: d.date, summary: d.summary }));
  return POSTS_FALLBACK;
}

export async function getEvents(): Promise<Event[]> {
  const docs = await fetchCollection<Event>("events", { sort: "date", where: { date: { greater_than: new Date().toISOString() } } });
  return docs.length > 0 ? docs : EVENTS_FALLBACK;
}
