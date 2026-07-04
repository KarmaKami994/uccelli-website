import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Accordion } from "@/components/ui/Accordion";
import { FAQJsonLd } from "@/components/layout/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getFAQs } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { lexicalToPlainText } from "@/lib/richtext";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "FAQ – Uccelli Society",
    description: "Häufig gestellte Fragen zum Verein Uccelli.",
    path: "/ueber-uns/faq",
    locale,
  });
}

export default async function FAQPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const faqs = await getFAQs(locale);

  // Rich text is rendered safely; JSON-LD gets the plain-text version.
  const accordionItems = faqs.map((f) => ({
    question: f.question,
    answer: <RichTextRenderer content={f.answer} />,
  }));
  const jsonLdItems = faqs.map((f) => ({ question: f.question, answer: lexicalToPlainText(f.answer) }));

  return (
    <>
      <FAQJsonLd items={jsonLdItems} />
      <section className="bg-black text-white py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase">{t("title")}</h1>
          <p className="text-neutral-400 mt-3 text-lg">{t("subtitle")}</p>
        </div>
      </section>
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <ScrollReveal className="max-w-[900px] mx-auto"><Accordion items={accordionItems} /></ScrollReveal>
      </section>
    </>
  );
}
