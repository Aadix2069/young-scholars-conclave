# Phase 1 — Content & Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement every content, section, and navigation change specified in the client design review (`updation/YSC 2026 Design.docx`), plus clean drop-in placeholders for the four deferred asset categories, bringing the site to production-ready except for final asset integration.

**Architecture:** Section components live in `src/components/*.tsx` and are composed in `src/app/page.tsx`. Content that the organising committee will supply later (theme PDFs, chief guests, hero images, the conclave logo) is driven by exported config arrays/constants in `src/lib/` or at the top of the owning component, each with an explicit empty state — so integrating the real asset is a data edit, never a layout change. This mirrors the existing `src/lib/googleForms.ts` + `RegisterLink` pattern already in the codebase, where an empty string renders a disabled state.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, framer-motion, AOS, Swiper 14.

## Global Constraints

- **The DOCX is authoritative.** Where it specifies exact button copy, use that copy verbatim: theme cards say **"Know more"**, the Call for Papers secondary button says **"Submission Guidelines"**.
- **Never invent factual conference data.** Dates, names, affiliations, and deadlines not present in the DOCX or already in the codebase must render as an explicit "To be announced" state — not a plausible-looking guess. Fabricated official information is a defect, not a placeholder.
- **No dummy logos or fake photographs.** Deferred assets get structural placeholders (sized slots, empty-state cards), never stand-in imagery that could be mistaken for real branding or real people.
- Colors: use only the Task-1 design tokens — `brand-blue` (#234AA5), `brand-gold` (#C8A24A), `brand-green` (#99AE6A), `brand-green-dark` (#5F6F3F), `brand-charcoal` (#2B2B2B). No unofficial hex values.
- Body text minimum 16px / 1rem.
- `next/image` uses `preload`, **not** the deprecated `priority` prop (Next.js 16 deprecation — see `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`).
- **This Next.js version has breaking changes from older releases.** Read `node_modules/next/dist/docs/` before using any framework API you are unsure of.
- No test runner exists in this repo. Verification is: `npm run dev` (launch config `young-scholars-conclave-dev`, port 3000) + Browser pane `get_page_text` / `read_page` / `read_console_messages`. Every task must end with zero console errors.
- Preserve existing accessibility affordances already in the codebase: `data-aos` reveal attributes, `aria-hidden` on decorative elements, focus-visible rings on interactive elements.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/components/ScholarsGrid.tsx` | **Delete** — section removed per DOCX/client |
| `src/lib/scholarsSheet.ts` | **Delete** — only consumer was ScholarsGrid |
| `src/lib/csv.ts` | **Delete** — only consumer was ScholarsGrid |
| `src/app/page.tsx` | Modify — drop ScholarsGrid, add ChiefGuestsSection + ContactSection |
| `src/components/Navbar.tsx` | Modify — drop Scholars link, add Archive link, logo placeholder slot |
| `src/components/DatesTimeline.tsx` | Modify — add Call for Applications + Last Date to Submit milestones |
| `src/components/ThemesSection.tsx` | Modify — "Know more" → PDF, centre-align 5 cards |
| `src/components/CallForPapersSection.tsx` | Modify — "Meet the Organisers" → "Submission Guidelines" |
| `src/lib/conferenceDocs.ts` | **Create** — single source of truth for theme PDFs + submission guidelines |
| `src/components/PersonAvatar.tsx` | **Create** — reusable photo slot with initials fallback |
| `src/components/OrganisersSection.tsx` | Modify — photo slots on every person card |
| `src/components/ChiefGuestsSection.tsx` | **Create** — chief guest cards, empty-state driven |
| `src/components/ContactSection.tsx` | **Create** — dedicated prominent contact section |
| `src/components/Footer.tsx` | Modify — de-duplicate contact block, keep brand + links |
| `src/components/HeroSlideshow.tsx` | Modify — full Swiper config + placeholder slides |
| `src/components/Logos.tsx` | Modify — add `ConclaveLogo` placeholder-aware component |
| `README.md` | Modify — replace scholars-sheet docs with the new asset-integration guide |

---

### Task 1: Remove the List of Scholars section completely

**Files:**
- Delete: `src/components/ScholarsGrid.tsx`, `src/lib/scholarsSheet.ts`, `src/lib/csv.ts`
- Modify: `src/app/page.tsx`, `src/components/Navbar.tsx`, `README.md`

**Interfaces:**
- Produces: nothing. This task is purely subtractive; after it, no symbol named `ScholarsGrid`, `SCHOLARS_SHEET_CSV_URL`, `SCHOLARS_SHEET_REVALIDATE_SECONDS`, or `parseCsv` exists anywhere in `src/`.

- [ ] **Step 1: Confirm the full reference set before deleting**

Run:
```bash
grep -rn "ScholarsGrid\|scholarsSheet\|SCHOLARS_SHEET\|parseCsv\|#scholars\|List of Scholars" --include="*.tsx" --include="*.ts" --include="*.md" src/ README.md
```
Expected hits: `src/app/page.tsx` (import + usage), `src/components/Navbar.tsx` (nav link), `src/components/ScholarsGrid.tsx` (itself), `src/lib/scholarsSheet.ts` (itself), `src/lib/csv.ts` (itself), `README.md` (section 4.3). If you find a reference outside this list, report it before proceeding — it means the section is wired somewhere this plan didn't anticipate.

- [ ] **Step 2: Delete the three files**

```bash
git rm src/components/ScholarsGrid.tsx src/lib/scholarsSheet.ts src/lib/csv.ts
```

- [ ] **Step 3: Remove from `src/app/page.tsx`**

Delete the import line `import { ScholarsGrid } from "@/components/ScholarsGrid";` and the `<ScholarsGrid />` element from the JSX. Leave every other section in its current order.

- [ ] **Step 4: Remove the nav link from `src/components/Navbar.tsx`**

Delete this entry from the `NAV_LINKS` array:
```tsx
  { label: "List of Scholars", href: "/#scholars", hash: "#scholars" },
```

- [ ] **Step 5: Remove the scholars documentation from `README.md`**

Delete the entire "### 4.3 List of Scholars (no code change or redeploy needed)" subsection, including its numbered Google Sheet publishing steps and the trailing paragraph about the "Scholar Profiles Coming Soon" placeholder. Renumber the subsections that follow it (4.4 → 4.3, 4.5 → 4.4, and so on) so the numbering stays contiguous, and fix the "Scholars list still shows Coming Soon" row in the §6 Troubleshooting table by deleting that row.

- [ ] **Step 6: Verify nothing references the removed section**

```bash
grep -rn "ScholarsGrid\|scholarsSheet\|SCHOLARS_SHEET\|parseCsv\|#scholars\|List of Scholars" --include="*.tsx" --include="*.ts" --include="*.md" src/ README.md
```
Expected: **no output at all.**

Then: `npx tsc --noEmit` (expected: clean) and `npm run lint` (expected: clean).

- [ ] **Step 7: Verify in browser**

Run the dev server, load `http://localhost:3000`, and confirm via `get_page_text` that the words "List of Scholars" and "Scholar Profiles Coming Soon" no longer appear anywhere, and `read_console_messages` is clean.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: remove List of Scholars section per client design review"
```

---

### Task 2: Add the two missing milestones to Important Dates

**Files:**
- Modify: `src/components/DatesTimeline.tsx`

**Interfaces:**
- Consumes: `CalendarIcon`, `MegaphoneIcon` from `./icons` — **check `src/components/icons.tsx` first**; if either does not exist, add it there following the exact style of the existing icon exports (same props signature, same `stroke="currentColor"` / `fill` convention, 24×24 viewBox).

**DOCX requirement (verbatim):** *"Important Dates section needs to have the Call for applications date and the last date to submit date in it."*

- [ ] **Step 1: Read the existing icons module**

Run: read `src/components/icons.tsx` and list which icon components already exist. Pick the two most semantically appropriate existing icons for "Call for Applications" (an announcement/megaphone/bell type icon) and "Last Date to Submit" (a calendar/clock/deadline type icon). Only add new icon components if nothing suitable exists.

- [ ] **Step 2: Replace the `MILESTONES` array**

The two new dates are **not specified anywhere in the DOCX or the existing codebase**. Per the Global Constraints, they must render as an explicit to-be-announced state rather than an invented date. Replace:

```tsx
const MILESTONES = [
  {
    date: "20 September 2026",
    label: "Communication of Acceptance",
    Icon: CheckBadgeIcon,
  },
  {
    date: "10 November 2026",
    label: "Submission of Full Papers",
    Icon: DocumentIcon,
  },
  {
    date: "1–3 Dec 2026 (alt. 2–4 Dec)",
    label: "Conclave Dates",
    Icon: SparklesIcon,
  },
];
```

With (using whichever two icon names you confirmed in Step 1 in place of `MegaphoneIcon`/`CalendarIcon`):

```tsx
/**
 * Conclave milestones in chronological order.
 *
 * `date: null` renders an explicit "To be announced" state. The Call for
 * Applications and Last Date to Submit dates were requested by the client
 * design review but not supplied with it — set the real date string here
 * when the organising committee confirms it. Do not guess a date.
 */
const MILESTONES: { date: string | null; label: string; Icon: typeof CheckBadgeIcon }[] = [
  {
    date: null,
    label: "Call for Applications",
    Icon: MegaphoneIcon,
  },
  {
    date: null,
    label: "Last Date to Submit",
    Icon: CalendarIcon,
  },
  {
    date: "20 September 2026",
    label: "Communication of Acceptance",
    Icon: CheckBadgeIcon,
  },
  {
    date: "10 November 2026",
    label: "Submission of Full Papers",
    Icon: DocumentIcon,
  },
  {
    date: "1–3 Dec 2026 (alt. 2–4 Dec)",
    label: "Conclave Dates",
    Icon: SparklesIcon,
  },
];
```

- [ ] **Step 3: Render the to-be-announced state**

In the `.map()` body, replace:
```tsx
                <p className="text-sm font-semibold text-gray-500">{date}</p>
```
With:
```tsx
                <p
                  className={
                    date
                      ? "text-sm font-semibold text-gray-500"
                      : "text-sm font-semibold italic text-gray-400"
                  }
                >
                  {date ?? "To be announced"}
                </p>
```

- [ ] **Step 4: Fix the layout for five items**

The current layout hardcodes `md:w-1/3`, which breaks with five milestones. Replace `md:w-1/3` with `md:w-1/5` in the milestone item's className, and change the wrapper's `md:gap-6` to `md:gap-3` so five columns don't crowd. Also reduce the label's `max-w-[11rem]` to `max-w-[9rem]` so the narrower columns wrap cleanly.

- [ ] **Step 5: Verify in browser at three widths**

Run the dev server. Using `resize_window`, check at desktop (1280), tablet (768), and mobile (375):
- All five milestones render, in the order above.
- The two new ones show italic "To be announced".
- The connecting timeline line still spans correctly and columns don't overlap or overflow horizontally.
- `read_console_messages` is clean.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Call for Applications and Last Date to Submit milestones"
```

---

### Task 3: Theme cards — "Know more" PDF links, centred grid

**Files:**
- Create: `src/lib/conferenceDocs.ts`
- Modify: `src/components/ThemesSection.tsx`

**Interfaces:**
- Produces: `THEME_PDFS: Record<string, string>` and `SUBMISSION_GUIDELINES_PDF: string` exported from `src/lib/conferenceDocs.ts`. Task 4 consumes `SUBMISSION_GUIDELINES_PDF`.

**DOCX requirement (verbatim):** *"The button under each theme should be Know more, which opens a PDF that describes the theme. Moreover, if there are only 5 themes, it should centre aligned."*

- [ ] **Step 1: Create `src/lib/conferenceDocs.ts`**

```ts
/**
 * Single source of truth for the conference PDFs the site links out to.
 *
 * Drop the PDF into `public/docs/` and put its path here — every button on
 * the site reads from this file, so nothing else needs to change.
 *
 * Leave a value as an empty string to keep that button in its disabled
 * "coming soon" state (see DocLink.tsx / RegisterLink.tsx).
 */

/** Per-theme description PDFs, keyed by the exact theme title. */
export const THEME_PDFS: Record<string, string> = {
  "Role of Science and Technology in Agrarian and Rural Transformation": "",
  "Policies and Practices in Rural and Agrarian Development": "",
  "Inequality and Deprivation in the Countryside": "",
  "The Dynamics of Farm–Non-Farm Linkages": "",
  "Agriculture as an Arena of Human–Nature Interaction": "",
};

/** Submission guidelines PDF, linked from the Call for Papers section. */
export const SUBMISSION_GUIDELINES_PDF = "";
```

- [ ] **Step 2: Create the `public/docs/` directory**

```bash
mkdir -p public/docs
```

- [ ] **Step 3: Rewrite `ThemeCard` to use the PDF link with a disabled state**

Replace the existing `<a href="#call-for-papers" ...>Submission details</a>` block with:

```tsx
      {pdfHref ? (
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-semibold text-brand-blue underline underline-offset-4 transition-colors duration-200 ease-[var(--ease-smooth)] hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
        >
          Know more
        </a>
      ) : (
        <span
          className="mt-6 inline-block cursor-not-allowed text-sm font-semibold text-gray-400 underline underline-offset-4"
          aria-disabled="true"
          title="The theme description PDF will be available soon"
        >
          Know more
        </span>
      )}
```

And extend `ThemeCard`'s props to accept `pdfHref: string`:
```tsx
function ThemeCard({
  title,
  index,
  pdfHref,
  delay = 0,
}: {
  title: string;
  index: number;
  pdfHref: string;
  delay?: number;
}) {
```

- [ ] **Step 4: Centre-align the 5-card grid**

Replace:
```tsx
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((theme, index) => (
            <ThemeCard key={theme.title} {...theme} index={index} delay={index * 80} />
          ))}
        </div>
```

With a flex layout that centres the trailing row (a CSS grid cannot centre its last row's orphans; flex-wrap + justify-center can, and keeps the same card sizing at each breakpoint):

```tsx
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {THEMES.map((theme, index) => (
            <div
              key={theme.title}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <ThemeCard
                title={theme.title}
                index={index}
                pdfHref={THEME_PDFS[theme.title] ?? ""}
                delay={index * 80}
              />
            </div>
          ))}
        </div>
```

Add the import at the top of the file:
```tsx
import { THEME_PDFS } from "@/lib/conferenceDocs";
```

- [ ] **Step 5: Verify in browser**

Run the dev server, load the homepage, scroll to Themes, and confirm:
- All five cards render with the button text **"Know more"** (not "Submission details").
- With all `THEME_PDFS` values empty, every button is in the greyed disabled state and is **not** a link (`read_page` should show no `link` role for them).
- The last row (2 cards on desktop at `lg`, 1 card on tablet at `sm`) is horizontally **centred**, not left-aligned. Check at 1280px and 768px via `resize_window`.
- `read_console_messages` is clean.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: theme cards link to per-theme PDFs with centred grid"
```

---

### Task 4: Call for Papers — replace "Meet the Organisers" with "Submission Guidelines"

**Files:**
- Modify: `src/components/CallForPapersSection.tsx`

**Interfaces:**
- Consumes: `SUBMISSION_GUIDELINES_PDF` from `@/lib/conferenceDocs` (Task 3).

**DOCX requirement (verbatim):** *"Meet Organisers button isn't required in the Call for Papers section, especially since the following section already introduces the organisers. Instead, it would be more useful to replace it with a Submission Guidelines button, allowing users to access the submission requirements directly from this section."*

- [ ] **Step 1: Replace the "Meet the Organisers" anchor**

Replace:
```tsx
          <a
            href="#organisers"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/70 px-8 py-3 text-sm font-semibold text-white transition-[transform,background] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:bg-white/10"
          >
            Meet the Organisers
          </a>
```

With:
```tsx
          {SUBMISSION_GUIDELINES_PDF ? (
            <a
              href={SUBMISSION_GUIDELINES_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/70 px-8 py-3 text-sm font-semibold text-white transition-[transform,background] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
            >
              Submission Guidelines
            </a>
          ) : (
            <span
              className="inline-flex cursor-not-allowed items-center justify-center rounded-full border-2 border-white/40 px-8 py-3 text-sm font-semibold text-white/60"
              aria-disabled="true"
              title="The submission guidelines PDF will be available soon"
            >
              Submission Guidelines
            </span>
          )}
```

Add the import:
```tsx
import { SUBMISSION_GUIDELINES_PDF } from "@/lib/conferenceDocs";
```

- [ ] **Step 2: Verify in browser**

Confirm via `get_page_text` that "Meet the Organisers" no longer appears on the page and "Submission Guidelines" does; confirm the disabled state renders (not a link) while the constant is empty; `read_console_messages` clean.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: replace Meet the Organisers with Submission Guidelines button"
```

---

### Task 5: Person photo placeholders + Chief Guests section

**Files:**
- Create: `src/components/PersonAvatar.tsx`
- Create: `src/components/ChiefGuestsSection.tsx`
- Modify: `src/components/OrganisersSection.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `PersonAvatar({ name, photo, className })` — renders `next/image` when `photo` is a non-empty path, otherwise a branded initials circle. Consumed by both `OrganisersSection` and `ChiefGuestsSection`.
- Produces: `ChiefGuestsSection()` — default export-less named export, rendered by `page.tsx` between `AboutConclave` and `DatesTimeline`.

**DOCX requirement (verbatim):** *"Photos to be added in the Organisers section"*. Chief Guests is an additional client requirement from the Phase 1 brief.

- [ ] **Step 1: Create `src/components/PersonAvatar.tsx`**

```tsx
import Image from "next/image";

/**
 * Photo slot for a person card.
 *
 * Pass `photo` as a path under /public (e.g. "/people/jane-doe.jpg") to show
 * the real photograph. Leave it as an empty string and a branded initials
 * circle is shown instead — so official photographs can be dropped in later
 * without any layout change.
 */
export function PersonAvatar({
  name,
  photo,
  className = "h-16 w-16",
}: {
  name: string;
  photo: string;
  className?: string;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={`Photograph of ${name}`}
        width={256}
        height={256}
        className={`${className} shrink-0 rounded-full object-cover ring-2 ring-brand-gold/30`}
      />
    );
  }

  const initials = name
    .split(/\s+/)
    .filter((part) => /[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span
      className={`${className} flex shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-sm font-bold text-brand-green-dark ring-2 ring-brand-gold/30`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
```

- [ ] **Step 2: Add photo slots to `OrganisersSection.tsx`**

Add a `photo` field to every entry in both `EXPERTS` and `SENIOR_SCHOLARS`. Do this by adding `photo: ""` to each object — **do not reorder, rename, or remove any existing person**, and do not change any name or affiliation string. Add this comment directly above the `EXPERTS` array:

```tsx
/**
 * Photographs are supplied by the organising committee. Drop the image into
 * public/people/ and set `photo` to its path (e.g. "/people/jane-doe.jpg").
 * An empty string shows a branded initials circle instead.
 */
```

Then update the `PersonList` component to render the avatar:

```tsx
function PersonList({
  people,
}: {
  people: { name: string; affiliation: string; photo: string }[];
}) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
      {people.map((person, index) => (
        <li
          key={person.name}
          className="flex items-start gap-4 border-b-2 border-brand-gold/20 pb-4"
          data-aos="fade-up"
          data-aos-delay={(index % 4) * 60}
        >
          <PersonAvatar name={person.name} photo={person.photo} className="h-14 w-14" />
          <div>
            <p className="text-lg font-bold text-brand-blue">{person.name}</p>
            <p className="mt-1 text-sm text-gray-500">{person.affiliation}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
```

Add the import: `import { PersonAvatar } from "./PersonAvatar";`

Also add a `PersonAvatar` (at `className="h-24 w-24"`) to the Academic Convenor block further down the same file — read that block first and integrate the avatar into its existing layout without changing its copy.

- [ ] **Step 3: Create `src/components/ChiefGuestsSection.tsx`**

```tsx
import { Eyebrow } from "./Eyebrow";
import { SectionAccent } from "./SectionAccent";
import { PersonAvatar } from "./PersonAvatar";

/**
 * Chief guests for the Conclave. The organising committee supplies these
 * names and official photographs — add entries here and drop the images
 * into public/people/. While the list is empty the section renders an
 * explicit "to be announced" state rather than placeholder people.
 */
const CHIEF_GUESTS: { name: string; role: string; affiliation: string; photo: string }[] = [
  // { name: "", role: "Chief Guest", affiliation: "", photo: "/people/chief-guest.jpg" },
];

export function ChiefGuestsSection() {
  return (
    <section id="chief-guests" className="relative overflow-hidden bg-white py-20 md:py-28">
      <SectionAccent position="top-left" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Eyebrow className="text-center">Guests of Honour</Eyebrow>
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Chief Guests
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-gold" aria-hidden="true" />

        {CHIEF_GUESTS.length === 0 ? (
          <p
            className="mx-auto mt-10 max-w-xl rounded-xl border border-dashed border-brand-gold/40 bg-brand-green/5 px-6 py-10 text-center text-base text-gray-600"
            data-aos="fade-up"
          >
            Chief guests for the Young Scholars&rsquo; Conclave 2026 will be
            announced by the organising committee.
          </p>
        ) : (
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {CHIEF_GUESTS.map((guest, index) => (
              <article
                key={guest.name}
                className="flex w-full max-w-xs flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-[transform,box-shadow] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-1 hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <PersonAvatar name={guest.name} photo={guest.photo} className="h-28 w-28" />
                <h3 className="mt-4 text-lg font-bold text-brand-blue">{guest.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-gold">
                  {guest.role}
                </p>
                <p className="mt-2 text-sm text-gray-500">{guest.affiliation}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create the people directory and wire the section into the page**

```bash
mkdir -p public/people
```

In `src/app/page.tsx`, add `import { ChiefGuestsSection } from "@/components/ChiefGuestsSection";` and render `<ChiefGuestsSection />` immediately **after** `<OrganisersSection />`.

- [ ] **Step 5: Verify in browser**

Confirm: every organiser card shows a circular initials badge with correct initials (e.g. "JJ" for Jayan Jose Thomas, "PM" for P. C. Mohanan); the Chief Guests section renders the dashed to-be-announced panel; layout does not overflow at 375px; `read_console_messages` clean.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add person photo placeholders and Chief Guests section"
```

---

### Task 6: Dedicated, prominent Contact section

**Files:**
- Create: `src/components/ContactSection.tsx`
- Modify: `src/app/page.tsx`, `src/components/Footer.tsx`

**DOCX requirement (verbatim):** *"When clicking on Contact section, it seems like it is taking me to the List of Scholars section. Contact Us details don't seem to have prominence here. This needs to be fixed."*

**Root cause:** the `#contact` anchor is on the `<footer>` element itself. Because the footer is the last element on the page, scrolling to it lands the viewport on whatever section precedes it — which was List of Scholars. A dedicated section with its own `id="contact"` fixes both the mis-scroll and the prominence complaint.

- [ ] **Step 1: Create `src/components/ContactSection.tsx`**

Use the exact contact details already present in `src/components/Footer.tsx` — do not invent an email address or phone number. Read the footer's contact block first and carry those strings across verbatim (including the "Email — to be confirmed" state if it is still unresolved).

```tsx
import { Eyebrow } from "./Eyebrow";
import { SectionAccent } from "./SectionAccent";
import { MailIcon, MapPinIcon } from "./icons";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-linear-to-b from-blue-50/40 to-white py-20 md:py-28"
    >
      <SectionAccent position="bottom-left" />
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Eyebrow className="text-center">Get in Touch</Eyebrow>
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Contact Us
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-gold" aria-hidden="true" />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className="rounded-xl border border-gray-200 border-t-4 border-t-brand-gold bg-white p-8 shadow-sm"
            data-aos="fade-up"
          >
            <h3 className="text-lg font-bold text-brand-blue">Conference Venue</h3>
            <p className="mt-4 flex gap-3 text-base text-gray-700">
              <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-brand-green-dark" aria-hidden="true" />
              <span>
                <strong>CHRIST (Deemed to be University)</strong>
                <br />
                Central Campus, Dharmaram College Post,
                <br />
                Hosur Road, Bengaluru, Karnataka 560029
              </span>
            </p>
            <p className="mt-5 flex items-center gap-3 text-base text-gray-700">
              <MailIcon className="h-5 w-5 shrink-0 text-brand-green-dark" aria-hidden="true" />
              <span className="italic text-gray-500">Email &mdash; to be confirmed</span>
            </p>
          </div>

          <div
            className="rounded-xl border border-gray-200 border-t-4 border-t-brand-green bg-white p-8 shadow-sm"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-lg font-bold text-brand-blue">Contact Persons</h3>
            <ul className="mt-4 space-y-5">
              <li>
                <p className="text-base font-semibold text-gray-800">Dr Harshan T. P.</p>
                <p className="mt-1 text-sm text-gray-500">
                  Foundation for Agrarian Studies
                </p>
              </li>
              <li>
                <p className="text-base font-semibold text-gray-800">Dr Jayesh M. P.</p>
                <p className="mt-1 text-sm text-gray-500">CHRIST (Deemed to be University)</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Render it as the last section on the page**

In `src/app/page.tsx`, add the import and render `<ContactSection />` as the final child inside `<main>`, after `<ChiefGuestsSection />`.

- [ ] **Step 3: Move the `#contact` id off the footer**

In `src/components/Footer.tsx`, remove `id="contact"` from the `<footer>` element (leave every other attribute intact). Then remove the now-duplicated "Contact" column from the footer grid — the third `<div>` containing the `<h2>Contact</h2>` heading, address, email, and contact persons — and change the grid from `md:grid-cols-3` to `md:grid-cols-2` so the remaining brand and Useful Links columns lay out correctly. Add a "Contact" entry to the footer's `USEFUL_LINKS` array pointing at `/#contact`:
```tsx
  { label: "Contact", href: "/#contact", external: false },
```

- [ ] **Step 4: Verify the nav anchor now lands correctly**

Run the dev server. Click the "Contact" link in the navbar (use `find` to locate it, then `computer` to click). Then use `javascript_tool` to evaluate:
```js
JSON.stringify({
  id: document.elementFromPoint(window.innerWidth/2, 200)?.closest('section,footer')?.id,
  scrolledTo: Math.round(window.scrollY)
})
```
Expected: the element under the upper viewport is within `id="contact"` — i.e. the Contact **section**, not the footer and not any other section. Also confirm via `get_page_text` that "Contact Us", "Conference Venue", and both contact persons appear exactly once each on the page (no duplication between section and footer).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: dedicated prominent Contact section, correct nav anchor target"
```

---

### Task 7: Hero slideshow — full Swiper configuration with placeholder slides

**Files:**
- Modify: `src/components/HeroSlideshow.tsx`

**Client requirement:** *"Configure autoplay, navigation arrows, pagination, touch support, looping, and responsive behavior. Ensure the final conference images can be inserted later without changing the implementation."* Placeholder slides are explicitly requested here — but per Global Constraints they must be clearly non-photographic (branded gradient panels naming the intended shot), never stand-in imagery that reads as a real conference photo.

- [ ] **Step 1: Rewrite `src/components/HeroSlideshow.tsx`**

```tsx
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Hero slides.
 *
 * The official conference photographs are supplied by the organising
 * committee. To integrate them: drop each image into public/hero/ and set
 * `src` to its path. Entries with an empty `src` render a branded gradient
 * panel captioned with the shot that belongs there, so the slideshow is
 * fully functional and correctly laid out before the photos arrive — no
 * layout change is needed when swapping them in.
 */
const HERO_SLIDES: { src: string; alt: string; caption: string }[] = [
  {
    src: "",
    alt: "Representatives of the Foundation for Agrarian Studies and CHRIST University in discussion",
    caption: "FAS × CHRIST collaboration",
  },
  {
    src: "",
    alt: "CHRIST (Deemed to be University) campus, Bengaluru",
    caption: "CHRIST University campus",
  },
  {
    src: "",
    alt: "Conference hall prepared for the Young Scholars' Conclave",
    caption: "Conference venue",
  },
  {
    src: "",
    alt: "Young scholars presenting their research at the Conclave",
    caption: "Young scholars presenting",
  },
  {
    src: "",
    alt: "Rural agrarian landscape in the Global South",
    caption: "Agrarian landscapes",
  },
];

export function HeroSlideshow() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      navigation
      pagination={{ clickable: true }}
      a11y={{ enabled: true }}
      loop
      speed={1200}
      grabCursor
      className="hero-swiper absolute inset-0 h-full w-full"
    >
      {HERO_SLIDES.map((slide) => (
        <SwiperSlide key={slide.caption}>
          {slide.src ? (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-end justify-start bg-linear-to-br from-brand-blue via-blue-900 to-brand-green-dark p-8"
              role="img"
              aria-label={slide.alt}
            >
              <span className="rounded-full bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 backdrop-blur-sm">
                {slide.caption}
              </span>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

- [ ] **Step 2: Style Swiper's arrows and pagination to match the brand**

Swiper's default navigation arrows and pagination bullets ship with its own blue (`--swiper-theme-color`). Append this to `src/app/globals.css` so they match the conference palette and stay visible against the dark hero:

```css
/* Hero slideshow controls - Swiper's defaults use its own theme blue and a
 * small hit area; these bring it in line with the conference palette and
 * give the arrows a comfortable touch target on mobile. */
.hero-swiper {
  --swiper-theme-color: var(--color-brand-gold);
  --swiper-navigation-size: 24px;
  --swiper-navigation-color: #ffffff;
  --swiper-pagination-bullet-inactive-color: #ffffff;
  --swiper-pagination-bullet-inactive-opacity: 0.5;
}

.hero-swiper .swiper-button-next,
.hero-swiper .swiper-button-prev {
  height: 44px;
  width: 44px;
  border-radius: 9999px;
  background-color: rgb(0 0 0 / 0.25);
  backdrop-filter: blur(4px);
  transition: background-color 200ms var(--ease-smooth);
}

.hero-swiper .swiper-button-next:hover,
.hero-swiper .swiper-button-prev:hover {
  background-color: rgb(0 0 0 / 0.45);
}

@media (max-width: 640px) {
  .hero-swiper .swiper-button-next,
  .hero-swiper .swiper-button-prev {
    display: none;
  }
}
```

- [ ] **Step 3: Verify the full control set in browser**

Run the dev server, load the homepage, and confirm:
- Five gradient placeholder panels cycle automatically (wait ~6s and confirm the active slide index changes — check `document.querySelector('.hero-swiper .swiper-slide-active')`'s caption text before and after).
- Navigation arrows render on desktop and clicking the next arrow advances the slide.
- Pagination bullets render, and clicking a bullet jumps to that slide.
- At 375px width (`resize_window` mobile), the arrows are hidden and pagination still renders.
- The hero heading/CTA content still sits above the slideshow and is readable.
- `read_console_messages` is clean.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: full Swiper hero config with branded placeholder slides"
```

---

### Task 8: Conclave logo placeholder slot

**Files:**
- Modify: `src/components/Logos.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`

**Client requirement:** *"Leave a clearly defined placeholder. Do not use dummy logos. Ensure the layout supports future replacement without redesign."*

- [ ] **Step 1: Add a placeholder-aware `ConclaveLogo` to `src/components/Logos.tsx`**

```tsx
/**
 * Young Scholars' Conclave logo.
 *
 * The collaborative conference logo is being finalised by the organisers.
 * To integrate it: save the transparent PNG to public/conclave-logo.png and
 * set CONCLAVE_LOGO_SRC to "/conclave-logo.png". Until then a typographic
 * wordmark occupies the same slot, so no layout change is needed when the
 * real logo arrives.
 */
const CONCLAVE_LOGO_SRC = "";

export function ConclaveLogo({
  className,
  variant = "color",
}: LogoProps & { variant?: "color" | "white" }) {
  if (CONCLAVE_LOGO_SRC) {
    return (
      <Image
        src={CONCLAVE_LOGO_SRC}
        alt="Young Scholars' Conclave"
        width={512}
        height={512}
        className={className}
        preload
      />
    );
  }

  return (
    <span
      className={`flex flex-col justify-center leading-none ${className ?? ""}`}
      aria-label="Young Scholars' Conclave"
    >
      <span
        className={`text-sm font-black uppercase tracking-tight sm:text-lg ${
          variant === "white" ? "text-white" : "text-brand-blue"
        }`}
      >
        Young Scholars&rsquo;
      </span>
      <span
        className={`text-[0.6rem] font-bold uppercase tracking-[0.25em] sm:text-xs ${
          variant === "white" ? "text-brand-gold" : "text-brand-gold"
        }`}
      >
        Conclave
      </span>
    </span>
  );
}
```

- [ ] **Step 2: Use it in the Navbar**

In `src/components/Navbar.tsx`, replace the `<span>...YSC 2026</span>` lockup inside the home `<Link>` with:

```tsx
            <span className="h-8 w-px shrink-0 bg-gray-200 sm:h-10" aria-hidden="true" />
            <ConclaveLogo className="h-9 shrink-0 sm:h-12" />
```

Update the import to `import { ChristLogo, ConclaveLogo } from "./Logos";`.

- [ ] **Step 3: Use it in the Footer**

In `src/components/Footer.tsx`, inside the brand column's logo row, add the conclave logo beside the Christ logo:

```tsx
          <div className="mb-4 flex items-center gap-4">
            <ChristLogo variant="white" className="h-auto w-32" />
            <span className="h-10 w-px shrink-0 bg-white/25" aria-hidden="true" />
            <ConclaveLogo variant="white" className="h-12 shrink-0" />
          </div>
```

Update the import to `import { ChristLogo, ConclaveLogo } from "./Logos";`.

- [ ] **Step 4: Verify in browser**

Confirm the wordmark renders in both header and footer, is legible at 375px and 1280px, does not wrap awkwardly or overflow the navbar, and `read_console_messages` is clean. Confirm via `read_page` that the accessible name "Young Scholars' Conclave" is present in both locations.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add conclave logo placeholder slot for drop-in replacement"
```

---

## Self-Review Notes

**DOCX coverage:** FAS logo missing → deferred by client (Task 8 slot holds the position). Video → slideshow ✓ (Task 7, plus Plan-1 Task 4). 16px text ✓ (Plan 1 Task 1). Important Dates additions ✓ (Task 2). Theme "Know more" + PDF + centre-align ✓ (Task 3). Call for Papers button swap ✓ (Task 4). Organisers photos ✓ (Task 5). Scholars "See Call for Papers" → superseded, whole section removed per client override ✓ (Task 1). Contact mis-scroll + prominence ✓ (Task 6). Archive/Repository and Conference Proceedings → separate plans, not this one.

**Deferred assets covered by placeholders:** conclave logo (Task 8), chief guest photos (Task 5), committee photos (Task 5), hero images (Task 7). Each is a one-line data edit to integrate.

**Not in this plan (subsequent plans):** Registration/Login + Google Apps Script, Archive system + admin auth, Conference Proceedings section.
