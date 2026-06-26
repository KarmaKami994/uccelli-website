import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const projects: Record<string, { title: string; heroTitle: string; sections: { heading?: string; text: string }[]; contact?: string }> = {
  "lifelab": {
    title: "LifeLab – Kompetenzen fürs Leben",
    heroTitle: "LIFELAB —\nKOMPETENZEN\nFÜRS LEBEN",
    sections: [
      { text: "LifeLab ist ein Projekt des Vereins Uccelli, das Jugendliche und junge Erwachsene auf ihrem Weg in ein selbstständiges Erwachsenenleben begleiten soll. Ziel des Projekts ist es, lebenspraktische Kompetenzen zu vermitteln, die für die erfolgreiche Bewältigung des Alltags, der Ausbildung und des Berufslebens von Bedeutung sind." },
      { text: "Im Rahmen von Workshops, Praxisprojekten und weiteren Lernangeboten setzen sich die Teilnehmenden mit Themen wie Finanzen, Versicherungen, Steuern, Wohnen, Bewerbungen, psychischer Gesundheit, Stressbewältigung, Kommunikation und persönlicher Entwicklung auseinander." },
      { heading: "Die Sackgeldbörse – Lernen durch Erfahrung", text: "Über die Sackgeldbörse erhalten Jugendliche die Möglichkeit, kleinere Arbeiten für Privatpersonen, Vereine oder Unternehmen zu übernehmen und dadurch ihr erstes eigenes Geld zu verdienen. Die Sackgeldbörse schafft einen direkten Bezug zwischen den Lerninhalten von LifeLab und der Lebensrealität der Jugendlichen." },
    ],
    contact: "uccelli.society@gmail.com",
  },
  "nightshift-music": {
    title: "Nightshift Music",
    heroTitle: "NIGHTSHIFT\nMUSIC",
    sections: [
      { text: "Die Konzertreihe Nightshift Music ist eine Plattform, die neuen und aufstrebenden Artists eine Bühne bietet. Durch regelmässige Events schaffen wir Raum für kreative Entfaltung und verbinden Musik mit unserer Community." },
      { text: "Nightshift Music steht für Vielfalt in der Musik und bringt verschiedene Genres zusammen. Von Hip-Hop über R&B bis hin zu elektronischer Musik — bei uns bekommen talentierte Künstler*innen die Möglichkeit, vor Publikum aufzutreten und sich zu vernetzen." },
    ],
  },
  "kleidersammelaktion": {
    title: "Kleidersammelaktion",
    heroTitle: "KLEIDER\nSAMMEL\nAKTION",
    sections: [
      { text: "Mit unserer Kleidersammelaktion sammeln und verteilen wir Kleidung an Bedürftige in der Region Zürich. Die Aktion findet regelmässig statt und wird von Freiwilligen aus der Uccelli-Community organisiert." },
      { text: "Jeder kann mitmachen — sei es durch Kleiderspenden, als Helfer*in bei der Sortierung oder bei der Verteilung. Gemeinsam setzen wir ein Zeichen für Solidarität und Zusammenhalt." },
    ],
  },
  "steuern-versicherung": {
    title: "Steuern & Versicherungs Schulung",
    heroTitle: "STEUERN &\nVERSICHERUNGS\nSCHULUNG",
    sections: [
      { text: "Unsere Workshops zu Steuererklärung, Versicherungen und Finanzplanung richten sich an junge Erwachsene, die sich zum ersten Mal mit diesen Themen auseinandersetzen." },
      { text: "In praxisnahen Sessions erklären wir verständlich, wie das Schweizer Steuersystem funktioniert, welche Versicherungen wichtig sind und wie man sein Budget sinnvoll plant." },
    ],
  },
  "meet-and-greet": {
    title: "Meet & Greet",
    heroTitle: "MEET &\nGREET",
    sections: [
      { text: "Regelmässige Treffen zum Austausch und Kennenlernen innerhalb der Community. Bei unseren Meet & Greets kommen Mitglieder und Interessierte zusammen, um sich in lockerer Atmosphäre zu vernetzen." },
    ],
  },
  "uccelli-liga": {
    title: "Uccelli Liga",
    heroTitle: "UCCELLI\nLIGA",
    sections: [
      { text: "Die Uccelli Liga bringt Menschen über den Sport zusammen. Mit regelmässigen Fussballturnieren und sportlichen Events fördern wir Teamgeist, Gesundheit und den Zusammenhalt in unserer Community." },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  return { title: project?.title ?? "Projekt nicht gefunden", description: project?.sections[0]?.text.slice(0, 160) };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  return (
    <>
      <Hero title={project.heroTitle} variant="gradient" />

      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto">
          {project.sections.map((section, i) => (
            <div key={i} className={i > 0 ? "mt-12" : ""}>
              {section.heading && (
                <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-bold mb-6">{section.heading}</h2>
              )}
              <p className="text-[16px] text-neutral-700 leading-[1.8]">{section.text}</p>
            </div>
          ))}

          {project.contact && (
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <p className="text-neutral-500 mb-4">Möchtest du mehr erfahren? Kontaktiere uns:</p>
              <Button variant="primary" href={`mailto:${project.contact}`}>KONTAKT AUFNEHMEN</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
