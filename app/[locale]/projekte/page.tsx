import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilter, normalizeProjectFilter } from "@/components/projects/ProjectFilter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getProjects } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ kategorie?: string | string[] }>;
};

export async function generateMetadata({ params }: Pick<Params, "params">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: locale === "de" ? "Projekte – Uccelli Society" : "Projects – Uccelli Society",
    description: locale === "de" ? "Sozialprojekte, Bildungsprojekte und Community-Projekte der Uccelli Society." : "Social, educational and community projects by the Uccelli Society.",
    path: "/projekte",
    locale,
  });
}

export default async function ProjectsPage({ params, searchParams }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const projects = await getProjects(locale);
  const rawCategory = (await searchParams).kategorie;
  const active = normalizeProjectFilter(Array.isArray(rawCategory) ? rawCategory[0] : rawCategory);
  const visibleProjects = active === "all" ? projects : projects.filter((project) => project.category === active);

  const categoryLabels = {
    sozial: t("filters.sozial"),
    bildung: t("filters.bildung"),
    gemeinschaft: t("filters.gemeinschaft"),
  } as const;

  return (
    <>
      <Hero title={t("title")} variant="gradient" subtitle={t("subtitle")} />
      <section className="py-14 lg:py-20 px-6 lg:px-10 border-b border-neutral-100">
        <ScrollReveal className="max-w-[900px] mx-auto text-center">
          <p className="text-[16px] text-neutral-600 leading-[1.8] max-w-2xl mx-auto mb-9">{t("intro")}</p>
          <ProjectFilter
            locale={locale}
            active={active}
            labels={{
              all: t("filters.all"),
              sozial: t("filters.sozial"),
              bildung: t("filters.bildung"),
              gemeinschaft: t("filters.gemeinschaft"),
            }}
          />
        </ScrollReveal>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          {visibleProjects.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {visibleProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={locale}
                  categoryLabel={categoryLabels[project.category]}
                  ctaLabel={t("viewProject")}
                />
              ))}
            </StaggerReveal>
          ) : (
            <p className="text-center text-neutral-500">{t("empty")}</p>
          )}
        </div>
      </section>
    </>
  );
}
