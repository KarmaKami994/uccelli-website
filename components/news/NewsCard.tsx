import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/data";
import type { Locale } from "@/lib/payload";
import { localizedPath } from "@/lib/seo";
import { formatEventDate } from "@/lib/format";

export function NewsCard({ post, locale, ctaLabel }: { post: Post; locale: Locale; ctaLabel: string }) {
  return (
    <article className="group border border-neutral-200 rounded-[12px] overflow-hidden bg-white flex flex-col hover:shadow-lg hover:border-neutral-300 transition-all">
      {post.image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          <Image src={post.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 420px" />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200" />
      )}
      <div className="p-6 flex flex-col flex-1">
        <time dateTime={post.date} className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-3">
          {formatEventDate(post.date, locale)}
        </time>
        <h2 className="text-xl font-bold leading-tight mb-3">{post.title}</h2>
        <p className="text-[15px] text-neutral-600 leading-relaxed flex-1">{post.summary}</p>
        <Link href={localizedPath(`/news/${post.slug}`, locale)} className="mt-6 text-[12px] font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">
          {ctaLabel} →
        </Link>
      </div>
    </article>
  );
}
