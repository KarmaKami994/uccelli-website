import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getNetworks } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "Netzwerk – Uccelli Society",
    description: "Unsere Netzwerke: Uccelli Ghana, Women, FC und Nightshift Music.",
    path: "/netzwerk",
    locale,
  });
}

export default async function NetzwerkPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("netzwerk");
  const networks = await getNetworks(locale);

  return (
    <>
      <Hero title="NETZWERKE" variant="split" subtitle={t("subtitle")} />
      <section className="px-6 lg:px-10 pb-8">
        <ScrollReveal className="max-w-[900px] mx-auto">
          <p className="text-[16px] text-neutral-600 leading-[1.8]">{t("intro")}</p>
        </ScrollReveal>
      </section>
      {networks.map((n, i) => (
        <section key={n.slug} id={n.slug} className={`py-16 lg:py-24 px-6 lg:px-10 ${i % 2 === 0 ? "bg-black text-white" : "bg-white"}`}>
          <ScrollReveal className="max-w-[900px] mx-auto">
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-6">{n.name}</h2>
            <div className={i % 2 === 0 ? "text-neutral-300" : "text-neutral-600"}>
              <RichTextRenderer content={n.description} />
            </div>
          </ScrollReveal>
        </section>
      ))}
    </>
  );
}
