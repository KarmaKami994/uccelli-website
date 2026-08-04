import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { OrganizationJsonLd } from "@/components/layout/JsonLd";
import { PageTransition } from "@/components/layout/PageTransition";
import { LOCALES, toLocale } from "@/lib/payload";
import "@/styles/globals.css";

export const revalidate = 300;

const lato = localFont({
  src: [
    { path: "../../public/fonts/Lato-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Lato-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lato-var",
  display: "swap",
});

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!(LOCALES as string[]).includes(rawLocale)) notFound();
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={lato.variable}>
      <head><OrganizationJsonLd /></head>
      <body className={`${lato.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-black focus:text-white focus:px-5 focus:py-3 focus:rounded-[12px] focus:text-[13px] focus:font-bold focus:uppercase focus:tracking-[0.12em]">
            {locale === "de" ? "Zum Inhalt springen" : "Skip to content"}
          </a>
          <Header />
          <main id="main-content" className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
