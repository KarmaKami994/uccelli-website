import type { Metadata } from "next";
export const metadata: Metadata = { title: "Veranstaltungen – Uccelli Society", description: "Kommende Events und Veranstaltungen des Verein Uccelli." };

import { Hero } from "@/components/sections/Hero";

export default function VeranstaltungenPage() {
  return (
    <>
      <Hero title="VERANSTALTUNGEN" variant="split" subtitle="Unsere kommenden Events" />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="py-16 border border-dashed border-neutral-300 rounded-[12px]">
            <p className="text-neutral-400 text-lg">Keine anstehenden Veranstaltungen.</p>
            <p className="text-neutral-400 text-[14px] mt-2">Folge uns auf Instagram für aktuelle Updates.</p>
          </div>
        </div>
      </section>
    </>
  );
}
