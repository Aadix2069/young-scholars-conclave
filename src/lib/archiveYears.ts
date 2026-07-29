export type ArchiveYear = {
  year: number;
  status: "upcoming" | "available";
  description: string;
  csvUrls?: {
    registrations?: string;
    abstracts?: string;
    papers?: string;
  };
};

/**
 * Every year the Conclave runs, add an entry here. Each year is its own
 * scalable slot for that edition's papers, presentations, proceedings,
 * reports, and photos - the archive grows without any structural change.
 *
 * `csvUrls` links this year's card to /archive/[year], which shows the
 * Registration/Abstract/Paper Sheets read as published CSV - see
 * docs/archive-data-setup.md for how to get each link (2 minutes,
 * no Google Cloud setup). Any of the three can be left unset; that tab
 * just shows "not connected" instead of erroring. Leave all three unset
 * to keep the card as a non-clickable placeholder.
 */
export const ARCHIVE_YEARS: ArchiveYear[] = [
  {
    year: 2026,
    status: "upcoming",
    description: "Records will be added here once the 2026 Conclave concludes.",
    csvUrls: {},
  },
];
