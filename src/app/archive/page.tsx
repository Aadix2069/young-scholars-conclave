import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArchiveYearList } from "@/components/archive/ArchiveYearList";
import { ArchiveLogoutButton } from "@/components/archive/ArchiveLogoutButton";

export const metadata: Metadata = {
  title: "Archive | Young Scholars' Conclave",
  robots: { index: false, follow: false },
};

/**
 * Every year the Conclave runs, add an entry here. Each year is its own
 * scalable slot for that edition's papers, presentations, proceedings,
 * reports, and photos - the archive grows without any structural change.
 */
const ARCHIVE_YEARS = [
  {
    year: 2026,
    status: "upcoming" as const,
    description: "Records will be added here once the 2026 Conclave concludes.",
  },
];

export default function ArchivePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 bg-brand-sand/20 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="mx-auto flex max-w-4xl items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-brand-blue sm:text-4xl">
                Conference Archive
              </h1>
              <div className="mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
              <p className="mt-4 max-w-2xl text-sm text-gray-600">
                A repository of papers, presentations, proceedings, and reports from every
                edition of the Young Scholars&rsquo; Conclave. Restricted to the designated
                archive administrator.
              </p>
            </div>
            <ArchiveLogoutButton />
          </div>

          <ArchiveYearList years={ARCHIVE_YEARS} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
