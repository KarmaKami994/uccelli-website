import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { NewsCard } from "@/components/news/NewsCard";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getPostBySlug, getPosts } from "@/lib/data";
import { formatEventDate } from "@/lib/format";
import { toLocale } from "@/lib/payload";
import { localizedPath, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const post = await getPostBySlug(slug, locale);
  if (!post) return { title: locale === "de" ? "Artikel nicht gefunden" : "Article not found" };

  return pageMetadata({
    title: `${post.title} – Uccelli Society`,
    description: post.summary,
    path: `/news/${slug}`,
    locale,
    image: post.image,
    type: "article",
  });
}

export default async function NewsArticlePage({ params }: Params) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const [post, posts] = await Promise.all([getPostBySlug(slug, locale), getPosts(locale)]);
  if (!post) notFound();
  const related = posts.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="py-14 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto">
          <Link href={localizedPath("/news", locale)} className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-neutral-400 hover:text-black transition-colors mb-10">
            <ArrowLeft size={14} /> {t("back")}
          </Link>
          <time dateTime={post.date} className="block text-[12px] font-bold uppercase tracking-[0.15em] text-brand-accent-accessible mb-4">
            {formatEventDate(post.date, locale)}
          </time>
          <h1 className="text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.08] mb-5">{post.title}</h1>
          <p className="text-[18px] text-neutral-500 leading-relaxed mb-10">{post.summary}</p>
          {post.image && (
            <div className="relative aspect-[16/9] rounded-[12px] overflow-hidden mb-12 bg-neutral-100">
              <Image src={post.image} alt="" fill priority className="object-cover" sizes="(max-width: 900px) 100vw, 800px" />
            </div>
          )}
          <div className="h-[3px] w-20 bg-black mb-10" />
          {post.body && <RichTextRenderer content={post.body} className="text-[16px] text-neutral-700 leading-[1.8]" />}
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 lg:py-24 px-6 lg:px-10 bg-neutral-50 border-t border-neutral-100">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-10 text-center">{t("related")}</h2>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => <NewsCard key={item.slug} post={item} locale={locale} ctaLabel={t("readMore")} />)}
            </StaggerReveal>
          </div>
        </section>
      )}
    </>
  );
}
