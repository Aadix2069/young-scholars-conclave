import { Eyebrow } from "./Eyebrow";
import { SectionAccent } from "./SectionAccent";
import { PersonAvatar } from "./PersonAvatar";
import { parseCsv } from "@/lib/csv";
import {
  SCHOLARS_SHEET_CSV_URL,
  SCHOLARS_SHEET_REVALIDATE_SECONDS,
} from "@/lib/scholarsSheet";

type Scholar = {
  name: string;
  affiliation: string;
  photoUrl: string;
};

// Defense-in-depth: the Sheet is edited by someone outside this codebase, so
// don't fully trust its content even though Google Sheets sharing controls
// who can write to it. None of this is a security boundary (React already
// escapes text and a plain <img src> can't execute code) - it just keeps a
// misconfigured share setting or a typo from breaking the page's layout.
const MAX_SCHOLARS = 60;
const MAX_NAME_LENGTH = 100;
const MAX_AFFILIATION_LENGTH = 150;

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function sanitizePhotoUrl(value: string): string {
  // Only accept https URLs - avoids mixed-content blocking on an https
  // site and rules out non-URL junk in that column.
  return /^https:\/\//i.test(value) ? value : "";
}

async function getScholars(): Promise<Scholar[]> {
  if (!SCHOLARS_SHEET_CSV_URL) return [];

  try {
    const res = await fetch(SCHOLARS_SHEET_CSV_URL, {
      next: { revalidate: SCHOLARS_SHEET_REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];

    const rows = parseCsv(await res.text());
    if (rows.length < 2) return [];

    const [header, ...dataRows] = rows;
    const normalized = header.map((h) => h.trim().toLowerCase());
    const nameIdx = normalized.indexOf("name");
    const affiliationIdx = normalized.indexOf("affiliation");
    const photoIdx = normalized.indexOf("photo url");

    if (nameIdx === -1) return [];

    return dataRows
      .map((row) => ({
        name: truncate(row[nameIdx]?.trim() ?? "", MAX_NAME_LENGTH),
        affiliation: truncate(
          affiliationIdx !== -1 ? (row[affiliationIdx]?.trim() ?? "") : "",
          MAX_AFFILIATION_LENGTH
        ),
        photoUrl: sanitizePhotoUrl(photoIdx !== -1 ? (row[photoIdx]?.trim() ?? "") : ""),
      }))
      .filter((scholar) => scholar.name.length > 0)
      .slice(0, MAX_SCHOLARS);
  } catch {
    return [];
  }
}

function ScholarCard({ name, affiliation, photoUrl }: Scholar) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 border-t-4 border-t-brand-green bg-white p-6 text-center shadow-sm transition-[transform,box-shadow] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-1 hover:shadow-md">
      {photoUrl ? (
        // Photo URLs come from an arbitrary external sheet, not known at
        // build time, so next/image's remotePatterns allowlist doesn't fit
        // (that's also why PersonAvatar, used elsewhere on the site for
        // locally-hosted photos, isn't reused here).
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt={name}
          loading="lazy"
          className="h-20 w-20 rounded-full object-cover ring-2 ring-brand-gold/30"
        />
      ) : (
        <PersonAvatar name={name} photo="" className="h-20 w-20" />
      )}
      <p className="mt-4 text-sm font-bold text-brand-blue">{name}</p>
      {affiliation && <p className="mt-1 text-xs text-gray-500">{affiliation}</p>}
    </div>
  );
}

export async function ScholarsGrid() {
  const scholars = await getScholars();

  return (
    <section
      id="scholars"
      className="relative overflow-hidden bg-linear-to-b from-white to-brand-sand/40 py-16 md:py-24"
    >
      <SectionAccent position="bottom-right" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <Eyebrow className="text-center">Scholars</Eyebrow>
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          List of Scholars
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />

        {scholars.length === 0 ? (
          <div
            className="mx-auto mt-10 flex max-w-xl flex-col items-center rounded-xl border border-dashed border-brand-gold/40 bg-brand-sand/30 px-6 py-12 text-center"
            data-aos="fade-up"
          >
            <PersonAvatar name="" photo="" className="h-16 w-16" />
            <p className="mt-5 text-lg font-bold text-brand-blue">
              Scholar Profiles Coming Soon
            </p>
            <p className="mt-2 text-justify text-sm leading-6 text-gray-600">
              Accepted scholars will be announced here following the
              Communication of Acceptance on 20 September 2026, ahead of the
              Conclave on 2&ndash;4 December 2026.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {scholars.map((scholar, index) => (
              <div key={scholar.name} data-aos="fade-up" data-aos-delay={(index % 4) * 80}>
                <ScholarCard {...scholar} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
