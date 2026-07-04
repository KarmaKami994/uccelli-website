import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPageBySlug, getAllWerte } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "Über uns – Uccelli Society",
    description: "Geschichte, Mission und Vision des Vereins Uccelli.",
    path: "/ueber-uns",
    locale,
  });
}

export default async function UeberUnsPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const [page, werte] = await Promise.all([getPageBySlug("ueber-uns", locale), getAllWerte(locale)]);

  return (
    <>
      <Hero title="ÜBER UNS" variant="gradient" subtitle={t("subtitle")} />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <ScrollReveal className="max-w-[800px] mx-auto text-[16px] text-neutral-700 leading-[1.8]">
          {page?.body ? <RichTextRenderer content={page.body} /> : <p>Inhalt wird geladen...</p>}
        </ScrollReveal>
      </section>
      {werte.length > 0 && (
        <section className="py-16 lg:py-24 px-6 lg:px-10 bg-neutral-50">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">{t("pillars")}</h2>
            <StaggerReveal className="space-y-3" stagger={0.08}>
              {werte.map((item, i) => (
                <Link key={item.slug} href={`/werte/${item.slug}`}
                  className={`flex items-center justify-between p-6 rounded-[12px] transition-all duration-200 hover:shadow-md ${i % 2 === 0 ? "bg-black text-white hover:bg-neutral-800" : "bg-white hover:bg-neutral-100"}`}>
                  <span className="text-lg font-medium">{item.title}</span>
                  <span className="text-[13px] font-bold uppercase tracking-wide opacity-60">{t("moreInfo")}</span>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}
    </>
  );
}
