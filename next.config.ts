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
  // WordPress → Next.js 301 redirect mapping.
  // Notes:
  // - No trailing-slash variants needed: Next normalizes them before matching.
  // - Destinations are unprefixed (localePrefix "as-needed" serves German
  //   at the root) — avoids a second /de/… → /… redirect hop.
  async redirects() {
    return [
      // Main pages
      { source: "/ueber-die-uccelli-familie", destination: "/ueber-uns", permanent: true },
      { source: "/team-4-cols-v2", destination: "/ueber-uns/vorstand", permanent: true },

      // Team individual pages → Vorstand
      { source: "/team/:member", destination: "/ueber-uns/vorstand", permanent: true },

      // Practice areas → Werte
      { source: "/practice-areas", destination: "/ueber-uns", permanent: true },
      { source: "/practice/:wert", destination: "/werte/:wert", permanent: true },

      // Projects & Programs
      { source: "/aktive-projekte", destination: "/programm/projekte", permanent: true },
      { source: "/lifelab-kompetenzen-fuers-leben", destination: "/skills4growth", permanent: true },
      { source: "/konzertreihe-nightshift-music", destination: "/programm/projekte/nightshift-music", permanent: true },

      // Events, Courses, Network
      { source: "/events", destination: "/programm/veranstaltungen", permanent: true },
      { source: "/kursangebote", destination: "/programm/kursangebote", permanent: true },
      { source: "/unser-netzwerk-im-ueberblick", destination: "/netzwerk", permanent: true },

      // Partner, News, Contact, FAQ, Forms
      { source: "/partner", destination: "/ueber-uns/partner", permanent: true },
      { source: "/unsere-projekte", destination: "/programm/news", permanent: true },
      { source: "/contact", destination: "/kontakt", permanent: true },
      { source: "/faq", destination: "/ueber-uns/faq", permanent: true },
      { source: "/formulare", destination: "/ueber-uns", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
