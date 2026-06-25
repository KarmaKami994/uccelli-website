import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";

const partners = [
  { name: "GZ Höngg", desc: "Mit dem GZ Höngg verbindet uns eine enge und langfährige Partnerschaft, die auf gegenseitigem Vertrauen und gemeinsamen Werten beruht. Das GZ Höngg ist ein wichtiger Treffpunkt und Begegnungsort im Quartier und bietet vielfältige Angebote für Jung und Alt." },
  { name: "Royal Studio", desc: "Royal Studio – Kreative Event-Erlebnisse aus Zürich. Wir und Royal Studio – spezialisiert auf innovativen Foto- und Videobooth-Entertainment, das Events zu unvergesslichen Erlebnissen macht." },
  { name: "Anker Swiss AG", desc: "Die Anker Swiss AG ist ein etabliertes Schweizer Personalvermittlungsunternehmen mit langjähriger Erfahrung. Mit Standorten in Zürich, Bern, Luzern, Triesen und Zug hat sich Anker Swiss auf die Vermittlung von qualifizierten Fachkräften im Bau- und Industriegewerbe spezialisiert." },
];

const sponsors = [
  { name: "Hosttech GmbH", desc: "Wir freuen uns, auf die beidseitige Unterstützung der hosttech GmbH zählen zu dürfen. Als zuverlässiger Partner steht uns Hosting unserer Website und der Bereitstellung unserer Domainserver zur Seite." },
  { name: "GymOne", desc: "In Sachen Fitness und Gesundheit vertrauen wir auf die Expertise unseres starken Sponsors GymOne Zürich. Das moderne Fitnessstudio in Zürich Affoltern bietet unseren Mitgliedern die perfekten Voraussetzungen für ein effektives und abwechslungsreiches Training." },
  { name: "Fröhliche Info", desc: "In Sachen Kommunikation und Medienproduktion verlassen wir uns auf die Expertise unseres langjährigen Partners Fröhlich Info AG. Das innovative Unternehmen in Züllikon überzeugt mit frischen, authentischen Lösungsansätzen." },
];

export default function PartnerPage() {
  return (
    <>
      <Hero title="PARTNER & SPONSOREN" variant="cutout" />

      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-5">Gemeinsam Grosses Erreichen</h2>
          <p className="text-neutral-600 leading-relaxed max-w-xl mx-auto">Starke Partnerschaften sind der Schlüssel zum Erfolg. Wir freuen uns über die Zusammenarbeit mit Unternehmen, die unsere Vision teilen und uns bei der Umsetzung unserer Ziele unterstützen.</p>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-neutral-50">
        <div className="max-w-[900px] mx-auto">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">Partner</h3>
          <div className="space-y-6">
            {partners.map((p) => (
              <div key={p.name} className="bg-white p-8 rounded-[12px] border border-neutral-200">
                <h4 className="text-lg font-bold mb-3">{p.name}</h4>
                <p className="text-[15px] text-neutral-600 leading-relaxed mb-5">{p.desc}</p>
                <Button variant="primary" size="default">ZUM PARTNER</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-black text-white">
        <div className="max-w-[900px] mx-auto">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-8">Sponsoren</h3>
          <div className="space-y-6">
            {sponsors.map((s) => (
              <div key={s.name} className="bg-neutral-900 p-8 rounded-[12px] border border-neutral-800">
                <h4 className="text-lg font-bold mb-3">{s.name}</h4>
                <p className="text-[15px] text-neutral-400 leading-relaxed mb-5">{s.desc}</p>
                <Button variant="secondary" size="default">ZUM SPONSOR</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
