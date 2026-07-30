import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { AboutFAS } from "@/components/about/AboutFAS";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAS | Young Scholars' Conclave 2026",
  description:
    "About the Foundation for Agrarian Studies (FAS), co-organiser of the Young Scholars' Conclave 2026.",
};

export default function AboutFASPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <AboutFAS />
      </main>
      <Footer />
    </div>
  );
}
