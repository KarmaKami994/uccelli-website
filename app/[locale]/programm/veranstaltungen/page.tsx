import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = { title: "Veranstaltungen – Uccelli Society", description: "Kommende Events des Verein Uccelli." };

export default async function VeranstaltungenPage() {
  const t = await getTranslations("events");
  const events = await getEvents();

  return (
    <>
      <Hero title="VERANSTALTUNGEN" variant="split" subtitle={t("subtitle")} />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((e, i) => (
                <div key={i} className="p-6 border border-neutral-200 rounded-[12px] flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{e.title}</h3>
                    {e.location && <p className="text-neutral-500 text-[14px] mt-1">{e.location}</p>}
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-wide text-neutral-400 flex-shrink-0 ml-4">{e.date}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 border border-dashed border-neutral-300 rounded-[12px] text-center">
              <p className="text-neutral-400 text-lg">{t("empty")}</p>
              <p className="text-neutral-400 text-[14px] mt-2">{t("emptyHint")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
