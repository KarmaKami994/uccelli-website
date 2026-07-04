import type { MetadataRoute } from "next";
import { getPayloadClient, DEFAULT_LOCALE } from "@/lib/payload";
import { localizedUrl } from "@/lib/seo";

// Rendered at request time (the build has no database); crawler traffic
// on /sitemap.xml is negligible.
export const dynamic = "force-dynamic";

const STATIC_ROUTES = [
  "/",
  "/ueber-uns",
  "/ueber-uns/vorstand",
  "/ueber-uns/partner",
  "/ueber-uns/faq",
  "/programm/projekte",
  "/programm/veranstaltungen",
  "/programm/kursangebote",
  "/programm/news",
  "/netzwerk",
  "/kontakt",
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

/**
 * Sitemap built from the CMS — replaces the previously committed (empty)
 * public/sitemap.xml and the next-sitemap postbuild step.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient();
  const opts = { limit: 500, locale: DEFAULT_LOCALE, depth: 0 } as const;

  const [pages, projects, posts, werte] = await Promise.all([
    payload.find({ collection: "pages", ...opts }),
    payload.find({ collection: "projects", ...opts }),
    payload.find({ collection: "posts", ...opts }),
    payload.find({ collection: "werte", ...opts }),
  ]);

  return [
    ...STATIC_ROUTES.map((p) => entry(p)),
    ...pages.docs.map((d) => entry(`/${d.slug}`, d.updatedAt)),
    ...projects.docs.map((d) => entry(`/programm/projekte/${d.slug}`, d.updatedAt)),
    ...posts.docs.map((d) => entry(`/programm/news/${d.slug}`, d.updatedAt)),
    ...werte.docs.map((d) => entry(`/werte/${d.slug}`, d.updatedAt)),
  ];
}
