import type { Locale } from "./payload";

const DATE_LOCALES: Record<Locale, string> = { de: "de-CH", en: "en-GB" };

/** "15. August 2026" / "15 August 2026" — shared by AttentionBanner and the events page. */
export function formatEventDate(date: string | Date, locale: Locale = "de"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString(DATE_LOCALES[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
