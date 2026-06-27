import { ScrollReveal } from "@/components/ui/ScrollReveal";

const sponsors = [
  { name: "GZ Höngg", href: "/ueber-uns/partner" },
  { name: "Royal Studio", href: "/ueber-uns/partner" },
  { name: "Anker Swiss AG", href: "/ueber-uns/partner" },
  { name: "Hosttech", href: "/ueber-uns/partner" },
  { name: "GymOne", href: "/ueber-uns/partner" },
  { name: "Fröhliche Info", href: "/ueber-uns/partner" },
];

export function SponsorBanner({ title = "Unsere Partner & Sponsoren" }: { title?: string }) {
  return (
    <section className="bg-black py-16 lg:py-20">
      <ScrollReveal>
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10">
          {title}
        </p>
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-8 px-6 lg:px-10">
          {sponsors.map((s) => (
            <a
              key={s.name}
              href={s.href}
              className="text-neutral-600 hover:text-neutral-300 transition-colors duration-300"
            >
              {/* Replace with actual SVG logos later */}
              <span className="text-[18px] lg:text-[22px] font-bold tracking-wide whitespace-nowrap">
                {s.name}
              </span>
            </a>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
