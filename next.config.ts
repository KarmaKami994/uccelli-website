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
  async redirects() {
    return [
      // Previous Next.js information architecture
      { source: "/programm/projekte", destination: "/projekte", permanent: true },
      { source: "/programm/projekte/:slug", destination: "/projekte/:slug", permanent: true },
      { source: "/programm/news", destination: "/news", permanent: true },
      { source: "/programm/news/:slug", destination: "/news/:slug", permanent: true },
      { source: "/programm/veranstaltungen", destination: "/news", permanent: true },
      { source: "/programm/kursangebote", destination: "/projekte", permanent: true },
      { source: "/netzwerk", destination: "/projekte", permanent: true },
      { source: "/ueber-uns/vorstand", destination: "/ueber-uns#team", permanent: true },
      { source: "/ueber-uns/partner", destination: "/ueber-uns#partner", permanent: true },
      { source: "/ueber-uns/faq", destination: "/ueber-uns#faq", permanent: true },
      { source: "/werte/:slug", destination: "/ueber-uns#werte", permanent: true },

      // Old WordPress pages
      { source: "/ueber-die-uccelli-familie", destination: "/ueber-uns#geschichte", permanent: true },
      { source: "/team-4-cols-v2", destination: "/ueber-uns#team", permanent: true },
      { source: "/team/:member", destination: "/ueber-uns#team", permanent: true },
      { source: "/practice-areas", destination: "/ueber-uns#werte", permanent: true },
      { source: "/practice/:wert", destination: "/ueber-uns#werte", permanent: true },
      { source: "/aktive-projekte", destination: "/projekte", permanent: true },
      { source: "/lifelab", destination: "/projekte/lifelab", permanent: true },
      { source: "/lifelab-kompetenzen-fuers-leben", destination: "/projekte/lifelab", permanent: true },
      { source: "/skills4growth", destination: "/projekte/skills4growth", permanent: true },
      { source: "/konzertreihe-nightshift-music", destination: "/projekte/nightshift-music", permanent: true },
      { source: "/events", destination: "/news", permanent: true },
      { source: "/kursangebote", destination: "/projekte", permanent: true },
      { source: "/unser-netzwerk-im-ueberblick", destination: "/projekte", permanent: true },
      { source: "/partner", destination: "/ueber-uns#partner", permanent: true },
      { source: "/unsere-projekte", destination: "/news", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
      { source: "/faq", destination: "/ueber-uns#faq", permanent: true },
      { source: "/formulare", destination: "/teil-werden", permanent: true },

      // Old article slugs
      { source: "/dein-weg-zum-job-in-der-schweiz-anker-swiss-ag-wird-neuer-partner-der-uccelli-society", destination: "/news/partnerschaft-anker-swiss", permanent: true },
      { source: "/unsere-wurzeln-unsere-homebase-ein-grosses-danke-an-unseren-ersten-partner-das-gz-hoengg", destination: "/news/danke-gz-hoengg", permanent: true },
      { source: "/uccelli-society-x-royal-studio-wir-halten-eure-erlebnisse-fest", destination: "/news/partnerschaft-royal-studio", permanent: true },
      { source: "/eine-nacht-eine-mission-gemeinsam-fuer-ghana", destination: "/news/benefizkonzert-ghana", permanent: true },
      { source: "/nightshift-premiere-was-fuer-ein-start", destination: "/news/nightshift-premiere", permanent: true },
      { source: "/unsere-socials-und-website-im-wandel", destination: "/news/socials-und-website-im-wandel", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
