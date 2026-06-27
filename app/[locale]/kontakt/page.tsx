import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapLoader } from "@/components/ui/MapLoader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = { title: "Kontakt – Uccelli Society", description: "Kontaktiere den Verein Uccelli. Riedhofstrasse 364, 8049 Zürich." };

export default function KontaktPage() {
  const t = useTranslations("kontakt");
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
          <ScrollReveal><ContactForm /></ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="space-y-10">
              <div><h3 className="text-[13px] font-bold uppercase tracking-wide mb-3">{t("address")}</h3><p className="text-neutral-600">Riedhofstrasse 364</p><p className="text-neutral-600">8049 Zürich, Schweiz</p></div>
              <div><h3 className="text-[13px] font-bold uppercase tracking-wide mb-3">{t("email")}</h3><a href="mailto:uccelli.society@gmail.com" className="text-brand-accent-accessible hover:underline">uccelli.society@gmail.com</a></div>
              <div><h3 className="text-[13px] font-bold uppercase tracking-wide mb-3">{t("social")}</h3>
                <div className="flex gap-3">
                  {[{ label: "LinkedIn", href: "https://www.linkedin.com/company/uccelli-society" }, { label: "Instagram", href: "https://www.instagram.com/uccelli_society/" }, { label: "Facebook", href: "https://www.facebook.com/uccellisociety" }].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-neutral-500 hover:text-black transition-colors underline">{s.label}</a>
                  ))}
                </div>
              </div>
              <div className="aspect-[4/3] rounded-[12px] overflow-hidden border border-neutral-200"><MapLoader lat={47.3982} lng={8.4928} zoom={15} /></div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
