import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import type { Locale } from "@/lib/payload";
import { localizedPath } from "@/lib/seo";

export function ProjectCard({ project, locale, categoryLabel, ctaLabel }: { project: Project; locale: Locale; categoryLabel: string; ctaLabel: string }) {
  return (
    <Link href={localizedPath(`/projekte/${project.slug}`, locale)} className="group border border-neutral-200 rounded-[12px] overflow-hidden bg-white flex flex-col hover:shadow-lg hover:border-neutral-300 transition-all">
      {project.image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          <Image src={project.image} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 500px" />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200" />
      )}
      <div className="p-6 flex flex-col flex-1">
        <span className="self-start rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-neutral-600 mb-4">{categoryLabel}</span>
        <h2 className="text-xl font-bold leading-tight mb-3">{project.title}</h2>
        <p className="text-[15px] text-neutral-600 leading-relaxed flex-1">{project.summary}</p>
        <span className="mt-6 text-[12px] font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">{ctaLabel} →</span>
      </div>
    </Link>
  );
}
