import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, FileText, ShieldCheck } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { getCvCreatorFallback } from "@/lib/cv-creator";
import { getCommunityItemBySlug } from "@/lib/data";
import { toLocale } from "@/lib/payload";
import { localizedPath, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const item = (await getCommunityItemBySlug("cv-creator", locale)) ?? getCvCreatorFallback(locale);

  return pageMetadata({
    title: "CV Creator – Uccelli Society",
    description: item.summary,
    path: "/community/cv-creator",
    locale,
    image: item.image,
  });
}

export default async function CvCreatorPage({ params }: Params) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const item = (await getCommunityItemBySlug("cv-creator", locale)) ?? getCvCreatorFallback(locale);

  const copy = locale === "de"
    ? {
        back: "Zur Community",
        label: "Kostenloses Community-Tool",
        intro:
          "Erfasse deinen Werdegang Schritt für Schritt, importiere bestehende Daten oder speichere sie als JSON. Die Awesome-CV-Vorlage entspricht dem bereitgestellten Beispielstil.",
        browserTitle: "Deine Eingaben bleiben im Browser",
        browserText:
          "Der Zwischenstand wird lokal in diesem Browser gespeichert. Lebensläufe werden nicht im Uccelli CMS abgelegt.",
        externalTitle: "Externe PDF-Erstellung",
        externalText:
          "Beim Klick auf «PDF generieren» werden die eingegebenen CV-Daten und Vorlagenressourcen an den externen XeLaTeX-Dienst YtoTech übertragen, damit das PDF erstellt werden kann.",
        toolTitle: "CV erstellen",
        toolText: "Der Editor funktioniert am besten auf einem Desktop oder Tablet.",
      }
    : {
        back: "Back to Community",
        label: "Free community tool",
        intro:
          "Enter your experience step by step, import existing data or save it as JSON. The Awesome-CV template matches the supplied example style.",
        browserTitle: "Your entries stay in the browser",
        browserText:
          "Progress is saved locally in this browser. CV data is not stored in the Uccelli CMS.",
        externalTitle: "External PDF generation",
        externalText:
          "When you select “Generate PDF”, the entered CV data and template resources are sent to the external YtoTech XeLaTeX service so the PDF can be created.",
        toolTitle: "Create your CV",
        toolText: "The editor works best on a desktop or tablet.",
      };

  return (
    <>
      <Hero title={item.title.toUpperCase()} subtitle={item.summary} variant="gradient" imageSrc={item.image} />

      <section className="px-6 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href={localizedPath("/community", locale)}
            className="mb-8 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-neutral-400 transition-colors hover:text-black"
          >
            <ArrowLeft size={14} /> {copy.back}
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">{copy.label}</p>
              <p className="max-w-3xl text-[18px] leading-[1.75] text-neutral-700">{copy.intro}</p>
              {item.body && <RichTextRenderer content={item.body} className="mt-7 text-[15px] text-neutral-600" />}
            </div>

            <div className="grid gap-3">
              <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <ShieldCheck size={19} />
                  <h2 className="font-bold">{copy.browserTitle}</h2>
                </div>
                <p className="text-[14px] leading-relaxed text-neutral-600">{copy.browserText}</p>
              </div>
              <div className="rounded-[12px] border border-[#d8dfff] bg-[#eef1ff] p-5 text-[#25356d]">
                <div className="mb-3 flex items-center gap-3">
                  <ExternalLink size={18} />
                  <h2 className="font-bold">{copy.externalTitle}</h2>
                </div>
                <p className="text-[14px] leading-relaxed">{copy.externalText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 px-3 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-5 flex items-end justify-between gap-5 px-2">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <FileText size={18} />
                <h2 className="text-xl font-bold">{copy.toolTitle}</h2>
              </div>
              <p className="text-[13px] text-neutral-500">{copy.toolText}</p>
            </div>
          </div>
          <iframe
            src={`/tools/cv-creator/index.html?lang=${locale}`}
            title="Uccelli CV Creator"
            className="min-h-[1200px] w-full rounded-[12px] border border-neutral-200 bg-white lg:min-h-[calc(100vh-80px)]"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </section>
    </>
  );
}
