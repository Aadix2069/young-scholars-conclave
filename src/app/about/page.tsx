import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ConclaveOverview } from "@/components/about/ConclaveOverview";
import { AboutChristUniversity } from "@/components/about/AboutChristUniversity";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Young Scholars' Conclave 2026",
  description:
    "About the Young Scholars' Conclave 2026, jointly organised by the Foundation for Agrarian Studies (FAS) and CHRIST (Deemed to be University), Bengaluru.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <ConclaveOverview />
        <AboutChristUniversity />
      </main>
      <Footer />
    </div>
  );
}
