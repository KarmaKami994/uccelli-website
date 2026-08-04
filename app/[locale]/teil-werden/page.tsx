import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JoinForm } from "@/components/join/JoinForm";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getProjects } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ interesse?: string | string[]; projekt?: string | string[] }>;
};

export async function generateMetadata({ params }: Pick<Params, "params">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: locale === "de" ? "Teil von Uccelli werden" : "Join Uccelli",
    description: locale === "de" ? "An Projekten teilnehmen, Fähigkeiten einbringen, Mitglied oder Partner werden und Uccelli unterstützen." : "Participate in projects, contribute skills, become a member or partner and support Uccelli.",
    path: "/teil-werden",
    locale,
  });
}

export default async function JoinPage({ params, searchParams }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("join");
  const projects = await getProjects(locale);
  const query = await searchParams;
  const initialInterest = Array.isArray(query.interesse) ? query.interesse[0] : query.interesse;
  const initialProject = Array.isArray(query.projekt) ? query.projekt[0] : query.projekt;

  const paths = ["project", "volunteer", "membership", "partnership", "support"] as const;

  return (
    <>
      <Hero title={t("title")} variant="gradient" subtitle={t("subtitle")} />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <ScrollReveal className="max-w-[800px] mx-auto text-center mb-14">
          <p className="text-[17px] text-neutral-600 leading-[1.8]">{t("intro")}</p>
        </ScrollReveal>
        <StaggerReveal className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {paths.map((path) => (
            <a key={path} href={`#join-form`} className="rounded-[12px] border border-neutral-200 p-5 bg-white hover:shadow-md hover:border-neutral-300 transition-all">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">{t(`paths.${path}.eyebrow`)}</span>
              <h2 className="font-bold text-lg leading-tight mt-3 mb-2">{t(`paths.${path}.title`)}</h2>
              <p className="text-[14px] text-neutral-600 leading-relaxed">{t(`paths.${path}.text`)}</p>
            </a>
          ))}
        </StaggerReveal>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[1000px] mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
          <ScrollReveal>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-tight mb-5">{t("membershipTitle")}</h2>
            <p className="text-[16px] text-neutral-600 leading-[1.8] mb-5">{t("membershipText")}</p>
            <p className="text-[15px] text-neutral-500 leading-[1.8]">{t("supportText")}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div id="join-form" className="rounded-[16px] bg-white border border-neutral-200 p-6 md:p-9 scroll-mt-8">
              <h2 className="text-2xl font-bold mb-2">{t("formTitle")}</h2>
              <p className="text-neutral-600 mb-8">{t("formIntro")}</p>
              <JoinForm
                projects={projects.map((project) => ({ slug: project.slug, title: project.title }))}
                initialInterest={initialInterest}
                initialProject={initialProject}
                turnstileSiteKey={process.env.TURNSTILE_SITE_KEY}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
