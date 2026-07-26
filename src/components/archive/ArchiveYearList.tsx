type ArchiveYear = {
  year: number;
  status: "upcoming" | "available";
  description: string;
};

/**
 * Year-wise archive index. Scalable by design: each future Conclave edition
 * is one more entry in the ARCHIVE_YEARS array (src/app/archive/page.tsx) -
 * no structural change needed as the archive grows across years.
 */
export function ArchiveYearList({ years }: { years: ArchiveYear[] }) {
  return (
    <div className="mx-auto mt-10 max-w-4xl space-y-4">
      {years.map((entry) => (
        <div
          key={entry.year}
          className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-brand-blue">{entry.year}</h2>
            <p className="mt-1 text-sm text-gray-500">{entry.description}</p>
          </div>
          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              entry.status === "available"
                ? "bg-brand-green/15 text-brand-green-dark"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {entry.status === "available" ? "Available" : "Upcoming"}
          </span>
        </div>
      ))}
    </div>
  );
}
