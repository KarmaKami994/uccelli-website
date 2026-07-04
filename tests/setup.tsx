import "@testing-library/jest-dom/vitest";
import type { AnchorHTMLAttributes, ImgHTMLAttributes, ReactNode, HTMLAttributes } from "react";

type WithChildren = { children?: ReactNode; className?: string };

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "de",
}));

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
  getMessages: async () => ({}),
  setRequestLocale: vi.fn(),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/de",
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  notFound: vi.fn(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock next/image
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill: _fill, ...props }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} {...props} />
  ),
}));

// Mock next/font/local
vi.mock("next/font/local", () => ({
  __esModule: true,
  default: () => ({ className: "mock-font", variable: "--mock-font" }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: WithChildren) => <>{children}</>,
}));

// Mock GSAP to avoid ScrollTrigger registration errors in jsdom
vi.mock("gsap", () => ({
  default: { registerPlugin: vi.fn(), set: vi.fn(), to: vi.fn() },
  gsap: { registerPlugin: vi.fn(), set: vi.fn(), to: vi.fn() },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { create: vi.fn(() => ({ kill: vi.fn() })) },
}));

// Mock animation wrapper components
vi.mock("@/components/ui/ScrollReveal", () => ({
  ScrollReveal: ({ children, className }: WithChildren) => <div className={className}>{children}</div>,
}));

vi.mock("@/components/ui/StaggerReveal", () => ({
  StaggerReveal: ({ children, className }: WithChildren) => <div className={className}>{children}</div>,
}));
