# Deploying the registration/abstract/paper backend

This connects the website's Registration, Submit Abstract, and Submit Full Paper forms to a Google Sheet, using `Code.gs` in this folder.

## 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like "Young Scholars' Conclave 2026 — Submissions".
3. Leave it empty — the script creates its own "Registrations", "Abstract Submissions", and "Paper Submissions" tabs automatically on first submission. The paper flow also creates a "YSC 2026 — Paper Submissions" Drive folder on first use, to hold uploaded manuscripts.

## 2. Add the script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete the placeholder `myFunction() {}` code in the editor.
3. Copy the entire contents of [`Code.gs`](Code.gs) in this folder and paste it in.
4. Click the **Save** icon (or Ctrl/Cmd+S).

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: anything, e.g. "Conclave registration v1"
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone** (this must be "Anyone", not "Anyone with a Google account" — the site submits without asking visitors to sign in)
4. Click **Deploy**.
5. Google will ask you to authorize the script — click through the consent screens (you'll see an "unverified app" warning since this is your own script; click **Advanced → Go to (project name)** to proceed). The paper flow uses `DriveApp` to save uploaded manuscripts, so this authorization step will also ask for Drive permission — accept it, or paper uploads will fail.
6. Copy the **Web app URL** it gives you — it looks like `https://script.google.com/macros/s/AKfycb.../exec`.

## 4. Give the URL to the website

The website never talks to Apps Script directly from the browser — it goes through a server-side Next.js route, so the URL stays out of the public page source. Set it as an environment variable:

- **Local development**: create a file named `.env.local` in the project root with:
  ```
  APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
  ```
- **Production (Vercel)**: in the Vercel dashboard → Project → Settings → Environment Variables, add `APPS_SCRIPT_URL` with the same value, then redeploy.

## 5. Test it

Once the env var is set and the site is running, submit a test entry through the Registration, Submit Abstract, or Submit Full Paper page and confirm a new row appears in the Sheet within a few seconds. For the paper form, also confirm the "Paper File Link" column has a working Drive link to the uploaded manuscript.

## Updating the script later

If you edit `Code.gs` (e.g. to add a field), you need to **redeploy**, not just save:

1. **Deploy → Manage deployments**
2. Click the pencil/edit icon on the existing deployment
3. Under "Version", choose **New version**
4. Click **Deploy**

Saving alone does not update the live Web App — Apps Script Web Apps are versioned, and only a new deployment version picks up code changes. If this is the first time deploying after the paper-submission update, redeploying will prompt a re-authorization for the new Drive permission — accept it the same way as step 5 above.

## Notes on the Full Paper flow

- Uploaded files are capped at **3MB** (checked on the website before the file is sent, and re-checked in `Code.gs`) to stay well under Vercel's default request body size limit, since the file is sent as base64 inside the JSON payload.
- Accepted file types: PDF, DOC, DOCX.
- Files are stored in a Drive folder named "YSC 2026 — Paper Submissions" (auto-created on first submission, in the Drive of whichever account the script is deployed as), shared as "anyone with the link can view" so the link in the sheet is directly usable.

## Notes on the Abstract Submissions sheet

- The **Abstract** column only shows the first 150 characters of each
  submission (plus "…"), so a long abstract doesn't blow out that row's
  height. The full text isn't lost — it's attached to the cell as a
  **note**: hover over the cell (small black triangle in the corner) to
  read it in full, or click the cell and check the note panel. Copying
  the cell's value still only copies the preview, not the full note.
