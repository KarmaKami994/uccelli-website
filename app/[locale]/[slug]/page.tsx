import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPageBySlug } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const page = await getPageBySlug(slug, locale);
  if (!page) return { title: "Seite nicht gefunden" };
  return pageMetadata({ title: `${page.title} – Uccelli Society`, path: `/${slug}`, locale });
}

export default async function DynamicPage({ params }: Params) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const page = await getPageBySlug(slug, locale);
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
