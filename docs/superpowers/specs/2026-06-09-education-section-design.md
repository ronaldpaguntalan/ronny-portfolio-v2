# Education Section + Photo Integration — Design

**Date:** 2026-06-09
**Project:** The Enchanted Codex (ronny-portfolio-v2)
**Status:** Approved

## Goal

Add an Education Background section to the wizard-themed single-page portfolio, and
put the five images in `src/assets/images/` to use across the page.

## Decisions (from brainstorming)

- **Placement:** Education section sits **before** the Experience (Chronicles) section,
  so the page reads chronologically: schooling → career.
- **Layout:** Featured + Compact. University is a large photo-rich card; Senior High is
  a compact text-only card (no photo exists for it).
- **University photos:** Duo Stack — both graduation photos shown together beside the details.
- **Other photos:** Playful Flip — About portrait is the professional photo, flips to the
  wizard-costume photo on hover; the creative wizard shot is a faint Hero backdrop.

## Image Inventory & Placement

| Image | Size | Destination |
|-------|------|-------------|
| `Grad-SAKBAY.png` | 5.0 MB | Education — University card (duo stack, top) |
| `Grad-TOGA.png` | 3.7 MB | Education — University card (duo stack, bottom) |
| `Present-Profile-Working.jpg` | 1.1 MB | About — portrait front face |
| `HP_Costume.jpg` | 0.38 MB | About — portrait flip (hover reveal) |
| `HP_Creative.jpg` | 11.8 MB | Hero — faint darkened background wash |

**All images must be resized + compressed for web** (web-appropriate dimensions,
~80% quality) before shipping. Current sizes are far too large for production.

## Components

### New: `src/components/sections/Education.jsx`
- Follows existing section patterns: `SectionHeading` (eyebrow + title), `Reveal`
  scroll animations, parchment-grain cards, gold border/accent tokens.
- Section `id="academy"`, heading **"The Academy of Sorcery"**, eyebrow
  **"Scrolls of Scholarship"**.
- **University card (featured):**
  - Duo stack of `Grad-SAKBAY` + `Grad-TOGA`, gold-framed, on one side.
  - Details: `BS in Information System`, `University of Rizal System – Binangonan Campus`,
    `2018 – 2022 · QPA 1.29`.
  - Honor seals (pill badges, matching About's trait style): *Magna Cum Laude*,
    *Outstanding Student Trainee Awardee*, *Service Awardee*.
- **Senior High card (compact, text-only):**
  - `AMA Computer Learning Center College of Taytay`.
  - Honor seals: *With High Honors*, *Salutatorian*.
- Responsive: cards stack cleanly on mobile; duo-stack photos remain side detail.

### Edit: `src/App.jsx`
- Import and render `<Education />` after `<Projects />` and before `<Experience />`.
  Final order: Hero → About → Skills → Projects → **Education** → Experience → Contact.
  (Education immediately precedes Experience per the chronological decision.)

### Edit: `src/data/content.js`
- Add `education` export — array of entries:
  ```js
  {
    school, degree (optional), period (optional), qpa (optional),
    honors: [string], photos: [importedAsset]
  }
  ```
- Add nav item `{ id: "academy", label: "Academy" }`, inserted in the `nav` array in the
  position matching the on-page order (before the Chronicles entry).

### Edit: `src/components/sections/About.jsx`
- Replace the ⚡ glyph placeholder (current `About.jsx:18`) with a **flip card**:
  - Front: `Present-Profile-Working.jpg`.
  - Back (hover/focus): `HP_Costume.jpg`.
  - CSS 3D flip on the existing portrait frame; keeps the gold double-border + corner flourishes.
  - **Reduced motion:** when `prefers-reduced-motion` is set (hook already exists at
    `src/hooks/usePrefersReducedMotion.js`), render the working photo statically with no flip.
  - Keyboard/touch accessibility: flip also triggers on focus so it isn't hover-only.

### Edit: `src/components/sections/Hero.jsx`
- Add `HP_Creative.jpg` as a faint, darkened background layer behind the Hero content
  (low opacity + gradient/overlay so title text keeps contrast). Sits above Starfield,
  below the text. Must not interfere with `FloatingCandles` or readability.

## Data Flow

`content.js` is the single source of truth for text. Image assets are `import`ed in the
components that use them (Vite fingerprints + optimizes the bundle). Education entries map
1:1 to cards in `Education.jsx`; honors render as pill badges; photos render in the duo stack.

## Component Boundaries

- `Education.jsx` — owns only the Academy section's markup/layout; reads `education` from
  `content.js`. Depends on `SectionHeading`, `Reveal`. Testable/understandable in isolation.
- About flip is self-contained within `About.jsx`'s portrait block; no new shared component
  needed unless the flip is reused (it isn't — keep it local).

## Error / Edge Handling

- Missing photo (e.g., Senior High): card renders text-only, no empty frame.
- Reduced motion: no flip animation, no Hero parallax; static images.
- Large images: mitigated by the pre-ship optimization step (non-negotiable).
- Alt text on every image for accessibility.

## Testing / Verification

- Visual check in dev server (`npm run dev`): section order, card layout, responsive
  stacking, flip on hover + keyboard focus, Hero backdrop readability.
- Verify `prefers-reduced-motion` path (no flip, static portrait).
- Confirm optimized image file sizes are dramatically smaller than originals.
- Lighthouse/Network sanity check that the page weight is reasonable.

## Out of Scope (YAGNI)

- No CMS / dynamic education data.
- No lightbox/zoom on graduation photos.
- No new animation library; reuse existing Motion + CSS.
- No changes to other sections beyond About and Hero photo integration.
