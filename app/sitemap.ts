import type { MetadataRoute } from "next";
import { getPayloadClient, DEFAULT_LOCALE } from "@/lib/payload";
import { localizedUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const STATIC_ROUTES = [
  "/",
  "/projekte",
  "/community",
  "/news",
  "/ueber-uns",
  "/teil-werden",
  "/kontakt",
  "/datenschutz",
  "/impressum",
];

function entry(path: string, lastModified?: string): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(path, "de"),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    alternates: {
      languages: {
        de: localizedUrl(path, "de"),
        en: localizedUrl(path, "en"),
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient();
  const options = { limit: 500, locale: DEFAULT_LOCALE, depth: 0 } as const;

  const [projects, posts, communityItems] = await Promise.all([
    payload.find({ collection: "projects", ...options }),
    payload.find({ collection: "posts", ...options }),
    payload.find({ collection: "community-items", ...options }),
  ]);

  return [
    ...STATIC_ROUTES.map((path) => entry(path)),
    ...projects.docs.map((document) => entry(`/projekte/${document.slug}`, document.updatedAt)),
    ...posts.docs.map((document) => entry(`/news/${document.slug}`, document.updatedAt)),
    ...communityItems.docs.map((document) => entry(`/community/${document.slug}`, document.updatedAt)),
  ];
}
