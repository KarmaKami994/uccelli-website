import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title: "Netzwerk – Uccelli Society", description: "Unsere Netzwerke: Uccelli Ghana, Women, FC und Nightshift Music." };

const networks = [
  { id: "uccelli-ghana", name: "Uccelli Ghana", bg: "bg-black text-white", desc: "Unser Bestreben, die Gemeinschaft zu stärken, geht über die nationalen Grenzen hinaus. Der Fokus dieser Initiative liegt daran, die Selbstwirksamkeit zu stärken und Menschen dazu zu ermutigen, andere zu stützen." },
  { id: "uccelli-women", name: "Uccelli Women", bg: "bg-white", desc: "Wir möchten eine eigenständige Subgruppe namens Uccelli Women ins Leben rufen. Diese Gruppe dient als spezielles Netzwerk für unsere weibliche Zielgruppe und bietet eine Anlaufstelle für Frauen innerhalb des Vereins." },
  { id: "uccelli-fc", name: "Uccelli FC", bg: "bg-black text-white", desc: "Der Aufbau von Uccelli FC war für uns nicht nur die Schaffung einer Fussballmannschaft, sondern auch die Erkenntnis, dass Fussball Menschen verbindet." },
  { id: "nightshift", name: "Nightshift Music", bg: "bg-white", desc: "Nightshift Music ist unsere Konzert- und Musikplattform, die neuen Artists eine Bühne bietet. Durch regelmässige Events schaffen wir Raum für kreative Entfaltung." },
];

export default function NetzwerkPage() {
  const t = useTranslations("netzwerk");
  return (
    <>
      <Hero title="NETZWERKE" variant="split" subtitle={t("subtitle")} />
      <section className="px-6 lg:px-10 pb-8">
        <ScrollReveal className="max-w-[900px] mx-auto"><p className="text-[16px] text-neutral-600 leading-[1.8]">{t("intro")}</p></ScrollReveal>
      </section>
      {networks.map((n) => (
        <section key={n.id} id={n.id} className={`py-16 lg:py-24 px-6 lg:px-10 ${n.bg}`}>
          <ScrollReveal className="max-w-[900px] mx-auto">
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-6">{n.name}</h2>
            <p className={`text-[16px] leading-[1.8] ${n.bg.includes("black") ? "text-neutral-300" : "text-neutral-600"}`}>{n.desc}</p>
          </ScrollReveal>
        </section>
      ))}
    </>
  );
}
