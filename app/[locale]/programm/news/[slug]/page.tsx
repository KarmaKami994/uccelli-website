import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts: Record<string, { title: string; date: string; body: string[] }> = {
  "partnerschaft-royal-studio": {
    title: "Neue Partnerschaft mit Royal Studio",
    date: "15. April 2025",
    body: [
      "Wir dürfen eine aufregende neue Partnerschaft bekannt geben, die die Art und Weise, wie wir Erlebnisse schaffen und festhalten, auf ein neues Level heben wird.",
      "Royal Studio ist spezialisiert auf innovativen Foto- und Videobooth-Entertainment, das Events zu unvergesslichen Erlebnissen macht. Zusammen werden wir unsere Veranstaltungen mit kreativen visuellen Erlebnissen bereichern.",
      "Diese Partnerschaft ist ein weiterer Schritt in unserer Mission, unseren Mitgliedern einzigartige und bereichernde Erfahrungen zu bieten. Wir freuen uns auf die gemeinsame Zukunft!",
    ],
  },
  "danke-gruendungsmitglieder": {
    title: "Danke an unsere Gründungsmitglieder",
    date: "20. März 2025",
    body: [
      "In der Hektik neuer Projekte vergisst man manchmal, innezuhalten und denen zu danken, die von Anfang an da waren. Die, die das Fundament legen.",
      "Unsere Gründungsmitglieder haben mit ihrer Vision, ihrem Engagement und ihrem Vertrauen den Grundstein für alles gelegt, was Uccelli heute ist. Ohne sie gäbe es dieses Netzwerk nicht.",
      "Danke an jeden Einzelnen von euch. Ihr seid der Grund, warum wir jeden Tag weitermachen.",
    ],
  },
  "partnerschaft-anker-swiss": {
    title: "Partnerschaft mit Anker Swiss AG",
    date: "28. Februar 2025",
    body: [
      "Wir bei Uccelli Society arbeiten jeden Tag daran, unser Netzwerk zu erweitern, um euch die bestmögliche Unterstützung auf eurem Weg zu bieten.",
      "Mit der Anker Swiss AG haben wir einen starken Partner an unserer Seite, der sich auf die Vermittlung von qualifizierten Fachkräften spezialisiert hat. Gemeinsam können wir unseren Mitgliedern noch bessere Karrieremöglichkeiten eröffnen.",
      "Die Anker Swiss AG teilt unsere Werte von Integrität und Gemeinschaft, was diese Partnerschaft besonders wertvoll macht.",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  return { title: post?.title ?? "Artikel nicht gefunden", description: post?.body[0]?.slice(0, 160) };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[700px] mx-auto">
        <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-4">{post.date}</p>
        <h1 className="text-[clamp(1.75rem,5vw,2.75rem)] font-bold leading-tight mb-10">{post.title}</h1>
        <div className="space-y-5 text-[16px] text-neutral-700 leading-[1.8]">
          {post.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="mt-16 pt-8 border-t border-neutral-200">
          <Button variant="primary" href="/programm/news">← ZURÜCK ZU NEWS</Button>
        </div>
      </div>
    </article>
  );
}
