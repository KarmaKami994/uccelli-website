"use client";
import { ContactForm } from "@/components/ui/ContactForm";

export default function KontaktPage() {
  return (
    <>
      <section className="bg-black text-white py-12 lg:py-16 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold">Get in Touch with Us</h1>
          <p className="text-neutral-400 mt-3">Kontaktiere uns gerne, wir werden uns so schnell wie möglich bei dir melden.</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <ContactForm />

          {/* Info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wide mb-3">Wo du uns finden kannst</h3>
              <p className="text-neutral-600">Riedhofstrasse 364</p>
              <p className="text-neutral-600">8049 Zürich, Schweiz</p>
            </div>
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wide mb-3">Schreib uns per Mail</h3>
              <a href="mailto:uccelli.society@gmail.com" className="text-brand-accent-accessible hover:underline">uccelli.society@gmail.com</a>
            </div>
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wide mb-3">Social Media</h3>
              <div className="flex gap-3">
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/company/uccelli-society" },
                  { label: "Instagram", href: "https://www.instagram.com/uccelli_society/" },
                  { label: "Facebook", href: "https://www.facebook.com/uccellisociety" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="text-[13px] text-neutral-500 hover:text-black transition-colors underline">{s.label}</a>
                ))}
              </div>
            </div>
            {/* Map placeholder — Leaflet/OSM will be integrated in Phase 3 */}
            <div className="aspect-[4/3] bg-neutral-100 rounded-[12px] flex items-center justify-center">
              <p className="text-neutral-400 text-[14px]">Karte wird geladen...</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
