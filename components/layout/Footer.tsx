"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const werteKeys = [
  "schutz-der-umwelt",
  "datenschutz",
  "diskriminierungsverbot",
  "freiheit-und-autonomie",
  "solidaritaet-und-kohaesion",
  "integritaet",
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
      <Link href="/ueber-uns/faq" className="block hover:text-white transition-colors">{t("faq")}</Link>
      <a href="mailto:uccelli.society@gmail.com" className="block hover:text-white transition-colors">{t("email")}</a>
      <Link href="/kontakt" className="block hover:text-white transition-colors">{t("findUs")}</Link>
    </div>
  );

  const werteContent = (
    <div className="space-y-2.5 text-[13px] text-neutral-400">
      {werteKeys.map((key) => (
        <Link key={key} href={`/werte/${key}`} className="block hover:text-white transition-colors">{t(`werteLabels.${key}`)}</Link>
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
            { href: "https://www.linkedin.com/company/uccelli-society", label: "LinkedIn",
              path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" },
            { href: "https://www.instagram.com/uccelli_society/", label: "Instagram",
              path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
            { href: "https://www.facebook.com/uccellisociety", label: "Facebook",
              path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
          ].map(({ href, label, path }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
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
