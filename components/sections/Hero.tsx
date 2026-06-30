"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

type HeroVariant = "gradient" | "split" | "cutout";

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  variant?: HeroVariant;
  imageSrc?: string;
  className?: string;
}

export function Hero({ title, subtitle, ctaText, ctaHref, variant = "gradient", imageSrc, className }: HeroProps) {
  if (variant === "cutout") {
    return (
      <section className={cn("relative min-h-[50vh] lg:min-h-[65vh] flex items-center", className)}>
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-black" />
        </div>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-10">
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight">
            {title.split(/\s+/).map((word, i) => (
              <span key={i} className="inline-block mr-3 mb-2">
                <span className="bg-black text-white px-3 py-1 inline-block">{word}</span>
              </span>
            ))}
          </h1>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className={cn("", className)}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-16 pb-10">
          <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight">{title}</h1>
          {subtitle && <p className="mt-5 text-lg text-neutral-500 max-w-xl leading-relaxed">{subtitle}</p>}
        </div>
        {imageSrc && (
          <div className="w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden relative">
            <Image src={imageSrc} alt="" fill className="object-cover" sizes="100vw" priority />
          </div>
        )}
      </section>
    );
  }

  // gradient — fullscreen hero
  return (
    <section className={cn("relative min-h-[85vh] lg:min-h-screen flex items-end overflow-hidden", className)}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-500 via-neutral-800 to-black" />
      {/* Subtle noise texture via CSS */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      {imageSrc && (
        <Image src={imageSrc} alt="" fill className="object-cover mix-blend-overlay opacity-30" sizes="100vw" priority />
      )}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-10 pb-16 lg:pb-24">
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase text-white leading-[0.92] tracking-tight max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-[clamp(1rem,2vw,1.25rem)] text-neutral-300 max-w-xl leading-relaxed">{subtitle}</p>
        )}
        {ctaText && (
          <div className="mt-10">
            <Button variant="secondary" size="lg" href={ctaHref}>{ctaText}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
