import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  localeDetection: false,
});

const DEFAULT_ADMIN_ORIGIN = "https://uccelli.qrwed.uk";

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
  const adminOnly = process.env.ADMIN_ONLY === "1";
  const adminOrigin = process.env.ADMIN_ORIGIN || DEFAULT_ADMIN_ORIGIN;

  if (isAdminPath) {
    const adminHost = new URL(adminOrigin).hostname;

    if (!adminOnly && request.nextUrl.hostname !== adminHost) {
      return NextResponse.redirect(new URL(`${pathname}${search}`, adminOrigin), 302);
    }

    return NextResponse.next();
  }

  if (adminOnly) {
    return NextResponse.redirect(new URL("/admin", request.url), 302);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
