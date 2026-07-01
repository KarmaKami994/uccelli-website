import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AttentionBanner } from "@/components/layout/AttentionBanner";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { OrganizationJsonLd } from "@/components/layout/JsonLd";
import { PageTransition } from "@/components/layout/PageTransition";
import { getNavigation, getBannerEvents } from "@/lib/data";
import "@/styles/globals.css";

const lato = localFont({
  src: [
    { path: "../../public/fonts/Lato-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Lato-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lato-var",
  display: "swap",
});

const locales = ["de", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  const messages = await getMessages();
  const navItems = await getNavigation();
  const bannerEvents = await getBannerEvents();

  return (
    <html lang={locale} className={lato.variable}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className={`${lato.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-black focus:text-white focus:px-5 focus:py-3 focus:rounded-[12px] focus:text-[13px] focus:font-bold focus:uppercase focus:tracking-[0.12em]">
            {locale === "de" ? "Zum Inhalt springen" : "Skip to content"}
          </a>
          <AttentionBanner events={bannerEvents} />
          <Header navItems={navItems} />
          <main id="main-content" className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};