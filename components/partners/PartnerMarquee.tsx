import Image from "next/image";
import type { Partner } from "@/lib/data";

export function PartnerMarquee({ title, partners }: { title: string; partners: Partner[] }) {
  if (partners.length === 0) return null;
  const repeated = [...partners, ...partners];

  return (
    <section className="py-16 lg:py-20 border-y border-neutral-100 overflow-hidden" aria-labelledby="partner-marquee-title">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-8">
        <h2 id="partner-marquee-title" className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 text-center">{title}</h2>
      </div>
      <div className="partner-marquee group relative overflow-hidden focus-within:[--marquee-state:paused] hover:[--marquee-state:paused]">
        <div className="partner-marquee-track flex w-max items-center gap-10 lg:gap-16 px-5">
          {repeated.map((partner, index) => {
            const duplicate = index >= partners.length;
            const content = partner.logo ? (
              <Image src={partner.logo} alt={duplicate ? "" : partner.name} width={180} height={72} className="h-12 lg:h-14 w-auto max-w-[180px] object-contain" />
            ) : (
              <span className="text-lg lg:text-xl font-bold whitespace-nowrap text-neutral-700">{partner.name}</span>
            );

            return partner.url ? (
              <a key={`${partner.name}-${index}`} href={partner.url} target="_blank" rel="noopener noreferrer" aria-hidden={duplicate || undefined} tabIndex={duplicate ? -1 : undefined} className="h-20 min-w-[180px] px-6 flex items-center justify-center rounded-[12px] border border-neutral-100 bg-white hover:border-neutral-300 transition-colors">
                {content}
              </a>
            ) : (
              <div key={`${partner.name}-${index}`} aria-hidden={duplicate || undefined} className="h-20 min-w-[180px] px-6 flex items-center justify-center rounded-[12px] border border-neutral-100 bg-white">
                {content}
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .partner-marquee { --marquee-state: running; }
        .partner-marquee-track { animation: partner-marquee 32s linear infinite; animation-play-state: var(--marquee-state); }
        @keyframes partner-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .partner-marquee-track { animation: none; flex-wrap: wrap; width: auto; justify-content: center; }
          .partner-marquee-track > :nth-child(n + 1) { }
        }
      `}</style>
    </section>
  );
}
