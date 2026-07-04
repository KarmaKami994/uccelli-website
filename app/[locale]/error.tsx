"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

/**
 * Error boundary: infrastructure/database errors surface here instead of
 * silently rendering an empty page (the data layer no longer swallows them).
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error("[page error]", error);
  }, [error]);

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-10 text-center">
      <div className="max-w-[600px] mx-auto">
        <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-bold mb-5">{t("title")}</h1>
        <p className="text-neutral-500 mb-10">{t("text")}</p>
        <Button variant="primary" onClick={reset}>{t("retry")}</Button>
      </div>
    </section>
  );
}
