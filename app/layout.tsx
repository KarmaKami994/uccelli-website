import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uccelli Society",
  description: "Gemeinschaft. Integrität. Generativität.",
};

// The <html>/<body> shell (and font loading) lives in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
