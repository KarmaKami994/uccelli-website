import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getWertBySlug, getAllWerte } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  const wert = await getWertBySlug(slug, locale);
  if (!wert) return { title: "Seite nicht gefunden" };
  return pageMetadata({
    title: `${wert.title} – Uccelli Society`,
    description: wert.title,
    path: `/werte/${slug}`,
    locale,
  });
}

export default async function WertPage({ params }: Params) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const t = await getTranslations("werte");
  const wert = await getWertBySlug(slug, locale);
  if (!wert) notFound();

  const allWerte = await getAllWerte(locale);

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold mb-3">{wert.title}</h1>
        <div className="w-20 h-[3px] bg-black mb-10" />
        <RichTextRenderer content={wert.body} className="text-[15px] text-neutral-700 leading-[1.8]" />
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <h3 className="text-[13px] font-bold uppercase tracking-wide mb-4 text-neutral-400">{t("more")}</h3>
          <div className="flex flex-wrap gap-3">
            {allWerte.filter((w) => w.slug !== slug).map((w) => (
              <Link key={w.slug} href={`/werte/${w.slug}`} className="text-[13px] text-neutral-500 hover:text-black transition-colors underline">{w.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
