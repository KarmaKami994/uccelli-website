import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getCourses } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return pageMetadata({
    title: "Kursangebote – Uccelli Society",
    description: "Kurse zu Psychologie, Sport, Finanzen und IT.",
    path: "/programm/kursangebote",
    locale,
  });
}

export default async function KursangebotePage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("kursangebote");
  const courses = await getCourses(locale);

  return (
    <>
      <Hero title="KURS ANGEBOTE" variant="cutout" />
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <ScrollReveal className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold mb-5">{t("subtitle")}</h2>
          <p className="text-neutral-600 leading-relaxed">{t("intro")}</p>
        </ScrollReveal>
      </section>
      <section className="py-16 lg:py-24 px-6 lg:px-10 bg-black text-white">
        <StaggerReveal className="max-w-[600px] mx-auto space-y-5" stagger={0.1}>
          {courses.map((c) => (
            <div key={c.name} className="border border-neutral-700 rounded-[12px] p-6 hover:border-neutral-500 transition-colors">
              <h3 className="font-bold text-[15px] uppercase tracking-wide mb-2">{c.name}</h3>
              <p className="text-[14px] text-neutral-400 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </StaggerReveal>
      </section>
    </>
  );
}
