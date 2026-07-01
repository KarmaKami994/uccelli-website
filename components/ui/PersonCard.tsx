"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X } from "lucide-react";
import { LexicalRenderer } from "./LexicalRenderer";

interface PersonCardProps {
  name: string;
  role: string;
  imageSrc?: string;
  bio?: any;
}

export function PersonCard({ name, role, imageSrc, bio }: PersonCardProps) {
  const t = useTranslations("common");
  const [showBio, setShowBio] = useState(false);
  const hasBio = bio && (typeof bio === "string" ? bio.length > 0 : bio.root?.children?.length > 0);

  return (
    <>
      <div
        className={`text-center group ${hasBio ? "cursor-pointer" : ""}`}
        onClick={() => hasBio && setShowBio(true)}
        role={hasBio ? "button" : undefined}
        tabIndex={hasBio ? 0 : undefined}
        onKeyDown={(e) => hasBio && e.key === "Enter" && setShowBio(true)}
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
          <div className="bg-white rounded-[12px] max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowBio(false)}
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

            {typeof bio === "string" ? (
              <p className="text-[15px] text-neutral-700 leading-relaxed">{bio}</p>
            ) : (
              <LexicalRenderer
                data={bio}
                className="text-[15px] text-neutral-700 leading-relaxed
                  [&_p]:mb-3 [&_p:last-child]:mb-0
                  [&_strong]:font-bold
                  [&_em]:italic
                  [&_u]:underline
                  [&_s]:line-through
                  [&_a]:text-brand-accent-accessible [&_a]:underline
                  [&_h2]:text-[18px] [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2
                  [&_h3]:text-[16px] [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2
                  [&_h4]:text-[15px] [&_h4]:font-bold [&_h4]:mt-3 [&_h4]:mb-1
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                  [&_li]:mb-1
                  [&_blockquote]:border-l-2 [&_blockquote]:border-neutral-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-500 [&_blockquote]:mb-3
                  [&_hr]:border-neutral-200 [&_hr]:my-4
                  [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:font-mono"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
