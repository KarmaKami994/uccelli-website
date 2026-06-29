import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { PersonCard } from "@/components/ui/PersonCard";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getTeam } from "@/lib/data";

export const metadata: Metadata = { title: "Der Vorstand – Uccelli Society", description: "Lernen Sie den Vorstand des Verein Uccelli kennen." };

export default async function VorstandPage() {
  const t = await getTranslations("vorstand");
  const team = await getTeam();

  return (
    <>
      <Hero title={t("title")} variant="cutout" />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <StaggerReveal className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16" stagger={0.2}>
          {team.map((m) => <PersonCard key={m.name} name={m.name} role={m.role} imageSrc={m.image} bio={m.bio} />)}
        </StaggerReveal>
      </section>
    </>
  );
}
