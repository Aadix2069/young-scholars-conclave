import type { Metadata } from "next";
import "./globals.css";
import { AosInit } from "@/components/AosInit";
import { FloatingCta } from "@/components/FloatingCta";
import { HashScrollHandler } from "@/components/HashScrollHandler";

export const metadata: Metadata = {
  title: "Young Scholars' Conclave 2026 | FAS & CHRIST University",
  description:
    "Young Scholars' Conclave 2026 — jointly organised by the Foundation for Agrarian Studies (FAS) and CHRIST (Deemed to be University), Bengaluru. 2–4 December 2026. Studying the Countryside in the Global South in the Twenty-First Century.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="skip-link rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Skip to main content
        </a>
        <AosInit />
        <HashScrollHandler />
        {children}
        <FloatingCta />
      </body>
    </html>
  );
}
