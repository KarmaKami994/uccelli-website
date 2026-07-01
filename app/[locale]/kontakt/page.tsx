import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapLoader } from "@/components/ui/MapLoader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const socialIcons = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/uccelli-society",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" },
  { label: "Instagram", href: "https://www.instagram.com/uccelli_society/",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
  { label: "Facebook", href: "https://www.facebook.com/uccellisociety",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
];

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
                <div className="flex gap-4">
                  {socialIcons.map(({ label, href, path }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-black hover:border-neutral-400 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
                    </a>
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
