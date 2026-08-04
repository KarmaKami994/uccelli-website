import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/payload";
import { localizedPath } from "@/lib/seo";

export function CVGeneratorTool({ locale }: { locale: Locale }) {
  const isGerman = locale === "de";
  const toolUrl = `/tools/cv-generator/index.html?lang=${locale}`;

  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
            {isGerman ? "Lebenslauf direkt im Browser erstellen" : "Create your CV directly in the browser"}
          </h2>
          <p className="text-neutral-600 leading-relaxed max-w-3xl">
            {isGerman
              ? "Erfasse Ausbildung, Berufserfahrung, Skills, Projekte und Auszeichnungen. Du kannst deine Daten als JSON sichern, später wieder importieren, zwischen den vorhandenen Vorlagen wechseln und das fertige PDF herunterladen."
              : "Add education, experience, skills, projects and awards. You can save your data as JSON, import it again later, switch between the available templates and download the finished PDF."}
          </p>
        </div>
        <a
          href={toolUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] hover:border-black transition-colors"
        >
          {isGerman ? "Vollbild öffnen" : "Open full screen"}
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="flex gap-3 rounded-[14px] border border-sky-100 bg-sky-50 p-5 text-sm text-neutral-700 leading-relaxed">
        <ShieldCheck className="shrink-0 mt-0.5" size={20} />
        <p>
          {isGerman
            ? "Deine Entwürfe werden lokal in diesem Browser gespeichert. Beim Generieren des PDFs werden die eingegebenen CV-Daten an den externen LaTeX-Dienst YtoTech übertragen und dort verarbeitet. Im Uccelli-CMS werden keine Lebensläufe gespeichert."
            : "Your drafts are saved locally in this browser. When generating the PDF, the CV data you entered is transmitted to the external YtoTech LaTeX service and processed there. CVs are not stored in the Uccelli CMS."}{" "}
          <Link href={localizedPath("/datenschutz", locale)} className="font-bold underline underline-offset-4">
            {isGerman ? "Datenschutzhinweise" : "Privacy information"}
          </Link>
        </p>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-neutral-200 bg-neutral-100 shadow-sm">
        <iframe
          src={toolUrl}
          title="Uccelli CV Generator"
          className="block h-[82vh] min-h-[760px] w-full bg-white"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
