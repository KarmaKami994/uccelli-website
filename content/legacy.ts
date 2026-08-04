export type LocalizedCopy = { de: string; en: string };
export type RichSection = { heading?: LocalizedCopy; text: LocalizedCopy };

function textNode(text: string) {
  return { type: "text", text, format: 0, mode: "normal", style: "", detail: 0, version: 1 };
}

export function richText(sections: RichSection[], locale: "de" | "en") {
  const children: unknown[] = [];
  for (const section of sections) {
    if (section.heading) {
      children.push({
        type: "heading",
        tag: "h2",
        children: [textNode(section.heading[locale])],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      });
    }
    for (const paragraph of section.text[locale].split("\n").filter(Boolean)) {
      children.push({
        type: "paragraph",
        children: [textNode(paragraph.trim())],
        direction: "ltr",
        format: "",
        indent: 0,
        textFormat: 0,
        textStyle: "",
        version: 1,
      });
    }
  }
  return { root: { type: "root", children, direction: "ltr", format: "", indent: 0, version: 1 } };
}

export const projects = [
  {
    slug: "skills4growth",
    category: "bildung",
    featured: true,
    title: { de: "Skills4Growth", en: "Skills4Growth" },
    summary: {
      de: "Uccelli Ghana vermittelt praktische Berufs- und Unternehmerkompetenzen für nachhaltige Selbstständigkeit.",
      en: "Uccelli Ghana provides practical vocational and entrepreneurial skills for sustainable independence.",
    },
    sections: [
      {
        heading: { de: "Uccelli Ghana", en: "Uccelli Ghana" },
        text: {
          de: "Uccelli Ghana entstand 2024 aus der Zusammenarbeit von Ato Akrofi und Richard Ocansey. Als erste internationale Initiative des Vereins begegnet das Projekt sozioökonomischen Herausforderungen mit praxisnahen Ausbildungsprogrammen und gemeinschaftlich entwickelten Lösungen.",
          en: "Uccelli Ghana grew out of the collaboration between Ato Akrofi and Richard Ocansey in 2024. As the association's first international initiative, it addresses socioeconomic challenges through practical training and community-led solutions.",
        },
      },
      {
        heading: { de: "Mission und Vision", en: "Mission and vision" },
        text: {
          de: "Menschen aus benachteiligten Verhältnissen erhalten berufliche Ausbildung, unternehmerisches Wissen und Mentoring. Ziel sind finanzielle Unabhängigkeit, Selbstwirksamkeit und nachhaltiges Wachstum, das auf lokalen Fähigkeiten und Bedürfnissen aufbaut.",
          en: "People from disadvantaged backgrounds receive vocational training, entrepreneurial knowledge and mentoring. The goal is financial independence, self-efficacy and sustainable growth built on local skills and needs.",
        },
      },
      {
        heading: { de: "Praktische Ausbildungsfelder", en: "Practical training areas" },
        text: {
          de: "Die geplanten und pilotierten Programme umfassen Dreadlock-Techniken, Perückenherstellung, Nähen und Schneidern sowie nachhaltige Seifenherstellung. Neben dem Handwerk lernen Teilnehmende Grundlagen zu Kalkulation, Vermarktung und selbstständiger Tätigkeit.",
          en: "Planned and piloted programmes include dreadlock techniques, wig making, sewing and tailoring, and sustainable soap production. Alongside the craft, participants learn the basics of costing, marketing and self-employment.",
        },
      },
      {
        heading: { de: "Gemeinsam Wirkung schaffen", en: "Creating impact together" },
        text: {
          de: "Uccelli Schweiz begleitet die Initiative strategisch. Lokale Partner in Ghana bringen Wissen, Infrastruktur und Zugang zu den Gemeinden ein. Organisationen, Sponsoren und freiwillige Fachpersonen sind eingeladen, die nächste Entwicklungsphase mitzugestalten.",
          en: "Uccelli Switzerland provides strategic support. Local partners in Ghana contribute knowledge, infrastructure and access to communities. Organisations, sponsors and skilled volunteers are invited to help shape the next phase.",
        },
      },
    ] satisfies RichSection[],
  },
  {
    slug: "lifelab",
    category: "bildung",
    featured: true,
    title: { de: "LifeLab", en: "LifeLab" },
    summary: {
      de: "Lebenspraktische Kompetenzen für Jugendliche und junge Erwachsene.",
      en: "Practical life skills for teenagers and young adults.",
    },
    sections: [
      {
        heading: { de: "Kompetenzen fürs Leben", en: "Skills for life" },
        text: {
          de: "LifeLab begleitet Jugendliche und junge Erwachsene auf dem Weg in ein selbstständiges Leben. Praxisnahe Lernangebote verbinden Wissen mit Situationen, die im Alltag, in Ausbildung und Beruf tatsächlich auftreten.",
          en: "LifeLab supports teenagers and young adults on their path towards independent living. Practical learning formats connect knowledge with situations they encounter in everyday life, education and work.",
        },
      },
      {
        heading: { de: "Themen", en: "Topics" },
        text: {
          de: "Zu den Themen gehören Finanzen, Versicherungen, Steuern, Wohnen, Bewerbungen, psychische Gesundheit, Stressbewältigung, Kommunikation und persönliche Entwicklung.",
          en: "Topics include finances, insurance, taxes, housing, applications, mental health, stress management, communication and personal development.",
        },
      },
      {
        heading: { de: "Lernen durch Erfahrung", en: "Learning through experience" },
        text: {
          de: "Über praktische Aufgaben und Projekte können Teilnehmende Verantwortung übernehmen, ihre Fähigkeiten ausprobieren und Vertrauen in die eigene Handlungsfähigkeit entwickeln.",
          en: "Through practical assignments and projects, participants can take responsibility, test their abilities and build confidence in their own agency.",
        },
      },
    ] satisfies RichSection[],
  },
  {
    slug: "nightshift-music",
    category: "gemeinschaft",
    featured: true,
    title: { de: "Nightshift Music", en: "Nightshift Music" },
    summary: {
      de: "Eine Konzert- und Community-Plattform für neue und aufstrebende Artists.",
      en: "A concert and community platform for new and emerging artists.",
    },
    sections: [
      {
        heading: { de: "Eine Bühne für neue Stimmen", en: "A stage for new voices" },
        text: {
          de: "Nightshift Music schafft Raum für kreative Entfaltung und gibt aufstrebenden Künstlerinnen und Künstlern die Möglichkeit, ihre Musik vor neuem Publikum zu präsentieren.",
          en: "Nightshift Music creates space for creative expression and gives emerging artists the opportunity to present their music to new audiences.",
        },
      },
      {
        heading: { de: "Musik verbindet", en: "Music connects" },
        text: {
          de: "Die Plattform bringt unterschiedliche Genres, Perspektiven und Menschen zusammen. Neben den Auftritten stehen Austausch, Vernetzung und eine respektvolle Community im Zentrum.",
          en: "The platform brings together different genres, perspectives and people. Alongside performances, exchange, networking and a respectful community are at its core.",
        },
      },
    ] satisfies RichSection[],
  },
  {
    slug: "uccelli-liga",
    category: "gemeinschaft",
    featured: true,
    title: { de: "Uccelli Liga", en: "Uccelli League" },
    summary: {
      de: "Eine inklusive Fussballplattform für Teamgeist, Bewegung und Gemeinschaft.",
      en: "An inclusive football platform for team spirit, activity and community.",
    },
    sections: [
      {
        heading: { de: "Gemeinschaft durch Sport", en: "Community through sport" },
        text: {
          de: "Die Uccelli Liga bringt Menschen über Fussball zusammen. Sie bietet talentierten Spielerinnen und Spielern eine offene Plattform, um sich zu entfalten, gemeinsam aktiv zu sein und neue Verbindungen aufzubauen.",
          en: "The Uccelli League brings people together through football. It offers talented players an open platform to develop, stay active together and build new connections.",
        },
      },
    ] satisfies RichSection[],
  },
  {
    slug: "kleidersammelaktion",
    category: "sozial",
    featured: false,
    title: { de: "Kleidersammelaktion", en: "Clothing collection" },
    summary: {
      de: "Kleidung sammeln, sinnvoll weitergeben und Menschen in der Region unterstützen.",
      en: "Collecting clothing, passing it on responsibly and supporting people in the region.",
    },
    sections: [
      {
        heading: { de: "Solidarität praktisch leben", en: "Putting solidarity into practice" },
        text: {
          de: "Die Kleidersammelaktion sammelt gut erhaltene Kleidung und organisiert deren Weitergabe an Menschen, die sie benötigen. Freiwillige unterstützen beim Sammeln, Sortieren und Verteilen.",
          en: "The clothing collection gathers well-preserved clothing and organises its distribution to people who need it. Volunteers support collection, sorting and distribution.",
        },
      },
    ] satisfies RichSection[],
  },
] as const;

export const communityItems = [
  {
    slug: "cv-creator",
    type: "tool",
    status: "coming-soon",
    featured: true,
    order: 1,
    title: { de: "CV Creator", en: "CV Creator" },
    summary: {
      de: "Erstelle Schritt für Schritt einen übersichtlichen Lebenslauf für Bewerbungen in der Schweiz.",
      en: "Create a clear CV step by step for applications in Switzerland.",
    },
    sections: [{
      heading: { de: "Einfach zum professionellen Lebenslauf", en: "A simple route to a professional CV" },
      text: {
        de: "Der CV Creator wird Informationen strukturiert abfragen und daraus eine klare, exportierbare Bewerbungsvorlage erstellen. Das Angebot befindet sich in Vorbereitung.",
        en: "The CV Creator will collect information in a structured way and turn it into a clear, exportable application template. The tool is currently in preparation.",
      },
    }] satisfies RichSection[],
  },
  {
    slug: "uccelli-game",
    type: "game",
    status: "coming-soon",
    featured: true,
    order: 2,
    title: { de: "Uccelli Web Game", en: "Uccelli Web Game" },
    summary: {
      de: "Ein kleines Community-Game mit saisonaler Highscore-Rangliste.",
      en: "A small community game with a seasonal high-score ranking.",
    },
    sections: [{
      heading: { de: "Spielen und vergleichen", en: "Play and compare" },
      text: {
        de: "Das geplante Web Game verbindet spielerische Unterhaltung mit einer datensparsamen Rangliste. Nicknames und Scores werden moderiert und saisonal zurückgesetzt werden können.",
        en: "The planned web game combines playful entertainment with a privacy-conscious leaderboard. Nicknames and scores will be moderated and can be reset seasonally.",
      },
    }] satisfies RichSection[],
  },
  {
    slug: "uccelli-vogel-quiz",
    type: "game",
    status: "coming-soon",
    featured: false,
    order: 3,
    title: { de: "Welcher Uccelli-Vogel bist du?", en: "Which Uccelli bird are you?" },
    summary: {
      de: "Das Persönlichkeitsquiz der alten Website wird für den Community Hub neu aufgebaut.",
      en: "The personality quiz from the former website is being rebuilt for the Community Hub.",
    },
    sections: [{
      text: {
        de: "Das Quiz verbindet die Bedeutung des Namens Uccelli mit unterschiedlichen Stärken und Perspektiven innerhalb der Community. Die neue Version befindet sich in Vorbereitung.",
        en: "The quiz connects the meaning of Uccelli with different strengths and perspectives within the community. The new version is in preparation.",
      },
    }] satisfies RichSection[],
  },
] as const;

export const posts = [
  {
    slug: "partnerschaft-anker-swiss",
    date: "2025-05-27T12:00:00.000Z",
    title: {
      de: "Dein Weg zum Job in der Schweiz: Anker Swiss AG wird Partner",
      en: "Your path to work in Switzerland: Anker Swiss AG becomes a partner",
    },
    summary: {
      de: "Die Partnerschaft verbindet unsere Community mit persönlicher Arbeitsvermittlung, Karriereberatung und professioneller Unterstützung im Bewerbungsprozess.",
      en: "The partnership connects our community with personal recruitment, career guidance and professional support throughout the application process.",
    },
    sections: [
      {
        heading: { de: "Der Mensch im Mittelpunkt", en: "People at the centre" },
        text: {
          de: "Anker Swiss AG ist ein etabliertes Schweizer Unternehmen für die Vermittlung von Fachkräften im Bau- und Industriebereich. Persönliche Beratung, Branchenkenntnis und nachhaltige Verbindungen zwischen Menschen und Unternehmen stehen im Zentrum.",
          en: "Anker Swiss AG is an established Swiss company specialising in skilled recruitment for construction and industry. Personal advice, industry expertise and sustainable connections between people and companies are central to its work.",
        },
      },
      {
        heading: { de: "Konkrete Unterstützung", en: "Practical support" },
        text: {
          de: "Mitglieder und Teilnehmende erhalten Zugang zu Beratung für die Stellensuche, CV-Checks und Wissen über den Schweizer Bewerbungsprozess. Interessierte können sich über Uccelli melden, damit wir den Kontakt herstellen.",
          en: "Members and participants gain access to job-search advice, CV checks and knowledge of the Swiss application process. Interested people can contact Uccelli so that we can make an introduction.",
        },
      },
    ] satisfies RichSection[],
  },
  {
    slug: "danke-gz-hoengg",
    date: "2025-05-27T11:00:00.000Z",
    title: {
      de: "Unsere Wurzeln, unsere Homebase: Danke an das GZ Höngg",
      en: "Our roots and home base: thank you to GZ Höngg",
    },
    summary: {
      de: "Das GZ Höngg begleitet Uccelli seit den Anfängen mit Räumen, Infrastruktur, Know-how und partnerschaftlichem Austausch.",
      en: "GZ Höngg has supported Uccelli from the beginning with rooms, infrastructure, know-how and a partnership of equals.",
    },
    sections: [
      {
        heading: { de: "In Höngg verwurzelt", en: "Rooted in Höngg" },
        text: {
          de: "Die Verbindung entstand lange vor einem formellen Vertrag. Gründungsmitglieder kannten das Gemeinschaftszentrum als offenen Treffpunkt im Quartier und organisierten dort bereits Aktivitäten, bevor der Verein offiziell gegründet wurde.",
          en: "The connection began long before a formal agreement. Founding members knew the community centre as an open meeting place in the neighbourhood and organised activities there before the association was officially founded.",
        },
      },
      {
        heading: { de: "Mehr als Räume", en: "More than rooms" },
        text: {
          de: "Das GZ stellt Räume für Sitzungen und Projektarbeit bereit und unterstützt mit Infrastruktur und Erfahrung. Gleichzeitig bringt sich Uccelli bei Aktivitäten des Gemeinschaftszentrums ein. Diese Zusammenarbeit ist ein gegenseitiges Geben und Nehmen.",
          en: "GZ provides rooms for meetings and project work and supports the association with infrastructure and experience. Uccelli contributes to community-centre activities in return. The partnership is built on mutual support.",
        },
      },
    ] satisfies RichSection[],
  },
  {
    slug: "partnerschaft-royal-studio",
    date: "2025-05-27T10:00:00.000Z",
    title: {
      de: "Uccelli Society x Royal Studio: Erlebnisse kreativ festhalten",
      en: "Uccelli Society x Royal Studio: capturing experiences creatively",
    },
    summary: {
      de: "Royal Studio ergänzt Veranstaltungen und Projekte mit kreativen Foto- und Videoerlebnissen.",
      en: "Royal Studio enhances events and projects with creative photo and video experiences.",
    },
    sections: [{
      heading: { de: "Eine kreative Partnerschaft", en: "A creative partnership" },
      text: {
        de: "Royal Studio und Uccelli teilen die Freude daran, Menschen zusammenzubringen und besondere Momente sichtbar zu machen. Die Zusammenarbeit verbindet Community-Arbeit mit professioneller Medien- und Eventgestaltung.",
        en: "Royal Studio and Uccelli share a passion for bringing people together and making special moments visible. The collaboration connects community work with professional media and event design.",
      },
    }] satisfies RichSection[],
  },
  {
    slug: "benefizkonzert-ghana",
    date: "2025-05-27T09:00:00.000Z",
    title: {
      de: "Eine Nacht, eine Mission: Gemeinsam für Ghana",
      en: "One night, one mission: together for Ghana",
    },
    summary: {
      de: "Das Benefizkonzert im Karl der Grosse verband Musik, Gemeinschaft und Unterstützung für Skills4Growth.",
      en: "The benefit concert at Karl der Grosse connected music, community and support for Skills4Growth.",
    },
    sections: [{
      heading: { de: "Musik mit Wirkung", en: "Music with impact" },
      text: {
        de: "Am 26. April kamen Artists, Helfende, Partner und Gäste für eine gemeinsame Mission zusammen. Die Veranstaltung machte das Ghana-Projekt sichtbar, stärkte das Netzwerk und sammelte Unterstützung für die nächste Projektphase.",
        en: "On 26 April, artists, volunteers, partners and guests came together around a shared mission. The event raised awareness of the Ghana project, strengthened the network and gathered support for its next phase.",
      },
    }] satisfies RichSection[],
  },
  {
    slug: "nightshift-premiere",
    date: "2025-05-27T08:00:00.000Z",
    title: {
      de: "Nightshift Premiere: Der Start unserer Konzertreihe",
      en: "Nightshift premiere: the launch of our concert series",
    },
    summary: {
      de: "Die erste Nightshift-Ausgabe brachte starke Acts, ein engagiertes Publikum und neue Verbindungen zusammen.",
      en: "The first Nightshift edition brought together strong acts, an engaged audience and new connections.",
    },
    sections: [{
      heading: { de: "Ein gelungener Auftakt", en: "A successful launch" },
      text: {
        de: "Die Premiere zeigte, wie viel kreative Energie in der Community steckt. Neue Artists erhielten eine Bühne, Gäste entdeckten neue Musik und nach den Auftritten entstanden Gespräche und Kontakte für weitere Zusammenarbeit.",
        en: "The premiere showed how much creative energy exists within the community. Emerging artists gained a stage, guests discovered new music and the performances led to conversations and connections for future collaboration.",
      },
    }] satisfies RichSection[],
  },
  {
    slug: "socials-und-website-im-wandel",
    date: "2025-03-10T12:00:00.000Z",
    title: {
      de: "Unsere Socials und Website im Wandel",
      en: "Our social channels and website are evolving",
    },
    summary: {
      de: "Uccelli entwickelt seine digitalen Kanäle weiter, damit Projekte, Neuigkeiten und Beteiligungsmöglichkeiten klarer zugänglich werden.",
      en: "Uccelli is developing its digital channels so that projects, news and ways to participate are easier to access.",
    },
    sections: [{
      heading: { de: "Klarer informieren", en: "Clearer communication" },
      text: {
        de: "Instagram bleibt der schnelle Kanal für Eindrücke und aktuelle Hinweise. Die Website wird gleichzeitig zur verlässlichen Quelle für Projekte, offizielle Mitteilungen, Partner und Möglichkeiten, Teil des Vereins zu werden.",
        en: "Instagram remains the fast channel for impressions and current updates. At the same time, the website is becoming the reliable source for projects, official announcements, partners and ways to join the association.",
      },
    }] satisfies RichSection[],
  },
] as const;

export const partners = [
  {
    name: "GZ Höngg",
    type: "partner",
    url: "https://gz-zh.ch/gz-hoengg/",
    description: {
      de: "Unsere Homebase und erster Partner: Räume, Infrastruktur, Know-how und Zusammenarbeit auf Augenhöhe im Quartier Höngg.",
      en: "Our home base and first partner: rooms, infrastructure, know-how and collaboration on equal terms in the Höngg neighbourhood.",
    },
  },
  {
    name: "Anker Swiss AG",
    type: "partner",
    url: "https://ankerswiss.ch/",
    description: {
      de: "Partner für persönliche Arbeitsvermittlung, Karriereberatung und Unterstützung im Schweizer Bewerbungsprozess.",
      en: "Partner for personal recruitment, career guidance and support with the Swiss application process.",
    },
  },
  {
    name: "Royal Studio",
    type: "partner",
    description: {
      de: "Kreativer Partner für Foto-, Video- und Eventerlebnisse.",
      en: "Creative partner for photo, video and event experiences.",
    },
  },
  {
    name: "Hosttech GmbH",
    type: "sponsor",
    url: "https://www.hosttech.ch/",
    description: {
      de: "Technischer Unterstützer für Hosting und digitale Infrastruktur.",
      en: "Technical supporter for hosting and digital infrastructure.",
    },
  },
  {
    name: "GymOne",
    type: "sponsor",
    description: {
      de: "Unterstützer aus dem Bereich Bewegung, Gesundheit und Training.",
      en: "Supporter in the field of exercise, health and training.",
    },
  },
  {
    name: "Fröhliche Info",
    type: "sponsor",
    description: {
      de: "Unterstützer für Kommunikation und Medienproduktion.",
      en: "Supporter for communication and media production.",
    },
  },
] as const;

export const team = [
  {
    name: "Ato Akrofi",
    order: 1,
    role: { de: "Vereinspräsident", en: "Association President" },
    bio: {
      de: "Ato Akrofi ist Mitgründer und Präsident der Uccelli Society. Er verbindet kaufmännische Erfahrung mit seinem Studium der angewandten Psychologie und setzt sich besonders für Chancengleichheit, Empowerment und eine offene Gemeinschaft ein.",
      en: "Ato Akrofi is a co-founder and president of the Uccelli Society. He combines commercial experience with studies in applied psychology and is particularly committed to equal opportunity, empowerment and an open community.",
    },
  },
  {
    name: "Hatice Aksüt",
    order: 2,
    role: { de: "Leitung Projektmanagement", en: "Head of Project Management" },
    bio: {
      de: "Hatice Aksüt begleitet die Entwicklung und Koordination von Projekten und bringt Erfahrung aus Bildung, Hotellerie und sozialer Arbeit ein.",
      en: "Hatice Aksüt supports the development and coordination of projects and contributes experience from education, hospitality and social work.",
    },
  },
  {
    name: "Karim Moutiq",
    order: 3,
    role: { de: "Leitung IT", en: "Head of IT" },
    bio: {
      de: "Karim Moutiq ist Mitgründer und verantwortet die digitale Infrastruktur und technische Weiterentwicklung des Vereins.",
      en: "Karim Moutiq is a co-founder and is responsible for the association's digital infrastructure and technical development.",
    },
  },
  {
    name: "Shannon Kylee Jörg",
    order: 4,
    role: { de: "Vorstandsmitglied", en: "Board Member" },
    bio: {
      de: "Shannon Kylee Jörg bringt Erfahrungen aus dem sozialtherapeutischen Bereich und der Begleitung von Menschen in herausfordernden Lebenssituationen ein.",
      en: "Shannon Kylee Jörg contributes experience from social-therapeutic work and supporting people in challenging life situations.",
    },
  },
] as const;

export const faqs = [
  {
    order: 1,
    question: { de: "Was ist die Uccelli Society?", en: "What is the Uccelli Society?" },
    answer: {
      de: "Uccelli ist ein gemeinnütziger Verein mit Sitz in Zürich. Seit der Gründung am 16. Juli 2021 baut der Verein ein Netzwerk auf, das Menschen durch Bildung, Austausch, Berufsorientierung und persönliche Entwicklung stärkt.",
      en: "Uccelli is a non-profit association based in Zurich. Since its foundation on 16 July 2021, it has been building a network that strengthens people through education, exchange, career orientation and personal development.",
    },
  },
  {
    order: 2,
    question: { de: "Für wen ist Uccelli da?", en: "Who is Uccelli for?" },
    answer: {
      de: "Ein besonderer Fokus liegt auf Menschen mit Migrationsgeschichte und Personen, die sozial oder wirtschaftlich benachteiligt sind. Grundsätzlich sind aber alle willkommen, die unsere Werte und Projekte teilen.",
      en: "A particular focus is placed on people with a migration background and those facing social or economic disadvantage. In principle, everyone who shares our values and projects is welcome.",
    },
  },
  {
    order: 3,
    question: { de: "Muss ich Mitglied sein, um teilzunehmen?", en: "Do I have to be a member to participate?" },
    answer: {
      de: "Nein. Viele Projekte und Angebote stehen auch Nichtmitgliedern offen. Auf der Seite «Teil werden» kannst du angeben, wie du dich beteiligen möchtest.",
      en: "No. Many projects and services are also open to non-members. On the Join page, you can tell us how you would like to participate.",
    },
  },
  {
    order: 4,
    question: { de: "Was kostet die Mitgliedschaft?", en: "How much does membership cost?" },
    answer: {
      de: "Die reguläre Mitgliedschaft ist kostenlos. Wer den Verein zusätzlich finanziell unterstützen möchte, kann Gönnerin oder Gönner werden oder eine freie Spende leisten.",
      en: "Regular membership is free. Those who would also like to support the association financially can become a patron or make a voluntary donation.",
    },
  },
  {
    order: 5,
    question: { de: "Wie kann ich ein Projekt vorschlagen?", en: "How can I propose a project?" },
    answer: {
      de: "Wähle auf «Teil werden» die freiwillige Mitarbeit oder Projektteilnahme und beschreibe deine Idee. Das Team prüft gemeinsam, ob und wie sie zu den Zielen des Vereins passt.",
      en: "Choose volunteering or project participation on the Join page and describe your idea. The team will review together whether and how it fits the association's goals.",
    },
  },
  {
    order: 6,
    question: { de: "Wo finde ich aktuelle Veranstaltungen?", en: "Where can I find current events?" },
    answer: {
      de: "Kurzfristige Veranstaltungshinweise und Eindrücke veröffentlichen wir auf Instagram. Offizielle Mitteilungen, Projektfortschritte und Rückblicke findest du im News-Bereich der Website.",
      en: "We publish short-notice event announcements and impressions on Instagram. Official updates, project progress and recaps are available in the website's News section.",
    },
  },
  {
    order: 7,
    question: { de: "Wie steht Uccelli zu Diskriminierung?", en: "What is Uccelli's position on discrimination?" },
    answer: {
      de: "Uccelli verfolgt eine klare Antidiskriminierungshaltung. Menschen aller Nationalitäten, Ethnien, Geschlechter, sexuellen Orientierungen, Religionen und sozialen Hintergründe sind willkommen.",
      en: "Uccelli has a clear anti-discrimination stance. People of all nationalities, ethnicities, genders, sexual orientations, religions and social backgrounds are welcome.",
    },
  },
  {
    order: 8,
    question: { de: "Wie kann ich den Verein unterstützen?", en: "How can I support the association?" },
    answer: {
      de: "Du kannst deine Zeit und Fähigkeiten einbringen, Partner werden oder den Verein finanziell unterstützen. Die Möglichkeiten und Kontodaten findest du auf «Teil werden» und im Footer.",
      en: "You can contribute your time and skills, become a partner or support the association financially. Options and bank details are available on the Join page and in the footer.",
    },
  },
] as const;
