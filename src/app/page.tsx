import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DatesTimeline } from "@/components/DatesTimeline";
import { AboutConclave } from "@/components/AboutConclave";
import { ThemesSection } from "@/components/ThemesSection";
import { ScholarsGrid } from "@/components/ScholarsGrid";
import { CallForPapersSection } from "@/components/CallForPapersSection";
import { OrganisersSection } from "@/components/OrganisersSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <AboutConclave />
        <DatesTimeline />
        <ThemesSection />
        <CallForPapersSection />
        <OrganisersSection />
        <ScholarsGrid />
      </main>
      <Footer />
    </div>
  );
}
