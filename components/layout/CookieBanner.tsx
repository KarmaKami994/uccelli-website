"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const CONSENT_KEY = "uccelli-cookie-consent";

type ConsentState = "pending" | "accepted" | "rejected";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [consent, setConsent] = useState<ConsentState>("accepted"); // Default to accepted to avoid flash

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setConsent("pending");
    } else {
      setConsent(stored as ConsentState);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    // TODO: Initialize analytics or other consent-dependent scripts here
  }

  function handleReject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
  }

  if (consent !== "pending") return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-neutral-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-label="Cookie-Einstellungen"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-[14px] font-medium mb-1">{t("title")}</p>
            <p className="text-[13px] text-neutral-500 leading-relaxed">
              {t("text")}{" "}
              <Link href="/datenschutz" className="underline hover:text-black transition-colors">{t("privacy")}</Link>
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="text-[12px] font-bold uppercase tracking-[0.1em] text-neutral-500 hover:text-black transition-colors py-2 px-4 cursor-pointer"
            >
              {t("reject")}
            </button>
            <Button variant="primary" onClick={handleAccept}>
              {t("accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
