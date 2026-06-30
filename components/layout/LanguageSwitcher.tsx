"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const locales = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();

  function getLocalePath(targetLocale: string) {
    // Remove current locale prefix and add new one
    const segments = pathname.split("/").filter(Boolean);
    if (locales.some((l) => l.code === segments[0])) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    return "/" + segments.join("/");
  }

  return (
    <div className="flex items-center gap-0.5 text-[12px] font-bold tracking-wide">
      {locales.map((locale, i) => (
        <span key={locale.code} className="flex items-center">
          {i > 0 && <span className="text-neutral-300 mx-1.5">|</span>}
          {locale.code === currentLocale ? (
            <span className="text-black">{locale.label}</span>
          ) : (
            <Link
              href={getLocalePath(locale.code)}
              className="text-neutral-400 hover:text-black transition-colors"
            >
              {locale.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
