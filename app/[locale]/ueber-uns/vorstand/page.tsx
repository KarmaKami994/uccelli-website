import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { PersonCard } from "@/components/ui/PersonCard";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getTeam } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "Der Vorstand – Uccelli Society",
    description: "Lernen Sie den Vorstand des Verein Uccelli kennen.",
    path: "/ueber-uns/vorstand",
    locale,
  });
}

export default async function VorstandPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("vorstand");
  const team = await getTeam(locale);

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
