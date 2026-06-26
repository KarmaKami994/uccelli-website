"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavChild { key: string; href: string }
interface NavItem { key: string; href?: string; children?: NavChild[] }

const navLeft: NavItem[] = [
  { key: "skills4growth", href: "/skills4growth" },
  { key: "programm", children: [
    { key: "projekte", href: "/programm/projekte" },
    { key: "veranstaltungen", href: "/programm/veranstaltungen" },
    { key: "kursangebote", href: "/programm/kursangebote" },
    { key: "news", href: "/programm/news" },
  ]},
];

const navRight: NavItem[] = [
  { key: "netzwerk", href: "/netzwerk", children: [
    { key: "uccelliWomen", href: "/netzwerk#uccelli-women" },
    { key: "uccelliGhana", href: "/netzwerk#uccelli-ghana" },
    { key: "uccelliFC", href: "/netzwerk#uccelli-fc" },
    { key: "nightshift", href: "/netzwerk#nightshift" },
  ]},
  { key: "ueberUns", children: [
    { key: "vorstand", href: "/ueber-uns/vorstand" },
    { key: "partnerSponsoren", href: "/ueber-uns/partner" },
    { key: "faq", href: "/ueber-uns/faq" },
  ]},
  { key: "kontakt", href: "/kontakt" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold tracking-[0.15em] uppercase text-black select-none ${className}`}>
      <span className="text-[1.1em] mr-[1px]">✦</span>UCCELLI
    </span>
  );
}

function DesktopDropdown({ label, items, t }: { label: string; items: NavChild[]; t: (k: string) => string }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-[13px] font-medium tracking-wide uppercase hover:opacity-60 transition-opacity py-2 cursor-pointer">
        {label}
        <ChevronDown size={12} className="opacity-50" />
      </button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-white border border-neutral-200 rounded-lg shadow-xl py-2 min-w-[220px]">
          {items.map((item) => (
            <a key={item.key} href={item.href}
              className="block px-5 py-2.5 text-[13px] text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors">
              {t(item.key)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({ label, items, t }: { label: string; items: NavChild[]; t: (k: string) => string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-100">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-[17px] font-medium cursor-pointer">
        {label}
        {open ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pl-4 pb-4 space-y-0.5">
              {items.map((item) => (
                <a key={item.key} href={item.href}
                  className="block py-2.5 text-[15px] text-neutral-500 hover:text-black transition-colors">
                  {t(item.key)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavItem = (item: NavItem) => {
    if (item.children) return <DesktopDropdown key={item.key} label={t(item.key)} items={item.children} t={t} />;
    return (
      <a key={item.key} href={item.href!}
        className="text-[13px] font-medium tracking-wide uppercase hover:opacity-60 transition-opacity py-2">
        {t(item.key)}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      {/* Desktop */}
      <nav className="hidden lg:flex items-center h-[72px] px-10 relative max-w-[1400px] mx-auto">
        <div className="flex-1 flex items-center justify-end gap-10 pr-16">
          {navLeft.map(renderNavItem)}
        </div>
        <a href="/" className="absolute left-1/2 -translate-x-1/2 z-10" aria-label="Home">
          <Logo className="text-[18px]" />
        </a>
        <div className="flex-1 flex items-center justify-start gap-10 pl-16">
          {navRight.map(renderNavItem)}
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </nav>

      {/* Mobile */}
      <nav className="lg:hidden flex items-center justify-between h-[60px] px-5">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5 -ml-1.5 cursor-pointer"
          aria-label={mobileOpen ? "Menü schliessen" : "Menü öffnen"}>
          {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
        <a href="/" aria-label="Home"><Logo className="text-[16px]" /></a>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto">
            <div className="px-6 pt-2 pb-10">
              <a href="/" className="block py-4 text-[17px] font-medium border-b border-neutral-100">{t("home")}</a>
              {[...navLeft, ...navRight].map((item) =>
                item.children ? (
                  <MobileAccordion key={item.key} label={t(item.key)} items={item.children} t={t} />
                ) : (
                  <a key={item.key} href={item.href!}
                    className="block py-4 text-[17px] font-medium border-b border-neutral-100">{t(item.key)}</a>
                )
              )}
              <div className="pt-6 flex justify-center">
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
