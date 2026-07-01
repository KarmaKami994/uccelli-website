import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

function toRichText(text: string) {
  const paragraphs = text.split("\n").filter((p) => p.trim().length > 0);
  return {
    root: {
      type: "root",
      children: paragraphs.map((p) => ({
        type: "paragraph",
        children: [{ type: "text", text: p.trim(), format: 0, mode: "normal", style: "", detail: 0, version: 1 }],
        direction: "ltr", format: "", indent: 0, textFormat: 0, textStyle: "", version: 1,
      })),
      direction: "ltr", format: "", indent: 0, version: 1,
    },
  };
}

function toRichTextWithHeadings(sections: { heading?: string; text: string }[]) {
  const children: any[] = [];
  for (const s of sections) {
    if (s.heading) {
      children.push({
        type: "heading", tag: "h2",
        children: [{ type: "text", text: s.heading, format: 0, mode: "normal", style: "", detail: 0, version: 1 }],
        direction: "ltr", format: "", indent: 0, version: 1,
      });
    }
    for (const p of s.text.split("\n").filter((t) => t.trim())) {
      children.push({
        type: "paragraph",
        children: [{ type: "text", text: p.trim(), format: 0, mode: "normal", style: "", detail: 0, version: 1 }],
        direction: "ltr", format: "", indent: 0, textFormat: 0, textStyle: "", version: 1,
      });
    }
  }
  return { root: { type: "root", children, direction: "ltr", format: "", indent: 0, version: 1 } };
}

// ─── ALL SEED DATA ───────────────────────────────────────

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

const projects = [
  { title: "LifeLab", slug: "lifelab", category: "bildung", summary: "Lebenspraktische Kompetenzen für Jugendliche.", featured: true,
    sections: [
      { text: "LifeLab ist ein Projekt des Vereins Uccelli, das Jugendliche und junge Erwachsene auf ihrem Weg in ein selbstständiges Erwachsenenleben begleiten soll. Ziel des Projekts ist es, lebenspraktische Kompetenzen zu vermitteln, die für die erfolgreiche Bewältigung des Alltags, der Ausbildung und des Berufslebens von Bedeutung sind." },
      { text: "Im Rahmen von Workshops, Praxisprojekten und weiteren Lernangeboten setzen sich die Teilnehmenden mit Themen wie Finanzen, Versicherungen, Steuern, Wohnen, Bewerbungen, psychischer Gesundheit, Stressbewältigung, Kommunikation und persönlicher Entwicklung auseinander." },
      { heading: "Die Sackgeldbörse – Lernen durch Erfahrung", text: "Über die Sackgeldbörse erhalten Jugendliche die Möglichkeit, kleinere Arbeiten für Privatpersonen, Vereine oder Unternehmen zu übernehmen und dadurch ihr erstes eigenes Geld zu verdienen. Die Sackgeldbörse schafft einen direkten Bezug zwischen den Lerninhalten von LifeLab und der Lebensrealität der Jugendlichen." },
    ] },
  { title: "Nightshift Music", slug: "nightshift-music", category: "gemeinschaft", summary: "Konzertreihe für aufstrebende Artists.",
    sections: [
      { text: "Die Konzertreihe Nightshift Music ist eine Plattform, die neuen und aufstrebenden Artists eine Bühne bietet. Durch regelmässige Events schaffen wir Raum für kreative Entfaltung und verbinden Musik mit unserer Community." },
      { text: "Nightshift Music steht für Vielfalt in der Musik und bringt verschiedene Genres zusammen. Von Hip-Hop über R&B bis hin zu elektronischer Musik — bei uns bekommen talentierte Künstler*innen die Möglichkeit, vor Publikum aufzutreten und sich zu vernetzen." },
    ] },
  { title: "Kleidersammelaktion", slug: "kleidersammelaktion", category: "sozial", summary: "Sammlung und Verteilung von Kleidung an Bedürftige in Zürich.",
    sections: [
      { text: "Mit unserer Kleidersammelaktion sammeln und verteilen wir Kleidung an Bedürftige in der Region Zürich. Die Aktion findet regelmässig statt und wird von Freiwilligen aus der Uccelli-Community organisiert." },
      { text: "Jeder kann mitmachen — sei es durch Kleiderspenden, als Helfer*in bei der Sortierung oder bei der Verteilung. Gemeinsam setzen wir ein Zeichen für Solidarität und Zusammenhalt." },
    ] },
  { title: "Steuern & Versicherungs Schulung", slug: "steuern-versicherung", category: "bildung", summary: "Workshops zu Steuern und Finanzplanung.",
    sections: [
      { text: "Unsere Workshops zu Steuererklärung, Versicherungen und Finanzplanung richten sich an junge Erwachsene, die sich zum ersten Mal mit diesen Themen auseinandersetzen." },
      { text: "In praxisnahen Sessions erklären wir verständlich, wie das Schweizer Steuersystem funktioniert, welche Versicherungen wichtig sind und wie man sein Budget sinnvoll plant." },
    ] },
  { title: "Meet & Greet", slug: "meet-and-greet", category: "sozial", summary: "Regelmässige Treffen zum Austausch innerhalb der Community.",
    sections: [
      { text: "Regelmässige Treffen zum Austausch und Kennenlernen innerhalb der Community. Bei unseren Meet & Greets kommen Mitglieder und Interessierte zusammen, um sich in lockerer Atmosphäre zu vernetzen." },
    ] },
  { title: "Uccelli Liga", slug: "uccelli-liga", category: "gemeinschaft", summary: "Fussballturniere und sportliche Events.",
    sections: [
      { text: "Die Uccelli Liga bringt Menschen über den Sport zusammen. Mit regelmässigen Fussballturnieren und sportlichen Events fördern wir Teamgeist, Gesundheit und den Zusammenhalt in unserer Community." },
    ] },
];

const networks = [
  { name: "Uccelli Ghana", slug: "uccelli-ghana", order: 1, description: "Unser Bestreben, die Gemeinschaft zu stärken, geht über die nationalen Grenzen hinaus. Der Fokus dieser Initiative liegt daran, die Selbstwirksamkeit zu stärken und Menschen dazu zu ermutigen, andere zu stützen." },
  { name: "Uccelli Women", slug: "uccelli-women", order: 2, description: "Wir möchten eine eigenständige Subgruppe namens Uccelli Women ins Leben rufen. Diese Gruppe dient als spezielles Netzwerk für unsere weibliche Zielgruppe und bietet eine Anlaufstelle für Frauen innerhalb des Vereins." },
  { name: "Uccelli FC", slug: "uccelli-fc", order: 3, description: "Der Aufbau von Uccelli FC war für uns nicht nur die Schaffung einer Fussballmannschaft, sondern auch die Erkenntnis, dass Fussball Menschen verbindet." },
  { name: "Nightshift Music", slug: "nightshift", order: 4, description: "Nightshift Music ist unsere Konzert- und Musikplattform, die neuen Artists eine Bühne bietet. Durch regelmässige Events schaffen wir Raum für kreative Entfaltung." },
];

const werte = [
  { title: "Schutz der Umwelt", slug: "schutz-der-umwelt", body: "Der Verein Uccelli setzt sich aktiv für den Schutz der Umwelt ein. Wir glauben, dass Nachhaltigkeit und Umweltbewusstsein zentrale Werte unserer Gemeinschaft sind.\n\nDurch bewusstes Handeln, Recycling-Initiativen und die Förderung umweltfreundlicher Praktiken tragen wir dazu bei, unseren ökologischen Fussabdruck zu minimieren." },
  { title: "Datenschutz", slug: "datenschutz-wert", body: "Der Schutz personenbezogener Daten ist für den Verein Uccelli von höchster Bedeutung. Wir behandeln alle Daten unserer Mitglieder und Partner mit grösster Sorgfalt und in Übereinstimmung mit dem Schweizer Datenschutzgesetz (nDSG).\n\nWir sammeln nur die Daten, die für unsere Vereinstätigkeiten notwendig sind, und geben keine Informationen an Dritte weiter." },
  { title: "Diskriminierungsverbot", slug: "diskriminierungsverbot", body: "Der Verein Uccelli steht für eine inklusive Gemeinschaft, in der jeder Mensch willkommen ist — unabhängig von Herkunft, Geschlecht, Religion, sexueller Orientierung oder sozialem Status.\n\nDiskriminierung in jeglicher Form hat in unserem Verein keinen Platz. Wir fördern aktiv Respekt, Toleranz und gegenseitige Wertschätzung." },
  { title: "Freiheit und Autonomie", slug: "freiheit-und-autonomie", body: "Der Name Uccelli — Vögel — steht symbolisch für Freiheit. Wir glauben an die Freiheit jedes Einzelnen, seinen eigenen Weg zu gehen und eigene Entscheidungen zu treffen.\n\nGleichzeitig fördern wir Autonomie: die Fähigkeit, selbstständig zu handeln, Verantwortung zu übernehmen und das eigene Leben aktiv zu gestalten." },
  { title: "Solidarität und Kohäsion", slug: "solidaritaet-und-kohaesion", body: "Solidarität ist ein Grundpfeiler unseres Vereins. Wir stehen füreinander ein und unterstützen uns gegenseitig — in guten wie in schwierigen Zeiten.\n\nKohäsion bedeutet für uns Zusammenhalt innerhalb unserer vielfältigen Gemeinschaft. Unterschiedliche Hintergründe und Perspektiven bereichern unser Netzwerk." },
  { title: "Integrität", slug: "integritaet", body: "Integrität ist die Grundlage allen Handelns im Verein Uccelli. Wir stehen zu unseren Werten, handeln transparent und ehrlich.\n\nUnsere Mitglieder, Partner und Sponsoren können darauf vertrauen, dass wir verantwortungsvoll mit Ressourcen umgehen und unsere Versprechen einhalten." },
];

const courses = [
  { name: "Kurse zu Psychologie", description: "Laufbahnberatung, Motivation, Persönlichkeit und psychische Gesundheit.", order: 1 },
  { name: "Kurse zu Sport", description: "Fitness, Ernährung und Wohlbefinden.", order: 2 },
  { name: "Kurse zu Finanzen", description: "Steuern, Versicherungen, Budgetplanung.", order: 3 },
  { name: "Kurse zu IT & Business", description: "Webentwicklung, Business-Aufbau, digitale Kompetenzen.", order: 4 },
];

const pages = [
  { title: "LifeLab", slug: "lifelab",
    body: "LifeLab ist ein Projekt des Vereins Uccelli, das Jugendliche und junge Erwachsene auf ihrem Weg in ein selbstständiges Erwachsenenleben begleiten soll. Ziel des Projekts ist es, lebenspraktische Kompetenzen zu vermitteln, die für die erfolgreiche Bewältigung des Alltags, der Ausbildung und des Berufslebens von Bedeutung sind.\n\nIm Rahmen von Workshops, Praxisprojekten und weiteren Lernangeboten setzen sich die Teilnehmenden mit Themen wie Finanzen, Versicherungen, Steuern, Wohnen, Bewerbungen, psychischer Gesundheit, Stressbewältigung, Kommunikation und persönlicher Entwicklung auseinander.\n\nLifeLab verfolgt einen praxisnahen Ansatz. Die Teilnehmenden sollen nicht nur lernen, was sie tun sollten, sondern auch wie sie es tun können. Dadurch werden Selbstständigkeit, Eigenverantwortung, Selbstwirksamkeit und Zukunftskompetenzen gefördert." },
  { title: "Über uns", slug: "ueber-uns",
    body: "Der Verein Uccelli wurde 2022 in Zürich gegründet mit der Vision, einen Ort zu schaffen, an dem Menschen zusammenkommen, voneinander lernen und gemeinsam wachsen können.\n\nWas als kleine Initiative begann, ist heute ein lebendiges Netzwerk aus engagierten Menschen, die sich für Bildung, sozialen Austausch und persönliche Entwicklung einsetzen.\n\nUnsere Mission ist es, durch Bildung, Vernetzung und gemeinsame Projekte einen positiven Beitrag zur Gesellschaft zu leisten. Wir glauben an die Kraft der Gemeinschaft und daran, dass jeder Mensch das Potenzial hat, Grosses zu bewirken.\n\nUnsere Vision ist eine Gesellschaft, in der Vielfalt als Stärke gesehen wird und in der jeder Mensch die Möglichkeit hat, sich weiterzuentwickeln und seine Talente einzubringen." },
  { title: "Datenschutzerklärung", slug: "datenschutz",
    body: "1. Verantwortliche Stelle\nVerein Uccelli, Riedhofstrasse 364, 8049 Zürich, Schweiz. E-Mail: uccelli.society@gmail.com\n\n2. Erhebung und Verarbeitung personenbezogener Daten\nBeim Besuch unserer Website werden automatisch bestimmte Daten erhoben, die Ihr Browser an unseren Server übermittelt (sog. Server-Logfiles). Dies umfasst: Browsertyp und -version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten sind nicht bestimmten Personen zuordenbar.\n\n3. Kontaktformular\nWenn Sie uns über das Kontaktformular kontaktieren, werden die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, Betreff, Nachricht) zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet und gespeichert. Diese Daten werden nicht an Dritte weitergegeben.\n\n4. Cookies\nUnsere Website verwendet ausschliesslich technisch notwendige Cookies. Tracking-Cookies oder Cookies zu Werbezwecken werden nicht eingesetzt.\n\n5. Eingebettete Inhalte\nFür die Kartenanzeige verwenden wir OpenStreetMap (Leaflet). OpenStreetMap setzt keine Tracking-Cookies. Schriftarten (Lato) werden lokal geladen, nicht von Google Fonts.\n\n6. Ihre Rechte\nSie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Kontaktieren Sie uns unter uccelli.society@gmail.com.\n\n7. Änderungen\nWir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder Änderungen unserer Website anzupassen." },
];

const navigation = [
  { label: "LifeLab", href: "/lifelab", order: 1, children: [] },
  { label: "Programm", href: "/programm/projekte", order: 2, children: [
    { label: "Projekte", href: "/programm/projekte" },
    { label: "Veranstaltungen", href: "/programm/veranstaltungen" },
    { label: "Kursangebote", href: "/programm/kursangebote" },
    { label: "News", href: "/programm/news" },
  ] },
  { label: "Netzwerk", href: "/netzwerk", order: 3, children: [
    { label: "Uccelli Ghana", href: "/netzwerk#uccelli-ghana" },
    { label: "Uccelli Women", href: "/netzwerk#uccelli-women" },
    { label: "Uccelli FC", href: "/netzwerk#uccelli-fc" },
    { label: "Nightshift Music", href: "/netzwerk#nightshift" },
  ] },
  { label: "Über uns", href: "/ueber-uns", order: 4, children: [
    { label: "Geschichte", href: "/ueber-uns" },
    { label: "Vorstand", href: "/ueber-uns/vorstand" },
    { label: "Partner", href: "/ueber-uns/partner" },
    { label: "FAQ", href: "/ueber-uns/faq" },
  ] },
  { label: "Kontakt", href: "/kontakt", order: 5, children: [] },
];

const events = [
  { title: "Uccelli Sommerfest", date: "2026-08-15", location: "GZ Höngg, Zürich", description: "Unser jährliches Sommerfest mit Musik, Essen und Gemeinschaft." },
  { title: "Skills4Growth Workshop", date: "2026-09-22", location: "GZ Höngg, Zürich", description: "Workshop zu Steuern und Versicherungen für junge Erwachsene." },
  { title: "Nightshift Music #4", date: "2026-10-10", location: "TBA", description: "Die vierte Ausgabe unserer Konzertreihe mit aufstrebenden Artists." },
];

const homepage = {
  title: "Homepage",
  hero: { title: "UCCELLI SOCIETY", subtitle: "Gemeinschaft. Integrität. Generativität.", ctaText: "MEHR ERFAHREN", ctaHref: "/ueber-uns" },
  about: { eyebrow: "Über uns", title: "Vereinsziel & Leitbild", text: "Unser Ziel ist es, ein Netzwerk aufzubauen, welches Wissen aus verschiedenen Bereichen zusammenbringt und konsolidiert. Mit diesem Wissen sollen dann die Vereinsmitglieder ihre individuellen Ziele und Anliegen bewältigen können.", ctaText: "MEHR ERFAHREN", ctaHref: "/ueber-uns" },
  tasks: { title: "Unsere Hauptaufgaben", cards: [
    { title: "Bildung", text: "Wir wollen allen Hilfsbedürftigen den Zugang zur Bildung und Informationen verschaffen, um ihren Lebensstandard zu erhöhen.", buttonText: "Bildung", buttonHref: "/programm/projekte" },
    { title: "Soziales", text: "Wir wollen den sozialen Austausch unter Allen fördern, sowie aktuelle Gesellschaftsthemen behandeln und Betroffene unterstützen.", buttonText: "Soziales", buttonHref: "/programm/projekte" },
    { title: "Community", text: "Wir wollen den Mitgliedern im Verein, eine Möglichkeit bieten zusammen an persönlichen Projekten zu arbeiten.", buttonText: "Community", buttonHref: "/netzwerk" },
  ] },
  cta: { title: "Gemeinsam wachsen", text: "Interessiert? Nimm Kontakt mit uns auf.", buttonText: "KONTAKT", buttonHref: "/kontakt" },
};

// ─── Seed Handler ────────────────────────────────────────

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (process.env.NODE_ENV === "production" && key !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 403 });
  }

  try {
    const payload = await getPayload({ config });
    const results: string[] = [];
    const skipped: string[] = [];

    // Helper: only seed a collection if it's empty
    async function seedIfEmpty(collection: string, label: string, items: any[], createFn: (item: any) => any) {
      const existing = await payload.find({ collection: collection as any, limit: 1 });
      if (existing.docs.length > 0) {
        skipped.push(`⏭️ ${label}: ${existing.totalDocs} Einträge vorhanden`);
        return;
      }
      for (const item of items) {
        await payload.create({ collection: collection as any, data: createFn(item) as any });
        results.push(`✅ ${label}: ${item.name || item.title || item.question?.substring(0, 35) || item.label || "..."}`);
      }
    }

    await seedIfEmpty("team-members", "Team", teamMembers, (m) => ({ name: m.name, role: m.role, bio: toRichText(m.bio), order: m.order }));
    await seedIfEmpty("faqs", "FAQ", faqs, (f) => ({ question: f.question, answer: toRichText(f.answer), order: f.order, locale: "de" }));
    await seedIfEmpty("partners", "Partner", partners, (p) => ({ name: p.name, type: p.type, description: toRichText(p.description) }));
    await seedIfEmpty("posts", "Post", posts, (p) => ({ title: p.title, slug: p.slug, date: p.date, summary: p.summary, body: toRichText(p.body), locale: "de" }));
    await seedIfEmpty("projects", "Projekt", projects, (p) => ({ title: p.title, slug: p.slug, category: p.category, summary: p.summary, body: toRichTextWithHeadings(p.sections), locale: "de", featured: p.featured || false }));
    await seedIfEmpty("networks", "Netzwerk", networks, (n) => ({ name: n.name, slug: n.slug, description: toRichText(n.description), order: n.order, locale: "de" }));
    await seedIfEmpty("werte", "Wert", werte, (w) => ({ title: w.title, slug: w.slug, body: toRichText(w.body), locale: "de" }));
    await seedIfEmpty("courses", "Kurs", courses, (c) => ({ name: c.name, description: c.description, order: c.order, locale: "de" }));
    await seedIfEmpty("pages", "Seite", pages, (p) => ({ title: p.title, slug: p.slug, body: toRichText(p.body), locale: "de" }));
    await seedIfEmpty("navigation", "Nav", navigation, (n) => ({ label: n.label, href: n.href, order: n.order, children: n.children }));
    await seedIfEmpty("events", "Event", events, (e) => ({ title: e.title, date: e.date, location: e.location, description: toRichText(e.description), locale: "de" }));

    // Homepage (single entry)
    const existingHomepage = await payload.find({ collection: "homepage" as any, limit: 1 });
    if (existingHomepage.docs.length === 0) {
      await payload.create({ collection: "homepage" as any, data: homepage as any });
      results.push("✅ Homepage: Inhalt erstellt");
    } else {
      skipped.push("⏭️ Homepage: bereits vorhanden");
    }

    return NextResponse.json({
      message: results.length > 0
        ? `${results.length} neue Einträge erstellt.${skipped.length > 0 ? ` ${skipped.length} Collections übersprungen (bereits befüllt).` : ""}`
        : "Alles bereits befüllt — nichts zu tun.",
      created: results,
      skipped,
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed fehlgeschlagen.", details: error?.message }, { status: 500 });
  }
}