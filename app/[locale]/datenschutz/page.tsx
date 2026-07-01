import type { Metadata } from "next";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPageBySlug } from "@/lib/data";

export const metadata: Metadata = { title: "Datenschutzerklärung – Uccelli Society", description: "Informationen zum Datenschutz auf uccelli-society.ch." };

export default async function DatenschutzPage() {
  const page = await getPageBySlug("datenschutz");

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold mb-3">Datenschutzerklärung</h1>
        <div className="w-20 h-[3px] bg-black mb-10" />
        <div className="text-[15px] text-neutral-700 leading-[1.8]">
          {page?.body ? <RichTextRenderer content={page.body} /> : <p>Inhalt wird geladen...</p>}
        </div>
      </div>
    </section>
  );
}
