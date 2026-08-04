import { cache } from "react";
import { fetchCollection, fetchBySlug, fetchGlobal, type Locale } from "./payload";
import type {
  Media,
  Project as ProjectDoc,
  Post as PostDoc,
  CommunityItem as CommunityItemDoc,
  Event as EventDoc,
} from "@/payload-types";
import type { RichTextContent } from "./richtext";

export type TeamMember = { name: string; role: string; image?: string; bio?: RichTextContent | null };
export type FAQ = { question: string; answer: RichTextContent };
export type Partner = { name: string; type: "partner" | "sponsor"; description: RichTextContent; logo?: string; url?: string };
export type Project = { title: string; slug: string; category: ProjectDoc["category"]; summary: string; body?: RichTextContent | null; image?: string; featured?: boolean };
export type Post = { title: string; slug: string; date: string; summary: string; body?: RichTextContent | null; image?: string };
export type CommunityItem = {
  title: string;
  slug: string;
  type: CommunityItemDoc["type"];
  status: CommunityItemDoc["status"];
  summary: string;
  body?: RichTextContent | null;
  image?: string;
  href?: string;
  featured?: boolean;
  order: number;
};
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

export function resolveImageUrl(media: number | Media | null | undefined): string | undefined {
  if (!media || typeof media === "number") return undefined;
  if (media.url) return media.url;
  if (media.filename) return `/api/media/file/${media.filename}`;
  return undefined;
}

const opt = (value: string | null | undefined): string | undefined => value ?? undefined;

export const getTeam = cache(async (locale: Locale): Promise<TeamMember[]> => {
  const docs = await fetchCollection("team-members", { sort: "order", locale });
  return docs.map((doc) => ({ name: doc.name, role: doc.role, bio: doc.bio, image: resolveImageUrl(doc.image) }));
});

export const getFAQs = cache(async (locale: Locale): Promise<FAQ[]> => {
  const docs = await fetchCollection("faqs", { sort: "order", locale });
  return docs.map((doc) => ({ question: doc.question, answer: doc.answer }));
});

export const getPartners = cache(async (locale: Locale): Promise<{ partners: Partner[]; sponsors: Partner[] }> => {
  const docs = await fetchCollection("partners", { locale });
  const all: Partner[] = docs.map((doc) => ({
    name: doc.name,
    type: doc.type,
    description: doc.description,
    logo: resolveImageUrl(doc.logo),
    url: opt(doc.url),
  }));
  return {
    partners: all.filter((partner) => partner.type === "partner"),
    sponsors: all.filter((partner) => partner.type === "sponsor"),
  };
});

const mapPost = (doc: PostDoc): Post => ({
  title: doc.title,
  slug: doc.slug,
  date: doc.date,
  summary: doc.summary,
  body: doc.body,
  image: resolveImageUrl(doc.image),
});

export const getPosts = cache(async (locale: Locale): Promise<Post[]> => {
  const docs = await fetchCollection("posts", { sort: "-date", locale });
  return docs.map(mapPost);
});

export const getPostBySlug = cache(async (slug: string, locale: Locale): Promise<Post | null> => {
  const doc = await fetchBySlug("posts", slug, locale);
  return doc ? mapPost(doc) : null;
});

const mapCommunityItem = (doc: CommunityItemDoc): CommunityItem => ({
  title: doc.title,
  slug: doc.slug,
  type: doc.type,
  status: doc.status,
  summary: doc.summary,
  body: doc.body,
  image: resolveImageUrl(doc.image),
  href: opt(doc.href),
  featured: doc.featured ?? false,
  order: doc.order ?? 0,
});

export const getCommunityItems = cache(async (locale: Locale): Promise<CommunityItem[]> => {
  const docs = await fetchCollection("community-items", { sort: "order", locale });
  return docs.map(mapCommunityItem);
});

export const getCommunityItemBySlug = cache(async (slug: string, locale: Locale): Promise<CommunityItem | null> => {
  const doc = await fetchBySlug("community-items", slug, locale);
  return doc ? mapCommunityItem(doc) : null;
});

const mapEvent = (doc: EventDoc): EventItem => ({
  title: doc.title,
  date: doc.date,
  location: opt(doc.location),
  description: doc.description,
});

export const getUpcomingEvents = cache(async (locale: Locale): Promise<EventItem[]> => {
  const docs = await fetchCollection("events", {
    sort: "date",
    where: { date: { greater_than: new Date().toISOString() } },
    locale,
  });
  return docs.map(mapEvent);
});

const mapProject = (doc: ProjectDoc): Project => ({
  title: doc.title,
  slug: doc.slug,
  category: doc.category,
  summary: doc.summary,
  body: doc.body,
  image: resolveImageUrl(doc.image),
  featured: doc.featured ?? false,
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
  return docs.map((doc) => ({ name: doc.name, slug: doc.slug, description: doc.description, image: resolveImageUrl(doc.image) }));
});

export const getWertBySlug = cache(async (slug: string, locale: Locale): Promise<Wert | null> => {
  const doc = await fetchBySlug("werte", slug, locale);
  return doc ? { title: doc.title, slug: doc.slug, body: doc.body } : null;
});

export const getAllWerte = cache(async (locale: Locale): Promise<Wert[]> => {
  const docs = await fetchCollection("werte", { sort: "createdAt", locale });
  return docs.map((doc) => ({ title: doc.title, slug: doc.slug, body: doc.body }));
});

export const getCourses = cache(async (locale: Locale): Promise<Course[]> => {
  const docs = await fetchCollection("courses", { sort: "order", locale });
  return docs.map((doc) => ({ name: doc.name, description: doc.description }));
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
    children: (item.children ?? []).map((child) => ({ label: child.label, href: child.href })),
  }));
});

export const getHomepage = cache(async (locale: Locale): Promise<HomepageData | null> => {
  const doc = await fetchGlobal("homepage", locale);
  if (!doc?.hero?.title) return null;
  return {
    hero: {
      title: doc.hero.title,
      subtitle: opt(doc.hero.subtitle),
      ctaText: opt(doc.hero.ctaText),
      ctaHref: opt(doc.hero.ctaHref),
      image: resolveImageUrl(doc.hero.image),
    },
    about: {
      eyebrow: opt(doc.about?.eyebrow),
      title: doc.about?.title ?? "",
      text: doc.about?.text ?? "",
      ctaText: opt(doc.about?.ctaText),
      ctaHref: opt(doc.about?.ctaHref),
    },
    tasks: {
      title: doc.tasks?.title ?? "",
      cards: (doc.tasks?.cards ?? []).map((card) => ({
        title: card.title,
        text: card.text,
        buttonText: opt(card.buttonText),
        buttonHref: opt(card.buttonHref),
        image: resolveImageUrl(card.image),
      })),
    },
    cta: {
      title: doc.cta?.title ?? "",
      text: opt(doc.cta?.text),
      buttonText: opt(doc.cta?.buttonText),
      buttonHref: opt(doc.cta?.buttonHref),
    },
  };
});
