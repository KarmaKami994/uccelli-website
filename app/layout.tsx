import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

const lato = localFont({
  src: [
    { path: "../public/fonts/Lato-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Lato-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uccelli Society",
  description: "Gemeinschaft. Integrität. Generativität.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
