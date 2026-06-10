// ============================================================================
// The Enchanted Codex — content source of truth.
// Everything visible on the page is edited here.
//
// Copy style: "Balanced" — information reads plainly (nav, role, project
// purpose, contact) while the Harry Potter theme lives in small accents and
// the visual design. Theme the decoration, never the information.
// ============================================================================

export const profile = {
  name: "Ronald Allan Paguntalan",
  displayName: "Ronny",
  role: "Cloud Software Engineer",
  tagline:
    "Building secure, scalable systems — from microservices and APIs to AI-assisted full-stack features.",
  email: "ronallanpaguntalan@gmail.com",
  resumeUrl: "#", // TODO: link your resume/CV PDF if you want a download button
}

// Plain, functional labels so visitors can actually navigate.
// (ids stay the same — they're the in-page anchors used by each section.)
export const nav = [
  { id: "wizard", label: "About" },
  { id: "spellbook", label: "Skills" },
  { id: "enchantments", label: "Projects" },
  { id: "academy", label: "Education" },
  { id: "chronicles", label: "Experience" },
  { id: "owl-post", label: "Contact" },
]

export const about = {
  eyebrow: "The Wizard", // small themed accent above the plain title
  heading: "About Me",
  paragraphs: [
    "I'm a Cloud Software Engineer building secure, scalable microservices that power cyber-threat infrastructure. My day-to-day spans Java, Spring, Vue.js, Python, and AWS — designing RESTful APIs, shipping AI-assisted full-stack features, and automating delivery through CI/CD.",
    "I care about software that simply works: clean code, thoughtful architecture, and security built in from the start (DevSecOps, not bolted on afterward). I came up through hands-on support and front-end work, so I sweat the details that keep systems reliable for the people who depend on them.",
    "Outside the terminal I'm into fitness, exploring new tech, and constantly leveling up — and yes, one of my actual certifications is literally titled “Defense Against the Digital Dark Arts,” which is half the reason this site looks the way it does.",
  ],
  traits: ["Problem-Solver", "Clean Code", "Security-Minded", "Always Learning"],
}

export const skillGroups = [
  {
    school: "Backend",
    glyph: "⚗",
    skills: ["Java", "Spring Framework", "Python", "REST APIs", "Microservices"],
  },
  {
    school: "Frontend",
    glyph: "✦",
    skills: ["Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
  },
  {
    school: "Cloud & DevOps",
    glyph: "⚙",
    skills: ["AWS", "Docker", "Amazon EKS", "GitHub Actions", "CI/CD"],
  },
  {
    school: "Practices & Tools",
    glyph: "✶",
    skills: ["DevSecOps", "Secure Coding", "Agile", "Git", "Firebase"],
  },
]

// A mix of real work highlights (drawn from current role) and a "coming soon"
// card for personal projects. Cards with `status: "coming-soon"` render a badge
// and hide the demo/source links.
export const projects = [
  {
    title: "Threat-Intel Microservices",
    blurb:
      "Secure microservices inside a large cyber-threat platform — RESTful APIs that integrate internal threat-intelligence pipelines with external data sources, built for scale and safe data handling.",
    tech: ["Java", "Spring", "REST", "MySQL"],
    demo: "#",
    source: "#",
  },
  {
    title: "Cloud-Native Delivery on AWS",
    blurb:
      "Cloud-native services deployed and monitored on AWS (ECS, S3, Lambda, RDS, IAM) with automated provisioning and CI/CD pipelines via GitHub Actions for consistent, test-driven releases.",
    tech: ["AWS", "Docker", "GitHub Actions", "CI/CD"],
    demo: "#",
    source: "#",
  },
  {
    title: "AI-Assisted Full-Stack Features",
    blurb:
      "End-to-end features built with Vue.js and Spring under DevSecOps practices — secure coding, unit and integration testing, and robust error handling across interdependent services.",
    tech: ["Vue.js", "Spring", "Python"],
    demo: "#",
    source: "#",
  },
  {
    title: "Personal Projects",
    blurb:
      "Side projects are brewing — live demos and source code will land right here soon.",
    tech: [],
    status: "coming-soon",
    demo: "#",
    source: "#",
  },
]

export const experience = [
  {
    role: "Cloud Software Engineer",
    company: "TrendAI (under Trend Micro)",
    period: "Jul 2024 — Present",
    blurb:
      "Build and maintain secure, scalable microservices within a large cyber-threat platform. Design RESTful APIs, ship AI-assisted full-stack features in Java, Spring, Vue.js, and Python, and automate AWS deployments through CI/CD under DevSecOps practices.",
  },
  {
    role: "IT Service Desk Engineer",
    company: "Trend Micro",
    period: "Dec 2022 — Jul 2024",
    blurb:
      "Provided technical support across hardware, software, Azure VMs, and networks; tracked and resolved requests in Jira; configured systems and trained end-users while keeping IT operations secure and reliable.",
  },
  {
    role: "Junior Programmer",
    company: "MnK.Soft Corporation",
    period: "Sep 2022 — Dec 2022",
    blurb:
      "Built dynamic, responsive web apps with Angular 14, TypeScript, and Tailwind CSS, using Firebase for real-time data, sync, and authentication — with a focus on clean, well-tested code.",
  },
  {
    role: "Programmer Intern",
    company: "MnK.Soft Corporation",
    period: "Feb 2022 — Apr 2022",
    blurb:
      "Helped design and build Angular 12 web applications with TypeScript and Tailwind CSS, integrating Firebase and debugging defects to keep apps reliable.",
  },
]

export const education = [
  {
    photoSet: "university",
    school: "University of Rizal System – Binangonan Campus",
    degree: "BS in Information System",
    period: "2018 — 2022",
    qpa: "QPA 1.29",
    honors: ["Magna Cum Laude", "Outstanding Student Trainee Award", "Service Awardee", "Dean's Lister '18 - '20 ", "Academic Achiever Awardee '20 - '22", "URS Chorale Bass Member '18 - '20", "CCS Student Body Treasurer '18 - '19", "CCS Student Body Auditor '19 - '22", "Graduating Class Secretary"],
  },
  {
    photoSet: "senior-high",
    school: "ACLC College of Taytay",
    degree: "TVL Track - Information and Communication Technology",
    period: "2016 — 2018",
    qpa: "Average 94",
    honors: ["With High Honors", "Salutatorian", "Consistent Top 1 in Class", "Best in Computer Programming","Class President '16 - '18", "Scrabble Intrams Champion"],
  },
]

export const contact = {
  eyebrow: "Owl Post", // small themed accent
  heading: "Get in Touch",
  invitation:
    "Have a project, a role, or just want to talk shop? Drop me a line (or an owl) — I always reply.",
  socials: [
    { label: "GitHub", href: "https://github.com/", icon: "github" }, // TODO: add your real GitHub URL
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ronallanp/", icon: "linkedin" },
    { label: "Email", href: "mailto:ronallanpaguntalan@gmail.com", icon: "mail" },
  ],
}

export const footer = {
  tagline: "Mischief managed.",
  builtWith: "Crafted with React & a little magic.",
}
