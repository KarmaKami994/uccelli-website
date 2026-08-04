import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { NewsCard } from "@/components/news/NewsCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getPosts } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: locale === "de" ? "News – Uccelli Society" : "News – Uccelli Society",
    description: locale === "de" ? "Offizielle Mitteilungen, Projektfortschritte und Rückblicke der Uccelli Society." : "Official announcements, project updates and stories from the Uccelli Society.",
    path: "/news",
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
      <Hero title={t("title")} variant="split" subtitle={t("subtitle")} />
      <section className="py-14 lg:py-20 px-6 lg:px-10 border-b border-neutral-100">
        <ScrollReveal className="max-w-[760px] mx-auto text-center">
          <p className="text-[16px] text-neutral-600 leading-[1.8]">{t("intro")}</p>
        </ScrollReveal>
      </section>
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          {posts.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => <NewsCard key={post.slug} post={post} locale={locale} ctaLabel={t("readMore")} />)}
            </StaggerReveal>
          ) : (
            <p className="text-center text-neutral-500">{t("empty")}</p>
          )}
        </div>
      </section>
    </>
  );
}
