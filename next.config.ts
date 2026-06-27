import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@payloadcms/db-sqlite",
    "@libsql/client",
    "@libsql/hrana-client",
    "drizzle-kit",
  ],
  // WordPress → Next.js 301 Redirect Mapping
  async redirects() {
    return [
      // Main pages
      { source: "/ueber-die-uccelli-familie", destination: "/de/ueber-uns", permanent: true },
      { source: "/ueber-die-uccelli-familie/", destination: "/de/ueber-uns", permanent: true },
      { source: "/team-4-cols-v2", destination: "/de/ueber-uns/vorstand", permanent: true },
      { source: "/team-4-cols-v2/", destination: "/de/ueber-uns/vorstand", permanent: true },

      // Team individual pages → Vorstand
      { source: "/team/ato-akrofi-vorstandsmitglied", destination: "/de/ueber-uns/vorstand", permanent: true },
      { source: "/team/ato-akrofi-vorstandsmitglied/", destination: "/de/ueber-uns/vorstand", permanent: true },
      { source: "/team/karim-moutiq-vorstandsmitglied", destination: "/de/ueber-uns/vorstand", permanent: true },
      { source: "/team/karim-moutiq-vorstandsmitglied/", destination: "/de/ueber-uns/vorstand", permanent: true },
      { source: "/team/hatice-aksuet", destination: "/de/ueber-uns/vorstand", permanent: true },
      { source: "/team/hatice-aksuet/", destination: "/de/ueber-uns/vorstand", permanent: true },

      // Practice areas → Werte
      { source: "/practice-areas", destination: "/de/ueber-uns", permanent: true },
      { source: "/practice-areas/", destination: "/de/ueber-uns", permanent: true },
      { source: "/practice/schutz-der-umwelt", destination: "/de/werte/schutz-der-umwelt", permanent: true },
      { source: "/practice/schutz-der-umwelt/", destination: "/de/werte/schutz-der-umwelt", permanent: true },
      { source: "/practice/datenschutz", destination: "/de/werte/datenschutz", permanent: true },
      { source: "/practice/datenschutz/", destination: "/de/werte/datenschutz", permanent: true },
      { source: "/practice/diskriminierungsverbot", destination: "/de/werte/diskriminierungsverbot", permanent: true },
      { source: "/practice/diskriminierungsverbot/", destination: "/de/werte/diskriminierungsverbot", permanent: true },
      { source: "/practice/freiheit-und-autonomie", destination: "/de/werte/freiheit-und-autonomie", permanent: true },
      { source: "/practice/freiheit-und-autonomie/", destination: "/de/werte/freiheit-und-autonomie", permanent: true },
      { source: "/practice/solidaritaet-und-kohaesion", destination: "/de/werte/solidaritaet-und-kohaesion", permanent: true },
      { source: "/practice/solidaritaet-und-kohaesion/", destination: "/de/werte/solidaritaet-und-kohaesion", permanent: true },
      { source: "/practice/integritaet", destination: "/de/werte/integritaet", permanent: true },
      { source: "/practice/integritaet/", destination: "/de/werte/integritaet", permanent: true },

      // Projects & Programs
      { source: "/aktive-projekte", destination: "/de/programm/projekte", permanent: true },
      { source: "/aktive-projekte/", destination: "/de/programm/projekte", permanent: true },
      { source: "/lifelab-kompetenzen-fuers-leben", destination: "/de/skills4growth", permanent: true },
      { source: "/lifelab-kompetenzen-fuers-leben/", destination: "/de/skills4growth", permanent: true },
      { source: "/skills4growth", destination: "/de/skills4growth", permanent: true },
      { source: "/skills4growth/", destination: "/de/skills4growth", permanent: true },
      { source: "/konzertreihe-nightshift-music", destination: "/de/programm/projekte/nightshift-music", permanent: true },
      { source: "/konzertreihe-nightshift-music/", destination: "/de/programm/projekte/nightshift-music", permanent: true },

      // Events, Courses, Network
      { source: "/events", destination: "/de/programm/veranstaltungen", permanent: true },
      { source: "/events/", destination: "/de/programm/veranstaltungen", permanent: true },
      { source: "/kursangebote", destination: "/de/programm/kursangebote", permanent: true },
      { source: "/kursangebote/", destination: "/de/programm/kursangebote", permanent: true },
      { source: "/unser-netzwerk-im-ueberblick", destination: "/de/netzwerk", permanent: true },
      { source: "/unser-netzwerk-im-ueberblick/", destination: "/de/netzwerk", permanent: true },

      // Partner, News, Contact, FAQ, Forms
      { source: "/partner", destination: "/de/ueber-uns/partner", permanent: true },
      { source: "/partner/", destination: "/de/ueber-uns/partner", permanent: true },
      { source: "/unsere-projekte", destination: "/de/programm/news", permanent: true },
      { source: "/unsere-projekte/", destination: "/de/programm/news", permanent: true },
      { source: "/contact", destination: "/de/kontakt", permanent: true },
      { source: "/contact/", destination: "/de/kontakt", permanent: true },
      { source: "/faq", destination: "/de/ueber-uns/faq", permanent: true },
      { source: "/faq/", destination: "/de/ueber-uns/faq", permanent: true },
      { source: "/formulare", destination: "/de/ueber-uns", permanent: true },
      { source: "/formulare/", destination: "/de/ueber-uns", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
