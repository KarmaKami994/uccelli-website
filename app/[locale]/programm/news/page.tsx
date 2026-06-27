import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Card } from "@/components/ui/Card";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getPosts } from "@/lib/data";

export const metadata: Metadata = { title: "News – Uccelli Society", description: "Neuigkeiten aus der Uccelli Society." };

export default async function NewsPage() {
  const t = await getTranslations("news");
  const posts = await getPosts();

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
