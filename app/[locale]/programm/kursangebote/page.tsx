import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export const metadata: Metadata = { title: "Kursangebote – Uccelli Society", description: "Kurse zu Psychologie, Sport, Finanzen und IT." };

const categories = [
  { name: "KURSE ZU PSYCHOLOGIE", desc: "Laufbahnberatung, Motivation, Persönlichkeit und psychische Gesundheit." },
  { name: "KURSE ZU SPORT", desc: "Fitness, Ernährung und Wohlbefinden." },
  { name: "KURSE ZU FINANZEN", desc: "Steuern, Versicherungen, Budgetplanung." },
  { name: "KURSE ZU IT & BUSINESS", desc: "Webentwicklung, Business-Aufbau, digitale Kompetenzen." },
];

export default function KursangebotePage() {
  const t = useTranslations("kursangebote");
  return (
    <>
      <Hero title="KURS ANGEBOTE" variant="cutout" />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <ScrollReveal className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-5">{t("subtitle")}</h2>
          <p className="text-neutral-600 leading-relaxed">{t("intro")}</p>
        </ScrollReveal>
      </section>
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-black text-white">
        <StaggerReveal className="max-w-[600px] mx-auto space-y-5" stagger={0.1}>
          {categories.map((c) => (
            <div key={c.name} className="border border-neutral-700 rounded-[12px] p-6 hover:border-neutral-500 transition-colors">
              <h3 className="font-bold text-[15px] uppercase tracking-wide mb-2">{c.name}</h3>
              <p className="text-[14px] text-neutral-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </StaggerReveal>
      </section>
    </>
  );
}
