import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getCommunityItemBySlug } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { localizedPath, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const item = await getCommunityItemBySlug(slug, locale);
  if (!item) return { title: locale === "de" ? "Community-Angebot nicht gefunden" : "Community item not found" };

  return pageMetadata({
    title: `${item.title} – Uccelli Society`,
    description: item.summary,
    path: `/community/${slug}`,
    locale,
    image: item.image,
  });
}

export default async function CommunityDetailPage({ params }: Params) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("community");
  const item = await getCommunityItemBySlug(slug, locale);
  if (!item) notFound();

  const canOpen = item.status === "available" && item.href;
  const external = Boolean(canOpen && item.href?.startsWith("http"));

  return (
    <>
      <Hero title={item.title.toUpperCase()} subtitle={item.summary} variant="gradient" imageSrc={item.image} />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto">
          <Link href={localizedPath("/community", locale)} className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-neutral-400 hover:text-black transition-colors mb-8">
            <ArrowLeft size={14} /> {t("back")}
          </Link>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-neutral-600">{t(`types.${item.type}`)}</span>
            <span className="rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-neutral-500">{t(`statuses.${item.status}`)}</span>
          </div>
          {item.body ? (
            <RichTextRenderer content={item.body} className="text-[16px] text-neutral-700 leading-[1.8]" />
          ) : (
            <p className="text-neutral-600 leading-relaxed">{item.summary}</p>
          )}
          <div className="mt-10 pt-8 border-t border-neutral-100">
            {canOpen ? (
              <a href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="inline-flex items-center justify-center font-bold uppercase tracking-[0.12em] rounded-[12px] px-9 py-4 text-[14px] bg-black text-white hover:bg-neutral-800 transition-colors">
                {t("open")}
              </a>
            ) : (
              <div className="rounded-[12px] bg-neutral-50 border border-neutral-100 p-6">
                <h2 className="text-lg font-bold mb-2">{t("comingSoonTitle")}</h2>
                <p className="text-neutral-600 leading-relaxed mb-5">{t("comingSoonText")}</p>
                <Button href={localizedPath("/teil-werden?interesse=volunteer", locale)}>{t("contribute")}</Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
