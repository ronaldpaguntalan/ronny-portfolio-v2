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
