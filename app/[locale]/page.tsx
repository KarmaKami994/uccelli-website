import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { SponsorBanner } from "@/components/sections/SponsorBanner";
import { getHomepage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Uccelli Society – Gemeinschaft. Integrität. Generativität.",
  description: "Verein Uccelli: Ein Netzwerk für Bildung, sozialen Austausch und persönliche Entwicklung in Zürich.",
  openGraph: { title: "Uccelli Society", description: "Gemeinschaft. Integrität. Generativität.", type: "website" },
};

export default async function HomePage() {
  const data = await getHomepage();
  if (!data) return <p className="py-20 text-center text-neutral-400">Homepage-Inhalt wird geladen... Bitte Payload befüllen.</p>;

  return (
    <>
      <Hero
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        ctaText={data.hero.ctaText}
        ctaHref={data.hero.ctaHref}
        variant="gradient"
        imageSrc={data.hero.image}
      />

      {/* About Teaser */}
      <section className="py-20 lg:py-32 px-6 lg:px-10">
        <ScrollReveal className="max-w-[1200px] mx-auto">
          {data.about.eyebrow && (
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4 font-bold">
              {data.about.eyebrow}
            </p>
          )}
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-6 max-w-lg leading-tight">
            {data.about.title}
          </h2>
          <p className="text-[16px] text-neutral-600 max-w-2xl mb-10 leading-[1.75]">
            {data.about.text}
          </p>
          {data.about.ctaText && data.about.ctaHref && (
            <Button variant="primary" href={data.about.ctaHref}>{data.about.ctaText}</Button>
          )}
        </ScrollReveal>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10"><div className="h-px bg-neutral-100" /></div>

      {/* Hauptaufgaben */}
      {data.tasks.cards.length > 0 && (
        <section className="py-20 lg:py-32 px-6 lg:px-10">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-14 text-center">{data.tasks.title}</h2>
            </ScrollReveal>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" stagger={0.15}>
              {data.tasks.cards.map((card) => (
                <Card key={card.title} title={card.title} body={card.text} buttonText={card.buttonText} buttonHref={card.buttonHref} imageSrc={card.image} />
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      <SponsorBanner />

      {/* CTA */}
      <section className="py-24 lg:py-36 px-6 lg:px-10 bg-black text-white text-center">
        <ScrollReveal className="max-w-[600px] mx-auto">
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold mb-5 leading-tight">{data.cta.title}</h2>
          {data.cta.text && <p className="text-[17px] text-neutral-400 mb-10 leading-relaxed">{data.cta.text}</p>}
          {data.cta.buttonText && data.cta.buttonHref && (
            <Button variant="secondary" size="lg" href={data.cta.buttonHref}>{data.cta.buttonText}</Button>
          )}
        </ScrollReveal>
      </section>
    </>
  );
}