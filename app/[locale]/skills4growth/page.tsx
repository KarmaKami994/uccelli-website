import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPageBySlug } from "@/lib/data";

export const metadata: Metadata = { title: "Skills4Growth / LifeLab – Uccelli Society", description: "LifeLab vermittelt Jugendlichen lebenspraktische Kompetenzen." };

export default async function Skills4GrowthPage() {
  const t = await getTranslations("common");
  const page = await getPageBySlug("skills4growth");

  return (
    <>
      <Hero title="LIFELAB — KOMPETENZEN FÜRS LEBEN" variant="gradient" />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <ScrollReveal className="max-w-[800px] mx-auto text-[16px] text-neutral-700 leading-[1.8]">
          {page?.body ? <RichTextRenderer content={page.body} /> : <p>Inhalt wird geladen...</p>}
        </ScrollReveal>
      </section>
      <section className="py-20 lg:py-28 px-6 lg:px-10 bg-black text-white">
        <ScrollReveal className="max-w-[800px] mx-auto">
          <div className="mt-10"><Button variant="secondary" href="mailto:uccelli.society@gmail.com">{t("contactUs")}</Button></div>
        </ScrollReveal>
      </section>
    </>
  );
}
