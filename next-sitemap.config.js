/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://uccelli-society.ch",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*"],
  alternateRefs: [
    { href: "https://uccelli-society.ch/de", hreflang: "de" },
    { href: "https://uccelli-society.ch/en", hreflang: "en" },
  ],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
  },
};
