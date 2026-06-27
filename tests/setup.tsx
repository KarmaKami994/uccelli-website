import "@testing-library/jest-dom/vitest";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "de",
}));

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
  getMessages: async () => ({}),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/de",
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  notFound: vi.fn(),
}));

// Mock next/font/local
vi.mock("next/font/local", () => ({
  __esModule: true,
  default: () => ({ className: "mock-font", variable: "--mock-font" }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
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
  ScrollReveal: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

vi.mock("@/components/ui/StaggerReveal", () => ({
  StaggerReveal: ({ children, className }: any) => <div className={className}>{children}</div>,
}));
