"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { key: "projects", href: "/projekte" },
  { key: "community", href: "/community" },
  { key: "news", href: "/news" },
  { key: "about", href: "/ueber-uns" },
] as const;

function localePath(path: string, locale: string) {
  return locale === "de" ? path : path === "/" ? `/${locale}` : `/${locale}${path}`;
}

function Logo() {
  return <span className="font-bold tracking-[0.15em] uppercase">Uccelli</span>;
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <>
      <header className="border-b border-neutral-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 h-[64px] lg:h-[72px] flex items-center justify-between gap-8">
          <Link href={localePath("/", locale)} aria-label={t("home")} className="text-[17px] lg:text-[18px]">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label={t("primaryNavigation")}>
            {links.map((link) => (
              <Link key={link.key} href={localePath(link.href, locale)} className="text-[13px] font-medium uppercase tracking-wide hover:opacity-60 transition-opacity">
                {t(link.key)}
              </Link>
            ))}
            <Link href={localePath("/teil-werden", locale)} className="rounded-full bg-black text-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide hover:bg-neutral-800 transition-colors">
              {t("join")}
            </Link>
            <LanguageSwitcher />
          </nav>

          <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen(true)} aria-label={t("menuOpen")} aria-expanded={open}>
            <Menu size={22} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 bg-white z-[100] lg:hidden overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="px-5 h-[64px] border-b border-neutral-100 flex items-center justify-between">
              <Link href={localePath("/", locale)} onClick={() => setOpen(false)}><Logo /></Link>
              <button className="p-2 -mr-2" onClick={() => setOpen(false)} aria-label={t("menuClose")}><X size={22} /></button>
            </div>
            <nav className="px-5 py-8" aria-label={t("primaryNavigation")}>
              {links.map((link) => (
                <Link key={link.key} href={localePath(link.href, locale)} onClick={() => setOpen(false)} className="block py-4 border-b border-neutral-100 text-[19px] font-medium">
                  {t(link.key)}
                </Link>
              ))}
              <Link href={localePath("/teil-werden", locale)} onClick={() => setOpen(false)} className="block mt-8 text-center rounded-full bg-black text-white px-5 py-4 text-[13px] font-bold uppercase tracking-wide">
                {t("join")}
              </Link>
              <div className="mt-8"><LanguageSwitcher /></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
