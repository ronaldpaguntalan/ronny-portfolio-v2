import { about, profile } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"
import workingPhoto from "../../assets/images/web/present-profile-working.webp"
import hpCreative from "../../assets/images/web/hp-creative.webp"

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
            <div
              className="absolute inset-3 rounded-md overflow-hidden flip-card"
              tabIndex={0}
              aria-label="Portrait of Ronald — hover or focus to reveal the wizard within"
            >
              <div className="flip-inner">
                <div className="flip-face">
                  <img
                    src={hpCreative}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flip-face flip-back" aria-hidden="true">
                  <img
                    src={workingPhoto}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
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
