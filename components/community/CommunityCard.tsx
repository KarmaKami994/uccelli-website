import Image from "next/image";
import Link from "next/link";
import type { CommunityItem } from "@/lib/data";
import type { Locale } from "@/lib/payload";
import { localizedPath } from "@/lib/seo";

export function CommunityCard({ item, locale, labels }: { item: CommunityItem; locale: Locale; labels: { type: string; status: string; open: string; details: string } }) {
  const internalHref = localizedPath(`/community/${item.slug}`, locale);
  const href = item.status === "available" && item.href ? item.href : internalHref;
  const external = href.startsWith("http");

  return (
    <article className="group border border-neutral-200 rounded-[12px] overflow-hidden bg-white flex flex-col hover:shadow-lg hover:border-neutral-300 transition-all">
      {item.image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          <Image src={item.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 420px" />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-4xl font-bold text-neutral-300" aria-hidden="true">
          {item.type === "game" ? "✦" : item.type === "tool" ? "⌘" : "＋"}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-neutral-600">{labels.type}</span>
          <span className="rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-neutral-500">{labels.status}</span>
        </div>
        <h2 className="text-xl font-bold leading-tight mb-3">{item.title}</h2>
        <p className="text-[15px] text-neutral-600 leading-relaxed flex-1">{item.summary}</p>
        <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="mt-6 text-[12px] font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">
          {item.status === "available" ? labels.open : labels.details} →
        </Link>
      </div>
    </article>
  );
}
