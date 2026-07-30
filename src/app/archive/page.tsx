import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArchiveYearList } from "@/components/archive/ArchiveYearList";
import { ArchiveLogoutButton } from "@/components/archive/ArchiveLogoutButton";
import { ARCHIVE_YEARS } from "@/lib/archiveYears";

export const metadata: Metadata = {
  title: "Archive | Young Scholars' Conclave",
  robots: { index: false, follow: false },
};

export default function ArchivePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 bg-brand-sand/20 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="mx-auto flex max-w-4xl items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-brand-blue sm:text-4xl">
                Conclave Archive
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
