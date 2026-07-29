# Young Scholars' Conclave 2026 — Project Summary

Date: 2026-07-29
Live site: https://young-scholars-conclave.vercel.app

## Overview

This document summarizes the work completed across this engagement: splitting
the submission system into independent Abstract / Full Paper flows, a batch
of content and design fixes, a new password-protected Conference Archive, and
several bug fixes and deployment corrections along the way.

---

## 1. Submission System — Abstract & Full Paper Split

**Problem:** `/submit-paper` incorrectly rendered the Abstract form under the
wrong URL; there was no real Full Paper submission flow.

**What was built:**
- `/submit-abstract` — the existing abstract form, moved to its correct URL.
- `/submit-paper` — a new, independent Full Paper form: title, corresponding
  author, co-authors, institution, department, email, phone, research domain,
  keywords, file upload (PDF/DOC/DOCX, 3MB cap, base64 → Google Drive), remarks,
  and a required declaration checkbox.
- `/api/submit-paper` — new API route mirroring the existing pattern (field
  validation, file type/size checks, forwards to Apps Script).
- `Code.gs` — new `handlePaperSubmission()`: saves the uploaded file to a
  dedicated Drive folder ("YSC 2026 — Paper Submissions"), appends a row to a
  new **Paper Submissions** sheet. Registration and Abstract handlers
  untouched.
- All three flows (Registration, Abstract, Paper) verified end-to-end against
  the live Apps Script deployment, including real file uploads to Drive.

## 2. Registration Form Updates

- **Gender field** added — required select (Male/Female/Other/Prefer not to
  say), flows through the API route into a new "Gender" column in the
  Registrations sheet.
- **Category simplified** — the 4-option dropdown was replaced with a fixed,
  non-editable "Research Scholars — ₹3,000" display; the fee table on the
  Registration page shows the same single row.

## 3. Content & Design Revisions

Audited against the client's original design-feedback document and fixed:

- Hero banner: subtitle/subheading removed, only the primary heading remains.
- Event dates corrected everywhere (Hero, About, Dates timeline, Footer, List
  of Scholars note, page metadata) from "1–3 Dec (alt. 2–4 Dec)" to a single,
  definitive **2–4 December 2026**.
- Experts section trimmed to the 3 confirmed names: Jayaraman T, Madhura
  Swaminathan, V. K. Ramachandran.
- Senior Scholars trimmed to CHRIST University / Foundation for Agrarian
  Studies affiliates only.
- Hero photo slideshow trimmed to the 3 requested photos.
- Organisers section: wired in two existing-but-unused photos (Harshan T. P.,
  Jayesh M. P.) that were sitting on disk but not referenced in code.
- Verified already-correct (no change needed): FAS green color value, 16px
  base font size, theme-card "Know more" buttons + centered grid, Submission
  Guidelines button (replacing "Meet Organisers"), Proceedings section
  (Gallery/Recordings/Reports sub-sections), FAS logo rendering.
- Abstract Submissions sheet: long abstract text no longer blows out row
  height — cell shows a 150-character preview, full text preserved as a
  hover note (`Code.gs`).

**Bug fix — Contact navigation:** clicking "Contact" in the nav (or any
in-page hash link) silently did nothing. Root cause: `scroll-smooth` on
`<html>` combined with Next.js's client-side Link routing meant the browser's
native jump-to-fragment never reliably fired, and `behavior: "auto"` alone
doesn't force an instant scroll when CSS says smooth. Fixed with a new
`HashScrollHandler` component that intercepts hash-link clicks during the
capture phase (before Next's own handler runs) and explicitly overrides the
CSS scroll-behavior for that jump. Verified working for both same-page clicks
and cross-page navigation arriving with a hash.

**Not done (needs real assets from the client, not fabricated):**
- Hero photos representing "meetings between FAS and CHRIST," agricultural
  landscape, etc. — declined AI-generated placeholders; needs real photos.
- "Call for Applications" / "Last Date to Submit" dates — structurally
  present in the Dates section, showing "To be announced" since no real date
  was ever supplied.

## 4. Conference Archive (new feature)

Password-protected repository showing each year's Registration/Abstract/Paper
submission data.

- `/archive` — year index; a year's card is clickable ("Live") once at least
  one data link is connected, otherwise stays a non-clickable "Upcoming"
  placeholder.
- `/archive/[year]` — tabbed view (Registrations / Abstracts / Papers), each
  a table driven entirely by the sheet's own header row (so new columns like
  Gender show up automatically, no code change needed), with a "Download CSV"
  button per tab.
- **Data source:** published-to-web CSV links (same pattern the site's
  "List of Scholars" section already uses) — no Google Cloud project, no
  service account. Each Sheet tab you want visible gets published (File →
  Share → Publish to web → CSV) and the link goes into
  `src/lib/archiveYears.ts`. Documented in `docs/archive-data-setup.md`.
  - Tradeoff, explicitly chosen for simplicity over a heavier access-control
    model: a published CSV link is reachable by anyone with the exact URL,
    independent of the archive password. The password still fully gates the
    *page* itself — confirmed unauthenticated requests to `/archive` and
    `/archive/[year]` redirect to the login screen.
- 2026's spreadsheet is known (`1HSeMqZpNfqDdA8Uevsv7HaMtA1O2OpCv4RBHpWZ6YwM`)
  but no tabs have been published yet — currently shows "Upcoming" until at
  least one CSV link is provided.

## 5. Deployment & Operations Fixes

- **Vercel deployment**: confirmed the project is not connected to GitHub
  auto-deploy — deploys are manual via `vercel --prod` from a local checkout.
  Multiple rounds deployed and verified live throughout this engagement.
- **Archive password**: found and fixed a mismatch between the local
  `.env.local` and Vercel's production value (explains earlier 401 errors).
  Synced both to the same value, currently `youngscholarsconclave@2026`.
  Login also now trims incidental whitespace from pasted passwords.
- **Wrong-worktree dev server**: root-caused a long debugging detour where
  `localhost:3000` was serving a *different* git worktree's files than the
  one being edited — killed the stale process, confirmed the correct one is
  running.
- **Concurrent editing**: this worktree has an auto-commit mechanism active
  under the same git identity, capturing manual edits made directly in an
  editor in parallel with this session (eyebrow-label removals, CFP copy
  trim, etc.) — all safely committed, called out for awareness, not reverted.

## Outstanding / Needs Your Action

1. **Archive data**: publish whichever Registrations/Abstract
   Submissions/Paper Submissions tabs you want visible and send the CSV
   links (see `docs/archive-data-setup.md`).
2. **Hero photos**: real photos for the remaining requested subjects
   (FAS/CHRIST meetings, agricultural landscape, etc.).
3. **Missing dates**: "Call for Applications" and "Last Date to Submit"
   actual dates, when confirmed by the organising committee.
4. **Stray edit**: an uncommitted change to `CallForPapersSection.tsx` was
   flagged mid-session — confirm whether that was intentional (it may since
   have been resolved by your own concurrent editing).

## Key Files Reference

| Area | Files |
|---|---|
| Submission forms | `src/components/submissions/*`, `src/app/submit-abstract`, `src/app/submit-paper` |
| Registration | `src/components/registration/*` |
| Backend | `google-apps-script/Code.gs`, `src/app/api/register`, `src/app/api/submit-abstract`, `src/app/api/submit-paper` |
| Archive | `src/app/archive/**`, `src/lib/archiveYears.ts`, `src/lib/archiveSheets.ts`, `src/components/archive/*` |
| Hash-scroll fix | `src/components/HashScrollHandler.tsx` |
| Setup docs | `google-apps-script/DEPLOYMENT.md`, `docs/archive-data-setup.md` |
