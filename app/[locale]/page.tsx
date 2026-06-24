import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.claim")}
        ctaText={t("hero.cta")}
        ctaHref="/ueber-uns"
        variant="gradient"
      />

      {/* About Teaser */}
      <section className="py-16 lg:py-24 px-5 lg:px-8 max-w-[1400px] mx-auto">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
          {t("about.eyebrow")}
        </p>
        <h2 className="text-h2 font-bold mb-6 max-w-lg">{t("about.title")}</h2>
        <p className="text-body text-neutral-700 max-w-2xl mb-8 leading-relaxed">
          {t("about.text")}
        </p>
        <Button variant="primary" href="/ueber-uns">
          {t("about.cta")}
        </Button>
      </section>

      {/* Hauptaufgaben – 3 Cards */}
      <section className="py-16 lg:py-24 px-5 lg:px-8 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-h2 font-bold mb-10 text-center">
            {t("tasks.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              title={t("tasks.bildung.title")}
              body={t("tasks.bildung.text")}
              imageSrc="/images/placeholder-bildung.jpg"
              imageAlt="Bildung"
              buttonText={t("tasks.bildung.title")}
              buttonHref="/programm/projekte"
            />
            <Card
              title={t("tasks.soziales.title")}
              body={t("tasks.soziales.text")}
              imageSrc="/images/placeholder-soziales.jpg"
              imageAlt="Soziales"
              buttonText={t("tasks.soziales.title")}
              buttonHref="/programm/projekte"
            />
            <Card
              title={t("tasks.community.title")}
              body={t("tasks.community.text")}
              imageSrc="/images/placeholder-community.jpg"
              imageAlt="Community"
              buttonText={t("tasks.community.title")}
              buttonHref="/netzwerk"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 px-5 lg:px-8 bg-brand-black text-brand-white text-center">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-neutral-300 mb-8">{t("cta.text")}</p>
          <Button variant="secondary" href="/kontakt">
            {t("cta.button")}
          </Button>
        </div>
      </section>
    </>
  );
}
