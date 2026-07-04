import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPostBySlug } from "@/lib/data";
import { formatEventDate } from "@/lib/format";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const post = await getPostBySlug(slug, locale);
  if (!post) return { title: "Artikel nicht gefunden" };
  return pageMetadata({
    title: `${post.title} – Uccelli Society`,
    description: post.summary,
    path: `/programm/news/${slug}`,
    locale,
  });
}

/**
 * News article detail — reads from the Payload `posts` collection
 * (previously three hardcoded articles that shadowed the CMS).
 */
export default async function NewsArticlePage({ params }: Params) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  return (
    <article className="py-16 lg:py-24 px-6 lg:px-10">
      <div className="max-w-[700px] mx-auto">
        <Link href="/programm/news" className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-neutral-400 hover:text-black transition-colors mb-10">
          <ArrowLeft size={14} /> {t("back")}
        </Link>
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-accent-accessible mb-3">
          {formatEventDate(post.date, locale)}
        </p>
        <h1 className="text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-tight mb-4">{post.title}</h1>
        <p className="text-[17px] text-neutral-500 leading-relaxed mb-10">{post.summary}</p>
        <div className="w-20 h-[3px] bg-black mb-10" />
        <RichTextRenderer content={post.body} className="text-[16px] text-neutral-700 leading-[1.8]" />
      </div>
    </article>
  );
}
