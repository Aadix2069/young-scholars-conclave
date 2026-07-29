import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArchiveLogoutButton } from "@/components/archive/ArchiveLogoutButton";
import { YearDataTabs } from "@/components/archive/YearDataTabs";
import { ARCHIVE_YEARS } from "@/lib/archiveYears";
import { ArchiveSheetsError, getYearSubmissions } from "@/lib/archiveSheets";

export const metadata: Metadata = {
  title: "Archive | Young Scholars' Conclave",
  robots: { index: false, follow: false },
};

export default async function ArchiveYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearParam } = await params;
  const year = Number(yearParam);
  const entry = ARCHIVE_YEARS.find((y) => y.year === year);

  if (!entry || !entry.spreadsheetId) {
    notFound();
  }

  let errorMessage: string | null = null;
  let notConfigured = false;
  let submissions: Awaited<ReturnType<typeof getYearSubmissions>> = null;

  try {
    submissions = await getYearSubmissions(entry.spreadsheetId);
    notConfigured = submissions === null;
  } catch (err) {
    errorMessage = err instanceof ArchiveSheetsError ? err.message : "Couldn't load this year's data.";
  }

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 bg-brand-sand/20 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link
                  href="/archive"
                  className="text-sm font-semibold text-brand-blue no-underline hover:text-brand-green-dark"
                >
                  &larr; Back to Archive
                </Link>
                <h1 className="mt-2 text-3xl font-extrabold text-brand-blue sm:text-4xl">
                  {year} Submissions
                </h1>
                <div className="mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
              </div>
              <ArchiveLogoutButton />
            </div>

            {notConfigured && (
              <p className="mx-auto mt-10 max-w-xl rounded-xl border border-dashed border-brand-gold/40 bg-brand-green/5 px-6 py-10 text-center text-base text-gray-600">
                Archive data isn&rsquo;t connected yet. Set the Google service account
                credentials to view submissions here.
              </p>
            )}

            {errorMessage && (
              <p
                role="alert"
                className="mx-auto mt-10 max-w-xl rounded-xl border border-red-300 bg-red-50 px-6 py-10 text-center text-base text-red-700"
              >
                {errorMessage}
              </p>
            )}

            {submissions && (
              <YearDataTabs
                year={year}
                registrations={submissions.registrations}
                abstracts={submissions.abstracts}
                papers={submissions.papers}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
