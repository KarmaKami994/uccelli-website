"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const werte = [
  { label: "Schutz der Umwelt", href: "/werte/schutz-der-umwelt" },
  { label: "Datenschutz", href: "/werte/datenschutz" },
  { label: "Diskriminierungsverbot", href: "/werte/diskriminierungsverbot" },
  { label: "Freiheit und Autonomie", href: "/werte/freiheit-und-autonomie" },
  { label: "Solidarität und Kohäsion", href: "/werte/solidaritaet-und-kohaesion" },
  { label: "Integrität", href: "/werte/integritaet" },
];

function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-neutral-800 lg:hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-[12px] font-bold uppercase tracking-[0.15em] cursor-pointer">
        {title}
        <ChevronDown size={16} className={`text-neutral-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  const t = useTranslations("footer");

  const kontaktContent = (
    <div className="space-y-2.5 text-[13px] text-neutral-400">
      <a href="/ueber-uns/faq" className="block hover:text-white transition-colors">{t("faq")}</a>
      <a href="mailto:uccelli.society@gmail.com" className="block hover:text-white transition-colors">{t("email")}</a>
      <a href="/kontakt" className="block hover:text-white transition-colors">{t("findUs")}</a>
    </div>
  );

  const werteContent = (
    <div className="space-y-2.5 text-[13px] text-neutral-400">
      {werte.map((item) => (
        <a key={item.href} href={item.href} className="block hover:text-white transition-colors">{item.label}</a>
      ))}
    </div>
  );

  const supportContent = (
    <div className="text-[13px] text-neutral-400 space-y-3">
      <p className="leading-relaxed">{t("unterstuetzenText")}</p>
      <div className="space-y-1 text-neutral-500">
        <p><span className="text-neutral-600">{t("empfaenger")}:</span> Verein Uccelli</p>
        <p><span className="text-neutral-600">{t("kontoNr")}:</span> 1148-5358.899</p>
        <p><span className="text-neutral-600">IBAN:</span> CH53 0070 0114 8053 5889 9</p>
      </div>
    </div>
  );

  const downloadContent = (
    <a href="/vereinsstatuten.pdf" className="text-[13px] text-neutral-400 hover:text-white transition-colors" download>
      {t("vereinsstatuten")}
    </a>
  );

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-12 pb-8">
        {/* Desktop: 4-column grid — always visible */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-10 lg:pb-10">
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("kontakt")}</h4>
            {kontaktContent}
          </div>
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("werte")}</h4>
            {werteContent}
          </div>
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("unterstuetzen")}</h4>
            {supportContent}
          </div>
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("download")}</h4>
            {downloadContent}
          </div>
        </div>

        {/* Mobile: accordion sections */}
        <MobileSection title={t("kontakt")}>{kontaktContent}</MobileSection>
        <MobileSection title={t("werte")}>{werteContent}</MobileSection>
        <MobileSection title={t("unterstuetzen")}>{supportContent}</MobileSection>
        <MobileSection title={t("download")}>{downloadContent}</MobileSection>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 py-8 mt-4 border-t border-neutral-800">
          {[
            { href: "https://www.linkedin.com/company/uccelli-society", label: "LinkedIn", icon: "in" },
            { href: "https://www.instagram.com/uccelli_society/", label: "Instagram", icon: "IG" },
            { href: "https://www.facebook.com/uccellisociety", label: "Facebook", icon: "f" },
          ].map(({ href, label, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-[12px] font-bold text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors">
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div className="text-center py-6 border-t border-neutral-900">
        <p className="text-[11px] text-neutral-600 tracking-wide">{t("copyright")}</p>
      </div>
    </footer>
  );
}
