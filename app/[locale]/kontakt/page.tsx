import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapLoader } from "@/components/ui/MapLoader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "Kontakt – Uccelli Society",
    description: "Kontaktiere den Verein Uccelli. Riedhofstrasse 364, 8049 Zürich.",
    path: "/kontakt",
    locale,
  });
}

export default async function KontaktPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("kontakt");

  return (
    <>
      <section className="bg-black text-white py-12 lg:py-16 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold">{t("title")}</h1>
          <p className="text-neutral-400 mt-3">{t("subtitle")}</p>
        </div>
      </section>
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16">
          <ScrollReveal><ContactForm turnstileSiteKey={process.env.TURNSTILE_SITE_KEY} /></ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="space-y-10">
              <div><h3 className="text-[13px] font-bold uppercase tracking-wide mb-3">{t("address")}</h3><p className="text-neutral-600">Riedhofstrasse 364</p><p className="text-neutral-600">8049 Zürich, Schweiz</p></div>
              <div><h3 className="text-[13px] font-bold uppercase tracking-wide mb-3">{t("email")}</h3><a href="mailto:uccelli.society@gmail.com" className="text-brand-accent-accessible hover:underline">uccelli.society@gmail.com</a></div>
              <div><h3 className="text-[13px] font-bold uppercase tracking-wide mb-3">{t("social")}</h3>
                <SocialIcons variant="dark" />
              </div>
              <div className="aspect-[4/3] rounded-[12px] overflow-hidden border border-neutral-200"><MapLoader lat={47.3982} lng={8.4928} zoom={15} /></div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
