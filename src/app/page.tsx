import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DatesTimeline } from "@/components/DatesTimeline";
import { AboutConclave } from "@/components/AboutConclave";
import { ThemesSection } from "@/components/ThemesSection";
import { CallForPapersSection } from "@/components/CallForPapersSection";
import { OrganisersSection } from "@/components/OrganisersSection";
import { ScholarsGrid } from "@/components/ScholarsGrid";
import { ChiefGuestsSection } from "@/components/ChiefGuestsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl justify-center">
            <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <Image
                src="/ysc_poster.jpeg"
                alt="Young Scholars' Conclave poster"
                width={1400}
                height={1980}
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>
        <AboutConclave />
        <DatesTimeline />
        <ThemesSection />
        <CallForPapersSection />
        <OrganisersSection />
        <ScholarsGrid />
        <ChiefGuestsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
