import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Uccelli Society – Gemeinschaft. Integrität. Generativität.",
  description: "Verein Uccelli: Ein Netzwerk für Bildung, sozialen Austausch und persönliche Entwicklung in Zürich.",
  openGraph: { title: "Uccelli Society", description: "Gemeinschaft. Integrität. Generativität.", type: "website" },
};

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.claim")}
        ctaText={t("hero.cta")}
        ctaHref="/ueber-uns"
        variant="gradient"
      />

      <section className="py-20 lg:py-32 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4 font-bold">
            {t("about.eyebrow")}
          </p>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-6 max-w-lg leading-tight">
            {t("about.title")}
          </h2>
          <p className="text-[16px] text-neutral-600 max-w-2xl mb-10 leading-[1.75]">
            {t("about.text")}
          </p>
          <Button variant="primary" href="/ueber-uns">
            {t("about.cta")}
          </Button>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="h-px bg-neutral-100" />
      </div>

      <section className="py-20 lg:py-32 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-14 text-center">
            {t("tasks.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card title={t("tasks.bildung.title")} body={t("tasks.bildung.text")} buttonText={t("tasks.bildung.title")} buttonHref="/programm/projekte" />
            <Card title={t("tasks.soziales.title")} body={t("tasks.soziales.text")} buttonText={t("tasks.soziales.title")} buttonHref="/programm/projekte" />
            <Card title={t("tasks.community.title")} body={t("tasks.community.text")} buttonText={t("tasks.community.title")} buttonHref="/netzwerk" />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-36 px-6 lg:px-10 bg-black text-white text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold mb-5 leading-tight">
            {t("cta.title")}
          </h2>
          <p className="text-[17px] text-neutral-400 mb-10 leading-relaxed">
            {t("cta.text")}
          </p>
          <Button variant="secondary" size="lg" href="/kontakt">
            {t("cta.button")}
          </Button>
        </div>
      </section>
    </>
  );
}
