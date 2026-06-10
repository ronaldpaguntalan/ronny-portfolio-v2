import { experience } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"

export function Experience() {
  return (
    <section id="chronicles" className="relative z-10 py-28 bg-[color:var(--color-midnight-2)]/40">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading eyebrow="The Chronicles" title="Experience" />

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
