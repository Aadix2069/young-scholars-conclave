# Design: Year-wise archive of Registration/Abstract/Paper data

Date: 2026-07-29

## Problem

`/archive` currently lists conference years as static placeholder cards
(`ARCHIVE_YEARS` in `src/app/archive/page.tsx`) with no actual data behind
them. The admin needs to see, per year, every Registration, Abstract
Submission, and Full Paper Submission — the same data that lands in the
Google Sheet via the existing Apps Script backend — without leaving the
site, and without exposing that data (real names, emails, phone numbers)
to anyone who isn't authenticated through the existing `/archive` password
gate.

## Goals

- A new `/archive/[year]` page showing Registrations, Abstracts, and
  Papers for that year in tabbed tables.
- Data fetched via the Google Sheets API using a service-account
  credential — real access control at the data layer, not just an
  obscure URL. The credential and all API calls stay server-side.
- CSV export per category, derived from the same fetch (no redundant
  round-trip).
- 2026 wired to the currently active spreadsheet so the admin can
  monitor live submissions during the open registration period, not
  only after the Conclave concludes.
- Stays correct automatically as sheet columns change (e.g. today's new
  Gender column) — no per-field code to maintain.

## Non-goals

- Not writing/editing data from the archive — read-only.
- Not changing the existing `/archive` password/session mechanism
  (`archiveSession.ts`, `proxy.ts`) — the new route inherits it for free
  since the matcher is already `/archive/:path*`.
- Not migrating the public "List of Scholars" section (`scholarsSheet.ts`)
  off its existing publish-to-web CSV pattern — that data isn't
  sensitive and today's change doesn't touch it.

## Architecture

**Credentials**: two new server-only env vars, `GOOGLE_SERVICE_ACCOUNT_EMAIL`
and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (the private key stored with
literal `\n` sequences, unescaped in code via `.replace(/\\n/g, "\n")` —
the standard way to fit a PEM key into a single-line env var field).
Never sent to the client.

**`src/lib/archiveSheets.ts`** (new, server-only):
- Builds a `google-auth-library` `JWT` client scoped to
  `spreadsheets.readonly` from the two env vars.
- `getYearSubmissions(spreadsheetId)` calls the Sheets API v4
  `batchGet` for ranges `Registrations`, `Abstract Submissions`, and
  `Paper Submissions` in one request, and returns each as
  `{ headers: string[], rows: string[][] }` (first row of each range is
  the header row, matching what `Code.gs` already writes).
- Returns `null` (not a thrown error) if the env vars are unset, so the
  page can render a clear "not configured" state instead of crashing.
- Throws a typed error with a clear message on API failure (sheet not
  shared with the service account, bad ID, quota) — caught by the page
  and shown inline, same graceful-degradation style as the
  `APPS_SCRIPT_URL` checks elsewhere in the codebase.

**`src/app/archive/page.tsx`**: `ARCHIVE_YEARS` gains an optional
`spreadsheetId: string` field. 2026's entry gets the current spreadsheet
ID. `ArchiveYearList` links a year's card to `/archive/[year]` only when
`spreadsheetId` is set; otherwise it stays a non-clickable placeholder
exactly as today.

**`src/app/archive/[year]/page.tsx`** (new): async Server Component.
Looks up the year's `spreadsheetId` from `ARCHIVE_YEARS`, calls
`getYearSubmissions`, and passes the three `{headers, rows}` results into
a new client component.

**`src/components/archive/YearDataTabs.tsx`** (new, client): renders the
three tabs (Registrations / Abstracts / Papers) using one shared, generic
`DataTable` sub-component driven entirely by `headers`/`rows` — no
per-category table markup to duplicate or keep in sync with sheet
columns. A cell whose value starts with `http` renders as a link (covers
the Paper File Link column without hardcoding a column name). Each tab
has a "Download CSV" button that serializes its own already-in-memory
`headers`/`rows` into a CSV `Blob` and triggers a download — the data was
already sent to the authenticated client to render the table, so export
adds no new network request and no new place PII could leak from.

## Data flow

```
/archive/[year] (Server Component)
  -> archiveSheets.getYearSubmissions(spreadsheetId)
       -> JWT-authenticated Sheets API v4 batchGet
  -> { registrations, abstracts, papers } each {headers, rows}
  -> <YearDataTabs ... /> (Client Component, receives data as props)
       -> tab switch (client-side, no refetch)
       -> CSV export (client-side, from props already in memory)
```

## Error handling

- Env vars unset → page shows "Archive data isn't connected yet" with no
  crash (matches `APPS_SCRIPT_URL` pattern site-wide).
- Sheet not shared with the service account / wrong ID / API error →
  page shows the specific error message inline, since this is an
  admin-only page where a technical message is appropriate (unlike the
  public-facing forms, which get generic messages).
- Empty sheet (no submissions yet) → table renders a "No submissions
  yet" empty state per tab, not an error.

## Setup required from the user (not automatable)

1. In Google Cloud Console: create a project (or reuse one), enable the
   Google Sheets API, create a service account, generate a JSON key.
2. Share the submissions spreadsheet with the service account's email
   (`...@...iam.gserviceaccount.com`) as **Viewer**.
3. Set `GOOGLE_SERVICE_ACCOUNT_EMAIL` and
   `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (from the JSON key's
   `client_email` / `private_key` fields) as env vars — `.env.local` for
   dev, hosting provider's dashboard for production.
4. Give me the current 2026 spreadsheet's ID (from its URL) to fill into
   `ARCHIVE_YEARS`.

Until step 3/4 are done, the page renders the "not configured" state —
the rest of the site is unaffected.

## Testing plan

- `npm run build` for type-check across the new files.
- Manual verification once credentials are available: log into
  `/archive`, open `/archive/2026`, confirm all three tabs render real
  rows matching the Sheet, confirm CSV download produces a correct file,
  confirm the Paper File Link column is clickable.
- Before credentials exist: verify the "not configured" state renders
  cleanly rather than a crash/500.
