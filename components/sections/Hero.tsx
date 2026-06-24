"use client";

import { cn } from "@/lib/cn";
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

export function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  variant = "gradient",
  imageSrc,
  className,
}: HeroProps) {
  if (variant === "cutout") {
    return (
      <section
        className={cn(
          "relative min-h-[60vh] lg:min-h-[70vh] flex items-end",
          className
        )}
      >
        {/* White top + black bottom creates the cutout effect */}
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-brand-black" />
        </div>
        <div className="relative z-10 px-5 lg:px-8 pb-16 lg:pb-24 max-w-[1400px] mx-auto w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-lato uppercase leading-[0.95] tracking-tight">
            {title.split(" ").map((word, i) => (
              <span key={i} className="inline-block">
                <span className="bg-brand-black text-brand-white px-2 py-1 inline-block">
                  {word}
                </span>{" "}
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
        <div className="px-5 lg:px-8 pt-12 pb-8 max-w-[1400px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-lato uppercase">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-neutral-600 max-w-xl">{subtitle}</p>
          )}
        </div>
        {imageSrc && (
          <div className="w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
            <img
              src={imageSrc}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </section>
    );
  }

  // Default: gradient variant (fullscreen dark with gradient)
  return (
    <section
      className={cn(
        "relative min-h-[80vh] lg:min-h-screen flex items-end bg-gradient-to-b from-neutral-400 to-brand-black",
        className
      )}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
      )}
      <div className="relative z-10 px-5 lg:px-8 pb-12 lg:pb-20 max-w-[1400px] mx-auto w-full">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-lato uppercase text-white leading-[0.95] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-neutral-300 max-w-xl">{subtitle}</p>
        )}
        {ctaText && (
          <div className="mt-8">
            <Button variant="secondary" href={ctaHref}>
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
