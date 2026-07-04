"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SocialIcons } from "@/components/ui/SocialIcons";

export interface FooterWert {
  title: string;
  slug: string;
}

function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-neutral-800 lg:hidden">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
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

/**
 * Footer. The Werte links come from the CMS (`werte` collection) via the
 * layout — editing a Wert in Payload updates the footer automatically.
 */
export function Footer({ werte = [] }: { werte?: FooterWert[] }) {
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
      {werte.map((w) => (
        <Link key={w.slug} href={`/werte/${w.slug}`} className="block hover:text-white transition-colors">{w.title}</Link>
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

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-12 pb-8">
        {/* Desktop: 3-column grid — always visible */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-10 lg:pb-10">
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("kontakt")}</h4>
            {kontaktContent}
          </div>
          {werte.length > 0 && (
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("werte")}</h4>
              {werteContent}
            </div>
          )}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("unterstuetzen")}</h4>
            {supportContent}
          </div>
        </div>

        {/* Mobile: accordion sections */}
        <MobileSection title={t("kontakt")}>{kontaktContent}</MobileSection>
        {werte.length > 0 && <MobileSection title={t("werte")}>{werteContent}</MobileSection>}
        <MobileSection title={t("unterstuetzen")}>{supportContent}</MobileSection>

        {/* Social icons */}
        <div className="flex items-center justify-center py-8 mt-4 border-t border-neutral-800">
          <SocialIcons variant="light" size={18} />
        </div>
      </div>

      {/* Copyright bar */}
      <div className="text-center py-6 border-t border-neutral-900">
        <p className="text-[11px] text-neutral-600 tracking-wide">{t("copyright")}</p>
      </div>
    </footer>
  );
}
