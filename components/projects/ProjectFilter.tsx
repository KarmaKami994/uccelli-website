import Link from "next/link";
import type { Locale } from "@/lib/payload";
import { localizedPath } from "@/lib/seo";

const values = ["all", "sozial", "bildung", "gemeinschaft"] as const;
export type ProjectFilterValue = (typeof values)[number];

export function normalizeProjectFilter(value?: string): ProjectFilterValue {
  return values.includes(value as ProjectFilterValue) ? (value as ProjectFilterValue) : "all";
}

export function ProjectFilter({ locale, active, labels }: { locale: Locale; active: ProjectFilterValue; labels: Record<ProjectFilterValue, string> }) {
  return (
    <nav aria-label={labels.all} className="flex flex-wrap justify-center gap-2">
      {values.map((value) => {
        const href = value === "all"
          ? localizedPath("/projekte", locale)
          : `${localizedPath("/projekte", locale)}?kategorie=${value}`;
        const selected = value === active;
        return (
          <Link
            key={value}
            href={href}
            aria-current={selected ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-wide transition-colors ${selected ? "bg-black text-white border-black" : "bg-white border-neutral-200 hover:border-neutral-400"}`}
          >
            {labels[value]}
          </Link>
        );
      })}
    </nav>
  );
}
