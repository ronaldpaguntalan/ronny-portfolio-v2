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
