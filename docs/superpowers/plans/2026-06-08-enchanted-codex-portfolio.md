# The Enchanted Codex Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, Harry Potter–themed developer portfolio with a candle-lit "Great Hall" atmosphere, house-neutral gold palette, and balanced wizarding theming.

**Architecture:** Vite + React 19 single page (no router). Fixed ambient layers (canvas starfield/dust, CSS floating candles, Motion wand cursor) sit behind stacked content sections. All copy/data lives in one editable `src/data/content.js`. Tailwind v4 tokens declared via `@theme`. All motion gated by `prefers-reduced-motion`.

**Tech Stack:** Vite, React 19, Tailwind CSS v4 (`@tailwindcss/vite`), framer-motion, Canvas 2D, Google Fonts (Cinzel Decorative, Cinzel, Cormorant Garamond, EB Garamond, JetBrains Mono).

**Verification model:** This is a visual frontend. Each task is verified by (a) `npm run build` succeeding and/or (b) `npm run dev` running with no console errors, plus described manual render checks. No unit-test runner is introduced (out of scope per spec).

**Spec:** `docs/superpowers/specs/2026-06-08-enchanted-codex-portfolio-design.md`

---

## File Structure

```
index.html                         ← Google Fonts links, page meta
src/
  main.jsx                         ← React entry
  index.css                        ← Tailwind import + @theme tokens + base styles + keyframes
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

`package.json`, `vite.config.js`, and `.gitignore` already exist in the repo.

---

## Task 1: Scaffold — entry, global CSS theme, fonts, dependency install

**Files:**
- Verify exists: `package.json`, `vite.config.js`, `.gitignore`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/index.css`
- Create: `src/App.jsx` (temporary smoke-test body, replaced in Task 14)

- [ ] **Step 1: Confirm existing config**

Run: `cat package.json vite.config.js`
Expected: `package.json` lists react, react-dom, framer-motion, tailwindcss, @tailwindcss/vite, @vitejs/plugin-react, vite. `vite.config.js` registers `react()` and `tailwindcss()` plugins.

- [ ] **Step 2: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ronny — The Enchanted Codex</title>
    <meta name="description" content="The Enchanted Codex — a Harry Potter themed portfolio of software engineer Ronald Allan Paguntalan." />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%E2%9A%A1%3C/text%3E%3C/svg%3E" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=EB+Garamond:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 4: Create `src/index.css`**

```css
@import "tailwindcss";

@theme {
  --color-midnight: #0a0e17;
  --color-midnight-2: #111726;
  --color-ink: #1a2238;
  --color-gold: #c9a24b;
  --color-gold-bright: #f0d68a;
  --color-parchment: #f3e7c9;
  --color-parchment-2: #cdbfa0;
  --color-ember: #8a5a2b;

  --font-display: "Cinzel Decorative", serif;
  --font-heading: "Cinzel", serif;
  --font-body: "Cormorant Garamond", Georgia, serif;
  --font-accent: "EB Garamond", Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background-color: var(--color-midnight);
  color: var(--color-parchment-2);
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Soft edge vignette over the whole page */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  box-shadow: inset 0 0 220px 40px rgba(0, 0, 0, 0.7);
}

::selection {
  background: rgba(201, 162, 75, 0.3);
  color: var(--color-parchment);
}

/* Gold themed scrollbar */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--color-midnight); }
::-webkit-scrollbar-thumb {
  background: var(--color-ember);
  border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover { background: var(--color-gold); }

/* ---- shared keyframes ---- */
@keyframes flicker {
  0%, 100% { opacity: 1; transform: scale(1) translateY(0); }
  25% { opacity: 0.85; transform: scale(1.08, 0.94) translateY(-1px); }
  50% { opacity: 0.95; transform: scale(0.96, 1.05) translateY(0.5px); }
  75% { opacity: 0.8; transform: scale(1.04, 0.97) translateY(-0.5px); }
}

@keyframes float-candle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@keyframes shimmer-sweep {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(120%); }
}

@keyframes scroll-cue {
  0% { opacity: 0; transform: translateY(-6px); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(6px); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

/* Utility component classes used across sections */
@layer components {
  .parchment-grain {
    background-image:
      radial-gradient(rgba(201, 162, 75, 0.05) 1px, transparent 1px);
    background-size: 4px 4px;
  }
  .gold-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
  }
}
```

- [ ] **Step 5: Create temporary `src/App.jsx` smoke test**

```jsx
export default function App() {
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="text-center">
        <p className="font-heading tracking-[0.3em] text-[color:var(--color-gold)] uppercase text-sm">
          The Enchanted Codex
        </p>
        <h1 className="font-display text-[color:var(--color-parchment)] text-5xl mt-3">
          Scaffold lit ⚡
        </h1>
      </div>
    </main>
  )
}
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: completes with no errors; `node_modules/` created.

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: "✓ built in ..." with no errors; `dist/` produced.

- [ ] **Step 8: Verify dev server (manual)**

Run: `npm run dev`
Expected: Vite prints a Local URL. Opening it shows the gold "The Enchanted Codex / Scaffold lit ⚡" centered on a dark background using the Cinzel/Cinzel Decorative fonts. No console errors. Stop the server (Ctrl+C) after confirming.

- [ ] **Step 9: Commit**

```bash
git add index.html src/main.jsx src/index.css src/App.jsx package-lock.json package.json vite.config.js
git commit -m "feat: scaffold Vite+React+Tailwind v4 shell with theme tokens and fonts"
```

---

## Task 2: Content data file

**Files:**
- Create: `src/data/content.js`

- [ ] **Step 1: Create `src/data/content.js`**

> NOTE: All values are clearly-editable placeholders. Replace freely later — no JSX changes needed.

```js
// ============================================================================
// The Enchanted Codex — content source of truth.
// Everything visible on the page is edited here. Placeholder copy below.
// ============================================================================

export const profile = {
  name: "Ronald Allan Paguntalan",
  displayName: "Ronny",
  role: "Software Engineer",
  tagline: "Conjuring resilient software from the shadows of the command line.",
  email: "ronny@example.com", // TODO: replace with real email
  resumeUrl: "#", // TODO: link a resume/CV if desired
}

export const nav = [
  { id: "hall", label: "Hall" },
  { id: "wizard", label: "Wizard" },
  { id: "spellbook", label: "Spellbook" },
  { id: "enchantments", label: "Enchantments" },
  { id: "chronicles", label: "Chronicles" },
  { id: "owl-post", label: "Owl Post" },
]

export const about = {
  eyebrow: "The Wizard",
  heading: "The Wizard Behind the Wand",
  paragraphs: [
    "I am a software engineer who treats every codebase like a living grimoire — full of incantations waiting to be refined, debugged, and made elegant. My craft spans the full stack, from the charms of the interface to the deep conjuring of the backend.",
    "I believe the best magic is invisible: software that simply works, scales gracefully, and delights the people who use it. I obsess over clean abstractions, thoughtful architecture, and the small details that separate the ordinary from the enchanted.",
    "When I'm not casting spells in the terminal, you'll find me studying new arcane arts, mentoring fellow apprentices, and chasing the occasional golden snitch of a perfectly green test suite.",
  ],
  traits: ["Curious", "Tenacious", "Builder", "Mentor"],
}

export const skillGroups = [
  {
    school: "Frontend Charms",
    glyph: "✦",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    school: "Backend Conjuring",
    glyph: "⚗",
    skills: ["Node.js", "Python", "PostgreSQL", "GraphQL"],
  },
  {
    school: "DevOps Wards",
    glyph: "⚙",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  {
    school: "Ancient Languages",
    glyph: "✶",
    skills: ["JavaScript", "Go", "Java", "Bash"],
  },
]

export const projects = [
  {
    title: "The Pensieve",
    blurb: "A memory-capture knowledge base that lets teams store, search, and revisit their collective wisdom in an instant.",
    tech: ["React", "Node.js", "PostgreSQL"],
    demo: "#", // TODO
    source: "#", // TODO
  },
  {
    title: "Marauder's Map",
    blurb: "A real-time observability dashboard that reveals exactly where every service is — and what mischief it's up to.",
    tech: ["TypeScript", "Go", "Kubernetes"],
    demo: "#", // TODO
    source: "#", // TODO
  },
  {
    title: "Time-Turner",
    blurb: "A point-in-time backup and rollback engine that lets you safely undo the irreversible.",
    tech: ["Python", "AWS", "Docker"],
    demo: "#", // TODO
    source: "#", // TODO
  },
]

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Trend Micro",
    period: "2022 — Present",
    blurb: "Architecting and warding large-scale security platforms; leading a guild of engineers through complex enchantments.",
  },
  {
    role: "Software Engineer",
    company: "A Mysterious Startup",
    period: "2019 — 2022",
    blurb: "Conjured features end-to-end across the stack and tightened the deployment wards from days to minutes.",
  },
  {
    role: "Junior Developer",
    company: "First Apprenticeship",
    period: "2017 — 2019",
    blurb: "Learned the fundamental spells of the craft and shipped my first production charms.",
  },
]

export const contact = {
  eyebrow: "Owl Post",
  heading: "Send an Owl",
  invitation: "Have a project, a question, or just want to talk shop over a butterbeer? Dispatch an owl — I always reply.",
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
    { label: "Email", href: "mailto:ronny@example.com", icon: "mail" },
  ],
}

export const footer = {
  tagline: "Mischief managed.",
  builtWith: "Crafted with magic & React.",
}
```

- [ ] **Step 2: Verify it parses**

Run: `node --check src/data/content.js`
Expected: no output, exit code 0 (valid syntax).

- [ ] **Step 3: Commit**

```bash
git add src/data/content.js
git commit -m "feat: add editable content data file with themed placeholder copy"
```

---

## Task 3: Motion hook + shared UI primitives (Reveal, SectionHeading)

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.js`
- Create: `src/components/ui/Reveal.jsx`
- Create: `src/components/ui/SectionHeading.jsx`

- [ ] **Step 1: Create `src/hooks/usePrefersReducedMotion.js`**

```js
import { useEffect, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setPrefersReduced(mql.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return prefersReduced
}
```

- [ ] **Step 2: Create `src/components/ui/Reveal.jsx`**

```jsx
import { motion } from "framer-motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

// Staggered fade/slide-in wrapper. Animates once when scrolled into view.
// Under reduced motion it renders a plain, fully-visible element.
export function Reveal({ children, delay = 0, y = 24, as = "div", className = "" }) {
  const reduced = usePrefersReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
```

- [ ] **Step 3: Create `src/components/ui/SectionHeading.jsx`**

```jsx
import { Reveal } from "./Reveal"

// Consistent section heading: small gold eyebrow + Cinzel title + flourish divider.
export function SectionHeading({ eyebrow, title, align = "center" }) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left"
  return (
    <Reveal className={`flex flex-col ${alignment} gap-3 mb-14`}>
      {eyebrow && (
        <span className="font-heading uppercase tracking-[0.35em] text-xs text-[color:var(--color-gold)]">
          ✦ {eyebrow} ✦
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl text-[color:var(--color-parchment)] leading-tight">
        {title}
      </h2>
      <div className="gold-divider w-40 mt-2" />
    </Reveal>
  )
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: builds with no errors (unused-but-valid modules are fine; tree-shaking may drop them until imported).

- [ ] **Step 5: Commit**

```bash
git add src/hooks/usePrefersReducedMotion.js src/components/ui/Reveal.jsx src/components/ui/SectionHeading.jsx
git commit -m "feat: add reduced-motion hook and Reveal/SectionHeading UI primitives"
```

---

## Task 4: Atmosphere — Starfield canvas (stars + golden dust)

**Files:**
- Create: `src/components/atmosphere/Starfield.jsx`

- [ ] **Step 1: Create `src/components/atmosphere/Starfield.jsx`**

```jsx
import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

// Fixed full-viewport canvas behind all content.
// Twinkling stars + slowly drifting golden "snitch dust".
// Pauses when the tab is hidden; renders a single static frame under reduced motion.
export function Starfield() {
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let width, height, dpr
    let stars = []
    let dust = []
    let rafId = null

    const rand = (min, max) => Math.random() * (max - min) + min

    function seed() {
      const starCount = Math.min(220, Math.floor((width * height) / 7000))
      const dustCount = Math.min(60, Math.floor((width * height) / 26000))
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(0.3, 1.4),
        baseAlpha: rand(0.2, 0.8),
        twinkleSpeed: rand(0.005, 0.02),
        phase: rand(0, Math.PI * 2),
      }))
      dust = Array.from({ length: dustCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(0.6, 2.2),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.25, -0.05),
        alpha: rand(0.15, 0.5),
      }))
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    function drawStar(s, t) {
      const alpha = s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.phase) * 0.25
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
      ctx.fillStyle = "#f3e7c9"
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawDust(d) {
      ctx.globalAlpha = d.alpha
      const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4)
      grad.addColorStop(0, "rgba(240, 214, 138, 0.9)")
      grad.addColorStop(1, "rgba(240, 214, 138, 0)")
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(d.x, d.y, d.r * 4, 0, Math.PI * 2)
      ctx.fill()
    }

    function frame(t) {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) drawStar(s, t)
      for (const d of dust) {
        d.x += d.vx
        d.y += d.vy
        if (d.y < -10) { d.y = height + 10; d.x = Math.random() * width }
        if (d.x < -10) d.x = width + 10
        if (d.x > width + 10) d.x = -10
        drawDust(d)
      }
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(frame)
    }

    function staticFrame() {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) drawStar(s, 0)
      for (const d of dust) drawDust(d)
      ctx.globalAlpha = 1
    }

    function start() {
      if (rafId == null && !reduced) rafId = requestAnimationFrame(frame)
    }
    function stop() {
      if (rafId != null) { cancelAnimationFrame(rafId); rafId = null }
    }
    function onVisibility() {
      if (document.hidden) stop()
      else start()
    }

    resize()
    if (reduced) staticFrame()
    else start()

    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      stop()
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
```

- [ ] **Step 2: Temporarily mount it in `src/App.jsx` to verify**

Replace `src/App.jsx` body with:

```jsx
import { Starfield } from "./components/atmosphere/Starfield"

export default function App() {
  return (
    <>
      <Starfield />
      <main className="relative z-10 min-h-[200vh] grid place-items-center">
        <p className="font-display text-3xl text-[color:var(--color-parchment)]">
          Starfield test ⚡ (scroll — it stays fixed)
        </p>
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify dev server (manual)**

Run: `npm run dev`
Expected: dark page shows faint twinkling stars and a few rising golden glints behind the text; the field stays fixed while scrolling. Switching to another tab and back does not throw. No console errors. Ctrl+C when done.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/atmosphere/Starfield.jsx src/App.jsx
git commit -m "feat: add canvas starfield with twinkle and drifting golden dust"
```

---

## Task 5: Atmosphere — FloatingCandles (CSS)

**Files:**
- Create: `src/components/atmosphere/FloatingCandles.jsx`

- [ ] **Step 1: Create `src/components/atmosphere/FloatingCandles.jsx`**

```jsx
// Decorative floating candles for the hero (Great Hall ceiling).
// Pure CSS animation (flicker + float). Hidden from assistive tech.
const CANDLES = [
  { left: "12%", top: "14%", h: 70, delay: 0 },
  { left: "26%", top: "8%", h: 54, delay: 1.2 },
  { left: "44%", top: "18%", h: 84, delay: 0.6 },
  { left: "63%", top: "10%", h: 60, delay: 1.8 },
  { left: "78%", top: "16%", h: 76, delay: 0.3 },
  { left: "88%", top: "9%", h: 48, delay: 2.1 },
]

export function FloatingCandles() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {CANDLES.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: c.left,
            top: c.top,
            animation: `float-candle ${5 + (i % 3)}s ease-in-out ${c.delay}s infinite`,
          }}
        >
          {/* flame */}
          <div
            className="mx-auto rounded-full"
            style={{
              width: 8,
              height: 14,
              background: "radial-gradient(circle at 50% 65%, #fff 0%, #f0d68a 45%, #c9a24b 80%, transparent 100%)",
              boxShadow: "0 0 16px 6px rgba(240, 214, 138, 0.55), 0 0 40px 12px rgba(201, 162, 75, 0.25)",
              animation: `flicker ${1.6 + (i % 4) * 0.3}s ease-in-out infinite`,
            }}
          />
          {/* candle body */}
          <div
            className="mx-auto"
            style={{
              width: 6,
              height: c.h,
              background: "linear-gradient(180deg, #f3e7c9 0%, #cdbfa0 60%, #8a5a2b 100%)",
              borderRadius: "2px",
              boxShadow: "0 0 2px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Temporarily verify in `src/App.jsx`**

Replace `src/App.jsx` body with:

```jsx
import { Starfield } from "./components/atmosphere/Starfield"
import { FloatingCandles } from "./components/atmosphere/FloatingCandles"

export default function App() {
  return (
    <>
      <Starfield />
      <main className="relative z-10 min-h-screen">
        <section className="relative h-screen">
          <FloatingCandles />
          <div className="grid place-items-center h-full">
            <p className="font-display text-3xl text-[color:var(--color-parchment)]">Candles test ⚡</p>
          </div>
        </section>
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify dev server (manual)**

Run: `npm run dev`
Expected: candles with glowing, gently flickering flames float near the top of the hero area and bob slowly. No console errors. Ctrl+C when done.

- [ ] **Step 4: Commit**

```bash
git add src/components/atmosphere/FloatingCandles.jsx src/App.jsx
git commit -m "feat: add CSS floating candles with flickering flames for hero"
```

---

## Task 6: Atmosphere — WandCursor (Motion trail)

**Files:**
- Create: `src/components/atmosphere/WandCursor.jsx`

- [ ] **Step 1: Create `src/components/atmosphere/WandCursor.jsx`**

```jsx
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

// Golden glow that trails the pointer. Mounts only on fine-pointer (mouse)
// devices and when motion is allowed. Spawns short-lived sparkle particles.
export function WandCursor() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [sparks, setSparks] = useState([])

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 })

  useEffect(() => {
    if (reduced) return
    const finePointer = window.matchMedia("(pointer: fine)").matches
    if (!finePointer) return
    setEnabled(true)

    let lastSpark = 0
    function onMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
      const now = performance.now()
      if (now - lastSpark > 60) {
        lastSpark = now
        const id = now + Math.random()
        setSparks((prev) => [
          ...prev.slice(-14),
          { id, x: e.clientX, y: e.clientY, dx: (Math.random() - 0.5) * 24, dy: (Math.random() - 0.5) * 24 },
        ])
        setTimeout(() => {
          setSparks((prev) => prev.filter((s) => s.id !== id))
        }, 650)
      }
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[60] pointer-events-none">
      {/* main glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: sx,
          y: sy,
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          background: "radial-gradient(circle, rgba(240,214,138,0.9) 0%, rgba(201,162,75,0.4) 50%, transparent 70%)",
        }}
      />
      {/* sparkle trail */}
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, x: s.dx, y: s.dy }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            left: s.x,
            top: s.y,
            width: 4,
            height: 4,
            marginLeft: -2,
            marginTop: -2,
            background: "#f0d68a",
            boxShadow: "0 0 6px 2px rgba(240,214,138,0.7)",
          }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Temporarily verify in `src/App.jsx`**

Add the import and mount `<WandCursor />` alongside `<Starfield />` in the current test App:

```jsx
import { Starfield } from "./components/atmosphere/Starfield"
import { FloatingCandles } from "./components/atmosphere/FloatingCandles"
import { WandCursor } from "./components/atmosphere/WandCursor"

export default function App() {
  return (
    <>
      <Starfield />
      <WandCursor />
      <main className="relative z-10 min-h-screen">
        <section className="relative h-screen">
          <FloatingCandles />
          <div className="grid place-items-center h-full">
            <p className="font-display text-3xl text-[color:var(--color-parchment)]">Wand cursor test ⚡</p>
          </div>
        </section>
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify dev server (manual)**

Run: `npm run dev`
Expected: moving the mouse leaves a golden glow + brief sparkle trail. No console errors. Ctrl+C when done.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/atmosphere/WandCursor.jsx src/App.jsx
git commit -m "feat: add Motion wand-trail cursor (fine-pointer + motion-safe only)"
```

---

## Task 7: Layout — Navbar and Footer

**Files:**
- Create: `src/components/layout/Navbar.jsx`
- Create: `src/components/layout/Footer.jsx`

- [ ] **Step 1: Create `src/components/layout/Navbar.jsx`**

```jsx
import { useEffect, useState } from "react"
import { nav, profile } from "../../data/content"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[color:var(--color-midnight)]/85 backdrop-blur-md border-b border-[color:var(--color-gold)]/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hall" className="flex items-center gap-2 group">
          <span className="text-xl text-[color:var(--color-gold)] transition-transform group-hover:scale-110">⚡</span>
          <span className="font-heading tracking-[0.25em] text-sm text-[color:var(--color-parchment)] uppercase">
            {profile.displayName}
          </span>
        </a>

        {/* desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group relative font-heading text-xs uppercase tracking-[0.2em] text-[color:var(--color-parchment-2)] hover:text-[color:var(--color-parchment)] transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--color-gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-[color:var(--color-gold)] text-2xl leading-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <ul className="md:hidden bg-[color:var(--color-midnight-2)]/95 backdrop-blur-md border-t border-[color:var(--color-gold)]/20 px-6 py-4 flex flex-col gap-4">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block font-heading text-sm uppercase tracking-[0.2em] text-[color:var(--color-parchment-2)] hover:text-[color:var(--color-gold)] transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.jsx`**

```jsx
import { footer, profile } from "../../data/content"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 border-t border-[color:var(--color-gold)]/15 py-10 text-center">
      <div className="text-2xl text-[color:var(--color-gold)] mb-3">⚡</div>
      <p className="font-accent italic text-[color:var(--color-parchment)] text-lg">
        {footer.tagline}
      </p>
      <p className="mt-3 text-sm text-[color:var(--color-parchment-2)]">
        © {year} {profile.name} · {footer.builtWith}
      </p>
    </footer>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.jsx src/components/layout/Footer.jsx
git commit -m "feat: add fixed Navbar (scroll-aware + mobile menu) and Footer"
```

---

## Task 8: Hero section (The Great Hall)

**Files:**
- Create: `src/components/sections/Hero.jsx`

- [ ] **Step 1: Create `src/components/sections/Hero.jsx`**

```jsx
import { motion } from "framer-motion"
import { profile } from "../../data/content"
import { FloatingCandles } from "../atmosphere/FloatingCandles"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

export function Hero() {
  const reduced = usePrefersReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
  }
  const item = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
      }

  return (
    <section id="hall" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingCandles />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <motion.p
          variants={item}
          className="font-heading uppercase tracking-[0.4em] text-xs sm:text-sm text-[color:var(--color-gold)]"
        >
          ✦ Welcome to the Great Hall ✦
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl sm:text-6xl md:text-7xl text-[color:var(--color-parchment)] mt-6 leading-[1.05]"
          style={{ textShadow: "0 0 40px rgba(201,162,75,0.25)" }}
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="font-heading uppercase tracking-[0.3em] text-sm md:text-base text-[color:var(--color-gold-bright)] mt-5"
        >
          {profile.role}
        </motion.p>

        <motion.p
          variants={item}
          className="font-accent italic text-xl md:text-2xl text-[color:var(--color-parchment-2)] mt-6"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#enchantments"
            className="group relative overflow-hidden rounded-full border border-[color:var(--color-gold)] px-7 py-3 font-heading text-xs uppercase tracking-[0.2em] text-[color:var(--color-parchment)] transition-colors hover:text-[color:var(--color-midnight)]"
          >
            <span className="relative z-10">Explore my work</span>
            <span className="absolute inset-0 -z-0 bg-[color:var(--color-gold)] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </a>
          <a
            href="#owl-post"
            className="rounded-full px-7 py-3 font-heading text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold)] hover:text-[color:var(--color-gold-bright)] transition-colors"
          >
            Send an owl →
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[color:var(--color-gold)]">
        <div className="flex flex-col items-center gap-2">
          <span className="font-heading uppercase tracking-[0.3em] text-[10px] text-[color:var(--color-parchment-2)]">Descend</span>
          <span style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }}>↓</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.jsx
git commit -m "feat: add Hero (Great Hall) section with staggered reveal and CTAs"
```

---

## Task 9: About section (The Wizard)

**Files:**
- Create: `src/components/sections/About.jsx`

- [ ] **Step 1: Create `src/components/sections/About.jsx`**

```jsx
import { about, profile } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"

export function About() {
  return (
    <section id="wizard" className="relative z-10 max-w-6xl mx-auto px-6 py-28">
      <SectionHeading eyebrow={about.eyebrow} title={about.heading} />

      <div className="grid md:grid-cols-[320px_1fr] gap-12 items-start">
        {/* Portrait frame */}
        <Reveal className="mx-auto md:mx-0">
          <div className="relative w-64 h-80">
            <div className="absolute inset-0 rounded-lg border-2 border-[color:var(--color-gold)]/60" />
            <div className="absolute inset-2 rounded-md border border-[color:var(--color-gold)]/30" />
            <div className="absolute inset-3 rounded-md bg-[color:var(--color-midnight-2)] parchment-grain grid place-items-center overflow-hidden">
              {/* Replace this glyph with an <img> of your portrait when ready */}
              <span className="text-6xl text-[color:var(--color-gold)]/70">⚡</span>
            </div>
            {/* corner flourishes */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[color:var(--color-gold)]">✦</span>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[color:var(--color-gold)]">✦</span>
          </div>
        </Reveal>

        {/* Bio */}
        <div>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} as="p" className="text-[color:var(--color-parchment-2)] mb-5 text-lg leading-relaxed">
              {p}
            </Reveal>
          ))}

          <Reveal delay={0.2} className="flex flex-wrap gap-3 mt-6">
            {about.traits.map((t) => (
              <span
                key={t}
                className="font-heading uppercase tracking-[0.18em] text-xs text-[color:var(--color-gold)] border border-[color:var(--color-gold)]/40 rounded-full px-4 py-1.5"
              >
                {t}
              </span>
            ))}
          </Reveal>

          {profile.resumeUrl && profile.resumeUrl !== "#" && (
            <Reveal delay={0.28} className="mt-8">
              <a
                href={profile.resumeUrl}
                className="font-heading text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold)] hover:text-[color:var(--color-gold-bright)]"
              >
                Read the full chronicle →
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.jsx
git commit -m "feat: add About (The Wizard) section with portrait frame and traits"
```

---

## Task 10: Skills section (The Spellbook)

**Files:**
- Create: `src/components/sections/Skills.jsx`

- [ ] **Step 1: Create `src/components/sections/Skills.jsx`**

```jsx
import { skillGroups } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"

export function Skills() {
  return (
    <section id="spellbook" className="relative z-10 py-28 bg-[color:var(--color-midnight-2)]/40">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="The Spellbook" title="Spells & Disciplines" />

        <div className="grid sm:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <Reveal key={group.school} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-[color:var(--color-gold)]/25 bg-[color:var(--color-ink)]/40 parchment-grain p-7 transition-colors hover:border-[color:var(--color-gold)]/60">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl text-[color:var(--color-gold)]">{group.glyph}</span>
                  <h3 className="font-heading uppercase tracking-[0.2em] text-sm text-[color:var(--color-parchment)]">
                    {group.school}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-[color:var(--color-parchment-2)] bg-[color:var(--color-midnight)]/60 border border-[color:var(--color-gold)]/15 rounded-md px-3 py-1.5 transition-colors hover:border-[color:var(--color-gold)]/50 hover:text-[color:var(--color-gold-bright)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Skills.jsx
git commit -m "feat: add Skills (The Spellbook) section with discipline panels"
```

---

## Task 11: Projects section (Notable Enchantments)

**Files:**
- Create: `src/components/sections/Projects.jsx`

- [ ] **Step 1: Create `src/components/sections/Projects.jsx`**

```jsx
import { projects } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"

export function Projects() {
  return (
    <section id="enchantments" className="relative z-10 max-w-6xl mx-auto px-6 py-28">
      <SectionHeading eyebrow="Notable Enchantments" title="Projects & Conjurings" />

      <div className="grid md:grid-cols-3 gap-7">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.1}>
            <article className="group relative h-full flex flex-col rounded-xl border border-[color:var(--color-gold)]/25 bg-[color:var(--color-ink)]/40 parchment-grain p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:var(--color-gold)]/70 hover:shadow-[0_18px_50px_-12px_rgba(201,162,75,0.35)]">
              <div className="text-2xl text-[color:var(--color-gold)] mb-4">✧</div>
              <h3 className="font-heading text-lg uppercase tracking-[0.12em] text-[color:var(--color-parchment)]">
                {project.title}
              </h3>
              <p className="mt-3 text-[color:var(--color-parchment-2)] leading-relaxed flex-1">
                {project.blurb}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-[11px] text-[color:var(--color-gold-bright)] bg-[color:var(--color-midnight)]/60 rounded px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-5 mt-6 pt-5 border-t border-[color:var(--color-gold)]/15">
                {project.demo && project.demo !== "#" && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="font-heading text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-gold)] hover:text-[color:var(--color-gold-bright)]">
                    View Spell →
                  </a>
                )}
                {project.source && project.source !== "#" && (
                  <a href={project.source} target="_blank" rel="noreferrer" className="font-heading text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-parchment-2)] hover:text-[color:var(--color-parchment)]">
                    Source Grimoire
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Projects.jsx
git commit -m "feat: add Projects (Notable Enchantments) card grid"
```

---

## Task 12: Experience section (The Chronicles)

**Files:**
- Create: `src/components/sections/Experience.jsx`

- [ ] **Step 1: Create `src/components/sections/Experience.jsx`**

```jsx
import { experience } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"

export function Experience() {
  return (
    <section id="chronicles" className="relative z-10 py-28 bg-[color:var(--color-midnight-2)]/40">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading eyebrow="The Chronicles" title="A History of Conjurings" />

        <div className="relative">
          {/* glowing spine */}
          <div
            className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
            style={{ background: "linear-gradient(180deg, transparent, var(--color-gold), transparent)" }}
          />

          <ol className="space-y-12">
            {experience.map((entry, i) => {
              const leftSide = i % 2 === 0
              return (
                <li key={`${entry.company}-${i}`} className="relative">
                  {/* candle node */}
                  <span
                    className="absolute left-3 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-[color:var(--color-gold-bright)]"
                    style={{ boxShadow: "0 0 12px 4px rgba(240,214,138,0.6)" }}
                  />
                  <Reveal
                    delay={i * 0.05}
                    className={`pl-10 md:pl-0 md:w-1/2 ${leftSide ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}
                  >
                    <div className="rounded-xl border border-[color:var(--color-gold)]/20 bg-[color:var(--color-ink)]/40 parchment-grain p-6">
                      <p className="font-heading uppercase tracking-[0.18em] text-[11px] text-[color:var(--color-gold)]">
                        {entry.period}
                      </p>
                      <h3 className="font-display text-xl text-[color:var(--color-parchment)] mt-2">
                        {entry.role}
                      </h3>
                      <p className="font-accent italic text-[color:var(--color-gold-bright)] mt-1">
                        {entry.company}
                      </p>
                      <p className="text-[color:var(--color-parchment-2)] mt-3 leading-relaxed">
                        {entry.blurb}
                      </p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Experience.jsx
git commit -m "feat: add Experience (The Chronicles) timeline section"
```

---

## Task 13: Contact section (Send an Owl)

**Files:**
- Create: `src/components/sections/Contact.jsx`

- [ ] **Step 1: Create `src/components/sections/Contact.jsx`**

```jsx
import { useState } from "react"
import { contact } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"

// Minimal inline SVG icons so we add no icon dependency.
function SocialIcon({ icon }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true }
  if (icon === "github") {
    return (
      <svg {...common}>
        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
      </svg>
    )
  }
  if (icon === "linkedin") {
    return (
      <svg {...common}>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    )
  }
  // mail
  return (
    <svg {...common}>
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Front-end only. TODO: wire to a real form service (e.g. Formspree,
    // Resend, or your own API) by POSTing the form data here.
    setSent(true)
  }

  return (
    <section id="owl-post" className="relative z-10 max-w-3xl mx-auto px-6 py-28 text-center">
      <SectionHeading eyebrow={contact.eyebrow} title={contact.heading} />

      <Reveal as="p" className="text-lg text-[color:var(--color-parchment-2)] max-w-xl mx-auto">
        {contact.invitation}
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        {sent ? (
          <div className="rounded-xl border border-[color:var(--color-gold)]/40 bg-[color:var(--color-ink)]/40 parchment-grain p-10">
            <div className="text-4xl mb-3">🦉</div>
            <p className="font-display text-2xl text-[color:var(--color-parchment)]">Your owl is on its way ✉️</p>
            <p className="text-[color:var(--color-parchment-2)] mt-2">I'll send a reply by return post.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-5 rounded-xl border border-[color:var(--color-gold)]/25 bg-[color:var(--color-ink)]/30 parchment-grain p-8">
            <div>
              <label htmlFor="c-name" className="font-heading uppercase tracking-[0.18em] text-[11px] text-[color:var(--color-gold)]">Your Name</label>
              <input
                id="c-name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-md bg-[color:var(--color-midnight)]/60 border border-[color:var(--color-gold)]/25 px-4 py-3 text-[color:var(--color-parchment)] outline-none focus:border-[color:var(--color-gold)] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="c-msg" className="font-heading uppercase tracking-[0.18em] text-[11px] text-[color:var(--color-gold)]">Your Message</label>
              <textarea
                id="c-msg"
                name="message"
                rows={4}
                required
                className="mt-2 w-full rounded-md bg-[color:var(--color-midnight)]/60 border border-[color:var(--color-gold)]/25 px-4 py-3 text-[color:var(--color-parchment)] outline-none focus:border-[color:var(--color-gold)] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-full border border-[color:var(--color-gold)] px-7 py-3 font-heading text-xs uppercase tracking-[0.2em] text-[color:var(--color-parchment)] transition-colors hover:text-[color:var(--color-midnight)]"
            >
              <span className="relative z-10">Dispatch Owl 🦉</span>
              <span className="absolute inset-0 bg-[color:var(--color-gold)] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </form>
        )}
      </Reveal>

      <Reveal delay={0.2} className="flex items-center justify-center gap-4 mt-10">
        {contact.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="grid place-items-center w-12 h-12 rounded-full border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)] hover:text-[color:var(--color-midnight)] hover:bg-[color:var(--color-gold)] transition-colors"
          >
            <SocialIcon icon={s.icon} />
          </a>
        ))}
      </Reveal>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: builds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Contact.jsx
git commit -m "feat: add Contact (Send an Owl) section with form and social links"
```

---

## Task 14: Assemble App + full verification

**Files:**
- Modify: `src/App.jsx` (replace test body with final composition)

- [ ] **Step 1: Replace `src/App.jsx` with final composition**

```jsx
import { Starfield } from "./components/atmosphere/Starfield"
import { WandCursor } from "./components/atmosphere/WandCursor"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import { Hero } from "./components/sections/Hero"
import { About } from "./components/sections/About"
import { Skills } from "./components/sections/Skills"
import { Projects } from "./components/sections/Projects"
import { Experience } from "./components/sections/Experience"
import { Contact } from "./components/sections/Contact"

export default function App() {
  return (
    <>
      <Starfield />
      <WandCursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify production build**

Run: `npm run build`
Expected: "✓ built" with no errors and no unresolved imports.

- [ ] **Step 3: Verify dev server end-to-end (manual)**

Run: `npm run dev`
Expected checklist (open the Local URL):
- Hero name/role/tagline reveal in sequence on load; candles float and flicker; starfield + dust drift behind everything.
- Wand-trail follows the mouse (desktop).
- Navbar is transparent at top, becomes frosted dark after scrolling ~40px; clicking each nav link smooth-scrolls to the matching section.
- About, Skills, Projects, Experience, Contact each fade/slide in on scroll.
- Project cards lift + glow on hover; skill tags highlight on hover.
- Contact form: submitting shows the "Your owl is on its way 🦉" state; social buttons fill gold on hover.
- No console errors or warnings.

- [ ] **Step 4: Verify responsive layout (manual)**

In dev tools, toggle a narrow (≈375px) viewport.
Expected: Navbar collapses to a ☰ menu that opens/closes; sections stack to a single column; timeline collapses to a left-aligned spine; no horizontal overflow/scroll.

- [ ] **Step 5: Verify reduced motion (manual)**

In dev tools, enable "Emulate prefers-reduced-motion: reduce" and reload.
Expected: no wand cursor, starfield is static (no drift/twinkle animation loop), section content is fully visible without slide-in, page is fully usable.

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx
git commit -m "feat: assemble full Enchanted Codex single-page portfolio"
```

---

## Self-Review (completed by plan author)

**Spec coverage check:**
- Goals/constraints (audience, balanced theme, neutral-gold, placeholder content in one file, perf/a11y, no backend) → Tasks 1–14; content in `content.js` (Task 2); reduced-motion across Tasks 3/4/6/8 + CSS (Task 1).
- Tech stack (Vite/React/Tailwind v4/Motion/Canvas/fonts) → Task 1.
- File tree → matches Tasks 1–14 exactly.
- Color tokens & typography → Task 1 `@theme`.
- Motion language (load stagger, scroll reveals, hover, ambient, reduced) → Tasks 3 (Reveal), 8 (Hero stagger), 4/5/6 (ambient), hover states in 10/11/13, reduced-motion checks in 14.
- All 6 sections + navbar + footer → Tasks 7–13.
- Contact front-end only with hook + confirmation → Task 13.
- Edge handling (reduced motion, touch, tab hidden, form, missing image) → Starfield visibility/static (4), WandCursor pointer guard (6), form no-throw (13), portrait glyph fallback (9).
- Verification (install/build/dev/manual/responsive/reduced) → Tasks 1 & 14.

**Placeholder scan:** No "TBD/implement later" plan-steps. The `// TODO` markers inside `content.js` and `Contact.jsx` are intentional, clearly-marked editable hooks for the user's real data/endpoint — not missing plan content. All code steps contain complete code.

**Type/name consistency:** `content.js` exports (`profile`, `nav`, `about`, `skillGroups`, `projects`, `experience`, `contact`, `footer`) are imported with matching names in every consuming component. `Reveal` props (`children`, `delay`, `y`, `as`, `className`) are used consistently. `usePrefersReducedMotion` named export used consistently. `SocialIcon` icon keys (`github`/`linkedin`/`mail`) match `contact.socials[].icon`.
