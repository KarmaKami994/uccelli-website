import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getWertBySlug, getAllWerte } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wert = await getWertBySlug(slug);
  return { title: wert ? `${wert.title} – Uccelli Society` : "Seite nicht gefunden", description: wert?.title };
}

export default async function WertPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wert = await getWertBySlug(slug);
  if (!wert) notFound();

  const allWerte = await getAllWerte();

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold mb-3">{wert.title}</h1>
        <div className="w-20 h-[3px] bg-black mb-10" />
        <div className="text-[15px] text-neutral-700 leading-[1.8] space-y-4">
          <RichTextRenderer content={wert.body} />
        </div>
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <h3 className="text-[13px] font-bold uppercase tracking-wide mb-4 text-neutral-400">Weitere Werte</h3>
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
