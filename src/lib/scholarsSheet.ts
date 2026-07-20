/**
 * CSV export URL for the "List of Scholars" Google Sheet. Once accepted
 * scholars are known, the organizing committee edits the sheet directly —
 * the site re-reads it automatically (no code change, no redeploy).
 *
 * Expected columns (first row = headers, case-insensitive):
 *   Name | Affiliation | Photo URL
 * Only Name is required per row — Affiliation and Photo URL may be left
 * blank (a placeholder avatar is shown if no photo is given).
 *
 * To get this URL: open the Sheet -> File -> Share -> Publish to web ->
 * select the correct sheet/tab -> choose "Comma-separated values (.csv)"
 * -> Publish, then paste the generated link below.
 *
 * Leave as an empty string to keep the "Scholar Profiles Coming Soon"
 * placeholder shown instead.
 */
export const SCHOLARS_SHEET_CSV_URL = "";

/** How often (in seconds) the site re-fetches the sheet. 3600 = 1 hour. */
export const SCHOLARS_SHEET_REVALIDATE_SECONDS = 3600;
