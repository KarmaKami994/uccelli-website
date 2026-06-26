import { Accordion } from "@/components/ui/Accordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Uccelli Society",
  description: "Häufig gestellte Fragen zum Verein Uccelli, Mitgliedschaft, Projekten und Unterstützungsmöglichkeiten.",
};

const faqItems = [
  { question: "Was ist der Verein Uccelli?", answer: "Der Verein Uccelli ist ein integratives Netzwerk mit Sitz in Zürich, das Bildung, sozialen Austausch und persönliche Entwicklung fördert. Wir stehen allen offen, unabhängig von Hintergrund oder sozialer Schicht." },
  { question: "Wie kann ich Mitglied werden?", answer: "Du kannst dich über unser Kontaktformular oder direkt per E-Mail an uccelli.society@gmail.com anmelden. Wir freuen uns über jedes neue Mitglied!" },
  { question: "Was kostet eine Mitgliedschaft?", answer: "Die Mitgliedschaft ist kostenlos. Wir finanzieren uns über Spenden, Sponsoren und Partnerschaften." },
  { question: "Welche Projekte bietet Uccelli an?", answer: "Wir bieten Sozialprojekte, Bildungsprojekte wie LifeLab und Gemeinschaftsprojekte wie die Nightshift Music Konzertreihe. Aktuelle Projekte findest du auf unserer Projekte-Seite." },
  { question: "Wo finden die Veranstaltungen statt?", answer: "Die meisten unserer Veranstaltungen finden in Zürich statt, oft im GZ Höngg oder an wechselnden Locations. Details findest du bei den jeweiligen Events." },
  { question: "Kann ich den Verein finanziell unterstützen?", answer: "Ja! Du kannst uns per Banküberweisung unterstützen. Empfänger: Verein Uccelli, Konto Nr: 1148-5358.899, IBAN: CH53 0070 0114 8053 5889 9." },
  { question: "Was bedeutet der Name Uccelli?", answer: "\"Uccelli\" ist das italienische Wort für \"Vögel\". Der Name steht für Freiheit, Individualität und die Überzeugung, dass Vielfalt eine Stärke ist." },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-black text-white py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase">FAQ</h1>
          <p className="text-neutral-400 mt-3 text-lg">Wir sind da um zu helfen!</p>
        </div>
      </section>
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
