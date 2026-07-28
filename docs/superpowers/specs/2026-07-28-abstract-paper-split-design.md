# Design: Separate Abstract & Full Paper submission systems

Date: 2026-07-28

## Problem

The site has three intended submission flows — Registration, Submit Abstract,
Submit Full Paper — but only two exist. `/submit-paper` currently renders
`SubmitAbstractForm` (mislabeled route: URL says "paper", content is the
abstract form). There is no Full Paper flow, and no file-upload capability
anywhere in the codebase.

## Goals

- A real, independent Full Paper submission form, page, API route, and
  Google Apps Script handler, storing rows in their own sheet.
- Fix the `/submit-paper` route to actually be the paper form; move the
  existing abstract form to its own correctly-named route.
- Reuse the existing Registration/Abstract patterns (`FormField`,
  `useFormSubmit`, one Apps Script Web App routed by `formType`) rather than
  inventing new plumbing.

## Non-goals

- Not touching the Abstract form's fields, validation, or its Apps Script
  handler (`handleAbstractSubmission`) — it stays exactly as-is per user
  decision.
- Not adding a new Apps Script deployment / new `APPS_SCRIPT_URL` — the
  Full Paper flow extends the same Web App with a third `formType`.
- Not adding file upload to the Abstract form.

## Routing changes

- `src/app/submit-abstract/page.tsx` (new) — the existing abstract page
  content, moved from `submit-paper/page.tsx` verbatim.
- `src/app/submit-paper/page.tsx` — replaced with the new Full Paper page.
- `Navbar.tsx` "Submissions" group: `Submit Abstract` → `/submit-abstract`,
  new entry `Submit Full Paper` → `/submit-paper`.

## Full Paper form (`SubmitPaperForm.tsx`)

Built on the existing `FormField` / `useFormSubmit` primitives (same visual
language as Registration/Abstract forms). One addition: `FormField` gets a
`type="file"` input variant, and the form adds a standalone checkbox block
for the declaration (no existing primitive supports it).

Fields:

| Field | Required | Notes |
|---|---|---|
| Paper Title | yes | text |
| Corresponding Author | yes | text |
| Co-Author(s) | no | comma-separated |
| Institution / Affiliation | yes | text |
| Department | yes | text |
| Email | yes | validated format |
| Phone | yes | text |
| Research Domain | yes | select, reuses `THEMES` from `lib/themes.ts` |
| Keywords | yes | comma-separated text |
| Paper File | yes | upload, `.pdf`/`.doc`/`.docx`, max 3MB raw |
| Additional Remarks | no | textarea |
| Declaration / Consent | yes | checkbox: "I confirm this is original, unpublished work and consent to its review." |

### File handling

- Client reads the file via `FileReader.readAsDataURL`, strips the
  `data:...;base64,` prefix, sends the raw base64 string + filename + mime
  type as part of the JSON payload.
- Client-side validation before submit: extension/MIME whitelist
  (`.pdf`, `.doc`, `.docx`), size ≤ 3MB (checked on the raw `File.size`).
- 3MB raw cap is deliberate: base64 inflates payload ~33%, and Vercel's
  default serverless function body limit is 4.5MB. 3MB raw → ~4MB encoded,
  leaving headroom for the rest of the JSON fields.
- Server route re-validates: field present, decoded size sanity check,
  rejects with a clear message rather than forwarding garbage to Apps
  Script.

## API route (`/api/submit-paper/route.ts`)

Mirrors `/api/submit-abstract/route.ts`:
- 503 if `APPS_SCRIPT_URL` unset.
- 400 on unparseable body or missing required fields (including file).
- Forwards `{ formType: "paper", ...body }` to `APPS_SCRIPT_URL`.
- 502 on fetch failure, passes through Apps Script's `{success, message}`
  otherwise (200 on success, 400 on Apps Script-reported failure).

## Apps Script (`Code.gs`)

New `handlePaperSubmission(data)`:
- Validates required fields (all except Co-Author(s) and Additional
  Remarks) + email format.
- Decodes `data.fileBase64` with `Utilities.base64Decode`, builds a
  `Blob` with `data.fileName` / `data.fileMimeType`.
- Saves the blob into a dedicated Drive folder (`getOrCreateFolder("YSC
  2026 — Paper Submissions")`), sets sharing so the link is viewable by
  anyone with the link (matches "no login" public-facing submission flow).
- Appends a row to `getOrCreateSheet("Paper Submissions", PAPER_HEADERS)`.

`PAPER_HEADERS` (column order, one row per submission):
`Timestamp, Paper Title, Corresponding Author, Co-Author(s), Institution,
Department, Email, Phone, Research Domain, Keywords, Paper File Link,
Additional Remarks, Declaration Accepted`

Deployment note (added to `DEPLOYMENT.md`): adding `DriveApp` usage means a
new OAuth scope — redeploying will prompt the script owner to re-authorize.
Same Web App URL and env var otherwise; no new credentials needed.

## Error handling / UX (all three forms consistent)

- Submit button disabled + spinner while `state === "submitting"`
  (existing `useFormSubmit` pattern — no changes needed there).
- Success → confirmation panel replacing the form (existing pattern).
- Error → inline `role="alert"` message with the server's specific text
  (missing field, invalid email, file too large/wrong type, network
  failure, Apps Script error) — never a generic "something went wrong"
  unless it truly is a network exception.
- Field-level validation on blur, matching existing forms.

## Testing plan

- `npm run build` to catch type errors across the new route/page/form.
- Manual verification in the browser preview: fill and submit the Full
  Paper form with a small test PDF, confirm the request/response cycle
  and error states (missing field, oversized file, wrong file type)
  render correctly. Actual Google Sheet delivery can't be verified
  without a deployed Apps Script URL/credentials — noted as a follow-up
  the user must do after redeploying `Code.gs`.
- Regression check: Registration and Abstract pages still load and submit
  correctly (unchanged code, but routing/navbar changed nearby).
