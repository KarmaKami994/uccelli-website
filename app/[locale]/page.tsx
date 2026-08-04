import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CommunityCard } from "@/components/community/CommunityCard";
import { NewsCard } from "@/components/news/NewsCard";
import { PartnerMarquee } from "@/components/partners/PartnerMarquee";
import { getCommunityItems, getHomepage, getPartners, getPosts, getProjects } from "@/lib/data";
import { toLocale, type Locale } from "@/lib/payload";
import { localizedPath, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

function localizeCmsHref(href: string | undefined, locale: Locale): string | undefined {
  if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return href;
  const withoutLocale = href.replace(/^\/en(?=\/|$)/, "") || "/";
  return localizedPath(withoutLocale, locale);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: locale === "de" ? "Uccelli Society – Gemeinsam Wirkung schaffen" : "Uccelli Society – Creating impact together",
    description: locale === "de" ? "Ein integratives Netzwerk für Bildung, Austausch, Projekte und persönliche Entwicklung in Zürich." : "An inclusive network for education, exchange, projects and personal development in Zurich.",
    path: "/",
    locale,
  });
}

export default async function HomePage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const [homepage, projects, communityItems, posts, partnerGroups] = await Promise.all([
    getHomepage(locale),
    getProjects(locale),
    getCommunityItems(locale),
    getPosts(locale),
    getPartners(locale),
  ]);

  if (!homepage) return <p className="py-20 text-center text-neutral-500">{t("contentMissing")}</p>;

  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);
  const projectSelection = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);
  const featuredCommunity = communityItems.filter((item) => item.featured).slice(0, 3);
  const communitySelection = featuredCommunity.length > 0 ? featuredCommunity : communityItems.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const partners = [...partnerGroups.partners, ...partnerGroups.sponsors];
  const categoryLabels = {
    sozial: t("projectCategories.sozial"),
    bildung: t("projectCategories.bildung"),
    gemeinschaft: t("projectCategories.gemeinschaft"),
  } as const;

  return (
    <>
      <Hero
        title={homepage.hero.title}
        subtitle={homepage.hero.subtitle}
        ctaText={homepage.hero.ctaText}
        ctaHref={localizeCmsHref(homepage.hero.ctaHref, locale)}
        variant="gradient"
        imageSrc={homepage.hero.image}
      />

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">{t("projectsEyebrow")}</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight">{t("projectsTitle")}</h2>
              <p className="text-neutral-600 leading-relaxed mt-4 max-w-2xl">{t("projectsIntro")}</p>
            </div>
            <Button href={localizedPath("/projekte", locale)} variant="secondary">{t("allProjects")}</Button>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projectSelection.map((project) => <ProjectCard key={project.slug} project={project} locale={locale} categoryLabel={categoryLabels[project.category]} ctaLabel={t("viewProject")} />)}
          </StaggerReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">{t("communityEyebrow")}</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight">{t("communityTitle")}</h2>
              <p className="text-neutral-600 leading-relaxed mt-4 max-w-2xl">{t("communityIntro")}</p>
            </div>
            <Button href={localizedPath("/community", locale)} variant="secondary">{t("allCommunity")}</Button>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communitySelection.map((item) => (
              <CommunityCard key={item.slug} item={item} locale={locale} labels={{ type: t(`communityTypes.${item.type}`), status: t(`communityStatuses.${item.status}`), open: t("openCommunity"), details: t("communityDetails") }} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">{t("newsEyebrow")}</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight">{t("newsTitle")}</h2>
              <p className="text-neutral-600 leading-relaxed mt-4 max-w-2xl">{t("newsIntro")}</p>
            </div>
            <Button href={localizedPath("/news", locale)} variant="secondary">{t("allNews")}</Button>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => <NewsCard key={post.slug} post={post} locale={locale} ctaLabel={t("readMore")} />)}
          </StaggerReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-black text-white">
        <ScrollReveal className="max-w-[900px] mx-auto">
          {homepage.about.eyebrow && <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-4 font-bold">{homepage.about.eyebrow}</p>}
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold mb-6 max-w-2xl leading-tight">{homepage.about.title}</h2>
          <p className="text-[17px] text-neutral-400 max-w-3xl mb-9 leading-[1.75]">{homepage.about.text}</p>
          {homepage.about.ctaText && homepage.about.ctaHref && <Button variant="secondary" href={localizeCmsHref(homepage.about.ctaHref, locale)}>{homepage.about.ctaText}</Button>}
        </ScrollReveal>
      </section>

      <PartnerMarquee title={t("partnerTitle")} partners={partners} />

      <section className="py-24 lg:py-36 px-6 lg:px-10 text-center">
        <ScrollReveal className="max-w-[680px] mx-auto">
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold mb-5 leading-tight">{homepage.cta.title}</h2>
          {homepage.cta.text && <p className="text-[17px] text-neutral-600 mb-10 leading-relaxed">{homepage.cta.text}</p>}
          {homepage.cta.buttonText && homepage.cta.buttonHref && <Button size="lg" href={localizeCmsHref(homepage.cta.buttonHref, locale)}>{homepage.cta.buttonText}</Button>}
        </ScrollReveal>
      </section>
    </>
  );
}
