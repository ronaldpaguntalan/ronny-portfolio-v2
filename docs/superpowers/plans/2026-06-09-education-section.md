# The Academy (Education Section) + Photo Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Education section ("The Academy") to the Enchanted Codex portfolio and integrate the five images in `src/assets/images/` (graduation duo-stack, About portrait flip, Hero backdrop).

**Architecture:** A new `Education.jsx` section component follows the existing section patterns (`SectionHeading` + `Reveal`, parchment-grain gold cards), reading text from `content.js`. Images are first compressed to web-sized `.webp` via a one-off `sharp` script, then imported by the components. About gets a CSS 3D flip-card portrait; Hero gets a faint image backdrop.

**Tech Stack:** React 19, Vite 6, Tailwind CSS v4, Framer Motion 11, `sharp` (new devDependency for image optimization).

**Verification approach:** This project has **no test framework** (only `dev`/`build`/`preview` scripts) and no existing tests — every prior section shipped without unit tests. Per "follow established patterns," this plan verifies via `npm run build` (must compile/resolve all imports cleanly) plus dev-server visual checks. Introducing a test runner here would be scope creep.

---

## File Structure

- **Create** `scripts/optimize-images.mjs` — one-off image compression (sharp).
- **Create** `src/assets/images/web/*.webp` — generated optimized images (committed).
- **Create** `src/components/sections/Education.jsx` — The Academy section.
- **Modify** `package.json` — add `sharp` devDep + `optimize-images` script.
- **Modify** `.gitignore` — ignore large original images (keep optimized `web/`).
- **Modify** `src/data/content.js` — add `education` export + `academy` nav item.
- **Modify** `src/App.jsx` — render `<Education />` after Projects, before Experience.
- **Modify** `src/components/sections/About.jsx` — portrait flip card (working ↔ HP costume).
- **Modify** `src/components/sections/Hero.jsx` — faint HP_Creative backdrop.
- **Modify** `src/index.css` — `.flip-card` component classes + reduced-motion override.

---

## Task 1: Optimize images to web-sized WebP

**Files:**
- Create: `scripts/optimize-images.mjs`
- Modify: `package.json`
- Modify: `.gitignore`
- Create (generated): `src/assets/images/web/*.webp`

- [ ] **Step 1: Install sharp**

Run:
```bash
npm install --save-dev sharp
```
Expected: `sharp` appears under `devDependencies` in `package.json`; install completes without error.

- [ ] **Step 2: Create the optimization script**

Create `scripts/optimize-images.mjs`:
```js
import sharp from "sharp"
import { mkdir } from "node:fs/promises"
import path from "node:path"

const SRC = "src/assets/images"
const OUT = "src/assets/images/web"

// width = max display width (retina-friendly); withoutEnlargement avoids upscaling.
const jobs = [
  { in: "Grad-SAKBAY.png",              out: "grad-sakbay.webp",             width: 800,  quality: 80 },
  { in: "Grad-TOGA.png",                out: "grad-toga.webp",               width: 800,  quality: 80 },
  { in: "Present-Profile-Working.jpg",  out: "present-profile-working.webp", width: 700,  quality: 80 },
  { in: "HP_Costume.jpg",               out: "hp-costume.webp",              width: 700,  quality: 80 },
  { in: "HP_Creative.jpg",              out: "hp-creative.webp",             width: 1600, quality: 70 },
]

await mkdir(OUT, { recursive: true })

for (const job of jobs) {
  const outPath = path.join(OUT, job.out)
  await sharp(path.join(SRC, job.in))
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(outPath)
  console.log(`done ${job.in} -> ${job.out}`)
}
console.log("All images optimized.")
```

- [ ] **Step 3: Add the npm script**

In `package.json`, add to `"scripts"`:
```json
"optimize-images": "node scripts/optimize-images.mjs"
```

- [ ] **Step 4: Run the optimization**

Run:
```bash
npm run optimize-images
```
Expected: five `done ... -> ....webp` lines then `All images optimized.`; files appear in `src/assets/images/web/`.

- [ ] **Step 5: Verify the optimized files are dramatically smaller**

Run:
```bash
ls -la src/assets/images/web
```
Expected: each `.webp` is well under 500 KB (originals were 0.38–11.8 MB). If any `.webp` is still > 600 KB, lower that job's `quality` or `width` and re-run Step 4.

- [ ] **Step 6: Ignore the large originals (commit only optimized)**

In `.gitignore`, add:
```
# Large original source images — only optimized web/*.webp are committed
src/assets/images/*.png
src/assets/images/*.jpg
src/assets/images/*.jpeg
```
Note: this is non-recursive, so `src/assets/images/web/*.webp` stays tracked. Originals remain on disk locally for re-running the script.

- [ ] **Step 7: Commit**

```bash
git add scripts/optimize-images.mjs package.json package-lock.json .gitignore src/assets/images/web
git commit -m "build: add image optimization script and web-sized webp assets"
```

---

## Task 2: Add education data + Academy nav item

**Files:**
- Modify: `src/data/content.js`

- [ ] **Step 1: Add the `academy` nav item**

In `src/data/content.js`, change the `nav` array so `academy` sits between `enchantments` and `chronicles`:
```js
export const nav = [
  { id: "hall", label: "Hall" },
  { id: "wizard", label: "Wizard" },
  { id: "spellbook", label: "Spellbook" },
  { id: "enchantments", label: "Enchantments" },
  { id: "academy", label: "Academy" },
  { id: "chronicles", label: "Chronicles" },
  { id: "owl-post", label: "Owl Post" },
]
```

- [ ] **Step 2: Add the `education` export**

Add to `src/data/content.js` (e.g. after the `experience` export). The `featured` entry renders the duo-stack photos; `period`/`qpa` are optional:
```js
export const education = [
  {
    featured: true,
    school: "University of Rizal System – Binangonan Campus",
    degree: "BS in Information System",
    period: "2018 — 2022",
    qpa: "QPA 1.29",
    honors: ["Magna Cum Laude", "Outstanding Student Trainee Awardee", "Service Awardee"],
  },
  {
    featured: false,
    school: "AMA Computer Learning Center College of Taytay",
    degree: "Senior High School",
    period: null,
    qpa: null,
    honors: ["With High Honors", "Salutatorian"],
  },
]
```

- [ ] **Step 3: Verify build still compiles**

Run:
```bash
npm run build
```
Expected: build succeeds (data-only change; nothing imports `education` yet).

- [ ] **Step 4: Commit**

```bash
git add src/data/content.js
git commit -m "feat: add education data and Academy nav item to content"
```

---

## Task 3: Create the Education ("The Academy") section component

**Files:**
- Create: `src/components/sections/Education.jsx`

- [ ] **Step 1: Create `Education.jsx`**

Create `src/components/sections/Education.jsx`:
```jsx
import { education } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"
import gradSakbay from "../../assets/images/web/grad-sakbay.webp"
import gradToga from "../../assets/images/web/grad-toga.webp"

// Duo-stack graduation photos shown on the featured (university) card.
const featuredPhotos = [
  { src: gradSakbay, alt: "Ronald Allan Paguntalan at his university graduation" },
  { src: gradToga, alt: "Ronald Allan Paguntalan in graduation toga" },
]

function EduDetails({ entry }) {
  const meta = [entry.period, entry.qpa].filter(Boolean).join(" · ")
  return (
    <div>
      {meta && (
        <p className="font-heading uppercase tracking-[0.18em] text-[11px] text-[color:var(--color-gold)]">
          {meta}
        </p>
      )}
      <h3 className="font-display text-xl md:text-2xl text-[color:var(--color-parchment)] mt-2">
        {entry.degree}
      </h3>
      <p className="font-accent italic text-[color:var(--color-gold-bright)] mt-1">
        {entry.school}
      </p>
      <div className="flex flex-wrap gap-2.5 mt-4">
        {entry.honors.map((h) => (
          <span
            key={h}
            className="font-heading uppercase tracking-[0.16em] text-[10px] text-[color:var(--color-gold)] border border-[color:var(--color-gold)]/40 rounded-full px-3.5 py-1.5"
          >
            {h}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Education() {
  return (
    <section id="academy" className="relative z-10 max-w-5xl mx-auto px-6 py-28">
      <SectionHeading eyebrow="Scrolls of Scholarship" title="The Academy" />

      <div className="space-y-8">
        {education.map((entry, i) => (
          <Reveal key={entry.school} delay={i * 0.08}>
            <article className="rounded-xl border border-[color:var(--color-gold)]/20 bg-[color:var(--color-ink)]/40 parchment-grain p-6 md:p-8">
              {entry.featured ? (
                <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-8 items-start">
                  <div className="flex flex-col gap-3 max-w-[240px] mx-auto md:mx-0">
                    {featuredPhotos.map((photo) => (
                      <div
                        key={photo.src}
                        className="rounded-md border border-[color:var(--color-gold)]/50 p-1"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          className="block w-full h-auto rounded-sm object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <EduDetails entry={entry} />
                </div>
              ) : (
                <EduDetails entry={entry} />
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build compiles (resolves the webp imports)**

Run:
```bash
npm run build
```
Expected: build succeeds, confirming the `grad-sakbay.webp` / `grad-toga.webp` imports resolve. If it fails on a missing module, re-run Task 1 Step 4.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Education.jsx
git commit -m "feat: add The Academy education section component"
```

---

## Task 4: Wire Education into the page

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Import and render `<Education />`**

In `src/App.jsx`, add the import alongside the other sections:
```jsx
import { Education } from "./components/sections/Education"
```
And place it after `<Projects />` and before `<Experience />` inside `<main>`:
```jsx
        <Projects />
        <Education />
        <Experience />
```

- [ ] **Step 2: Verify build compiles**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 3: Visual check in dev server**

Run:
```bash
npm run dev
```
Open the served URL. Confirm:
- A new "Academy" link appears in the navbar (desktop + mobile menu) between Enchantments and Chronicles, and clicking it scrolls to the section.
- "The Academy" section renders after Projects, before Chronicles.
- University card shows both graduation photos stacked + the three honor seals; Senior High card is text-only with its two seals.
- Layout stacks cleanly on a narrow window.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: render The Academy section between Projects and Chronicles"
```

---

## Task 5: About portrait flip card (working photo ↔ wizard costume)

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/sections/About.jsx`

- [ ] **Step 1: Add flip-card CSS**

In `src/index.css`, inside the existing `@layer components { ... }` block (after `.gold-divider`), add:
```css
  .flip-card { perspective: 1000px; }
  .flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    transform-style: preserve-3d;
  }
  .flip-card:hover .flip-inner,
  .flip-card:focus-within .flip-inner {
    transform: rotateY(180deg);
  }
  .flip-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    overflow: hidden;
  }
  .flip-back { transform: rotateY(180deg); }
```

- [ ] **Step 2: Disable the flip under reduced motion**

In `src/index.css`, inside the existing `@media (prefers-reduced-motion: reduce) { ... }` block, add:
```css
  .flip-card:hover .flip-inner,
  .flip-card:focus-within .flip-inner { transform: none; }
```
This keeps the working photo static (no flip) for reduced-motion users.

- [ ] **Step 3: Replace the glyph placeholder with the flip card**

In `src/components/sections/About.jsx`, add imports at the top (after the existing imports):
```jsx
import workingPhoto from "../../assets/images/web/present-profile-working.webp"
import hpCostume from "../../assets/images/web/hp-costume.webp"
```
Then replace this block (the `inset-3` glyph container):
```jsx
            <div className="absolute inset-3 rounded-md bg-[color:var(--color-midnight-2)] parchment-grain grid place-items-center overflow-hidden">
              {/* Replace this glyph with an <img> of your portrait when ready */}
              <span className="text-6xl text-[color:var(--color-gold)]/70">⚡</span>
            </div>
```
with:
```jsx
            <div
              className="absolute inset-3 rounded-md overflow-hidden flip-card"
              tabIndex={0}
              aria-label="Portrait of Ronald — hover or focus to reveal the wizard within"
            >
              <div className="flip-inner">
                <div className="flip-face">
                  <img
                    src={workingPhoto}
                    alt="Ronald Allan Paguntalan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flip-face flip-back">
                  <img
                    src={hpCostume}
                    alt="Ronald in wizard costume"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
```

- [ ] **Step 4: Verify build compiles**

Run:
```bash
npm run build
```
Expected: build succeeds (confirms `present-profile-working.webp` and `hp-costume.webp` imports resolve).

- [ ] **Step 5: Visual check**

With `npm run dev` running, open the About ("Wizard") section. Confirm:
- The portrait frame shows the working photo by default.
- Hovering the portrait flips it to the wizard-costume photo; moving away flips back.
- Tabbing to the portrait (keyboard focus) also triggers the flip.
- With OS "reduce motion" enabled, the portrait stays on the working photo and does not flip.

- [ ] **Step 6: Commit**

```bash
git add src/index.css src/components/sections/About.jsx
git commit -m "feat: flip About portrait between working photo and wizard costume"
```

---

## Task 6: Hero faint backdrop (HP_Creative)

**Files:**
- Modify: `src/components/sections/Hero.jsx`

- [ ] **Step 1: Import the backdrop image**

In `src/components/sections/Hero.jsx`, add after the existing imports:
```jsx
import heroBackdrop from "../../assets/images/web/hp-creative.webp"
```

- [ ] **Step 2: Add the backdrop layer**

In `Hero.jsx`, immediately after the opening `<section ...>` tag and before `<FloatingCandles />`, insert:
```jsx
      {/* faint atmospheric backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroBackdrop}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-midnight)]/70 via-[color:var(--color-midnight)]/60 to-[color:var(--color-midnight)]" />
      </div>
```
The Hero content already uses `z-10`, so it stays above this `z-0` layer.

- [ ] **Step 3: Verify build compiles**

Run:
```bash
npm run build
```
Expected: build succeeds (confirms `hp-creative.webp` import resolves).

- [ ] **Step 4: Visual check**

With `npm run dev` running, view the Hero ("Hall"). Confirm:
- A faint, darkened wizard image sits behind the title text.
- Title, role, tagline, and buttons remain clearly readable (good contrast).
- Floating candles and scroll cue still display correctly above the backdrop.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.jsx
git commit -m "feat: add faint wizard backdrop to Hero section"
```

---

## Task 7: Final full-page verification

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run:
```bash
npm run build
```
Expected: build succeeds with no errors.

- [ ] **Step 2: Preview the production build**

Run:
```bash
npm run preview
```
Open the preview URL and walk the full page top to bottom:
- Section order: Hall → Wizard → Spellbook → Enchantments → **Academy** → Chronicles → Owl Post.
- Navbar (desktop + mobile) includes Academy and all anchors scroll correctly with proper offset.
- The Academy cards, the About portrait flip, and the Hero backdrop all render correctly.
- All five images load; no broken images in the browser console/network tab.

- [ ] **Step 3: Reduced-motion pass**

With OS "reduce motion" enabled, reload preview and confirm: no portrait flip (static working photo), reveal animations are effectively instant, and the page is fully usable.

- [ ] **Step 4: Confirm no oversized assets shipped**

In the preview Network tab (or `ls -la dist/assets`), confirm the bundled images are the optimized `.webp` (well under ~1 MB each), not the multi-MB originals.

---

## Self-Review

**Spec coverage:**
- Placement (Education before Experience) → Task 4. ✓
- Featured + Compact layout, Duo-Stack photos → Task 3. ✓
- Content model (`education` export + nav item) → Task 2. ✓
- About Playful Flip (working ↔ HP costume, reduced-motion static, keyboard focus) → Task 5. ✓
- Hero faint HP_Creative backdrop → Task 6. ✓
- Image optimization (resize + compress, alt text) → Task 1 (+ alt text in Tasks 3/5). ✓
- Naming: id `academy`, heading "The Academy", eyebrow "Scrolls of Scholarship", nav "Academy" → Tasks 2/3. ✓
- Edge handling: missing Senior High photo (text-only card), reduced motion, large images → Tasks 3/5/1. ✓

**Placeholder scan:** No TBD/TODO/"handle edge cases" — every code step shows complete content. ✓

**Type/name consistency:** `education` entry fields (`featured`, `school`, `degree`, `period`, `qpa`, `honors`) defined in Task 2 are exactly the fields consumed by `Education.jsx`/`EduDetails` in Task 3. Optimized filenames in Task 1 (`grad-sakbay.webp`, `grad-toga.webp`, `present-profile-working.webp`, `hp-costume.webp`, `hp-creative.webp`) match every import in Tasks 3/5/6. Nav id `academy` matches the section `id="academy"`. ✓
