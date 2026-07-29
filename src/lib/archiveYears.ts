export type ArchiveYear = {
  year: number;
  status: "upcoming" | "available";
  description: string;
  spreadsheetId?: string;
};

/**
 * Every year the Conclave runs, add an entry here. Each year is its own
 * scalable slot for that edition's papers, presentations, proceedings,
 * reports, and photos - the archive grows without any structural change.
 *
 * `spreadsheetId` (from the Sheet's URL, the long ID between /d/ and
 * /edit) links this year's card to /archive/[year], which shows live
 * Registration/Abstract/Paper data read via the Google Sheets API - see
 * docs/archive-service-account-setup.md. Leave it "" until that year's
 * spreadsheet is ready to connect; the card stays a non-clickable
 * placeholder until then.
 */
export const ARCHIVE_YEARS: ArchiveYear[] = [
  {
    year: 2026,
    status: "upcoming",
    description: "Records will be added here once the 2026 Conclave concludes.",
    spreadsheetId: "1HSeMqZpNfqDdA8Uevsv7HaMtA1O2OpCv4RBHpWZ6YwM",
  },
];
