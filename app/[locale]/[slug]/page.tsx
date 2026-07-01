import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPageBySlug } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  return { title: page ? `${page.title} – Uccelli Society` : "Seite nicht gefunden" };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <Hero title={page.title.toUpperCase()} variant="gradient" />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <ScrollReveal className="max-w-[800px] mx-auto text-[16px] text-neutral-700 leading-[1.8]">
          <RichTextRenderer content={page.body} />
        </ScrollReveal>
      </section>
    </>
  );
}
