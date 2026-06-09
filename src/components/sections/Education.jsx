import { education } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"
import gradSakbay from "../../assets/images/web/grad-sakbay.webp"
import gradToga from "../../assets/images/web/grad-toga.webp"

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
                  <div className="max-w-[240px] mx-auto md:mx-0">
                    <div
                      className="relative aspect-[800/1000] rounded-md border border-[color:var(--color-gold)]/50 p-1 flip-card"
                      tabIndex={0}
                      aria-label="Graduation portraits — hover or focus to flip between them"
                    >
                      <div className="flip-inner">
                        <div className="flip-face rounded-sm overflow-hidden">
                          <img
                            src={gradSakbay}
                            alt="Ronald Allan Paguntalan at his university graduation"
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flip-face flip-back rounded-sm overflow-hidden" aria-hidden="true">
                          <img
                            src={gradToga}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
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
