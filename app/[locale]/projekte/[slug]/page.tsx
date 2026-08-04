import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getProjectBySlug } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { localizedPath, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const project = await getProjectBySlug(slug, locale);
  if (!project) return { title: locale === "de" ? "Projekt nicht gefunden" : "Project not found" };

  return pageMetadata({
    title: `${project.title} – Uccelli Society`,
    description: project.summary,
    path: `/projekte/${slug}`,
    locale,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: Params) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();

  const categoryLabel = t(`filters.${project.category}`);
  const joinHref = `${localizedPath("/teil-werden", locale)}?projekt=${encodeURIComponent(project.slug)}&interesse=project`;

  return (
    <>
      <Hero title={project.title.toUpperCase()} subtitle={project.summary} variant="gradient" imageSrc={project.image} />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto">
          <Link href={localizedPath("/projekte", locale)} className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-neutral-400 hover:text-black transition-colors mb-8">
            <ArrowLeft size={14} /> {t("back")}
          </Link>
          <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-neutral-600 mb-8 ml-4">
            {categoryLabel}
          </span>
          {project.body ? (
            <RichTextRenderer content={project.body} className="text-[16px] text-neutral-700 leading-[1.8]" />
          ) : (
            <p className="text-neutral-600 leading-relaxed">{project.summary}</p>
          )}
        </div>
      </section>

      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[760px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold leading-tight mb-4">{t("detail.joinTitle")}</h2>
          <p className="text-[16px] text-neutral-600 leading-relaxed mb-8">{t("detail.joinText")}</p>
          <Button href={joinHref} size="lg">{t("detail.joinButton")}</Button>
        </div>
      </section>
    </>
  );
}
