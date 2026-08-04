import type { CommunityItem } from "@/lib/data";
import type { Locale } from "@/lib/payload";

export function getCvCreatorFallback(locale: Locale): CommunityItem {
  return {
    title: "CV Creator",
    slug: "cv-creator",
    type: "tool",
    status: "available",
    summary:
      locale === "de"
        ? "Erstelle, speichere und exportiere einen professionellen Lebenslauf direkt im Browser."
        : "Create, save and export a professional CV directly in your browser.",
    href: "/community/cv-creator",
    featured: true,
    order: 1,
  };
}

export function ensureCvCreator(items: CommunityItem[], locale: Locale): CommunityItem[] {
  if (items.some((item) => item.slug === "cv-creator")) return items;

  return [...items, getCvCreatorFallback(locale)].sort((a, b) => a.order - b.order);
}
