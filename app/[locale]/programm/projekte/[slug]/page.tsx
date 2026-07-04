import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getProjectBySlug } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const project = await getProjectBySlug(slug, locale);
  if (!project) return { title: "Projekt nicht gefunden" };
  return pageMetadata({
    title: `${project.title} – Uccelli Society`,
    description: project.summary,
    path: `/programm/projekte/${slug}`,
    locale,
  });
}

export default async function ProjectDetailPage({ params }: Params) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();

  return (
    <>
      <Hero title={project.title.toUpperCase()} variant="gradient" imageSrc={project.image} />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto">
          {project.body && <RichTextRenderer content={project.body} />}
        </div>
      </section>
    </>
  );
}
