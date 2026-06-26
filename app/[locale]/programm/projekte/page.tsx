import type { Metadata } from "next";
export const metadata: Metadata = { title: "Projekte – Uccelli Society", description: "Sozialprojekte, Bildungsprojekte und Gemeinschaftsprojekte des Verein Uccelli." };

import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";

const sozialprojekte = [
  { title: "Kleidersammelaktion", body: "Sammlung und Verteilung von Kleidung an Bedürftige in der Region Zürich." },
  { title: "Meet & Greet", body: "Regelmässige Treffen zum Austausch und Kennenlernen innerhalb der Community." },
];

const bildungsprojekte = [
  { title: "LifeLab", body: "Lebenspraktische Kompetenzen für Jugendliche — von Finanzen bis Persönlichkeitsentwicklung.", buttonHref: "/skills4growth" },
  { title: "Steuern & Versicherungs Schulung", body: "Workshops zu Steuererklärung, Versicherungen und Finanzplanung für junge Erwachsene." },
];

const gemeinschaftsprojekte = [
  { title: "Nightshift Music", body: "Unsere Konzertreihe, die neuen Artists eine Bühne bietet und Musik mit Community verbindet." },
  { title: "Uccelli Liga", body: "Fussballturniere und sportliche Events, die Menschen zusammenbringen." },
];

export default function ProjektePage() {
  return (
    <>
      <Hero title="PROJEKTE" variant="gradient" subtitle="Gemeinsam wachsen, lernen und vernetzen" />

      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-[16px] text-neutral-600 leading-[1.8] max-w-2xl mx-auto">Unsere Projekte schaffen Räume für Austausch, Bildung und persönliche Entwicklung. Ob psychologische Beratung, IT- und Business-Kurse oder kreative Angebote — wir bringen Menschen zusammen, fördern neue Perspektiven und unterstützen individuelle Ziele.</p>
        </div>
      </section>

      {/* Sozialprojekte */}
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">Sozialprojekte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{sozialprojekte.map((p) => <Card key={p.title} {...p} buttonText="MEHR ERFAHREN" />)}</div>
        </div>
      </section>

      {/* Bildungsprojekte */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-brand-accent text-white">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mb-8">Bildungsprojekte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{bildungsprojekte.map((p) => <Card key={p.title} {...p} buttonText="MEHR ERFAHREN" />)}</div>
        </div>
      </section>

      {/* Gemeinschaftsprojekte */}
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">Gemeinschaftsprojekte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{gemeinschaftsprojekte.map((p) => <Card key={p.title} {...p} buttonText="MEHR ERFAHREN" />)}</div>
        </div>
      </section>
    </>
  );
}
