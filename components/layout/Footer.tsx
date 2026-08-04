"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { LanguageSwitcher } from "./LanguageSwitcher";

function localePath(path: string, locale: string) {
  return locale === "de" ? path : path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const linkClass = "block text-[13px] text-neutral-400 hover:text-white transition-colors";

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <p className="font-bold tracking-[0.15em] uppercase mb-5">Uccelli Society</p>
            <p className="text-[13px] text-neutral-400 leading-relaxed max-w-xs">{t("intro")}</p>
            <div className="mt-5"><SocialIcons variant="light" size={18} /></div>
          </div>

          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("discover")}</h2>
            <div className="space-y-2.5">
              <Link href={localePath("/projekte", locale)} className={linkClass}>{t("projects")}</Link>
              <Link href={localePath("/community", locale)} className={linkClass}>{t("community")}</Link>
              <Link href={localePath("/news", locale)} className={linkClass}>{t("news")}</Link>
              <Link href={localePath("/ueber-uns", locale)} className={linkClass}>{t("about")}</Link>
            </div>
          </div>

          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("participate")}</h2>
            <div className="space-y-2.5">
              <Link href={localePath("/teil-werden", locale)} className={linkClass}>{t("join")}</Link>
              <Link href={localePath("/kontakt", locale)} className={linkClass}>{t("contact")}</Link>
              <a href="mailto:uccelli.society@gmail.com" className={linkClass}>uccelli.society@gmail.com</a>
              <a href="https://uccelli-society.ch/wp-content/uploads/2021/12/Vereinsstatuten.docx-1-Exported.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>{t("statutes")}</a>
              <Link href={localePath("/datenschutz", locale)} className={linkClass}>{t("privacy")}</Link>
              <Link href={localePath("/impressum", locale)} className={linkClass}>{t("imprint")}</Link>
            </div>
          </div>

          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] mb-5">{t("support")}</h2>
            <div className="text-[13px] text-neutral-400 space-y-2 leading-relaxed">
              <p>{t("supportText")}</p>
              <p><span className="text-neutral-500">{t("recipient")}:</span> Verein Uccelli</p>
              <p><span className="text-neutral-500">{t("account")}:</span> 1148-5358.899</p>
              <p><span className="text-neutral-500">IBAN:</span> CH53 0070 0114 8053 5889 9</p>
            </div>
            <div className="mt-6"><LanguageSwitcher /></div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 text-center py-6 px-6">
        <p className="text-[11px] text-neutral-600 tracking-wide">{t("copyright")}</p>
      </div>
    </footer>
  );
}
