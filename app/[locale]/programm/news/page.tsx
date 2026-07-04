import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getPosts } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "News – Uccelli Society",
    description: "Neuigkeiten aus der Uccelli Society.",
    path: "/programm/news",
    locale,
  });
}

export default async function NewsPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const posts = await getPosts(locale);

  return (
    <>
      <Hero title="NEWS" variant="split" subtitle={t("subtitle")} />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <StaggerReveal className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => <Card key={p.slug} title={p.title} body={p.summary} buttonText={t("readMore")} buttonHref={`/programm/news/${p.slug}`} />)}
        </StaggerReveal>
      </section>
    </>
  );
}
