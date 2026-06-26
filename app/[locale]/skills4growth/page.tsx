import type { Metadata } from "next";
export const metadata: Metadata = { title: "Skills4Growth / LifeLab – Uccelli Society", description: "LifeLab vermittelt Jugendlichen lebenspraktische Kompetenzen für den Alltag." };

import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";

export default function Skills4GrowthPage() {
  return (
    <>
      <Hero title="LIFELAB — KOMPETENZEN FÜRS LEBEN" variant="gradient" />

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto space-y-6 text-[16px] text-neutral-700 leading-[1.8]">
          <p>LifeLab ist ein Projekt des Vereins Uccelli, das Jugendliche und junge Erwachsene auf ihrem Weg in ein selbstständiges Erwachsenenleben begleiten soll. Ziel des Projekts ist es, lebenspraktische Kompetenzen zu vermitteln, die für die erfolgreiche Bewältigung des Alltags, der Ausbildung und des Berufslebens von Bedeutung sind, im regulären Schulunterricht jedoch oft nur begrenzt behandelt werden.</p>
          <p>Im Rahmen von Workshops, Praxisprojekten und weiteren Lernangeboten setzen sich die Teilnehmenden mit Themen wie Finanzen, Versicherungen, Steuern, Wohnen, Bewerbungen, psychischer Gesundheit, Stressbewältigung, Kommunikation und persönlicher Entwicklung auseinander.</p>
          <p>LifeLab verfolgt einen praxisnahen Ansatz. Die Teilnehmenden sollen nicht nur lernen, was sie tun sollten, sondern auch wie sie es tun können. Dadurch werden Selbstständigkeit, Eigenverantwortung, Selbstwirksamkeit und Zukunftskompetenzen gefördert.</p>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-black text-white">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-8">Die Sackgeldbörse — Lernen durch Erfahrung</h2>
          <div className="space-y-5 text-[16px] text-neutral-300 leading-[1.8]">
            <p>Ein zentrales Element von LifeLab ist die Sackgeldbörse. Über die Sackgeldbörse erhalten Jugendliche die Möglichkeit, kleinere Arbeiten für Privatpersonen, Vereine oder Unternehmen zu übernehmen und dadurch ihr erstes eigenes Geld zu verdienen.</p>
            <p>Die Sackgeldbörse ist jedoch weit mehr als eine Vermittlungsplattform für Nebenjobs. Sie schafft einen direkten Bezug zwischen den Lerninhalten von LifeLab und der Lebensrealität der Jugendlichen. Wer eigenes Geld verdient, setzt sich automatisch mit Fragen auseinander wie: Was mache ich mit meinem Einkommen? Wie teile ich es sinnvoll ein?</p>
            <p>LifeLab verbindet somit Wissen, Erfahrung und persönliche Entwicklung zu einem ganzheitlichen Lernansatz. Unser Ziel ist es, Jugendliche dabei zu unterstützen, ihr Potenzial zu entfalten und sie mit den Kompetenzen auszustatten, die sie für ein selbstbestimmtes und erfolgreiches Leben benötigen.</p>
          </div>
          <div className="mt-10">
            <Button variant="secondary" href="mailto:uccelli.society@gmail.com">KONTAKTIERE UNS</Button>
          </div>
        </div>
      </section>
    </>
  );
}
