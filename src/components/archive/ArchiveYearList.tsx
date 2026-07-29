import Link from "next/link";
import type { ArchiveYear } from "@/lib/archiveYears";

/**
 * Year-wise archive index. Scalable by design: each future Conclave edition
 * is one more entry in the ARCHIVE_YEARS array (src/app/archive/page.tsx) -
 * no structural change needed as the archive grows across years.
 *
 * A card links to /archive/[year] only once that year has at least one
 * of its three CSV links set - otherwise it stays a non-clickable
 * placeholder.
 */
export function ArchiveYearList({ years }: { years: ArchiveYear[] }) {
  return (
    <div className="mx-auto mt-10 max-w-4xl space-y-4">
      {years.map((entry) => {
        const hasData = Boolean(
          entry.csvUrls?.registrations || entry.csvUrls?.abstracts || entry.csvUrls?.papers
        );
        const card = (
          <div
            className={`flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-200 ease-[var(--ease-smooth)] sm:flex-row sm:items-center sm:justify-between ${
              hasData ? "hover:-translate-y-0.5 hover:shadow-md" : ""
            }`}
          >
            <div>
              <h2 className="text-xl font-bold text-brand-blue">{entry.year}</h2>
              <p className="mt-1 text-sm text-gray-500">{entry.description}</p>
            </div>
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                entry.status === "available"
                  ? "bg-brand-green/15 text-brand-green-dark"
                  : hasData
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {entry.status === "available" ? "Available" : hasData ? "Live" : "Upcoming"}
            </span>
          </div>
        );

        return hasData ? (
          <Link
            key={entry.year}
            href={`/archive/${entry.year}`}
            className="block no-underline"
          >
            {card}
          </Link>
        ) : (
          <div key={entry.year}>{card}</div>
        );
      })}
    </div>
  );
}
