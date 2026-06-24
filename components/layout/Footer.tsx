"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function FooterAccordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-neutral-700">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-sm font-bold uppercase tracking-wider"
      >
        {title}
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {/* Desktop: always visible. Mobile: accordion */}
      <div className="hidden lg:block pb-4">{children}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const werte = [
  { label: "Schutz der Umwelt", href: "/werte/schutz-der-umwelt" },
  { label: "Datenschutz", href: "/werte/datenschutz" },
  { label: "Diskriminierungsverbot", href: "/werte/diskriminierungsverbot" },
  { label: "Freiheit und Autonomie", href: "/werte/freiheit-und-autonomie" },
  {
    label: "Solidarität und Kohäsion",
    href: "/werte/solidaritaet-und-kohaesion",
  },
  { label: "Integrität", href: "/werte/integritaet" },
];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-brand-black text-brand-white">
      {/* Mobile: Accordion layout / Desktop: Multi-column */}
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Kontakt */}
          <FooterAccordion title={t("kontakt")} defaultOpen>
            <div className="space-y-2 text-sm text-neutral-300">
              <a href="/ueber-uns/faq" className="block hover:text-white transition-colors">
                {t("faq")}
              </a>
              <a href="mailto:uccelli.society@gmail.com" className="block hover:text-white transition-colors underline">
                {t("email")}
              </a>
              <a href="/kontakt" className="block hover:text-white transition-colors underline">
                {t("findUs")}
              </a>
            </div>
          </FooterAccordion>

          {/* Unsere Werte */}
          <FooterAccordion title={t("werte")}>
            <div className="space-y-2 text-sm text-neutral-300">
              {werte.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </FooterAccordion>

          {/* Unterstütze Uns */}
          <FooterAccordion title={t("unterstuetzen")}>
            <div className="text-sm text-neutral-300 space-y-2">
              <p>{t("unterstuetzenText")}</p>
              <div className="space-y-1">
                <p>
                  <span className="text-neutral-400">{t("empfaenger")}:</span>{" "}
                  Verein Uccelli
                </p>
                <p>
                  <span className="text-neutral-400">{t("kontoNr")}:</span>{" "}
                  1148-5358.899
                </p>
                <p>
                  <span className="text-neutral-400">IBAN:</span> CH53 0070 0114
                  8053 5889 9
                </p>
              </div>
            </div>
          </FooterAccordion>

          {/* Download */}
          <FooterAccordion title={t("download")}>
            <a
              href="/vereinsstatuten.pdf"
              className="text-sm text-neutral-300 underline hover:text-white transition-colors"
              download
            >
              {t("vereinsstatuten")}
            </a>
          </FooterAccordion>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 py-6 mt-4 border-t border-neutral-700">
          <a
            href="https://www.linkedin.com/company/uccelli-society"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full border border-neutral-500 flex items-center justify-center hover:border-white transition-colors"
          >
            <span className="text-sm font-bold">in</span>
          </a>
          <a
            href="https://www.instagram.com/uccelli_society/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full border border-neutral-500 flex items-center justify-center hover:border-white transition-colors"
          >
            <span className="text-sm">📷</span>
          </a>
          <a
            href="https://www.facebook.com/uccellisociety"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full border border-neutral-500 flex items-center justify-center hover:border-white transition-colors"
          >
            <span className="text-sm font-bold">f</span>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-6 border-t border-neutral-800">
        <span className="text-lg font-bold">✦U</span>
        <p className="text-xs text-neutral-400 mt-2">{t("copyright")}</p>
      </div>
    </footer>
  );
}
