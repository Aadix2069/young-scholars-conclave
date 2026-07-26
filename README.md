# Young Scholars' Conclave 2026 — Website

Official website for the **Young Scholars' Conclave 2026**, jointly organised by the
Foundation for Agrarian Studies (FAS) and CHRIST (Deemed to be University), Bengaluru.

**Live site:** https://young-scholars-conclave.vercel.app

This README is written for the **CHRIST University admin/organising team** — it assumes
no prior Next.js experience and explains exactly where to click/edit for common changes,
as well as how to redeploy those changes to the live site.

---

## 1. What this project is

A statically-generated marketing site built with:

| Piece | What it does |
|---|---|
| [Next.js](https://nextjs.org) 16 (App Router) | The web framework — renders the pages |
| [React](https://react.dev) 19 | UI components |
| [Tailwind CSS](https://tailwindcss.com) v4 | All styling (utility classes in the JSX, no separate CSS files to hunt through) |
| [AOS](https://michalsnik.github.io/aos/) | Scroll-in animations |
| [Vercel](https://vercel.com) | Hosting — builds and serves the live site |

There is **no database and no login system**. All content lives directly in the source
code. Registration and paper submission both hand off to external Google Forms rather
than collecting data on this site itself.

---

## 2. One-time setup (only needed once per computer)

1. Install [Node.js](https://nodejs.org) version **20 or later** (LTS recommended). To
   check what you have: `node -v`
2. Install [Git](https://git-scm.com/downloads) and clone the repository:
   ```bash
   git clone <repository-url>
   cd christ-university-conf
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```

That's it — no `.env` file, no API keys, no secrets to configure. Everything the site
needs is hardcoded directly in the source code.

---

## 3. Running the site locally (to preview changes before they go live)

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser. The page automatically refreshes
as you edit and save files — no need to restart the server.

Other useful commands:

```bash
npm run build   # Production build — run this to catch errors before deploying
npm run start   # Serve the production build locally (run `build` first)
npm run lint    # Check code style / catch obvious mistakes
```

---

## 4. How to edit content

This is the section you'll come back to most. Every common content change maps to one
specific file — you do **not** need to understand the whole codebase to make these edits.

### 4.1 Conference dates

| What | File |
|---|---|
| Countdown target date ("N Days To Go") | [`src/components/ConclaveCountdown.tsx`](src/components/ConclaveCountdown.tsx) — edit the `CONCLAVE_START` constant at the top |
| "Important Dates" timeline (Communication of Acceptance, Full Papers Due, Conclave Dates) | [`src/components/DatesTimeline.tsx`](src/components/DatesTimeline.tsx) — edit the `MILESTONES` array |
| Dates mentioned in page text/metadata (hero subtitle, page `<title>`/description) | [`src/components/Hero.tsx`](src/components/Hero.tsx) and [`src/app/layout.tsx`](src/app/layout.tsx) |

### 4.2 Registration & paper submission links

Both the "Register Now" and "Submit Abstract" buttons on every page read from a single
file:

**[`src/lib/googleForms.ts`](src/lib/googleForms.ts)**

```ts
export const GOOGLE_FORMS = {
  delegateRegistration: "https://docs.google.com/forms/...",
  paperSubmission: "https://docs.google.com/forms/...",
};
```

- Paste the real Google Form URL as the value.
- Leave a value as an **empty string `""`** to automatically show that button in a
  grayed-out "coming soon" state instead of a broken/placeholder link — you don't need
  to hide the button manually anywhere else.

### 4.3 Organising Committee (Academic Convenor, Experts, Senior Scholars)

**[`src/components/OrganisersSection.tsx`](src/components/OrganisersSection.tsx)**

- `EXPERTS` array — the "Experts" panel
- `SENIOR_SCHOLARS` array — the "Senior Scholars" panel
- The Academic Convenor (Barbara Harriss-White) is written directly in the JSX further
  down in the same file — search for her name to find and edit it.

Each entry is a simple `{ name: "...", affiliation: "..." }` object — copy an existing
line, change the text, keep the commas.

### 4.4 Thematic areas ("Our Themes")

**[`src/components/ThemesSection.tsx`](src/components/ThemesSection.tsx)** — edit the
`THEMES` array. Order in the array is the display order (01, 02, 03...).

### 4.5 About page & Registration page (fees, overview text)

- [`src/app/about/page.tsx`](src/app/about/page.tsx) and its section components in
  [`src/components/about/`](src/components/about/)
- [`src/app/registration/page.tsx`](src/app/registration/page.tsx) and
  [`src/components/registration/RegistrationFees.tsx`](src/components/registration/RegistrationFees.tsx)
  for the fee table

### 4.6 Site title, description, browser tab icon (SEO / sharing preview)

**[`src/app/layout.tsx`](src/app/layout.tsx)** — the `metadata` object controls the
`<title>` and the description shown when the link is shared on WhatsApp/social media/
Google search results.

Favicon: replace [`src/app/icon.png`](src/app/icon.png) with a new image of the same
name to change the browser tab icon.

### 4.7 Images and other files

Static files (logos, images) live in
[`public/`](public/) and are referenced in code as `/filename.ext`. Add a file there and
reference it the same way an existing image is referenced nearby.

---

## 5. Deploying changes to the live site

The site is hosted on **Vercel**, already linked to the project (see `.vercel/` folder
— do not delete it, it's how the CLI knows which Vercel project this folder deploys to).

### 5.1 First-time login on a new computer

```bash
npx vercel login
```

This opens a device-approval link in your browser (or shows a code to approve at
https://vercel.com/oauth/device). Approve it there — you do not enter any password in
the terminal. This only needs to be done once per computer; the session persists after.

Check you're logged in at any time with:

```bash
npx vercel whoami
```

### 5.2 Redeploying after making changes

```bash
# 1. Save your edits, then commit them
git add -A
git commit -m "Describe what you changed"

# 2. Deploy straight to the live production URL
npx vercel --prod
```

That's the entire deploy process. `vercel --prod` builds the project on Vercel's
servers and automatically re-points **young-scholars-conclave.vercel.app** at the new
build — usually done within a minute or two. No manual server restart, no file
uploading.

### 5.3 Previewing before going live (optional but recommended for big changes)

Run `npx vercel` **without** `--prod`. This builds and deploys to a unique, private
preview URL (e.g. `young-scholars-conclave-xyz123.vercel.app`) without touching the
live site — share that URL to get feedback, then run `npx vercel --prod` once you're
happy with it.

### 5.4 Checking deployment status / history

```bash
npx vercel ls young-scholars-conclave     # list recent deployments
npx vercel inspect <deployment-url>       # details of a specific deployment
```

Or visit the [Vercel dashboard](https://vercel.com/dashboard) after logging in with
the same account, which shows the same information visually along with build logs.

---

## 6. Troubleshooting

| Problem | Likely cause / fix |
|---|---|
| "The code isn't correct" while logging in via `vercel login` | The device-approval code shown expired (they're time-limited and single-use) or was already used. Just re-run `npx vercel login` to get a fresh code — it does not affect anything already deployed. |
| Local `npm run dev` shows a weird error after several edits | Stop the server (Ctrl+C) and restart `npm run dev` — Next.js's dev cache can go stale after many rapid file changes. |
| Changes don't show up on the live site after `vercel --prod` | Hard-refresh your browser (Ctrl+Shift+R) — browsers/CDNs cache pages briefly. Also confirm the terminal output said the deployment finished with "Ready", not an error. |
| `npm install` fails | Confirm Node.js version is 20+ (`node -v`) and try deleting `node_modules/` and `package-lock.json`, then `npm install` again. |

---

## 7. Who to contact

For questions about site **content** (dates, committee, themes), contact the Young
Scholars' Conclave organising committee.

For questions about the **code/hosting itself**, note the Vercel account this project
is deployed under and who holds access to it, so a future developer can be added if
needed (**Vercel dashboard → Project Settings → Members**).
