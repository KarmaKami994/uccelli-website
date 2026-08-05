import type { SanitizedConfig } from "payload";
import payload from "payload";

type Section = readonly [heading: string, text: string];

type ProjectTranslation = {
  slug: string;
  title: string;
  summary: string;
  sections: readonly Section[];
};

function textNode(text: string) {
  return {
    type: "text",
    text,
    format: 0,
    mode: "normal",
    style: "",
    detail: 0,
    version: 1,
  };
}

function richText(sections: readonly Section[]) {
  const children: unknown[] = [];

  for (const [heading, text] of sections) {
    children.push({
      type: "heading",
      tag: "h2",
      children: [textNode(heading)],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    });

    for (const paragraph of text
      .split("\n")
      .map((value) => value.trim())
      .filter(Boolean)) {
      children.push({
        type: "paragraph",
        children: [textNode(paragraph)],
        direction: "ltr",
        format: "",
        indent: 0,
        textFormat: 0,
        textStyle: "",
        version: 1,
      });
    }
  }

  return {
    root: {
      type: "root",
      children,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

const projects: readonly ProjectTranslation[] = [
  {
    slug: "skills4growth",
    title: "Skills4Growth",
    summary:
      "Skills4Growth equips people in Ghana with practical vocational skills, entrepreneurial knowledge and mentoring to build sustainable livelihoods.",
    sections: [
      [
        "Short Description",
        `Skills4Growth is an education and vocational training project led by Uccelli Ghana. It provides people with limited access to education and employment with practical skills, entrepreneurial knowledge and long-term opportunities.
During the initial pilot phase, training programmes will be offered in dreadlock styling, wig making, sewing and tailoring, and sustainable soap production.
The current fundraising target for the pilot phase is CHF 7,000.`,
      ],
      [
        "How the Project Began",
        `During a visit to Ghana in February 2024, Ato met Richard Ocansey. Their collaboration led to the establishment of Uccelli Ghana, the first international country organisation of the Uccelli Society.
Under the local leadership of Richard Ocansey, David Kumador and Eric Lamptey, Uccelli Ghana develops projects that respond to specific social and economic challenges within local communities.
The focus lies on practical vocational training, personal guidance and cooperation with local partners. Uccelli Ghana works in coordination with the Uccelli Society in Switzerland, with transparency, accountability and responsible use of resources forming the foundation of the collaboration.`,
      ],
      [
        "Our Mission",
        `Skills4Growth supports people in acquiring professional skills, creating their own income opportunities and shaping their future independently.
The project combines practical vocational training, entrepreneurial knowledge, personal mentoring, local partnerships and support when entering employment or self-employment.
The aim is to reduce barriers to education and employment and create sustainable professional opportunities.`,
      ],
      [
        "Our Vision",
        `We want to contribute to a society in which a person's background or financial circumstances do not determine whether they have access to education, work and personal development.
Skills4Growth promotes independence, cooperation and sustainable community development. Participants should not only learn a practical trade, but also gain the knowledge and confidence required to use their skills economically and pass their knowledge on to others.
In the long term, the project aims to create strong local networks and new professional opportunities in Ghana.`,
      ],
      [
        "The Training Programmes",
        `The programmes are based on the needs of local communities and focus on activities that can provide realistic and sustainable income opportunities.`,
      ],
      [
        "Dreadlock Styling",
        `Participants learn professional techniques for creating, maintaining and styling dreadlocks.
The training prepares them to work in an existing salon, offer services independently or establish their own business.`,
      ],
      [
        "Wig Making",
        `Participants learn how to produce, customise and maintain high-quality wigs.
Alongside practical production skills, the programme covers customer consultation, pricing and marketing. It creates opportunities for employment and for starting a small independent business.`,
      ],
      [
        "Sewing and Tailoring",
        `The sewing and tailoring programme provides fundamental and advanced skills in garment production.
Participants learn to create clothing, carry out alterations and complete customer orders independently. The goal is to prepare them for work in fashion, tailoring or clothing production, or to support them in opening their own tailoring business.`,
      ],
      [
        "Soap Production",
        `Participants learn how to produce sustainable soap, handle materials safely and prepare products for sale.
In addition to production techniques, the programme covers product design, cost calculation, pricing and marketing. This creates a direct pathway towards entrepreneurship and independent income generation.`,
      ],
      [
        "How the Training Works",
        `Each programme follows a structured learning pathway:
• Introduction to the relevant professional field
• Fundamentals of tools, materials and safety
• Practical exercises with professional guidance
• Development of advanced techniques
• Basic knowledge of costs, pricing and customer service
• Preparation for employment or self-employment
Alongside practical skills, participants receive basic knowledge in financial management, entrepreneurship and the marketing of their services or products.
Mentoring and personal guidance help participants apply what they have learned after completing the programme.`,
      ],
      [
        "Target Group",
        `Skills4Growth is intended for people who have limited access to education and employment because of their social or economic circumstances.
The project particularly supports people who:
• Are looking for practical vocational training
• Have limited financial resources
• Want to establish an independent source of income
• Require support when entering the labour market
• Want to develop their professional skills
• Would like to pass their knowledge on within their community`,
      ],
      [
        "Goals of the Pilot Phase",
        `During the first phase of the project, we aim to:
• Conduct the first local training programmes
• Purchase appropriate tools and materials
• Involve local trainers and mentors
• Support participants during and after the training
• Gather experience and improve the programmes
• Establish a basis for long-term financing
• Build sustainable partnerships
The current fundraising target for the pilot phase is CHF 7,000. The funds will primarily be used for training materials, tools, local implementation costs and participant support.`,
      ],
      [
        "Local Cooperation",
        `Loc of Glory, led by Richard Ocansey, supports the programme particularly in the field of dreadlock styling. The company provides practical training opportunities and may support graduates as they enter employment.
Uccelli Switzerland provides strategic guidance and supports the project in financing, communication, organisation and quality assurance.
La-Adjeman Parliament, led by Eric Lamptey, supports community-based activities, the identification of potential participants and mentoring.
Uccelli Ghana also aims to cooperate with local authorities and community representatives in the La and Ashaiman regions.`,
      ],
      [
        "Why Support Skills4Growth?",
        `Supporting Skills4Growth does more than finance a single training course. It enables people to develop practical abilities that can help them generate income and shape their future independently.
A donation helps to:
• Provide training places
• Purchase tools and materials
• Support local trainers
• Provide mentoring and personal guidance
• Implement the pilot phase professionally
• Reach additional participants
• Build long-term structures`,
      ],
      [
        "Creating Opportunities Together",
        `Skills4Growth combines practical training, local knowledge and long-term support.
Together with Uccelli Ghana and our partner organisations, we want to help people discover, develop and use their abilities professionally.
Organisations, companies, funding partners and private individuals are invited to support the pilot phase and help create sustainable professional opportunities.`,
      ],
    ],
  },
  {
    slug: "lifelab",
    title: "LifeLab",
    summary: "Practical life skills for teenagers and young adults.",
    sections: [
      [
        "Skills for Life",
        `LifeLab supports teenagers and young adults on their path towards independent living. Practical learning formats connect knowledge with situations they encounter in everyday life, education and work.`,
      ],
      [
        "Topics",
        `Topics include finances, insurance, taxes, housing, applications, mental health, stress management, communication and personal development.`,
      ],
      [
        "Learning Through Experience",
        `Through practical assignments and projects, participants can take responsibility, test their abilities and build confidence in their own agency.`,
      ],
    ],
  },
  {
    slug: "nightshift-music",
    title: "NightShift Music",
    summary:
      "NightShift Music is a recurring concert series that promotes emerging regional bands, singer-songwriters and innovative DJ acts.",
    sections: [
      [
        "Short Description",
        `NightShift Music is a recurring concert series that promotes emerging regional bands, singer-songwriters and innovative DJ acts.
Live music, urban sounds, electronic soundscapes and multimedia elements come together to create a varied night-time experience.
Meet-and-greets, workshops and networking formats create opportunities for exchange between artists, audiences and local cultural professionals. The project is aimed at music enthusiasts aged 18 and over.`,
      ],
      [
        "The Idea Behind NightShift Music",
        `Many young musicians struggle to find suitable stages, professional production conditions and access to relevant networks.
NightShift Music creates an open and professional environment in which emerging artists can present their music, gain stage experience and connect with other people in the music and cultural sector.
The concert series is not only an event format. It is also a platform for musical discovery, cultural exchange and long-term creative cooperation.`,
      ],
      [
        "Our Mission",
        `NightShift Music supports emerging musicians and DJ acts in presenting and developing their artistic ideas within a professional environment.
The project combines:
• Regular performance opportunities
• Professional event and production experience
• Exchange between artists and audiences
• Workshops and knowledge sharing
• Media visibility
• Networking within the regional cultural scene
• Cooperation between different music communities
The aim is to promote local talent while creating a diverse cultural programme for the region.`,
      ],
      [
        "Our Vision",
        `NightShift Music is intended to become an established platform for urban music culture and regional talent development.
Our vision is a concert series that serves as a launchpad for new artists, connects different musical scenes and encourages cooperation between artists, venues, hospitality businesses, media organisations and cultural funders.
In the long term, we want to expand NightShift Music to additional venues, increase its media reach and establish it as a recognised platform for new music beyond the region.`,
      ],
      [
        "Live Acts",
        `Each concert evening generally features two emerging bands or solo artists.
Performances last approximately 30 to 45 minutes and give artists enough space to present their music and artistic identity to a new audience.`,
      ],
      [
        "DJ Sets",
        `After the live performances, DJ acts continue the evening with electronic and urban sounds.
Two DJ sets of approximately 45 minutes each are planned, creating a smooth transition from concert to club night.`,
      ],
      [
        "Meet-and-Greets and Workshops",
        `Visitors have the opportunity to meet the performing artists before or around the concert programme.
During short question-and-answer sessions, artists speak about their music, experiences and creative processes.
Additional mini-workshops may cover songwriting, live performance, stage presence, DJ techniques, music production, self-promotion and social media for artists.`,
      ],
      [
        "Multimedia Production",
        `Performances can be complemented by visual elements such as projections, lighting concepts or visual mapping.
Selected performances may also be documented professionally. Video recordings and short clips can be provided to artists for social media, YouTube and further promotion.`,
      ],
      [
        "Networking Afterparty",
        `After the official programme, space is created for informal exchange.
Artists, visitors, organisers and partners can make contacts, share experiences and discuss possible collaborations.`,
      ],
      [
        "Target Group",
        `NightShift Music is particularly aimed at:
• Music enthusiasts aged 18 and over
• Regional emerging musicians
• Singer-songwriters
• Bands and DJ acts
• Students and young professionals
• Urban and alternative subcultures
• Local organisers and cultural professionals
• People interested in discovering new music
The concert series welcomes a diverse audience and aims to connect different musical, social and cultural backgrounds.`,
      ],
      [
        "Goals of the Concert Series",
        `NightShift Music strengthens the regional music scene and promotes intercultural exchange within urban nightlife.
The goals for a season include:
• Organising six concert evenings
• Promoting a diverse range of regional live acts and DJs
• Reaching approximately 600 visitors in total
• Professionally documenting selected performances
• Creating video clips for artists and project communication
• Establishing long-term partnerships with venues and cultural organisations
• Connecting different music scenes and subcultures`,
      ],
      [
        "Benefits for Artists",
        `NightShift Music offers emerging artists more than a single performance.
Participants can gain stage experience, present their music to a new audience, receive professional photo and video material, build contacts within the music scene, receive feedback, initiate collaborations and increase their visibility.`,
      ],
      [
        "Benefits for the Region",
        `The concert series contributes to a lively, diverse and accessible cultural environment.
NightShift Music creates spaces for cultural encounters, supports local venues, brings musical genres together, strengthens regional networks, makes emerging talent visible and creates opportunities for creative cooperation.`,
      ],
      [
        "Why Support NightShift Music?",
        `Supporting NightShift Music contributes to building a long-term platform for new music and regional talent development.
Financial or practical support helps to:
• Finance fair artist fees
• Provide sound, lighting and stage equipment
• Secure venues and event infrastructure
• Organise workshops and exchange formats
• Document performances professionally
• Produce photo and video material
• Finance promotion and communication
• Keep ticket prices accessible`,
      ],
      [
        "How You Can Support NightShift Music",
        `You can support the project through donations, sponsorship, volunteering, ticket purchases and sharing the events.
Volunteers are needed for setup and dismantling, guest management, artist support, photography, video, social media, technical production and event organisation.
Companies and organisations can become sponsoring partners and receive visibility through event communication, social media, videos and the project website.`,
      ],
      [
        "Making New Music Visible Together",
        `NightShift Music combines emerging talent development, live music, knowledge sharing and cultural exchange.
Together with artists, venues, funding partners and audiences, we want to create a platform where new music can be discovered, creative ideas can develop and long-term relationships can be built.`,
      ],
    ],
  },
  {
    slug: "uccelli-liga",
    title: "Uccelli League",
    summary:
      "The Uccelli League is an accessible amateur football league for people of different backgrounds and levels of experience.",
    sections: [
      [
        "Short Description",
        `The Uccelli League is an accessible amateur football league that brings together people of different ages, backgrounds and levels of experience.
Through regular league matches, shared training sessions and community events, the project promotes physical activity, teamwork and intercultural exchange.
The main focus is not solely on performance and competition, but on fairness, community and enjoyment of football.`,
      ],
      [
        "The Idea Behind the Uccelli League",
        `Sport connects people across linguistic, social and cultural boundaries.
At the same time, many communities lack affordable and accessible sports programmes that are not exclusively focused on performance or formal club membership.
Membership fees, equipment costs and formal structures can create barriers, particularly for people with limited financial resources or no previous club experience.
The Uccelli League therefore offers a programme that is as easy to access as possible.`,
      ],
      [
        "Our Mission",
        `The Uccelli League creates a safe and inclusive environment in which football enthusiasts can play, learn and build new relationships.
The project combines regular physical activity, shared training, teamwork, fair play, intercultural encounters, voluntary engagement and accessible participation.
Regardless of background, language, social circumstances or previous playing experience, everyone should have the opportunity to become part of a team and an open football community.`,
      ],
      [
        "Our Vision",
        `In the long term, we aim to build a lively and self-sustaining amateur football community.
The Uccelli League demonstrates how sport can contribute to social integration, health promotion and a stronger sense of community.
The model will be developed continuously and may eventually be transferred to other regions or cities.`,
      ],
      [
        "League Matches",
        `Teams compete against each other regularly throughout the season.
A league format with home and away fixtures is planned. The exact number of match days depends on the number of participating teams.
Matches are organised according to shared rules and supported by referees. Respectful behaviour, fair play and a positive community experience remain central.`,
      ],
      [
        "Weekly Training Sessions",
        `Teams have the opportunity to train together regularly.
Training may include:
• Ball control
• Passing
• Endurance
• Tactical understanding
• Teamwork
• Communication
• Fair play
• Injury prevention
Volunteer coaches and support staff assist participants in their sporting and personal development.`,
      ],
      [
        "Community Events",
        `In addition to the regular league programme, the Uccelli League can organise friendly tournaments, mini-tournaments, charity match days, football workshops, shared training days, community gatherings and season opening or closing events.
These events create additional opportunities for players, families, spectators and partner organisations to meet and exchange ideas.`,
      ],
      [
        "Target Group",
        `The Uccelli League is intended for people who enjoy football and want to become part of an open community.
It particularly welcomes:
• Young people and adults
• Recreational football players
• People without an existing club membership
• People with a migration background
• Individuals with limited access to sports programmes
• New or inexperienced players
• Volunteer coaches and support staff
Previous playing experience or club membership is not required.`,
      ],
      [
        "Goals of the Uccelli League",
        `The main goal is to promote social integration through sport and strengthen community spirit through regular and accessible football activities.
Goals for the first project phase include:
• Establishing at least eight diverse teams
• Involving approximately 100 active players, coaches and support staff
• Organising a regular league programme
• Conducting at least three additional tournaments or workshops
• Building a network of sponsors and partner organisations
• Recruiting volunteer coaches, referees and helpers
• Establishing sustainable organisational and financial structures`,
      ],
      [
        "Benefits for Participants",
        `Through regular participation, players can improve their fitness, take responsibility within a team, meet new people, reduce social and linguistic barriers, develop confidence, learn conflict resolution and fair play, and build long-term friendships.
The project connects personal development with social participation.`,
      ],
      [
        "Benefits for the Community",
        `The league creates new spaces for social encounters, brings different population groups together, promotes health, strengthens voluntary engagement and connects sports clubs, social organisations and local partners.
Football becomes a practical tool for integration and community development.`,
      ],
      [
        "Organisation and Participants",
        `The Uccelli Society is responsible for management, season planning, communication with teams, match-day organisation, partner recruitment, volunteer coordination and public communication.
Volunteer coaches and support staff provide sporting guidance and contribute to a safe environment.
Matches can be supported by qualified or appropriately prepared referees.
Municipalities, sports authorities, venue operators and local clubs may provide pitches, facilities and organisational support.`,
      ],
      [
        "Why Support the Uccelli League?",
        `Support helps to finance sports pitches, purchase footballs and kits, compensate referees, organise tournaments, cover insurance and organisational costs, produce communication materials, keep participation fees affordable and include additional teams.`,
      ],
      [
        "How You Can Support the Project",
        `You can create a team, join an existing team, volunteer, become a sponsor, share match information or attend the games.
Volunteers can contribute as coaches, support persons, referees, organisers, match-day helpers, photographers, videographers or social media supporters.
Companies and organisations may support the league financially or through equipment, transport, food, printing and infrastructure.`,
      ],
      [
        "Connecting Through Football",
        `The Uccelli League combines physical activity, teamwork and social encounters.
Together with players, coaches, volunteers, municipalities and partner organisations, we want to build a football league that is accessible, fair and sustainable.`,
      ],
    ],
  },
  {
    slug: "steuern-versicherung",
    title: "Tax and Financial Literacy Workshop",
    summary:
      "The workshop provides clear and practical information about taxes, insurance, pensions and personal financial planning in Switzerland.",
    sections: [
      [
        "Short Description",
        `The Tax and Financial Literacy Workshop provides clear and practical information about taxes, insurance and personal financial planning in Switzerland.
The programme is intended for people who want to better understand the Swiss tax and insurance systems, make more informed financial decisions and use the available options more effectively.
The workshops create an accessible environment in which specialists explain complex topics and answer general questions using practical examples.`,
      ],
      [
        "The Idea Behind the Workshop",
        `Taxes, insurance and financial planning are part of everyday life, yet the relevant systems can be complex and difficult to understand.
This can be particularly challenging for people who are new to Switzerland, have had limited access to financial information, are organising their finances independently for the first time or are preparing for a new professional or family situation.
A lack of knowledge may result in missed deadlines, overlooked deductions, unsuitable insurance coverage or financial decisions made without sufficient information.`,
      ],
      [
        "Our Mission",
        `The workshop supports people in understanding the Swiss tax, insurance and financial systems.
The project combines:
• Clear and accessible information
• Practical examples from everyday life
• Direct exchange with specialists
• Space for general questions
• Awareness of financial risks
• Foundations for independent decision-making
• Referrals to suitable advisory services when individual support is required`,
      ],
      [
        "Our Vision",
        `Our vision is a society in which everyone has access to understandable financial information, regardless of background, language, education or previous experience.
In the long term, we want to offer recurring workshops, reach additional target groups and build a network of specialists, organisations and community partners.
The project aims to promote financial independence, reduce uncertainty and prevent avoidable financial disadvantages.`,
      ],
      [
        "The Swiss Tax System",
        `Participants receive an accessible overview of key elements of the Swiss tax system.
Possible topics include:
• The structure of the Swiss tax system
• Direct and indirect taxes
• Tax returns and important deadlines
• Income, assets and debts
• Withholding tax
• Cantonal and municipal differences
• Documents required for a tax return`,
      ],
      [
        "Tax Deductions",
        `The workshop explains which expenses may be relevant depending on a person's circumstances.
Possible topics include professional expenses, education and training costs, transport and meal costs, insurance deductions, pillar 3a contributions, childcare costs, donations, medical expenses and debt interest.
The exact tax treatment depends on the individual situation and the applicable cantonal rules.`,
      ],
      [
        "Insurance",
        `Participants learn about important types of insurance and their basic purposes.
Topics may include health insurance, accident insurance, personal liability, household contents, disability, life insurance, vehicle insurance and the difference between compulsory and voluntary coverage.
The aim is to help participants compare insurance products and assess their own needs more consciously.`,
      ],
      [
        "Personal Financial Planning",
        `Another focus is the responsible management of income and expenses.
Topics may include:
• Monthly budgeting
• Fixed and variable expenses
• Reserves for taxes
• Emergency savings
• Savings goals
• Debt prevention
• Payment deadlines
• Contracts and subscriptions
• Long-term financial planning`,
      ],
      [
        "Pensions and Social Security",
        `Depending on the scope of the event, the workshop may also cover the fundamentals of the Swiss pension system.
Possible topics include the three-pillar system, AHV and IV, occupational pensions, private pensions, pillar 3a and 3b, pension gaps and the importance of contribution years.`,
      ],
      [
        "How the Workshop Works",
        `The programme can be delivered as a single event, a workshop series or a themed information evening.
A possible format includes:
• Introduction to the selected topic
• Explanation of important terms
• Examples from typical everyday situations
• Information about common mistakes and risks
• Questions and exchange
• A summary and further sources of information
Content is presented as clearly as possible and may be supported by multilingual materials or interpretation.`,
      ],
      [
        "Target Group",
        `The workshop is generally open to all interested people.
It is particularly suitable for:
• People who want to better understand the Swiss tax system
• People with a migration background
• Young adults
• Families
• People beginning their careers
• People experiencing professional or personal changes
• Community and association members
• People with questions about insurance and pensions
No prior knowledge is required.`,
      ],
      [
        "Goals of the Project",
        `The main goal is to strengthen financial literacy and support people in making informed and independent decisions.
Further goals include:
• Explaining complex financial topics clearly
• Reducing uncertainty around taxes
• Increasing knowledge about insurance and pensions
• Raising awareness of financial risks
• Enabling exchange with specialists
• Reducing barriers to financial topics
• Reaching different communities
• Establishing a recurring educational programme`,
      ],
      [
        "Previous Experience",
        `The first tax workshop took place on 26 March 2022 in cooperation with the Ghanaian Union.
The event received strong interest from participants and demonstrated a clear need for accessible information about taxes, insurance and financial planning.
This experience forms the basis for the continued development of the project.`,
      ],
      [
        "Organisation and Participants",
        `The Uccelli Society coordinates the workshops, selects topics, recruits specialists, manages registrations, prepares venues and materials, and evaluates the programme.
Experts from taxation, insurance, pensions and financial planning provide practical information.
Community organisations can support communication, organisation and access to target groups. The questions and feedback of participants help shape future workshops.`,
      ],
      [
        "Benefits for Participants",
        `Participants can improve their understanding of tax terminology, prepare documents more effectively, recognise deadlines, better assess possible deductions, compare insurance products more consciously, identify financial risks, create a realistic budget and find appropriate advisory services.`,
      ],
      [
        "Important Information",
        `The workshop provides general educational information. It does not replace individual tax, legal, insurance, pension or investment advice.
Personal cases should be assessed by an appropriately qualified professional or responsible authority.`,
      ],
      [
        "Why Support the Workshop?",
        `Support helps finance suitable specialists, venues, learning materials, multilingual content, printed information, communication and recurring events.
A partnership or donation makes financial education more accessible to people who may otherwise have difficulty finding understandable information.`,
      ],
      [
        "How You Can Support the Project",
        `You can attend a future workshop, contribute professional expertise, become a partner organisation, volunteer or provide financial support.
Volunteers may assist with registration, guest support, interpretation, preparation of materials, event technology, communication and social media.`,
      ],
      [
        "Strengthening Financial Literacy Together",
        `Together with specialists, community organisations and partners, we want to help people better understand their financial situation, recognise risks and make responsible decisions.
Interested individuals, experts, organisations and funding partners are invited to become part of the project.`,
      ],
    ],
  },
  {
    slug: "kleidersammelaktion",
    title: "Annual Clothing Collection",
    summary:
      "The annual Uccelli clothing collection gathers well-preserved clothing for refugees and people in need.",
    sections: [
      [
        "Short Description",
        `The annual Uccelli clothing collection gathers well-preserved clothing for refugees and people in need.
Together with volunteers and partner organisations, donations are checked, sorted and passed on to people who urgently require warm and weather-resistant clothing.
The campaign takes place annually, with a particular focus on the colder winter months. It combines practical humanitarian support with the responsible reuse of clothing.`,
      ],
      [
        "The Idea Behind the Clothing Collection",
        `People who have been forced to leave their homes because of war, persecution, poverty or other emergencies can often take only a few personal belongings with them.
After arriving in a new place, some people lack basic items such as warm jackets, shoes and weather-resistant clothing.
Inadequate clothing can negatively affect health and quality of life, particularly during cold and wet winter conditions.
The Uccelli Society established the collection to respond to this practical need and ensure that usable resources are passed on responsibly.`,
      ],
      [
        "Our Mission",
        `The clothing collection supports refugees and people in need by improving access to appropriate clothing.
The project combines:
• Direct and practical assistance
• Voluntary engagement
• Cooperation with social organisations
• Careful collection and sorting
• Needs-based distribution
• Sustainable reuse of clothing
• Awareness of social responsibility
Our goal is to pass well-preserved clothing on to people who genuinely need it.`,
      ],
      [
        "Our Vision",
        `Our vision is a supportive community in which people facing difficult circumstances can receive quick and practical help.
At the same time, we want to encourage longer use of wearable clothing and reduce unnecessary disposal.
In the long term, the collection should become a reliable recurring initiative supported by private individuals, companies, volunteers and partner organisations.`,
      ],
      [
        "How the Collection Works",
        `Before each collection, the Uccelli Society coordinates with participating organisations to identify which items are currently needed.
The collection period and handover arrangements are then communicated publicly.
Donations are received, checked and sorted by volunteers. Only clean, wearable and usable items are prepared for distribution.
The sorted clothing is then passed on through partner organisations with experience and direct access to the relevant target groups.`,
      ],
      [
        "What We Collect",
        `Depending on current demand, suitable donations may include:
• Warm jackets and coats
• Sweaters and sweatshirts
• Trousers
• Weather-resistant clothing
• Well-preserved shoes
• Hats, scarves and gloves
• Practical everyday clothing
The items required for each campaign will be announced through the Uccelli Society's communication channels.`,
      ],
      [
        "What We Cannot Accept",
        `To ensure that donations can be passed on safely and directly, the following basic requirements apply:
• No underwear
• No damaged clothing
• No heavily worn clothing
• No dirty or unusable items
Please donate only items that you would still wear yourself or confidently pass on to another person.`,
      ],
      [
        "Target Group",
        `The clothing collection supports people who do not have access to sufficient clothing.
This may particularly include:
• Refugees
• Asylum seekers
• People facing financial hardship
• People without sufficient winter clothing
• Families and individuals supported by social organisations
The exact distribution is coordinated with the participating partner organisations.`,
      ],
      [
        "Goals of the Project",
        `The main goal is to provide refugees and people in need with warm, weather-resistant and well-preserved clothing.
Further goals include:
• Providing direct support to people in difficult circumstances
• Improving protection from cold and wet weather
• Conducting a reliable collection every year
• Encouraging voluntary engagement
• Strengthening cooperation with social organisations
• Raising awareness of social responsibility
• Extending the useful life of clothing
• Reducing unnecessary waste`,
      ],
      [
        "Benefits for the People Supported",
        `Appropriate clothing meets a fundamental human need.
Donations can help protect people from cold and rain, make everyday life easier, reduce financial pressure, support social participation and communicate a sense of solidarity and practical support.`,
      ],
      [
        "Benefits for the Environment and Community",
        `The clothing collection also has an environmental benefit. Well-preserved clothing is reused instead of being discarded.
The initiative brings together donors, volunteers, social organisations, companies, association members and recipients.
It connects solidarity, sustainability and practical community action.`,
      ],
      [
        "Previous Impact",
        `In recent years, hundreds of clothing items have been collected and passed on.
These donations have directly supported refugees and people in need.
Previous experience has also shown that many people are willing to donate suitable clothing and help with the organisation of the campaign.`,
      ],
      [
        "Organisation and Partners",
        `The Uccelli Society coordinates the collection period, communicates current needs, organises volunteers, manages sorting and works with partner organisations.
The AOZ, the Zurich Asylum Organisation, supports needs-based distribution to refugees and people in need.
Volunteers assist with receiving donations, checking quality, sorting, packing, transport, coordination and communication.
Private individuals and companies provide the clothing that forms the basis of the campaign.`,
      ],
      [
        "Why Support the Clothing Collection?",
        `A clothing donation gives an existing item a meaningful second use and makes it available to someone who needs it.
Support helps to:
• Provide people with warm clothing
• Reduce risks associated with cold weather
• Relieve financial pressure on families and individuals
• Extend the useful life of clothing
• Support the work of social organisations
• Encourage voluntary and community engagement`,
      ],
      [
        "How You Can Support the Project",
        `You can donate clean and well-preserved clothing by contacting uccelli.society@gmail.com. We will provide information about current needs, the collection period and handover arrangements.
You can also volunteer with receiving, quality control, sorting, packing, transport, coordination or social media.
Companies may contribute clothing, transport, storage space or other practical resources.
Sharing the collection announcements with friends, family and colleagues helps us reach additional donors.`,
      ],
      [
        "Passing on Warmth Together",
        `The annual clothing collection combines direct support, voluntary engagement and sustainable reuse.
Together with donors, volunteers and partner organisations, we want to help ensure that refugees and people in need have access to warm and appropriate clothing.
The collection period, handover location and currently required items are updated for each annual campaign.`,
      ],
    ],
  },
];

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config });
  const cms = payload as any;

  payload.logger.info("Importing English project translations...");

  for (const project of projects) {
    const found = await cms.find({
      collection: "projects",
      where: { slug: { equals: project.slug } },
      locale: "de",
      fallbackLocale: false,
      limit: 2,
      overrideAccess: true,
    });

    if (found.totalDocs !== 1 || !found.docs[0]) {
      throw new Error(
        `Expected exactly one project with slug ${project.slug}, found ${found.totalDocs}`,
      );
    }

    const id = found.docs[0].id;

    await cms.update({
      collection: "projects",
      id,
      locale: "en",
      overrideAccess: true,
      data: {
        title: project.title,
        summary: project.summary,
        body: richText(project.sections),
      },
    });

    const verified = await cms.findByID({
      collection: "projects",
      id,
      locale: "en",
      fallbackLocale: false,
      overrideAccess: true,
    });

    if (
      verified.title !== project.title ||
      verified.summary !== project.summary ||
      !verified.body
    ) {
      throw new Error(`Verification failed for ${project.slug}`);
    }

    payload.logger.info(
      `UPDATED EN: ${project.slug} -> ${project.title}`,
    );
  }

  payload.logger.info(
    `English translations imported and verified for ${projects.length} projects.`,
  );
  process.exit(0);
};
