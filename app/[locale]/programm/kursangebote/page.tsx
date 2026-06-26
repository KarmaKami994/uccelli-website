import type { Metadata } from "next";
export const metadata: Metadata = { title: "Kursangebote – Uccelli Society", description: "Kurse zu Psychologie, Sport, Finanzen und IT & Business." };

import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";

const categories = [
  { name: "KURSE ZU PSYCHOLOGIE", desc: "Laufbahnberatung, Motivation, Persönlichkeit, Selbstkontrolle und psychische Gesundheit." },
  { name: "KURSE ZU SPORT", desc: "Fitness, Ernährung und Wohlbefinden — in Kooperation mit unseren Partnern." },
  { name: "KURSE ZU FINANZEN", desc: "Steuern, Versicherungen, Budgetplanung und der Weg in die Selbstständigkeit." },
  { name: "KURSE ZU IT & BUSINESS", desc: "Grundlagen der IT, Webentwicklung, Business-Aufbau und digitale Kompetenzen." },
];

export default function KursangebotePage() {
  return (
    <>
      <Hero title="KURS ANGEBOTE" variant="cutout" />

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-5">Lernen. Wachsen. Vernetzen.</h2>
          <p className="text-neutral-600 leading-relaxed">Unsere Kurse bieten mehr als Wissen — sie schaffen Möglichkeiten. Von IT und Business bis hin zu kreativen Workshops unterstützen wir Menschen dabei, neue Kompetenzen zu entwickeln, Erfahrungen auszutauschen und ihre persönlichen sowie beruflichen Ziele zu erreichen.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-black text-white">
        <div className="max-w-[600px] mx-auto space-y-5">
          {categories.map((cat) => (
            <div key={cat.name} className="border border-neutral-700 rounded-[12px] p-6 hover:border-neutral-500 transition-colors">
              <h3 className="font-bold text-[15px] uppercase tracking-wide mb-2">{cat.name}</h3>
              <p className="text-[14px] text-neutral-400 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
