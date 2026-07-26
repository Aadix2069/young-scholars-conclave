# Branding & Visual Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Young Scholars' Conclave 2026 site's colors, typography, logo, and hero section in line with the CHRIST × FAS design review (`updation/YSC 2026 Design.docx`) and the finalized circular badge logo.

**Architecture:** Colors are Tailwind v4 CSS custom properties defined in `src/app/globals.css` under `@theme inline` (this project's existing pattern — no `tailwind.config.js`). The new conclave logo is processed into a set of static PNGs in `public/`, consumed via `next/image` the same way `ChristLogo` already is in `src/components/Logos.tsx`. The hero video is replaced with a `swiper` (npm package) fading slideshow, client-rendered inside the existing `Hero.tsx` client component.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, `swiper` (new dependency), Node's `sharp` (already a transitive Next.js dependency, used here as a one-off image-processing script — not added to `package.json`).

## Global Constraints

- Primary agrarian green: RGB(153, 174, 106) = `#99AE6A` — this is the one color value the DOCX review explicitly confirms as correct ("Here is the FAS green colour"), overriding both palette mockup images in the same document, which disagree with each other and are called out as wrong in the review note.
- Royal Blue `#234AA5` and Warm Gold `#C8A24A` — confirmed identical across both DOCX palette images, keep as-is.
- Body text must be at minimum 16px / 1rem (DOCX: "Industrial standard suggests 16px").
- No test runner exists in this repo (`package.json` has no `jest`/`vitest`/etc.) — this project's established verification pattern (used throughout this build) is: run `npm run dev`, drive it with the Browser pane tools, and check `get_page_text` / `read_console_messages` / a screenshot. Steps below use that pattern instead of inventing a new test framework, per "follow established patterns."
- Do not touch `src/app/registration/`, `src/app/about/`, `src/components/OrganisersSection.tsx`, `src/components/ScholarsGrid.tsx`, or the Google Form logic — those belong to other plans in this series.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/app/globals.css` | Modify — add/replace color tokens under `@theme inline`, fix base font size |
| `public/conclave-logo.png` | Create — full circular badge logo, transparent PNG, production resolution |
| `public/conclave-logo-icon.png` | Create — square-cropped icon-only version, for favicon/small placements |
| `src/app/icon.png` | Modify — replaced with the new favicon source (Next.js auto-favicon convention) |
| `src/components/Logos.tsx` | Modify — add a `ConclaveLogo` component alongside the existing `ChristLogo` |
| `src/components/Navbar.tsx` | Modify — replace the plain "YSC 2026" text lockup with `<ConclaveLogo />` next to `<ChristLogo />` |
| `src/components/Footer.tsx` | Modify — add `<ConclaveLogo />` next to `<ChristLogo />` in the footer brand block |
| `package.json` | Modify — add `swiper` dependency |
| `src/components/HeroSlideshow.tsx` | Create — the Swiper.js fading photo slideshow, extracted from `Hero.tsx` as its own client component |
| `src/components/Hero.tsx` | Modify — remove `<video>`, render `<HeroSlideshow />` instead |
| `public/hero/` | Create — directory holding the hero slideshow's photo files |

---

### Task 1: Color palette — replace with confirmed DOCX values

**Files:**
- Modify: `src/app/globals.css:1-27`

**Interfaces:**
- Produces: CSS custom properties `--color-brand-blue`, `--color-brand-gold`, `--color-brand-green`, `--color-brand-green-dark`, `--color-brand-charcoal` — consumed as Tailwind utility classes `bg-brand-green`, `text-brand-green`, etc. anywhere in the codebase from this point forward.

- [ ] **Step 1: Read the current file to confirm line numbers haven't drifted**

Run: read `src/app/globals.css` lines 1-30 and confirm the `:root` and `@theme inline` blocks match what's shown below before editing (this file has been touched by other in-flight work in this repo).

- [ ] **Step 2: Replace the `:root` color block**

Replace:
```css
:root {
  --background: #ffffff;
  --foreground: #111827;

  /* CHRIST University institutional blue, matching the conference-site template
   * this design is based on (icbe2025.christuniversity.in). */
  --color-brand-blue: #1d398f;

  /* CHRIST University brand gold, used only for the official seal/logo accents */
  --color-brand-gold: #b8860b;

  /* Shared hover/motion easing - same curve as the aos-* keyframes below, so
   * scroll-reveal and hover transitions feel like one consistent motion system. */
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}
```

With:
```css
:root {
  --background: #ffffff;
  --foreground: #111827;

  /* Royal Blue - confirmed identical across both DOCX palette mockups
   * (updation/YSC 2026 Design.docx). Headings, primary buttons, links. */
  --color-brand-blue: #234aa5;

  /* Warm Gold - confirmed identical across both DOCX palette mockups.
   * Accents, hover states, dividers. */
  --color-brand-gold: #c8a24a;

  /* FAS green - the one color value the DOCX review note explicitly confirms
   * ("Here is the FAS green colour: RGB 153,174,106"), overriding the two
   * palette mockups in the same doc, which disagree with each other on this
   * color and are called out as "not the right shade". Primary agrarian
   * accent - highlight sections, badges, buttons/tags per "IMPORTANT INFO"
   * usage in the DOCX color-usage table. */
  --color-brand-green: #99ae6a;

  /* Darker derived shade of the FAS green (same hue/saturation, ~35% darker
   * lightness) for text-on-light and hover states, matching the DOCX's
   * "Deep Olive Green / Support-Accent" role without reusing either of its
   * unconfirmed hex values. */
  --color-brand-green-dark: #5f6f3f;

  /* Charcoal body text, matches both DOCX palette mockups (#2B2B2B). */
  --color-brand-charcoal: #2b2b2b;

  /* Shared hover/motion easing - same curve as the aos-* keyframes below, so
   * scroll-reveal and hover transitions feel like one consistent motion system. */
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}
```

- [ ] **Step 3: Replace the `@theme inline` block to expose the new tokens and fix base font size**

Replace:
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --font-sans: Garamond, Georgia, serif;
  --font-serif: Garamond, Georgia, serif;

  --color-brand-blue: var(--color-brand-blue);
  --color-brand-gold: var(--color-brand-gold);
}
```

With:
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --font-sans: Garamond, Georgia, serif;
  --font-serif: Garamond, Georgia, serif;

  /* Base font size floor per DOCX: "Industrial standard suggests 16px
   * (equivalent to 1rem or 12pt)". Tailwind's default text-base is already
   * 1rem/16px; this token exists so `text-base` unambiguously resolves to
   * the DOCX-mandated 16px rather than any inherited browser default. */
  --text-base: 1rem;

  --color-brand-blue: var(--color-brand-blue);
  --color-brand-gold: var(--color-brand-gold);
  --color-brand-green: var(--color-brand-green);
  --color-brand-green-dark: var(--color-brand-green-dark);
  --color-brand-charcoal: var(--color-brand-charcoal);
}
```

- [ ] **Step 4: Set the real base font size on `body`**

Read `src/app/globals.css` for the existing `body { ... }` rule (currently just sets `background`/`color`) and add `font-size: 1rem;` and `line-height: 1.6;` to it:

```css
body {
  background: var(--background);
  color: var(--foreground);
  font-size: 1rem;
  line-height: 1.6;
}
```

- [ ] **Step 5: Verify visually**

Run: `npm run dev` (via the project's `.claude/launch.json` config `young-scholars-conclave-dev`, already set up in this repo), open `http://localhost:3000`, and:
- Use `javascript_tool` to check `getComputedStyle(document.body).fontSize` returns `"16px"`.
- Use `javascript_tool` to check `getComputedStyle(document.documentElement).getPropertyValue('--color-brand-green').trim()` returns `"#99ae6a"`.

Expected: both checks pass, no console errors, no visual regression on the homepage (blue/gold usages should look identical since those values didn't change numerically... note: brand-blue changed from `#1d398f` to `#234aa5` and brand-gold from `#b8860b` to `#c8a24a`, so the whole site's blue/gold will visibly shift — this is intentional, confirm it looks like the DOCX palette, not a bug).

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "style: apply DOCX-confirmed color palette and 16px base font size"
```

---

### Task 2: Process the conclave logo into production assets

**Files:**
- Create: `public/conclave-logo.png`
- Create: `public/conclave-logo-icon.png`
- Modify: `src/app/icon.png`
- Test: none (visual asset — verified by loading in browser in Task 3)

**Interfaces:**
- Produces: two static files under `public/`, consumed by `ConclaveLogo` in Task 3.

- [ ] **Step 1: Prerequisite — obtain the source file**

This step cannot proceed until a source image file of the circular badge logo (the one shared in chat: sunburst + green wavy field lines + gold ring border + "YOUNG SCHOLARS' CONCLAVE" + "IDEAS. INSIGHTS. IMPACT.") exists on disk. Confirm it exists at `updation/conclave-logo-source.png` (or note the actual path/filename if saved elsewhere) before continuing.

- [ ] **Step 2: Inspect the source file's actual dimensions and background**

Run:
```bash
python3 -c "from PIL import Image; im = Image.open('updation/conclave-logo-source.png'); print(im.size, im.mode)"
```

If `PIL`/`Pillow` isn't installed: `pip install --user Pillow`. If the file is a screenshot with a non-transparent (white/solid) background rather than a true transparent PNG, background removal is needed before proceeding — use the `remove_background` tool available in this environment rather than hand-rolling chroma-keying.

- [ ] **Step 3: Produce the two production files**

If the source already has a transparent background and is high resolution (≥1024px on its longest side): resize/export directly.

```bash
python3 -c "
from PIL import Image
im = Image.open('updation/conclave-logo-source.png').convert('RGBA')
# Full lockup badge, capped at 1024px longest side, preserves aspect ratio
im.thumbnail((1024, 1024), Image.LANCZOS)
im.save('public/conclave-logo.png')
print('conclave-logo.png:', im.size)
"
```

For the icon-only crop (favicon/small placements): crop tightly to the circular badge itself (excluding any surrounding whitespace), export at 512x512.

```bash
python3 -c "
from PIL import Image
im = Image.open('updation/conclave-logo-source.png').convert('RGBA')
bbox = im.getbbox()
im = im.crop(bbox)
im.thumbnail((512, 512), Image.LANCZOS)
im.save('public/conclave-logo-icon.png')
print('conclave-logo-icon.png:', im.size)
"
```

- [ ] **Step 4: Replace the favicon source**

Copy the icon version over the existing Next.js favicon convention file (Next.js auto-generates `/favicon.ico` and the `<link rel="icon">` tag from `src/app/icon.png`):

```bash
cp public/conclave-logo-icon.png src/app/icon.png
```

- [ ] **Step 5: Verify the files exist and are valid images**

Run:
```bash
python3 -c "
from PIL import Image
for f in ['public/conclave-logo.png', 'public/conclave-logo-icon.png', 'src/app/icon.png']:
    im = Image.open(f)
    print(f, im.size, im.mode)
"
```
Expected: all three print valid sizes with mode `RGBA` (confirms transparency was preserved, not flattened to `RGB`).

- [ ] **Step 6: Commit**

```bash
git add public/conclave-logo.png public/conclave-logo-icon.png src/app/icon.png
git commit -m "feat: add processed conclave logo assets (transparent PNG + favicon)"
```

---

### Task 3: Add `ConclaveLogo` component and integrate into Navbar + Footer

**Files:**
- Modify: `src/components/Logos.tsx`
- Modify: `src/components/Navbar.tsx:76-82`
- Modify: `src/components/Footer.tsx:20-31`

**Interfaces:**
- Consumes: `public/conclave-logo.png` (Task 2)
- Produces: `ConclaveLogo({ className }: { className?: string })` — a React component, exported from `src/components/Logos.tsx`, used by both Navbar and Footer.

- [ ] **Step 1: Add `ConclaveLogo` to `Logos.tsx`**

Append to `src/components/Logos.tsx` (after the existing `ChristLogo` export):

```tsx
/** Young Scholars' Conclave circular badge logo. */
export function ConclaveLogo({ className }: LogoProps) {
  return (
    <Image
      src="/conclave-logo.png"
      alt="Young Scholars' Conclave"
      width={1024}
      height={1024}
      className={className}
      priority
    />
  );
}
```

- [ ] **Step 2: Replace the Navbar's text lockup with the new logo**

In `src/components/Navbar.tsx`, replace:
```tsx
          <Link href="/" className="flex shrink-0 items-center gap-2 no-underline sm:gap-3">
            <ChristLogo variant="color" className="h-9 w-auto shrink-0 sm:h-12" />
            <span className="whitespace-nowrap text-lg font-black uppercase text-gray-900 sm:ml-[3%] sm:text-2xl">
              YSC 2026
            </span>
          </Link>
```

With:
```tsx
          <Link href="/" className="flex shrink-0 items-center gap-2 no-underline sm:gap-3">
            <ChristLogo variant="color" className="h-9 w-auto shrink-0 sm:h-12" />
            <span className="h-8 w-px shrink-0 bg-gray-200 sm:h-10" aria-hidden="true" />
            <ConclaveLogo className="h-9 w-auto shrink-0 sm:h-12" />
          </Link>
```

And add `ConclaveLogo` to the import on line 6:
```tsx
import { ChristLogo, ConclaveLogo } from "./Logos";
```

- [ ] **Step 3: Add the logo to the Footer brand block**

In `src/components/Footer.tsx`, replace:
```tsx
        <div>
          <div className="mb-4 flex items-center gap-3">
            <ChristLogo variant="white" className="h-auto w-40" />
          </div>
```

With:
```tsx
        <div>
          <div className="mb-4 flex items-center gap-4">
            <ChristLogo variant="white" className="h-auto w-32" />
            <ConclaveLogo className="h-16 w-auto" />
          </div>
```

And update the import on line 2:
```tsx
import { ChristLogo, ConclaveLogo } from "./Logos";
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`, open `http://localhost:3000`, use `read_page` to confirm both `<img>` elements (Christ logo + conclave logo) are present in the header and footer, and `read_console_messages` shows no image-load errors (a 404 here means Task 2's file paths don't match).

- [ ] **Step 5: Commit**

```bash
git add src/components/Logos.tsx src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "feat: integrate conclave logo into navbar and footer alongside CHRIST logo"
```

---

### Task 4: Install Swiper and build the hero slideshow

**Files:**
- Modify: `package.json`
- Create: `src/components/HeroSlideshow.tsx`
- Create: `public/hero/` (directory)
- Modify: `src/components/Hero.tsx:34-45`

**Interfaces:**
- Produces: `HeroSlideshow()` — a client component with no props, self-contained, rendered by `Hero.tsx` in place of the `<video>` block.

- [ ] **Step 1: Install swiper**

```bash
npm install swiper
```

Run: `grep '"swiper"' package.json` — expected: a line like `"swiper": "^11.x.x",` under `dependencies`.

- [ ] **Step 2: Create the hero photos directory with a placeholder manifest**

Since the real event photos (FAS-Christ meetings, campus, conference hall, past scholars, agrarian landscapes — per the DOCX) haven't been supplied yet, this step creates the directory and a documented array the real filenames will slot into, rather than inventing fake images.

```bash
mkdir -p public/hero
```

- [ ] **Step 3: Write `HeroSlideshow.tsx`**

```tsx
"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

/**
 * Hero photo slideshow. Add real event photos to public/hero/ and list
 * them here in display order. Each entry needs the /hero/-relative path
 * and descriptive alt text (accessibility — these replace what used to be
 * a muted decorative video, so alt text should describe the actual photo).
 */
const HERO_SLIDES: { src: string; alt: string }[] = [
  // { src: "/hero/fas-christ-meeting.jpg", alt: "FAS and CHRIST University representatives at a planning meeting" },
  // { src: "/hero/christ-campus.jpg", alt: "CHRIST University Bengaluru campus building" },
  // { src: "/hero/conference-hall.jpg", alt: "Conference hall set up for the Young Scholars' Conclave" },
  // { src: "/hero/scholars-presenting.jpg", alt: "Young scholars presenting research at a past conclave" },
  // { src: "/hero/agrarian-landscape.jpg", alt: "Agrarian landscape representative of the conclave's research focus" },
];

export function HeroSlideshow() {
  if (HERO_SLIDES.length === 0) {
    // No photos supplied yet - render a solid brand-colored background
    // instead of an empty/broken slideshow.
    return <div className="absolute inset-0 h-full w-full bg-brand-blue" />;
  }

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      speed={1200}
      className="absolute inset-0 h-full w-full"
    >
      {HERO_SLIDES.map((slide) => (
        <SwiperSlide key={slide.src}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

- [ ] **Step 4: Replace the video block in `Hero.tsx`**

Replace:
```tsx
      <div className="absolute inset-0 -z-10 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/homevedio-l78V7urb.mp4" type="video/mp4" />
        </video>
      </div>
```

With:
```tsx
      <div className="absolute inset-0 -z-10 h-full w-full">
        <HeroSlideshow />
      </div>
```

And add the import near the top of `src/components/Hero.tsx`:
```tsx
import { HeroSlideshow } from "./HeroSlideshow";
```

- [ ] **Step 5: Remove the now-unused video file**

```bash
git rm public/homevedio-l78V7urb.mp4
```

(This 34MB file is the single largest asset in the repo — removing it also meaningfully shrinks the production bundle and Vercel deploy size.)

- [ ] **Step 6: Verify in browser**

Run `npm run dev`, open `http://localhost:3000`, confirm:
- `read_console_messages` shows no errors (particularly no Swiper CSS/module resolution errors).
- Since `HERO_SLIDES` is empty until real photos are supplied, the hero should render a solid brand-blue background with no broken image icons or console 404s — this is the expected intermediate state, not a bug.
- Once real photos are added to `public/hero/` and uncommented in `HERO_SLIDES`, re-run this verification and confirm the fade transition plays (check `read_console_messages` for errors; Swiper's own autoplay/fade behavior is a third-party library concern, not something to re-implement or unit test here).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/components/HeroSlideshow.tsx src/components/Hero.tsx
git commit -m "feat: replace hero video with Swiper.js fading photo slideshow"
```

---

## Self-Review Notes

- **Spec coverage:** Color palette (Task 1) ✓, logo processing + integration (Tasks 2-3) ✓, 16px type floor (Task 1, Step 4) ✓, hero video → slideshow (Task 4) ✓. Remaining DOCX/master-prompt items (Important Dates, theme buttons, Call for Papers button, Organisers photos, Contact bug, Scholars removal, Registration/Archive/Proceedings) are out of scope for this plan — covered by Plans 2-5 in this series.
- **Known follow-up required from user:** the logo source file (Task 2, Step 1) and the real hero photos (Task 4, Step 2) are both external inputs this plan cannot fabricate.
