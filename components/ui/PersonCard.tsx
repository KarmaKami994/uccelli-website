"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X } from "lucide-react";
import { RichTextRenderer } from "./RichTextRenderer";
import type { RichTextContent } from "@/lib/richtext";

interface PersonCardProps {
  name: string;
  role: string;
  imageSrc?: string;
  bio?: RichTextContent | null;
}

export function PersonCard({ name, role, imageSrc, bio }: PersonCardProps) {
  const t = useTranslations("common");
  const [showBio, setShowBio] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasBio = Boolean(bio?.root?.children?.length);

  // Modal a11y: focus the close button on open, close on Escape.
  useEffect(() => {
    if (!showBio) return;
    closeButtonRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowBio(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showBio]);

  return (
    <>
      <div
        className={`text-center group ${hasBio ? "cursor-pointer" : ""}`}
        onClick={() => hasBio && setShowBio(true)}
        role={hasBio ? "button" : undefined}
        tabIndex={hasBio ? 0 : undefined}
        onKeyDown={(e) => {
          if (hasBio && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setShowBio(true);
          }
        }}
      >
        <div className="aspect-[3/4] w-full max-w-[280px] mx-auto overflow-hidden rounded-[4px] bg-neutral-200 mb-5 relative">
          {imageSrc ? (
            <Image src={imageSrc} alt={name} fill
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
              sizes="280px" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
              <span className="text-5xl font-bold text-neutral-400/50">{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold uppercase tracking-wide">{name}</h3>
        <p className="text-[14px] text-neutral-500 mt-1">{role}</p>
        {hasBio && <p className="text-[12px] text-brand-accent-accessible mt-2 font-medium">{t("moreInfo")}</p>}
      </div>

      {showBio && hasBio && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-6"
          onClick={() => setShowBio(false)}>
          <div
            className="bg-white rounded-[12px] max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 relative"
            role="dialog"
            aria-modal="true"
            aria-label={name}
            onClick={(e) => e.stopPropagation()}
          >
            <button ref={closeButtonRef} onClick={() => setShowBio(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              aria-label={t("close")}>
              <X size={20} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              {imageSrc && <Image src={imageSrc} alt={name} width={64} height={64} className="rounded-full object-cover" />}
              <div>
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-[14px] text-neutral-500">{role}</p>
              </div>
            </div>
            <RichTextRenderer content={bio} className="text-[15px] text-neutral-700 leading-relaxed" />
          </div>
        </div>
      )}
    </>
  );
}
