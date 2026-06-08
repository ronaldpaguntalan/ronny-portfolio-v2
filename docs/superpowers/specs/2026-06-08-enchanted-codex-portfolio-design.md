# The Enchanted Codex — Design Spec

**Date:** 2026-06-08
**Project:** `ronny-portfolio-v2`
**Author:** Ronald Allan Paguntalan ("Ronny")

A single-page, Harry Potter–themed developer portfolio. Dark, candle-lit "Great Hall"
atmosphere with house-neutral gold accents and aged parchment. Balanced theming —
clearly wizarding, but polished and professional.

---

## 1. Goals & Constraints

- **Audience:** General-purpose — works for recruiters, prospective clients, and casual
  visitors linked from socials.
- **Theme intensity:** *Balanced* — floating candles, golden snitch-dust, parchment cards,
  spell-named sections, wand-trail cursor. Memorable without being costume-y.
- **Palette:** *House-neutral gold* (midnight + candle gold + parchment). Not tied to one house.
- **Content:** Realistic, clearly-editable **placeholder** copy. All copy/data lives in a single
  `src/data/content.js` file so real details can be swapped without touching JSX.
- **Performance & a11y:** Fast, mobile-friendly, and respectful of `prefers-reduced-motion`.
  No backend.

## 2. Tech Stack

- **Vite + React 19** (no router; single scrolling page with anchor navigation)
- **Tailwind CSS v4** via `@tailwindcss/vite` (no PostCSS config; tokens declared with `@theme`)
- **framer-motion (Motion)** for entrance/scroll reveals and the wand-trail cursor
- **Canvas 2D** (vanilla, no library) for the starfield + golden-dust particle field
- **Google Fonts:** Cinzel Decorative, Cinzel, Cormorant Garamond, EB Garamond, JetBrains Mono

## 3. Architecture

Single page composed of fixed ambient layers + stacked content sections.

### File tree
```
index.html                         ← Google Fonts links, page meta
src/
  main.jsx                         ← React entry
  index.css                        ← Tailwind import + @theme tokens + base styles
  App.jsx                          ← assembles ambient layers + sections
  data/content.js                  ← ALL copy/projects/skills/experience (editable)
  hooks/usePrefersReducedMotion.js ← media-query hook gating all motion
  components/
    atmosphere/Starfield.jsx       ← canvas: stars + drifting gold dust
    atmosphere/FloatingCandles.jsx ← CSS floating candles + flames (hero)
    atmosphere/WandCursor.jsx      ← Motion gold pointer trail
    ui/Reveal.jsx                  ← Motion whileInView stagger wrapper
    ui/SectionHeading.jsx          ← Cinzel heading w/ ✦ corner flourishes
    layout/Navbar.jsx              ← fixed nav, transparent→frosted on scroll
    layout/Footer.jsx
    sections/Hero.jsx
    sections/About.jsx
    sections/Skills.jsx
    sections/Projects.jsx
    sections/Experience.jsx
    sections/Contact.jsx
```

### Component responsibilities (isolation)
Each component does one thing and depends only on `content.js` + shared UI/hook utilities:
- **Starfield** — owns one fixed `<canvas>`; runs `requestAnimationFrame`; pauses on tab-hidden
  and renders a static field (or nothing) under reduced-motion.
- **FloatingCandles** — pure presentational CSS; flicker via CSS keyframes only.
- **WandCursor** — pointer listener + Motion spring trail; **disabled** on touch devices and
  reduced-motion.
- **Reveal** — wraps children in a Motion element with `whileInView` fade/slide + stagger;
  degrades to a plain fade (or no transform) under reduced-motion.
- **SectionHeading** — consistent heading treatment (eyebrow label, Cinzel title, flourish).
- **Sections** — read their data from `content.js`; no hard-coded copy in JSX.

## 4. Visual System

### Color tokens (declared in `index.css` via `@theme`)
```
--color-midnight     #0a0e17   page base (darkest)
--color-midnight-2   #111726   raised surfaces
--color-ink          #1a2238   card base / borders
--color-gold         #c9a24b   primary accent (lines, labels, icons)
--color-gold-bright  #f0d68a   glow / hover / flame highlights
--color-parchment    #f3e7c9   headings & warm text
--color-parchment-2  #cdbfa0   muted body text
--color-ember        #8a5a2b   subtle warm shadow tone
```
Dominant deep-midnight canvas; gold used surgically as accent; parchment for warm readable
text. No pure white, no flat black.

### Typography
- **Cinzel Decorative** — hero name & big moments
- **Cinzel** — section headings & nav (Roman caps)
- **Cormorant Garamond** — body copy
- **EB Garamond italic** — "incantation" accent lines / quotes
- **JetBrains Mono** — tech/skill tags only (keeps the dev signal clear)

### Motion language
- **Page load:** staggered fade-up of hero label → name → role → tagline → CTAs.
- **On scroll:** each section's heading + items fade/slide in once (`whileInView`).
- **Hover:** gold underline-draw on links; cards lift with warm glow + slight tilt;
  buttons get a "spell shimmer" sweep.
- **Ambient:** candle flicker, dust drift, wand trail — continuous but subtle.
- **Reduced motion:** all of the above collapse to simple opacity fades or nothing.

### Texture & depth
Faint parchment grain on cards, soft edge vignette, gold hairline borders with ✦ corner
flourishes on headings.

## 5. Sections & Content

Navigation labels (anchors): **Hall · Wizard · Spellbook · Enchantments · Chronicles · Owl Post**

1. **Hero / The Great Hall** — full viewport. Floating candles + dust/stars. Staggered reveal:
   eyebrow "✦ Welcome to the Great Hall ✦" → name (Cinzel Decorative) → role → tagline →
   two buttons (*Explore my work*, *Send an owl*). Scroll cue at bottom.
2. **About / The Wizard** — two columns. Left: ornate gold "portrait" frame (⚡ glyph until a
   real photo is provided). Right: 2–3 paragraph bio + a small house-traits row.
3. **Skills / The Spellbook** — skills grouped into disciplines as spellbook "schools"
   (Frontend Charms, Backend Conjuring, DevOps Wards, Languages). Parchment panels; skills as
   mono-font tags with a small flourish.
4. **Projects / Notable Enchantments** — 3 placeholder project cards in a responsive grid.
   Each: title, one-line "enchantment", tech tags, *View Spell* / *Source Grimoire* links.
   Hover = lift + gold glow + parchment-edge highlight.
5. **Experience / The Chronicles** — vertical timeline with a glowing gold spine and
   candle-node markers; alternating entries (role · company · dates · 1–2 lines).
6. **Contact / Send an Owl** — centered invitation + styled front-end-only form
   (name, message, "Dispatch Owl"). On submit: themed "Your owl is on its way ✉️" confirmation.
   A clearly-marked hook is left for wiring a real form service later. Social links
   (GitHub, LinkedIn, Email) as gold-outlined icon buttons.
7. **Footer** — ⚡ monogram, "Mischief managed." tagline, copyright, "Crafted with magic & React."

### Placeholder data (in `content.js`)
- Name: "Ronald Allan Paguntalan" / display "Ronny"; role "Software Engineer"
- Themed bio (2–3 paragraphs) + 3 house traits
- ~12 skills across 4 disciplines
- 3 sample projects (title, blurb, tech, demo/source links)
- 2–3 experience entries (role, company, dates, blurb)
- Email + GitHub + LinkedIn placeholder links
- All marked as placeholder and editable in one file.

## 6. Error / Edge Handling

- **Reduced motion:** `usePrefersReducedMotion` disables canvas animation, wand cursor, and
  transform-based reveals; content remains fully visible.
- **Touch / no pointer:** wand-cursor trail is not mounted.
- **Tab hidden:** canvas RAF loop is paused to save battery.
- **Contact form:** no backend — client-side validation + simulated success state; never throws
  on submit; clearly documents where to add a real endpoint.
- **Missing image:** portrait frame shows the ⚡ glyph fallback by default.

## 7. Testing / Verification

- `npm install` succeeds; `npm run dev` serves with no console errors.
- `npm run build` produces a clean production bundle.
- Manual checks: all sections render, nav anchors scroll correctly, animations fire on load and
  on scroll, hover states work, layout is responsive (mobile → desktop), and the page behaves
  correctly with `prefers-reduced-motion: reduce`.

## 8. Out of Scope (YAGNI)

- No backend, CMS, or real form delivery (hook left for later).
- No routing / multiple pages.
- No 3D (Three.js) Great Hall.
- No dark/light toggle (single dark theme by design).
- No blog or CMS integration.
