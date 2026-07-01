import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

// Helper: Convert plain text to Lexical richText JSON
function toRichText(text: string) {
  const paragraphs = text.split("\n").filter((p) => p.trim().length > 0);
  return {
    root: {
      type: "root",
      children: paragraphs.map((p) => ({
        type: "paragraph",
        children: [{ type: "text", text: p.trim(), format: 0, mode: "normal", style: "", detail: 0, version: 1 }],
        direction: "ltr",
        format: "",
        indent: 0,
        textFormat: 0,
        textStyle: "",
        version: 1,
      })),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

// ─── Seed Data ───────────────────────────────────────────

const teamMembers = [
  { name: "Ato Akrofi", role: "Vereinspräsident", order: 1, bio: "Ato Akrofi ist Gründer und Präsident des Vereins Uccelli. Mit seiner Vision einer inklusiven Gemeinschaft hat er den Verein 2022 ins Leben gerufen." },
  { name: "Hatice Aksüt", role: "Head of Project Management", order: 2, bio: "Hatice Aksüt leitet das Projektmanagement des Vereins und koordiniert die verschiedenen Initiativen und Partnerschaften." },
  { name: "Karim Moutiq", role: "Head of IT", order: 3, bio: "Karim Moutiq verantwortet die gesamte IT-Infrastruktur und die digitale Präsenz des Vereins Uccelli." },
];

const faqs = [
  { question: "Was ist der Verein Uccelli?", answer: "Der Verein Uccelli ist ein integratives Netzwerk mit Sitz in Zürich, das Bildung, sozialen Austausch und persönliche Entwicklung fördert.", order: 1 },
  { question: "Wie kann ich Mitglied werden?", answer: "Du kannst dich über unser Kontaktformular oder direkt per E-Mail an uccelli.society@gmail.com anmelden.", order: 2 },
  { question: "Was kostet eine Mitgliedschaft?", answer: "Die Mitgliedschaft ist kostenlos. Wir finanzieren uns über Spenden, Sponsoren und Partnerschaften.", order: 3 },
  { question: "Welche Projekte bietet Uccelli an?", answer: "Wir bieten Sozialprojekte, Bildungsprojekte wie LifeLab und Gemeinschaftsprojekte wie die Nightshift Music Konzertreihe.", order: 4 },
  { question: "Wo finden die Veranstaltungen statt?", answer: "Die meisten unserer Veranstaltungen finden in Zürich statt, oft im GZ Höngg oder an wechselnden Locations.", order: 5 },
  { question: "Kann ich den Verein finanziell unterstützen?", answer: "Ja! Empfänger: Verein Uccelli, Konto Nr: 1148-5358.899, IBAN: CH53 0070 0114 8053 5889 9.", order: 6 },
  { question: "Was bedeutet der Name Uccelli?", answer: "Uccelli ist das italienische Wort für Vögel. Der Name steht für Freiheit, Individualität und die Überzeugung, dass Vielfalt eine Stärke ist.", order: 7 },
];

const partners = [
  { name: "GZ Höngg", type: "partner" as const, description: "Mit dem GZ Höngg verbindet uns eine enge Partnerschaft, die auf gegenseitigem Vertrauen und gemeinsamen Werten beruht." },
  { name: "Royal Studio", type: "partner" as const, description: "Royal Studio – Kreative Event-Erlebnisse aus Zürich, spezialisiert auf innovativen Foto- und Videobooth-Entertainment." },
  { name: "Anker Swiss AG", type: "partner" as const, description: "Ein etabliertes Schweizer Personalvermittlungsunternehmen mit langjähriger Erfahrung." },
  { name: "Hosttech GmbH", type: "sponsor" as const, description: "Zuverlässiger Partner für Hosting unserer Website und Bereitstellung unserer Domainserver." },
  { name: "GymOne", type: "sponsor" as const, description: "Modernes Fitnessstudio in Zürich Affoltern mit perfekten Voraussetzungen für effektives Training." },
  { name: "Fröhliche Info", type: "sponsor" as const, description: "Innovatives Unternehmen in Züllikon für Kommunikation und Medienproduktion." },
];

const posts = [
  { title: "Neue Partnerschaft mit Royal Studio", slug: "partnerschaft-royal-studio", date: "2025-04-15", summary: "Wir dürfen eine aufregende neue Partnerschaft bekannt geben.", body: "Wir freuen uns, unsere neue Partnerschaft mit Royal Studio bekannt zu geben. Royal Studio bringt kreative Event-Erlebnisse nach Zürich und teilt unsere Vision einer lebendigen Gemeinschaft." },
  { title: "Danke an unsere Gründungsmitglieder", slug: "danke-gruendungsmitglieder", date: "2025-03-20", summary: "In der Hektik neuer Projekte vergisst man manchmal, innezuhalten und zu danken.", body: "Heute möchten wir einen Moment innehalten und unseren Gründungsmitgliedern danken. Ohne euren Einsatz, eure Energie und euren Glauben an unsere Vision wäre der Verein Uccelli nicht das, was er heute ist." },
  { title: "Partnerschaft mit Anker Swiss AG", slug: "partnerschaft-anker-swiss", date: "2025-02-28", summary: "Wir arbeiten jeden Tag daran, unser Netzwerk zu erweitern.", body: "Mit Anker Swiss AG haben wir einen erfahrenen Partner im Bereich Personalvermittlung gewonnen. Gemeinsam möchten wir unseren Mitgliedern neue berufliche Perspektiven eröffnen." },
];

// ─── Seed Handler ────────────────────────────────────────

export async function GET(request: NextRequest) {
  // Simple protection — only works in dev or with correct key
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (process.env.NODE_ENV === "production" && key !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  try {
    const payload = await getPayload({ config });
    const results: string[] = [];

    // ─── Check if already seeded ─────────────────────────
    const existingTeam = await payload.find({ collection: "team-members" as any, limit: 1 });
    if (existingTeam.docs.length > 0) {
      return NextResponse.json({
        message: "Datenbank ist bereits befüllt. Lösche die Einträge im Admin-Panel (/admin) und versuche es erneut, oder lösche uccelli.db für einen kompletten Reset.",
        existing: {
          "team-members": existingTeam.totalDocs,
        },
      });
    }

    // ─── Seed Team Members ───────────────────────────────
    for (const member of teamMembers) {
      await payload.create({
        collection: "team-members" as any,
        data: {
          name: member.name,
          role: member.role,
          bio: toRichText(member.bio),
          order: member.order,
        } as any,
      });
      results.push(`✅ Team: ${member.name}`);
    }

    // ─── Seed FAQs ───────────────────────────────────────
    for (const faq of faqs) {
      await payload.create({
        collection: "faqs" as any,
        data: {
          question: faq.question,
          answer: toRichText(faq.answer),
          order: faq.order,
          locale: "de",
        } as any,
      });
      results.push(`✅ FAQ: ${faq.question.substring(0, 40)}...`);
    }

    // ─── Seed Partners ───────────────────────────────────
    for (const partner of partners) {
      await payload.create({
        collection: "partners" as any,
        data: {
          name: partner.name,
          type: partner.type,
          description: toRichText(partner.description),
        } as any,
      });
      results.push(`✅ Partner: ${partner.name}`);
    }

    // ─── Seed Posts ──────────────────────────────────────
    for (const post of posts) {
      await payload.create({
        collection: "posts" as any,
        data: {
          title: post.title,
          slug: post.slug,
          date: post.date,
          summary: post.summary,
          body: toRichText(post.body),
          locale: "de",
        } as any,
      });
      results.push(`✅ Post: ${post.title}`);
    }

    return NextResponse.json({
      message: `Seed abgeschlossen! ${results.length} Einträge erstellt.`,
      results,
      next: "Öffne /admin um die Daten zu sehen und zu bearbeiten.",
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Seed fehlgeschlagen.", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}