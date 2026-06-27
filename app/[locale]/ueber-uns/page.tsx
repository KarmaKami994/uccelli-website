import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export const metadata: Metadata = { title: "Über uns – Uccelli Society", description: "Erfahre mehr über den Verein Uccelli: Geschichte, Mission, Vision und unsere Säulen." };

const saeulen = [
  { key: "schutz-der-umwelt", title: "Schutz der Umwelt" }, { key: "datenschutz", title: "Datenschutz" },
  { key: "diskriminierungsverbot", title: "Diskriminierungsverbot" }, { key: "freiheit-und-autonomie", title: "Freiheit und Autonomie" },
  { key: "solidaritaet-und-kohaesion", title: "Solidarität und Kohäsion" }, { key: "integritaet", title: "Integrität" },
];

export default function UeberUnsPage() {
  const t = useTranslations("about");
  return (
    <>
      <Hero title="ÜBER UNS" variant="cutout" />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <ScrollReveal className="max-w-[900px] mx-auto">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-8">{t("history.title")}</h2>
          <div className="space-y-5 text-[16px] text-neutral-700 leading-[1.8]">
            <p>{t("history.p1")}</p><p>{t("history.p2")}</p><p>{t("history.p3")}</p>
          </div>
        </ScrollReveal>
      </section>
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-neutral-50">
        <StaggerReveal className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-10" stagger={0.2}>
          <div className="p-8 bg-black text-white rounded-[12px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">Mission</p>
            <p className="text-[15px] leading-relaxed">{t("mission")}</p>
          </div>
          <div className="p-8 bg-black text-white rounded-[12px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">Vision</p>
            <p className="text-[15px] leading-relaxed">{t("vision")}</p>
          </div>
        </StaggerReveal>
      </section>
      <section className="py-20 lg:py-28 px-6 lg:px-10 text-center">
        <ScrollReveal className="max-w-[600px] mx-auto">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-5">{t("team.title")}</h2>
          <p className="text-neutral-600 mb-10 leading-relaxed">{t("team.text")}</p>
          <Button variant="primary" href="/ueber-uns/vorstand">{t("team.cta")}</Button>
        </ScrollReveal>
      </section>
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal><h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-12 text-center">{t("pillars")}</h2></ScrollReveal>
          <StaggerReveal className="space-y-4" stagger={0.08}>
            {saeulen.map((item, i) => (
              <a key={item.key} href={`/werte/${item.key}`}
                className={`flex items-center justify-between p-6 rounded-[12px] transition-all duration-200 hover:shadow-md ${i % 2 === 0 ? "bg-black text-white hover:bg-neutral-800" : "bg-neutral-50 hover:bg-neutral-100"}`}>
                <span className="text-lg font-medium">{item.title}</span>
                <span className="text-[13px] font-bold uppercase tracking-wide opacity-60">{t("moreInfo")}</span>
              </a>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
