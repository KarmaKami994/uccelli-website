import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";

const saeulen = [
  { title: "Schutz der Umwelt", href: "/werte/schutz-der-umwelt" },
  { title: "Datenschutz", href: "/werte/datenschutz" },
  { title: "Diskriminierungsverbot", href: "/werte/diskriminierungsverbot" },
  { title: "Freiheit und Autonomie", href: "/werte/freiheit-und-autonomie" },
  { title: "Solidarität und Kohäsion", href: "/werte/solidaritaet-und-kohaesion" },
  { title: "Integrität", href: "/werte/integritaet" },
];

export default function UeberUnsPage() {
  return (
    <>
      <Hero title="ÜBER UNS" variant="cutout" />

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-8">Wie alles begann</h2>
          <div className="space-y-5 text-[16px] text-neutral-700 leading-[1.8]">
            <p>Was heute die Uccelli Society ist, begann mit einer einfachen Begegnung und vielen grossen Gesprächen. Aus dem Wunsch nach Zugehörigkeit, Austausch und einer Gemeinschaft für Menschen mit unterschiedlichen Perspektiven entstand zunächst eine kleine Gruppe von Freunden.</p>
            <p>Mit der Zeit wurde aus dieser Idee mehr: eine Vision für einen offenen, inklusiven Verein, der Menschen verbindet, Potenziale fördert und Raum für persönliche Entwicklung schafft. Nach Jahren des Austauschs wurde 2021 der Verein Uccelli offiziell gegründet.</p>
            <p>Der Name „Uccelli" – inspiriert von den „italienischen Vögeln" – steht bis heute für Individualität, Freiheit und die Überzeugung, dass Vielfalt eine Stärke ist.</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-neutral-50">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-10">
          <div className="p-8 bg-black text-white rounded-[12px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">Mission</p>
            <p className="text-[15px] leading-relaxed">Uccelli schafft ein integratives Netzwerk, das Bildung, Austausch und persönliche Entwicklung fördert — offen für alle, unabhängig von Hintergrund oder sozialer Schicht.</p>
          </div>
          <div className="p-8 bg-black text-white rounded-[12px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">Vision</p>
            <p className="text-[15px] leading-relaxed">In den kommenden 5 Jahren ein Netzwerk aufbauen, in dem sich Personen verschiedener Hintergründe zusammenkommen, austauschen und gegenseitig inspirieren können.</p>
          </div>
        </div>
      </section>

      {/* Team Teaser */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-5">Hinter jeder Vision stehen Menschen</h2>
          <p className="text-neutral-600 mb-10 leading-relaxed">Lernen Sie die Persönlichkeiten kennen, die die Uccelli Society mitgestalten, Projekte vorantreiben und unsere Vision Tag für Tag zum Leben erwecken.</p>
          <Button variant="primary" href="/ueber-uns/vorstand">DER VORSTAND</Button>
        </div>
      </section>

      {/* Unsere Säulen */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-12 text-center">Unsere Säulen</h2>
          <div className="space-y-4">
            {saeulen.map((item, i) => (
              <a key={item.href} href={item.href}
                className={`flex items-center justify-between p-6 rounded-[12px] transition-all duration-200 hover:shadow-md ${i % 2 === 0 ? "bg-black text-white hover:bg-neutral-800" : "bg-neutral-50 hover:bg-neutral-100"}`}>
                <span className="text-lg font-medium">{item.title}</span>
                <span className="text-[13px] font-bold uppercase tracking-wide opacity-60">Mehr erfahren →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
