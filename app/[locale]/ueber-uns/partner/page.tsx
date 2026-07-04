import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPartners } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "Partner & Sponsoren – Uccelli Society",
    description: "Unsere Partner und Sponsoren.",
    path: "/ueber-uns/partner",
    locale,
  });
}

export default async function PartnerPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("partner");
  const { partners, sponsors } = await getPartners(locale);

  return (
    <>
      <Hero title="PARTNER & SPONSOREN" variant="cutout" />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <ScrollReveal className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-5">{t("intro.title")}</h2>
          <p className="text-neutral-600 leading-relaxed max-w-xl mx-auto">{t("intro.text")}</p>
        </ScrollReveal>
      </section>
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-neutral-50">
        <div className="max-w-[900px] mx-auto">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">{t("partnerLabel")}</h3>
          <StaggerReveal className="space-y-6">
            {partners.map((p) => (
              <div key={p.name} className="bg-white p-8 rounded-[12px] border border-neutral-200">
                <h4 className="text-lg font-bold mb-3">{p.name}</h4>
                <RichTextRenderer content={p.description} className="text-[15px] text-neutral-600 leading-relaxed mb-5" />
                {p.url && <Button variant="primary" href={p.url}>{t("toPartner")}</Button>}
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-black text-white">
        <div className="max-w-[900px] mx-auto">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-8">{t("sponsorLabel")}</h3>
          <StaggerReveal className="space-y-6">
            {sponsors.map((s) => (
              <div key={s.name} className="bg-neutral-900 p-8 rounded-[12px] border border-neutral-800">
                <h4 className="text-lg font-bold mb-3">{s.name}</h4>
                <RichTextRenderer content={s.description} className="text-[15px] text-neutral-400 leading-relaxed mb-5" />
                {s.url && <Button variant="secondary" href={s.url}>{t("toSponsor")}</Button>}
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
