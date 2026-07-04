import type { Metadata } from "next";
import type { Locale } from "./payload";

export const SITE_URL = process.env.SITE_URL || "https://uccelli-society.ch";

/** Public URL for a path in a given locale (DE has no prefix — localePrefix "as-needed"). */
export function localizedUrl(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path;
  return locale === "de" ? `${SITE_URL}${clean || "/"}` : `${SITE_URL}/en${clean}`;
}

interface PageMetadataInput {
  title: string;
  description?: string;
  path: string;
  locale: Locale;
}

/** Metadata with canonical + hreflang alternates for every page. */
export function pageMetadata({ title, description, path, locale }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localizedUrl(path, locale),
      languages: {
        de: localizedUrl(path, "de"),
        en: localizedUrl(path, "en"),
        "x-default": localizedUrl(path, "de"),
      },
    },
    openGraph: description ? { title, description, type: "website" } : undefined,
  };
}
