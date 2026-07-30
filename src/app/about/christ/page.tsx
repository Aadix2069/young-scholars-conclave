import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { AboutChristUniversity } from "@/components/about/AboutChristUniversity";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "CHRIST | Young Scholars' Conclave 2026",
  description:
    "About CHRIST (Deemed to be University), co-organiser and host of the Young Scholars' Conclave 2026.",
};

export default function AboutChristPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <AboutChristUniversity />
      </main>
      <Footer />
    </div>
  );
}
