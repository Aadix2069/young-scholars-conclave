# Setting up the Archive's Google Sheets access

This connects `/archive/[year]` to a Google Sheet's Registrations,
Abstract Submissions, and Paper Submissions tabs, read via the Google
Sheets API with a service account - not a public "publish to web" link.
Only someone with the Sheet shared to them (or the site's service
account) can read this data; the `/archive` password only controls who
can reach the page, so this second layer matters since the data includes
real names, emails, and phone numbers.

## 1. Create a Google Cloud project (skip if you already have one)

1. Go to [console.cloud.google.com](https://console.cloud.google.com).
2. Create a new project (or select an existing one) from the project
   picker at the top of the page.

## 2. Enable the Google Sheets API

1. In the Cloud Console, go to **APIs & Services → Library**.
2. Search for **Google Sheets API** and click **Enable**.

## 3. Create a service account

1. Go to **APIs & Services → Credentials**.
2. Click **Create Credentials → Service account**.
3. Give it a name (e.g. "YSC Archive Reader"), click **Create and
   continue**, skip the optional role/access steps, click **Done**.
4. Click into the service account you just created, go to the **Keys**
   tab, click **Add key → Create new key**, choose **JSON**, and
   download it. This file contains the two values you need:
   - `client_email`
   - `private_key`

Keep this JSON file private - anyone with it can read whatever the
service account is later granted access to.

## 4. Share the spreadsheet with the service account

1. Open the submissions Google Sheet in your browser.
2. Click **Share**.
3. Paste the service account's `client_email` (looks like
   `something@your-project.iam.gserviceaccount.com`).
4. Set its role to **Viewer**. Click **Send** (no notification email is
   actually sent to a service account, that's expected).

## 5. Set the environment variables

From the downloaded JSON file:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL` = the `client_email` value, as-is.
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` = the `private_key` value,
  including the `-----BEGIN PRIVATE KEY-----` / `-----END PRIVATE
  KEY-----` lines. When pasting into an env var field that doesn't
  support real line breaks, leave the `\n` sequences in the string
  exactly as the JSON file has them (don't convert them to real
  newlines) - the code un-escapes them automatically.

Set both in:
- **Local development**: `.env.local` in the project root.
- **Production (Vercel)**: Project → Settings → Environment Variables,
  then redeploy.

## 6. Give the spreadsheet ID to the site

Each year's `ARCHIVE_YEARS` entry in `src/lib/archiveYears.ts` needs its
`spreadsheetId` - the long ID in the Sheet's URL:

```
https://docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit
```

This ID isn't secret (access is controlled by the sharing step above,
not by hiding the ID) - it's fine to commit directly in the array.

## 7. Test it

Log into `/archive` with the archive password, open the year's card, and
confirm the Registrations / Abstracts / Papers tabs show real rows
matching the Sheet, and that "Download CSV" produces a correct file.

## Adding a future year

1. Create that year's spreadsheet the same way the current one was set
   up (see the main `google-apps-script/DEPLOYMENT.md`).
2. Share it with the same service account email as **Viewer** - no new
   service account needed, one covers every year's sheet as you share
   each one to it.
3. Add a new entry to `ARCHIVE_YEARS` with that year's `spreadsheetId`.
