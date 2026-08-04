import type { Metadata } from "next";
import type { Locale } from "./payload";

export const SITE_URL = process.env.SITE_URL || "https://uccelli.qrwed.uk";

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "de") return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function localizedUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${localizedPath(path, locale)}`;
}

interface PageMetadataInput {
  title: string;
  description?: string;
  path: string;
  locale: Locale;
  image?: string;
  type?: "website" | "article";
}

export function pageMetadata({ title, description, path, locale, image, type = "website" }: PageMetadataInput): Metadata {
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
    openGraph: {
      title,
      description,
      type,
      url: localizedUrl(path, locale),
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}
