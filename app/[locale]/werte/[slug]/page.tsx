import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

const werteContent: Record<string, { title: string; text: string }> = {
  "schutz-der-umwelt": {
    title: "Schutz der Umwelt",
    text: "Der Verein Uccelli sieht sich in der Pflicht, ökonomisch und umweltbewusst zu handeln. Nachhaltigkeit ist ein zentraler Wert unseres Vereins. Wir setzen uns für den Schutz natürlicher Ressourcen ein und fördern ein Bewusstsein für umweltfreundliches Handeln innerhalb unserer Gemeinschaft.",
  },
  "datenschutz": {
    title: "Datenschutz",
    text: "Der Schutz persönlicher Daten ist für den Verein Uccelli von höchster Bedeutung. Wir verpflichten uns, alle personenbezogenen Daten unserer Mitglieder, Partner und Unterstützer vertraulich zu behandeln und gemäss den geltenden Datenschutzgesetzen der Schweiz zu verarbeiten.",
  },
  "diskriminierungsverbot": {
    title: "Diskriminierungsverbot",
    text: "Der Verein Uccelli steht für eine inklusive Gemeinschaft, in der jede Person unabhängig von Geschlecht, Herkunft, Religion, sexueller Orientierung oder sozialem Status willkommen ist. Diskriminierung in jeglicher Form wird nicht toleriert.",
  },
  "freiheit-und-autonomie": {
    title: "Freiheit und Autonomie",
    text: "Es ist uns ein Anliegen, dass trotz herrschender Solidarität und Kohäsion die Autonomie bestehen bleibt. Jedes Mitglied soll sich als Individuum frei entwickeln können. Eines der Ziele des Uccellis ist es zu ermöglichen, dass seine Mitglieder Selbstständigkeit erlangen. Darunter verstehen wir das selbständige Bilden von Meinungen und Treffen von Entscheidungen unabhängig von den Vereinsmitgliedern.",
  },
  "solidaritaet-und-kohaesion": {
    title: "Solidarität und Kohäsion",
    text: "Der Verein Uccelli fördert den Zusammenhalt und die gegenseitige Unterstützung innerhalb der Gemeinschaft. Solidarität bedeutet für uns, füreinander da zu sein und gemeinsam an Lösungen für Herausforderungen zu arbeiten.",
  },
  "integritaet": {
    title: "Integrität",
    text: "Der Verein Uccelli sieht sich in der Pflicht, ökonomisch und umweltbewusst zu handeln. Der Verein Uccelli ist bestrebt, seine Tätigkeiten ehrlich und auf ethisch moralischer Grundlage zu betreiben.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wert = werteContent[slug];
  return {
    title: wert ? `${wert.title} – Uccelli Society` : "Seite nicht gefunden",
    description: wert?.text.slice(0, 160),
  };
}

export default async function WertePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wert = werteContent[slug];

  if (!wert) {
    return (
      <section className="py-20 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Seite nicht gefunden</h1>
        <p className="text-neutral-500">Dieser Wert existiert nicht.</p>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold mb-3">{wert.title}</h1>
        <div className="w-20 h-[3px] bg-black mb-10" />
        <p className="text-[16px] text-neutral-700 leading-[1.8]">{wert.text}</p>
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">Weitere Werte</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(werteContent).filter(([k]) => k !== slug).map(([key, val]) => (
              <Link key={key} href={`/werte/${key}`} className="text-[13px] text-neutral-500 hover:text-black transition-colors underline">{val.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
