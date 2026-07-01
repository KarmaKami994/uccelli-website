"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; order: number; openInNewTab?: boolean; children: NavChild[] };

function Logo({ className = "" }: { className?: string }) {
  return <span className={`font-bold tracking-[0.15em] uppercase ${className}`}>Uccelli</span>;
}

// ─── Desktop Dropdown ────────────────────────────────────

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (item.children.length === 0) {
    return (
      <Link href={item.href || "/"} className="text-[13px] font-medium tracking-wide uppercase hover:opacity-60 transition-opacity py-2"
        target={item.openInNewTab ? "_blank" : undefined} rel={item.openInNewTab ? "noopener noreferrer" : undefined}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link href={item.href || item.children[0]?.href || "/"}
        className="text-[13px] font-medium tracking-wide uppercase hover:opacity-60 transition-opacity py-2 flex items-center gap-1">
        {item.label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }} className="absolute top-full left-0 pt-2 z-50">
            <div className="bg-white border border-neutral-200 rounded-lg shadow-xl py-2 min-w-[220px]">
              {item.children.map((child) => (
                <Link key={child.href} href={child.href}
                  className="block px-5 py-2.5 text-[13px] text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors">
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Accordion ────────────────────────────────────

function MobileAccordion({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  if (item.children.length === 0) {
    return (
      <Link href={item.href || "/"} onClick={onNavigate}
        className="block py-4 text-[17px] font-medium border-b border-neutral-100">
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-neutral-100">
      <div className="flex items-center">
        <Link href={item.href || item.children[0]?.href || "/"} onClick={onNavigate}
          className="flex-1 py-4 text-[17px] font-medium">
          {item.label}
        </Link>
        <button onClick={() => setOpen(!open)} className="p-3 cursor-pointer" aria-label={open ? "Untermenü schliessen" : "Untermenü öffnen"}>
          {open ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pl-4 pb-4 space-y-0.5">
              {item.children.map((child) => (
                <Link key={child.href} href={child.href} onClick={onNavigate}
                  className="block py-2.5 text-[15px] text-neutral-500 hover:text-black transition-colors">
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────

export function Header({ navItems = [] }: { navItems?: NavItem[] }) {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Split nav items for the split-menu layout: left half + right half + last item
  const midpoint = Math.ceil(navItems.length / 2);
  const leftItems = navItems.slice(0, midpoint);
  const rightItems = navItems.slice(midpoint);

  return (
    <>
      {/* Desktop */}
      <header className="hidden lg:block border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-10 h-[72px] flex items-center justify-between relative">
          <nav className="flex items-center gap-8">
            {leftItems.map((item) => <DesktopDropdown key={item.label} item={item} />)}
          </nav>
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 z-10" aria-label="Home">
            <Logo className="text-[18px]" />
          </Link>
          <nav className="flex items-center gap-8">
            {rightItems.map((item) => <DesktopDropdown key={item.label} item={item} />)}
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Mobile Bar */}
      <header className="lg:hidden border-b border-neutral-100">
        <div className="px-5 h-[60px] flex items-center justify-between">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5 -ml-1.5 cursor-pointer"
            aria-label={mobileOpen ? t("menuClose") : t("menuOpen")}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <Link href="/" aria-label="Home"><Logo className="text-[16px]" /></Link>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] lg:hidden overflow-y-auto">
            <div className="px-5">
              <div className="h-[60px] flex items-center justify-between">
                <button onClick={() => setMobileOpen(false)} className="p-1.5 -ml-1.5 cursor-pointer" aria-label={t("menuClose")}>
                  <X size={22} />
                </button>
                <Link href="/" aria-label="Home" onClick={() => setMobileOpen(false)}><Logo className="text-[16px]" /></Link>
              </div>
              <nav className="py-4">
                <Link href="/" onClick={() => setMobileOpen(false)}
                  className="block py-4 text-[17px] font-medium border-b border-neutral-100">Home</Link>
                {navItems.map((item) => (
                  <MobileAccordion key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
                ))}
                <div className="py-6"><LanguageSwitcher /></div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
