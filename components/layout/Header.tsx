"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavChild {
  key: string;
  href: string;
}

interface NavItem {
  key: string;
  href?: string;
  children?: NavChild[];
}

const navLeft: NavItem[] = [
  { key: "skills4growth", href: "/skills4growth" },
  {
    key: "programm",
    children: [
      { key: "projekte", href: "/programm/projekte" },
      { key: "veranstaltungen", href: "/programm/veranstaltungen" },
      { key: "kursangebote", href: "/programm/kursangebote" },
      { key: "news", href: "/programm/news" },
    ],
  },
];

const navRight: NavItem[] = [
  {
    key: "netzwerk",
    href: "/netzwerk",
    children: [
      { key: "uccelliWomen", href: "/netzwerk#uccelli-women" },
      { key: "uccelliGhana", href: "/netzwerk#uccelli-ghana" },
      { key: "uccelliFC", href: "/netzwerk#uccelli-fc" },
      { key: "nightshift", href: "/netzwerk#nightshift" },
    ],
  },
  {
    key: "ueberUns",
    children: [
      { key: "vorstand", href: "/ueber-uns/vorstand" },
      { key: "partnerSponsoren", href: "/ueber-uns/partner" },
      { key: "faq", href: "/ueber-uns/faq" },
    ],
  },
  { key: "kontakt", href: "/kontakt" },
];

function DesktopDropdown({
  label,
  items,
  t,
}: {
  label: string;
  items: NavChild[];
  t: (key: string) => string;
}) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-sm hover:opacity-70 transition-opacity py-2">
        {label}
        <ChevronDown size={14} />
      </button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-white border border-neutral-200 rounded-lg shadow-lg py-2 min-w-[200px]">
          {items.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="block px-4 py-2 text-sm hover:bg-neutral-50 transition-colors"
            >
              {t(item.key)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  items,
  t,
}: {
  label: string;
  items: NavChild[];
  t: (key: string) => string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-lg"
      >
        {label}
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2 space-y-1">
              {items.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="block py-2 text-base text-neutral-600 hover:text-black transition-colors"
                >
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavItem = (item: NavItem) => {
    const label = t(item.key);

    if (item.children) {
      return (
        <DesktopDropdown key={item.key} label={label} items={item.children} t={t} />
      );
    }

    return (
      <a
        key={item.key}
        href={item.href!}
        className="text-sm hover:opacity-70 transition-opacity py-2"
      >
        {label}
      </a>
    );
  };

  const allMobileItems: NavItem[] = [
    ...navLeft,
    ...navRight,
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
      {/* Desktop Navigation — Split Menu */}
      <nav className="hidden lg:flex items-center h-16 px-8 relative max-w-[1400px] mx-auto">
        <div className="flex-1 flex items-center justify-end gap-8 pr-12">
          {navLeft.map(renderNavItem)}
        </div>

        {/* Centered Logo (absolutely positioned for symmetry) */}
        <a
          href="/"
          className="absolute left-1/2 -translate-x-1/2 z-10"
          aria-label="Uccelli Society Home"
        >
          <span className="text-xl font-bold tracking-wider">✦UCCELLI</span>
        </a>

        <div className="flex-1 flex items-center justify-start gap-8 pl-12">
          {navRight.map(renderNavItem)}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between h-14 px-5">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1 -ml-1"
          aria-label={mobileOpen ? "Menü schliessen" : "Menü öffnen"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <a href="/" className="font-bold tracking-wider">
          ✦UCCELLI
        </a>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-14 bg-white z-40 overflow-y-auto"
          >
            <div className="px-5 py-6 space-y-1">
              <a href="/" className="block py-3 text-lg">
                {t("home")}
              </a>

              {allMobileItems.map((item) =>
                item.children ? (
                  <MobileAccordion
                    key={item.key}
                    label={t(item.key)}
                    items={item.children}
                    t={t}
                  />
                ) : (
                  <a key={item.key} href={item.href!} className="block py-3 text-lg">
                    {t(item.key)}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
