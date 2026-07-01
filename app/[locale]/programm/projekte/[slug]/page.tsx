import { Hero } from "@/components/sections/Hero";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return { title: project?.title ?? "Projekt nicht gefunden", description: project?.summary };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Hero title={project.title.toUpperCase()} variant="gradient" imageSrc={project.image} />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto prose prose-neutral">
          {project.body && <RichTextRenderer content={project.body} />}
        </div>
      </section>
    </>
  );
}
