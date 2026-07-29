# Connecting a year's data to the Archive

`/archive/[year]` shows that year's Registrations, Abstracts, and Papers by
reading the same Google Sheet the Apps Script writes to - published to the
web as CSV, the exact same way the site's "List of Scholars" section already
reads its Sheet. No Google Cloud project, no service account, no
credentials - just a link per tab.

## For each tab you want to show (Registrations, Abstract Submissions, Paper Submissions)

1. Open the submissions Google Sheet.
2. Click the tab you want to publish (e.g. "Registrations").
3. **File → Share → Publish to web**.
4. Under "Link", make sure the dropdown on the left is set to that
   specific sheet (not "Entire document").
5. Set the format dropdown (right) to **Comma-separated values (.csv)**.
6. Click **Publish**, confirm.
7. Copy the generated link.

Repeat for however many of the three tabs you want visible - you don't need
all three. A tab left unset just shows "No submissions yet" in the archive
instead of erroring.

## Give the links to the site

Each year's entry in `src/lib/archiveYears.ts` has a `csvUrls` object:

```ts
{
  year: 2026,
  status: "upcoming",
  description: "...",
  csvUrls: {
    registrations: "https://docs.google.com/spreadsheets/d/e/.../pub?gid=...&single=true&output=csv",
    abstracts: "https://docs.google.com/spreadsheets/d/e/.../pub?gid=...&single=true&output=csv",
    papers: "https://docs.google.com/spreadsheets/d/e/.../pub?gid=...&single=true&output=csv",
  },
},
```

Send the links to whoever maintains the codebase (or paste them in
yourself and redeploy) - once at least one is set, the year's card in
`/archive` flips from "Upcoming" to "Live" and links through to the data.

## Note on visibility

A "published to web" CSV link is reachable by anyone who has the exact
URL, regardless of the site's archive password - the password protects
the *page*, not the underlying Sheet data at that link. This is the
tradeoff for skipping the Google Cloud/service-account setup: it's much
simpler, but relies on that link not leaking rather than a real
per-request permission check. Don't post the link anywhere public.

## Adding a future year

1. Create that year's spreadsheet the same way the current one was set
   up (see `google-apps-script/DEPLOYMENT.md`).
2. Publish whichever tabs you want visible, same steps as above.
3. Add a new entry to `ARCHIVE_YEARS` with that year's `csvUrls`.
