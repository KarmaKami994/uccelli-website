import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|admin|.*\\..*).*)"],
};
