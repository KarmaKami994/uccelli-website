import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getProjects } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "Projekte – Uccelli Society",
    description: "Sozialprojekte, Bildungsprojekte und Gemeinschaftsprojekte.",
    path: "/programm/projekte",
    locale,
  });
}

export default async function ProjektePage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("projekte");
  const projects = await getProjects(locale);

  const sections = [
    { label: t("sozial"), items: projects.filter((p) => p.category === "sozial"), bg: "" },
    { label: t("bildung"), items: projects.filter((p) => p.category === "bildung"), bg: "bg-brand-accent text-white" },
    { label: t("gemeinschaft"), items: projects.filter((p) => p.category === "gemeinschaft"), bg: "" },
  ];

  return (
    <>
      <Hero title="PROJEKTE" variant="gradient" subtitle={t("subtitle")} />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <ScrollReveal className="max-w-[900px] mx-auto text-center">
          <p className="text-[16px] text-neutral-600 leading-[1.8] max-w-2xl mx-auto">{t("intro")}</p>
        </ScrollReveal>
      </section>
      {sections.map((section) => (
        <section key={section.label} className={`py-16 lg:py-24 px-6 lg:px-10 ${section.bg}`}>
          <div className="max-w-[1000px] mx-auto">
            <h2 className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-8 ${section.bg ? "text-white/60" : "text-neutral-400"}`}>{section.label}</h2>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((p) => (
                <Card key={p.slug} title={p.title} body={p.summary} buttonText={t("moreInfo")} buttonHref={`/programm/projekte/${p.slug}`} imageSrc={p.image} />
              ))}
            </StaggerReveal>
          </div>
        </section>
      ))}
    </>
  );
}
