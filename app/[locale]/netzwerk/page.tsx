import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title: "Netzwerk – Uccelli Society", description: "Unsere Netzwerke: Uccelli Ghana, Women, FC und Nightshift Music." };

const networks = [
  { id: "uccelli-ghana", key: "ghana", bg: "bg-black text-white" },
  { id: "uccelli-women", key: "women", bg: "bg-white" },
  { id: "uccelli-fc", key: "fc", bg: "bg-black text-white" },
  { id: "nightshift", key: "nightshift", bg: "bg-white" },
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
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-6">{t(`${n.key}.name`)}</h2>
            <p className={`text-[16px] leading-[1.8] ${n.bg.includes("black") ? "text-neutral-300" : "text-neutral-600"}`}>{t(`${n.key}.desc`)}</p>
          </ScrollReveal>
        </section>
      ))}
    </>
  );
}
