import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface SponsorBannerProps {
  title: string;
  /** Partner/sponsor names from the Payload `partners` collection. */
  names: string[];
}

export function SponsorBanner({ title, names }: SponsorBannerProps) {
  if (names.length === 0) return null;

  return (
    <section className="bg-black py-16 lg:py-20">
      <ScrollReveal>
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10">
          {title}
        </p>
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-8 px-6 lg:px-10">
          {names.map((name) => (
            <Link
              key={name}
              href="/ueber-uns/partner"
              className="text-neutral-600 hover:text-neutral-300 transition-colors duration-300"
            >
              <span className="text-[18px] lg:text-[22px] font-bold tracking-wide whitespace-nowrap">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
