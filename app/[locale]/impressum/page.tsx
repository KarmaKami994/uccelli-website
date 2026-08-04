import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getPageBySlug } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: locale === "de" ? "Impressum – Uccelli Society" : "Imprint – Uccelli Society",
    description: locale === "de" ? "Impressum und Kontaktangaben der Uccelli Society." : "Legal notice and contact details of the Uccelli Society.",
    path: "/impressum",
    locale,
  });
}

export default async function ImprintPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const page = await getPageBySlug("impressum", locale);

  return (
    <>
      <Hero title={page?.title?.toUpperCase() || t("imprint")} variant="split" />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto">
          {page?.body ? <RichTextRenderer content={page.body} className="text-[16px] text-neutral-700 leading-[1.8]" /> : <p>{t("contentPending")}</p>}
        </div>
      </section>
    </>
  );
}
