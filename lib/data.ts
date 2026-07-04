import { cache } from "react";
import { fetchCollection, fetchBySlug, fetchGlobal, type Locale } from "./payload";
import type {
  Media,
  Project as ProjectDoc,
  Post as PostDoc,
  Event as EventDoc,
} from "@/payload-types";
import type { RichTextContent } from "./richtext";

// ─── View types (what the components consume) ────────────
export type TeamMember = { name: string; role: string; image?: string; bio?: RichTextContent | null };
export type FAQ = { question: string; answer: RichTextContent };
export type Partner = { name: string; type: "partner" | "sponsor"; description: RichTextContent; logo?: string; url?: string };
export type Project = { title: string; slug: string; category: ProjectDoc["category"]; summary: string; body?: RichTextContent | null; image?: string; featured?: boolean };
export type Post = { title: string; slug: string; date: string; summary: string; body?: RichTextContent | null; image?: string };
export type EventItem = { title: string; date: string; location?: string; description?: RichTextContent | null };
export type Network = { name: string; slug: string; description: RichTextContent; image?: string };
export type Wert = { title: string; slug: string; body?: RichTextContent | null };
export type Course = { name: string; description: string };
export type Page = { title: string; slug: string; body?: RichTextContent | null };
export type NavItem = { label: string; href?: string; openInNewTab?: boolean; children: { label: string; href: string }[] };

export type HomepageData = {
  hero: { title: string; subtitle?: string; ctaText?: string; ctaHref?: string; image?: string };
  about: { eyebrow?: string; title: string; text: string; ctaText?: string; ctaHref?: string };
  tasks: { title: string; cards: { title: string; text: string; buttonText?: string; buttonHref?: string; image?: string }[] };
  cta: { title: string; text?: string; buttonText?: string; buttonHref?: string };
};

// ─── Helpers ─────────────────────────────────────────────

/** Extract a usable URL from a Payload media relation. */
export function resolveImageUrl(media: number | Media | null | undefined): string | undefined {
  if (!media || typeof media === "number") return undefined;
  if (media.url) return media.url;
  if (media.filename) return `/api/media/file/${media.filename}`;
  return undefined;
}

const opt = (v: string | null | undefined): string | undefined => v ?? undefined;

// ─── Data fetching ───────────────────────────────────────
// Every getter is wrapped in React.cache() so identical calls within one
// request (e.g. generateMetadata + page component) hit the DB only once.

export const getTeam = cache(async (locale: Locale): Promise<TeamMember[]> => {
  const docs = await fetchCollection("team-members", { sort: "order", locale });
  return docs.map((d) => ({ name: d.name, role: d.role, bio: d.bio, image: resolveImageUrl(d.image) }));
});

export const getFAQs = cache(async (locale: Locale): Promise<FAQ[]> => {
  const docs = await fetchCollection("faqs", { sort: "order", locale });
  return docs.map((d) => ({ question: d.question, answer: d.answer }));
});

export const getPartners = cache(
  async (locale: Locale): Promise<{ partners: Partner[]; sponsors: Partner[] }> => {
    const docs = await fetchCollection("partners", { locale });
    const all: Partner[] = docs.map((d) => ({
      name: d.name,
      type: d.type,
      description: d.description,
      logo: resolveImageUrl(d.logo),
      url: opt(d.url),
    }));
    return {
      partners: all.filter((p) => p.type === "partner"),
      sponsors: all.filter((p) => p.type === "sponsor"),
    };
  }
);

const mapPost = (d: PostDoc): Post => ({
  title: d.title,
  slug: d.slug,
  date: d.date,
  summary: d.summary,
  body: d.body,
  image: resolveImageUrl(d.image),
});

export const getPosts = cache(async (locale: Locale): Promise<Post[]> => {
  const docs = await fetchCollection("posts", { sort: "-date", locale });
  return docs.map(mapPost);
});

export const getPostBySlug = cache(async (slug: string, locale: Locale): Promise<Post | null> => {
  const doc = await fetchBySlug("posts", slug, locale);
  return doc ? mapPost(doc) : null;
});

const mapEvent = (d: EventDoc): EventItem => ({
  title: d.title,
  date: d.date,
  location: opt(d.location),
  description: d.description,
});

/** Upcoming events, soonest first. Also feeds the AttentionBanner. */
export const getUpcomingEvents = cache(async (locale: Locale): Promise<EventItem[]> => {
  const docs = await fetchCollection("events", {
    sort: "date",
    where: { date: { greater_than: new Date().toISOString() } },
    locale,
  });
  return docs.map(mapEvent);
});

const mapProject = (d: ProjectDoc): Project => ({
  title: d.title,
  slug: d.slug,
  category: d.category,
  summary: d.summary,
  body: d.body,
  image: resolveImageUrl(d.image),
  featured: d.featured ?? false,
});

export const getProjects = cache(async (locale: Locale): Promise<Project[]> => {
  const docs = await fetchCollection("projects", { sort: "category", locale });
  return docs.map(mapProject);
});

export const getProjectBySlug = cache(async (slug: string, locale: Locale): Promise<Project | null> => {
  const doc = await fetchBySlug("projects", slug, locale);
  return doc ? mapProject(doc) : null;
});

export const getNetworks = cache(async (locale: Locale): Promise<Network[]> => {
  const docs = await fetchCollection("networks", { sort: "order", locale });
  return docs.map((d) => ({ name: d.name, slug: d.slug, description: d.description, image: resolveImageUrl(d.image) }));
});

export const getWertBySlug = cache(async (slug: string, locale: Locale): Promise<Wert | null> => {
  const doc = await fetchBySlug("werte", slug, locale);
  return doc ? { title: doc.title, slug: doc.slug, body: doc.body } : null;
});

export const getAllWerte = cache(async (locale: Locale): Promise<Wert[]> => {
  const docs = await fetchCollection("werte", { sort: "createdAt", locale });
  return docs.map((d) => ({ title: d.title, slug: d.slug, body: d.body }));
});

export const getCourses = cache(async (locale: Locale): Promise<Course[]> => {
  const docs = await fetchCollection("courses", { sort: "order", locale });
  return docs.map((d) => ({ name: d.name, description: d.description }));
});

export const getPageBySlug = cache(async (slug: string, locale: Locale): Promise<Page | null> => {
  const doc = await fetchBySlug("pages", slug, locale);
  return doc ? { title: doc.title, slug: doc.slug, body: doc.body } : null;
});

export const getNavigation = cache(async (locale: Locale): Promise<NavItem[]> => {
  const nav = await fetchGlobal("navigation", locale);
  return (nav.items ?? []).map((item) => ({
    label: item.label,
    href: opt(item.href),
    openInNewTab: item.openInNewTab ?? false,
    children: (item.children ?? []).map((c) => ({ label: c.label, href: c.href })),
  }));
});

export const getHomepage = cache(async (locale: Locale): Promise<HomepageData | null> => {
  const d = await fetchGlobal("homepage", locale);
  if (!d?.hero?.title) return null;
  return {
    hero: {
      title: d.hero.title,
      subtitle: opt(d.hero.subtitle),
      ctaText: opt(d.hero.ctaText),
      ctaHref: opt(d.hero.ctaHref),
      image: resolveImageUrl(d.hero.image),
    },
    about: {
      eyebrow: opt(d.about?.eyebrow),
      title: d.about?.title ?? "",
      text: d.about?.text ?? "",
      ctaText: opt(d.about?.ctaText),
      ctaHref: opt(d.about?.ctaHref),
    },
    tasks: {
      title: d.tasks?.title ?? "",
      cards: (d.tasks?.cards ?? []).map((c) => ({
        title: c.title,
        text: c.text,
        buttonText: opt(c.buttonText),
        buttonHref: opt(c.buttonHref),
        image: resolveImageUrl(c.image),
      })),
    },
    cta: {
      title: d.cta?.title ?? "",
      text: opt(d.cta?.text),
      buttonText: opt(d.cta?.buttonText),
      buttonHref: opt(d.cta?.buttonHref),
    },
  };
});
