import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  GallerySubsection,
  RecordingsSubsection,
  ReportsSubsection,
} from "@/components/proceedings/ProceedingsSubsection";

export const metadata: Metadata = {
  title: "Conference Proceedings | Young Scholars' Conclave 2026",
  description:
    "Gallery, recordings, and reports from the Young Scholars' Conclave 2026 at CHRIST (Deemed to be University).",
};

/**
 * Public showcase of the Conclave's events - unlike the Archive, this is
 * not password-protected. Add real items to these arrays as they become
 * available (photos after the event, recordings/reports as published).
 */
const GALLERY_ITEMS: { src: string; alt: string }[] = [];
const RECORDING_ITEMS: { title: string; url: string }[] = [];
const REPORT_ITEMS: { title: string; url: string; date: string }[] = [];

export default function ProceedingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <h1
            className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
            data-aos="fade-up"
          >
            Conference Proceedings
          </h1>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
          <p
            className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-500"
            data-aos="fade-up"
          >
            Photos, recordings, and reports showcasing the Young Scholars&rsquo; Conclave.
          </p>

          <div className="mx-auto mt-14 max-w-5xl space-y-16">
            <section id="gallery" data-aos="fade-up">
              <h2 className="mb-6 text-2xl font-bold text-brand-blue">Gallery</h2>
              <GallerySubsection items={GALLERY_ITEMS} />
            </section>

            <section id="recordings" data-aos="fade-up">
              <h2 className="mb-6 text-2xl font-bold text-brand-blue">Recordings</h2>
              <RecordingsSubsection items={RECORDING_ITEMS} />
            </section>

            <section id="reports" data-aos="fade-up">
              <h2 className="mb-6 text-2xl font-bold text-brand-blue">Reports</h2>
              <ReportsSubsection items={REPORT_ITEMS} />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
