import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export const metadata: Metadata = { title: "Projekte – Uccelli Society", description: "Sozialprojekte, Bildungsprojekte und Gemeinschaftsprojekte." };

const sozial = [{ title: "Kleidersammelaktion", body: "Sammlung und Verteilung von Kleidung an Bedürftige in Zürich.", slug: "kleidersammelaktion" }, { title: "Meet & Greet", body: "Regelmässige Treffen zum Austausch innerhalb der Community.", slug: "meet-and-greet" }];
const bildung = [{ title: "LifeLab", body: "Lebenspraktische Kompetenzen für Jugendliche.", slug: "lifelab" }, { title: "Steuern & Versicherungs Schulung", body: "Workshops zu Steuern und Finanzplanung.", slug: "steuern-versicherung" }];
const gemeinschaft = [{ title: "Nightshift Music", body: "Konzertreihe für aufstrebende Artists.", slug: "nightshift-music" }, { title: "Uccelli Liga", body: "Fussballturniere und sportliche Events.", slug: "uccelli-liga" }];

export default function ProjektePage() {
  const t = useTranslations("projekte");
  return (
    <>
      <Hero title="PROJEKTE" variant="gradient" subtitle={t("subtitle")} />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <ScrollReveal className="max-w-[900px] mx-auto text-center"><p className="text-[16px] text-neutral-600 leading-[1.8] max-w-2xl mx-auto">{t("intro")}</p></ScrollReveal>
      </section>
      {[{ label: t("sozial"), items: sozial, bg: "" }, { label: t("bildung"), items: bildung, bg: "bg-brand-accent text-white" }, { label: t("gemeinschaft"), items: gemeinschaft, bg: "" }].map((section) => (
        <section key={section.label} className={`py-16 lg:py-24 px-6 lg:px-10 ${section.bg}`}>
          <div className="max-w-[1000px] mx-auto">
            <h2 className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-8 ${section.bg ? "text-white/60" : "text-neutral-400"}`}>{section.label}</h2>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((p) => <Card key={p.slug} title={p.title} body={p.body} buttonText={t("moreInfo")} buttonHref={`/programm/projekte/${p.slug}`} />)}
            </StaggerReveal>
          </div>
        </section>
      ))}
    </>
  );
}
