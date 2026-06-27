import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Accordion } from "@/components/ui/Accordion";
import { FAQJsonLd } from "@/components/layout/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getFAQs } from "@/lib/data";

export const metadata: Metadata = { title: "FAQ – Uccelli Society", description: "Häufig gestellte Fragen zum Verein Uccelli." };

export default async function FAQPage() {
  const t = await getTranslations("faq");
  const faqs = await getFAQs();

  return (
    <>
      <FAQJsonLd items={faqs} />
      <section className="bg-black text-white py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase">{t("title")}</h1>
          <p className="text-neutral-400 mt-3 text-lg">{t("subtitle")}</p>
        </div>
      </section>
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <ScrollReveal className="max-w-[900px] mx-auto"><Accordion items={faqs} /></ScrollReveal>
      </section>
    </>
  );
}
