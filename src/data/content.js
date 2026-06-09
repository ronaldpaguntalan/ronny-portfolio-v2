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
  { id: "academy", label: "Academy" },
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
