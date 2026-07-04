import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getUpcomingEvents } from "@/lib/data";
import { formatEventDate } from "@/lib/format";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "Veranstaltungen – Uccelli Society",
    description: "Kommende Veranstaltungen und Events des Verein Uccelli.",
    path: "/programm/veranstaltungen",
    locale,
  });
}

export default async function VeranstaltungenPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("events");
  const events = await getUpcomingEvents(locale);

  return (
    <>
      <Hero title="VERANSTALTUNGEN" variant="split" subtitle={t("subtitle")} />
      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          {events.length === 0 ? (
            <ScrollReveal className="text-center py-16 border border-dashed border-neutral-300 rounded-[12px]">
              <p className="text-lg font-bold mb-2">{t("empty")}</p>
              <p className="text-neutral-500">{t("emptyHint")}</p>
            </ScrollReveal>
          ) : (
            <StaggerReveal className="space-y-6">
              {events.map((event) => (
                <article key={`${event.title}-${event.date}`} className="border border-neutral-200 rounded-[12px] p-8 hover:border-neutral-400 transition-colors">
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand-accent-accessible mb-2">
                    {formatEventDate(event.date, locale)}
                    {event.location && <span className="text-neutral-400"> · {event.location}</span>}
                  </p>
                  <h2 className="text-xl font-bold mb-3">{event.title}</h2>
                  {event.description && (
                    <RichTextRenderer content={event.description} className="text-[15px] text-neutral-600 leading-relaxed" />
                  )}
                </article>
              ))}
            </StaggerReveal>
          )}
        </div>
      </section>
    </>
  );
}
