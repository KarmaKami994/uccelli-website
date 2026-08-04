import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getFAQs, getPartners, getTeam } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: locale === "de" ? "Über uns – Uccelli Society" : "About us – Uccelli Society",
    description: locale === "de" ? "Geschichte, Mission, Werte, Team und Partnerschaften der Uccelli Society." : "The history, mission, values, team and partnerships of the Uccelli Society.",
    path: "/ueber-uns",
    locale,
  });
}

export default async function AboutPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const [team, partnerGroups, faqs] = await Promise.all([getTeam(locale), getPartners(locale), getFAQs(locale)]);
  const partners = [...partnerGroups.partners, ...partnerGroups.sponsors];
  const values = ["integrity", "freedom", "solidarity", "inclusion", "environment", "privacy"] as const;

  return (
    <>
      <Hero title={t("title")} variant="gradient" subtitle={t("subtitle")} />

      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-100 px-4 overflow-x-auto" aria-label={t("sectionNavigation")}>
        <div className="max-w-[1000px] mx-auto flex justify-start md:justify-center gap-6 py-4 whitespace-nowrap text-[11px] font-bold uppercase tracking-wide">
          <a href="#mission" className="hover:opacity-60">{t("nav.mission")}</a>
          <a href="#geschichte" className="hover:opacity-60">{t("nav.history")}</a>
          <a href="#werte" className="hover:opacity-60">{t("nav.values")}</a>
          <a href="#team" className="hover:opacity-60">{t("nav.team")}</a>
          <a href="#partner" className="hover:opacity-60">{t("nav.partners")}</a>
          <a href="#faq" className="hover:opacity-60">{t("nav.faq")}</a>
        </div>
      </nav>

      <section id="mission" className="scroll-mt-20 py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          <ScrollReveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">{t("missionEyebrow")}</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight mb-5">{t("missionTitle")}</h2>
            <p className="text-[17px] text-neutral-600 leading-[1.8]">{t("mission")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">{t("visionEyebrow")}</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight mb-5">{t("visionTitle")}</h2>
            <p className="text-[17px] text-neutral-600 leading-[1.8]">{t("vision")}</p>
          </ScrollReveal>
        </div>
      </section>

      <section id="geschichte" className="scroll-mt-20 py-20 lg:py-28 px-6 lg:px-10 bg-black text-white">
        <ScrollReveal className="max-w-[850px] mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">2015 — 2021</p>
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight mb-8">{t("historyTitle")}</h2>
          <div className="space-y-6 text-[17px] text-neutral-300 leading-[1.85]">
            <p>{t("history.p1")}</p>
            <p>{t("history.p2")}</p>
            <p>{t("history.p3")}</p>
          </div>
        </ScrollReveal>
      </section>

      <section id="werte" className="scroll-mt-20 py-20 lg:py-28 px-6 lg:px-10 bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="max-w-[760px] mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">{t("valuesEyebrow")}</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight mb-5">{t("valuesTitle")}</h2>
            <p className="text-[16px] text-neutral-600 leading-[1.8]">{t("valuesIntro")}</p>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value) => (
              <article key={value} className="rounded-[12px] bg-white border border-neutral-200 p-6">
                <h3 className="text-lg font-bold mb-3">{t(`values.${value}.title`)}</h3>
                <p className="text-[15px] text-neutral-600 leading-relaxed">{t(`values.${value}.text`)}</p>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section id="team" className="scroll-mt-20 py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="max-w-[760px] mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">{t("teamEyebrow")}</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight mb-5">{t("teamTitle")}</h2>
            <p className="text-[16px] text-neutral-600 leading-[1.8]">{t("teamIntro")}</p>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <article key={member.name} className="rounded-[12px] border border-neutral-200 overflow-hidden bg-white">
                {member.image ? (
                  <div className="relative aspect-square bg-neutral-100"><Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 280px" /></div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-4xl font-bold text-neutral-300" aria-hidden="true">{member.name.charAt(0)}</div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-[12px] font-bold uppercase tracking-wide text-neutral-400 mt-1 mb-4">{member.role}</p>
                  {member.bio && <RichTextRenderer content={member.bio} className="text-[14px] text-neutral-600 leading-relaxed" />}
                </div>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section id="partner" className="scroll-mt-20 py-20 lg:py-28 px-6 lg:px-10 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="max-w-[760px] mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">{t("partnersEyebrow")}</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight mb-5">{t("partnersTitle")}</h2>
            <p className="text-[16px] text-neutral-600 leading-[1.8]">{t("partnersIntro")}</p>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {partners.map((partner) => (
              <article key={partner.name} className="rounded-[12px] bg-white border border-neutral-200 p-6 flex flex-col">
                <div className="h-16 flex items-center mb-5">
                  {partner.logo ? <Image src={partner.logo} alt={partner.name} width={180} height={64} className="max-h-14 w-auto object-contain" /> : <span className="text-xl font-bold">{partner.name}</span>}
                </div>
                {partner.logo && <h3 className="font-bold text-lg mb-3">{partner.name}</h3>}
                <RichTextRenderer content={partner.description} className="text-[14px] text-neutral-600 leading-relaxed flex-1" />
                {partner.url && <a href={partner.url} target="_blank" rel="noopener noreferrer" className="mt-5 text-[12px] font-bold uppercase tracking-wide hover:opacity-60">{t("visitPartner")} →</a>}
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[850px] mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">FAQ</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight">{t("faqTitle")}</h2>
          </ScrollReveal>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-5 font-bold text-lg">
                  {faq.question}<span className="text-neutral-400 group-open:rotate-45 transition-transform" aria-hidden="true">＋</span>
                </summary>
                <div className="pt-4 pr-10"><RichTextRenderer content={faq.answer} className="text-[15px] text-neutral-600 leading-[1.8]" /></div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
