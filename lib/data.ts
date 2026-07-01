import { fetchCollection, fetchBySlug } from "./payload";

// ─── Types ───────────────────────────────────────────────
export type TeamMember = { name: string; role: string; image?: string; bio?: any; order?: number };
export type FAQ = { question: string; answer: string; order?: number };
export type Partner = { name: string; type: "partner" | "sponsor"; description: string; logo?: string; url?: string };
export type Project = { title: string; slug: string; category: string; summary: string; body?: any; image?: string; featured?: boolean };
export type Post = { title: string; slug: string; date: string; summary: string; body?: any; image?: string };
export type Event = { title: string; date: string; location?: string; description?: string };
export type Network = { name: string; slug: string; description: any; image?: string; order?: number };
export type Wert = { title: string; slug: string; body: any };
export type Course = { name: string; description: string; order?: number };
export type Page = { title: string; slug: string; body: any };
export type NavItem = { label: string; href?: string; order: number; openInNewTab?: boolean; children: { label: string; href: string }[] };

export type HomepageData = {
  hero: { title: string; subtitle?: string; ctaText?: string; ctaHref?: string; image?: string };
  about: { eyebrow?: string; title: string; text: string; ctaText?: string; ctaHref?: string };
  tasks: { title: string; cards: { title: string; text: string; buttonText?: string; buttonHref?: string; image?: string }[] };
  cta: { title: string; text?: string; buttonText?: string; buttonHref?: string };
};

// Helper: Extract image URL from Payload media relation
function resolveImageUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (typeof media === "string") return media;
  if (media.url) return media.url;
  if (media.filename) return `/api/media/file/${media.filename}`;
  return undefined;
}

// ─── Data Fetching ───────────────────────────────────────

export async function getTeam(): Promise<TeamMember[]> {
  const docs = await fetchCollection<any>("team-members", { sort: "order" });
  return docs.map((d: any) => ({
    name: d.name, role: d.role, bio: d.bio || undefined, image: resolveImageUrl(d.image), order: d.order,
  }));
}

export async function getFAQs(): Promise<FAQ[]> {
  const docs = await fetchCollection<any>("faqs", { sort: "order" });
  return docs.map((d: any) => ({ question: d.question, answer: d.answer }));
}

export async function getPartners(): Promise<{ partners: Partner[]; sponsors: Partner[] }> {
  const docs = await fetchCollection<any>("partners");
  const all = docs.map((d: any) => ({
    name: d.name, type: d.type, description: d.description, logo: resolveImageUrl(d.logo), url: d.url,
  }));
  return { partners: all.filter((p) => p.type === "partner"), sponsors: all.filter((p) => p.type === "sponsor") };
}

export async function getPosts(): Promise<Post[]> {
  const docs = await fetchCollection<any>("posts", { sort: "-date" });
  return docs.map((d: any) => ({ title: d.title, slug: d.slug, date: d.date, summary: d.summary, body: d.body, image: resolveImageUrl(d.image) }));
}

export async function getEvents(): Promise<Event[]> {
  const docs = await fetchCollection<any>("events", { sort: "date", where: { date: { greater_than: new Date().toISOString() } } });
  return docs.map((d: any) => ({ title: d.title, date: d.date, location: d.location, description: d.description }));
}

export async function getProjects(): Promise<Project[]> {
  const docs = await fetchCollection<any>("projects", { sort: "category" });
  return docs.map((d: any) => ({
    title: d.title, slug: d.slug, category: d.category, summary: d.summary, body: d.body, image: resolveImageUrl(d.image), featured: d.featured,
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const doc = await fetchBySlug<any>("projects", slug);
  if (!doc) return null;
  return { title: doc.title, slug: doc.slug, category: doc.category, summary: doc.summary, body: doc.body, image: resolveImageUrl(doc.image), featured: doc.featured };
}

export async function getNetworks(): Promise<Network[]> {
  const docs = await fetchCollection<any>("networks", { sort: "order" });
  return docs.map((d: any) => ({ name: d.name, slug: d.slug, description: d.description, image: resolveImageUrl(d.image), order: d.order }));
}

export async function getWertBySlug(slug: string): Promise<Wert | null> {
  const doc = await fetchBySlug<any>("werte", slug);
  if (!doc) return null;
  return { title: doc.title, slug: doc.slug, body: doc.body };
}

export async function getAllWerte(): Promise<Wert[]> {
  const docs = await fetchCollection<any>("werte");
  return docs.map((d: any) => ({ title: d.title, slug: d.slug, body: d.body }));
}

export async function getCourses(): Promise<Course[]> {
  const docs = await fetchCollection<any>("courses", { sort: "order" });
  return docs.map((d: any) => ({ name: d.name, description: d.description, order: d.order }));
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const doc = await fetchBySlug<any>("pages", slug);
  if (!doc) return null;
  return { title: doc.title, slug: doc.slug, body: doc.body };
}

export async function getNavigation(): Promise<NavItem[]> {
  const docs = await fetchCollection<any>("navigation", { sort: "order" });
  return docs.map((d: any) => ({
    label: d.label,
    href: d.href || undefined,
    order: d.order || 0,
    openInNewTab: d.openInNewTab || false,
    children: (d.children || []).map((c: any) => ({ label: c.label, href: c.href })),
  }));
}

export async function getBannerEvents(): Promise<{ title: string; date: string }[]> {
  const docs = await fetchCollection<any>("events", { sort: "date", where: { date: { greater_than: new Date().toISOString() } } });
  return docs.map((d: any) => ({ title: d.title, date: d.date }));
}

export async function getHomepage(): Promise<HomepageData | null> {
  const docs = await fetchCollection<any>("homepage", { limit: 1 });
  const d = docs[0];
  if (!d) return null;
  return {
    hero: { title: d.hero?.title || "", subtitle: d.hero?.subtitle, ctaText: d.hero?.ctaText, ctaHref: d.hero?.ctaHref, image: resolveImageUrl(d.hero?.image) },
    about: { eyebrow: d.about?.eyebrow, title: d.about?.title || "", text: d.about?.text || "", ctaText: d.about?.ctaText, ctaHref: d.about?.ctaHref },
    tasks: { title: d.tasks?.title || "", cards: (d.tasks?.cards || []).map((c: any) => ({ title: c.title, text: c.text, buttonText: c.buttonText, buttonHref: c.buttonHref, image: resolveImageUrl(c.image) })) },
    cta: { title: d.cta?.title || "", text: d.cta?.text, buttonText: d.cta?.buttonText, buttonHref: d.cta?.buttonHref },
  };
}