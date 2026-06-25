import { Hero } from "@/components/sections/Hero";

const networks = [
  { id: "uccelli-ghana", name: "Uccelli Ghana", bg: "bg-black text-white", desc: "Unser Bestreben, die Gemeinschaft zu stärken, geht über die nationalen Grenzen hinaus. Der Fokus dieser Initiative liegt daran, die Selbstwirksamkeit zu stärken und Menschen dazu zu ermutigen, andere zu stützen. In Ghana möchten wir innovative Empowerment-Programme einen Beitrag leisten, um das Selbstbewusstsein und die Handlungsfähigkeit der Gemeinschaft zu stärken." },
  { id: "uccelli-women", name: "Uccelli Women", bg: "bg-white", desc: "Wir möchten eine eigenständige Subgruppe namens Uccelli Women ins Leben rufen. Diese Gruppe dient als spezielles Netzwerk für unsere weibliche Zielgruppe, bietet eine Anlaufstelle für Frauen innerhalb des Vereins und agiert weitgehend eigenständig. Uccelli Women versteht sich als inspirierender Raum, in dem Frauen sich miteinander vernetzen können." },
  { id: "uccelli-fc", name: "Uccelli FC", bg: "bg-black text-white", desc: "Der Aufbau von Uccelli FC war für uns nicht nur die Schaffung einer Fussballmannschaft, sondern auch die Erkenntnis, dass Fussball Menschen verbindet. Diese Erfahrung hat es uns ermöglicht, unsere Zielgruppe auf vielfältige Weise zu erreichen und Aufmerksamkeit auf unseren Verein zu lenken." },
  { id: "nightshift", name: "Nightshift Music", bg: "bg-white", desc: "Nightshift Music ist unsere Konzert- und Musikplattform, die neuen Artists eine Bühne bietet. Durch regelmässige Events schaffen wir Raum für kreative Entfaltung und verbinden Musik mit unserer Community." },
];

export default function NetzwerkPage() {
  return (
    <>
      <Hero title="NETZWERKE" variant="split" subtitle="Menschen. Ideen. Möglichkeiten." />

      <section className="px-6 lg:px-10 pb-8">
        <div className="max-w-[900px] mx-auto">
          <p className="text-[16px] text-neutral-600 leading-[1.8]">Unser Netzwerk bringt Menschen zusammen, die etwas bewegen, lernen und wachsen möchten. In unseren verschiedenen Gruppen treffen unterschiedliche Erfahrungen, Perspektiven und Interessen aufeinander — und genau daraus entstehen neue Ideen, spannende Projekte und wertvolle Verbindungen.</p>
        </div>
      </section>

      {networks.map((network) => (
        <section key={network.id} id={network.id} className={`py-16 lg:py-24 px-6 lg:px-10 ${network.bg}`}>
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-6">{network.name}</h2>
            <p className={`text-[16px] leading-[1.8] ${network.bg.includes("black") ? "text-neutral-300" : "text-neutral-600"}`}>{network.desc}</p>
          </div>
        </section>
      ))}
    </>
  );
}
