import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { CommunityCard } from "@/components/community/CommunityCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { ensureCvCreator } from "@/lib/cv-creator";
import { getCommunityItems } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { localizedPath, pageMetadata } from "@/lib/seo";

type Filter = "all" | "tool" | "game" | "resource";
const filterValues: Filter[] = ["all", "tool", "game", "resource"];

type Params = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ typ?: string | string[] }>;
};

export async function generateMetadata({ params }: Pick<Params, "params">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "Community Hub – Uccelli Society",
    description:
      locale === "de"
        ? "Digitale Tools, Spiele und Ressourcen für die Uccelli Community."
        : "Digital tools, games and resources for the Uccelli community.",
    path: "/community",
    locale,
  });
}

export default async function CommunityPage({ params, searchParams }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("community");
  const items = ensureCvCreator(await getCommunityItems(locale), locale);
  const rawType = (await searchParams).typ;
  const requested = Array.isArray(rawType) ? rawType[0] : rawType;
  const active: Filter = filterValues.includes(requested as Filter) ? (requested as Filter) : "all";
  const visibleItems = active === "all" ? items : items.filter((item) => item.type === active);

  return (
    <>
      <Hero title={t("title")} variant="gradient" subtitle={t("subtitle")} />
      <section className="py-14 lg:py-20 px-6 lg:px-10 border-b border-neutral-100">
        <ScrollReveal className="max-w-[820px] mx-auto text-center">
          <p className="text-[16px] text-neutral-600 leading-[1.8] mb-9">{t("intro")}</p>
          <nav aria-label={t("filters.all")} className="flex flex-wrap justify-center gap-2">
            {filterValues.map((value) => {
              const href = value === "all" ? localizedPath("/community", locale) : `${localizedPath("/community", locale)}?typ=${value}`;
              const selected = value === active;
              return (
                <Link
                  key={value}
                  href={href}
                  aria-current={selected ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-wide transition-colors ${
                    selected ? "bg-black text-white border-black" : "bg-white border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {t(`filters.${value}`)}
                </Link>
              );
            })}
          </nav>
        </ScrollReveal>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          {visibleItems.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleItems.map((item) => (
                <CommunityCard
                  key={item.slug}
                  item={item}
                  locale={locale}
                  labels={{
                    type: t(`types.${item.type}`),
                    status: t(`statuses.${item.status}`),
                    open: t("open"),
                    details: t("details"),
                  }}
                />
              ))}
            </StaggerReveal>
          ) : (
            <p className="text-center text-neutral-500">{t("empty")}</p>
          )}
        </div>
      </section>
    </>
  );
}
