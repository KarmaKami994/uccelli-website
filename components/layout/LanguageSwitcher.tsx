"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const locales = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
] as const;

export function LanguageSwitcher({ currentLocale }: { currentLocale?: string } = {}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const detectedLocale = locales.some((locale) => locale.code === segments[0]) ? segments[0] : "de";
  const activeLocale = currentLocale || detectedLocale;

  function getLocalePath(targetLocale: "de" | "en") {
    const cleanSegments = pathname.split("/").filter(Boolean);
    if (locales.some((locale) => locale.code === cleanSegments[0])) cleanSegments.shift();

    const suffix = cleanSegments.length > 0 ? `/${cleanSegments.join("/")}` : "";
    return targetLocale === "de" ? suffix || "/" : `/en${suffix}`;
  }

  return (
    <div className="flex items-center gap-0.5 text-[12px] font-bold tracking-wide" aria-label="Language selection">
      {locales.map((locale, index) => (
        <span key={locale.code} className="flex items-center">
          {index > 0 && <span className="text-neutral-300 mx-1.5" aria-hidden="true">|</span>}
          {locale.code === activeLocale ? (
            <span className="text-black" aria-current="true">{locale.label}</span>
          ) : (
            <Link href={getLocalePath(locale.code)} className="text-neutral-400 hover:text-black transition-colors">
              {locale.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
