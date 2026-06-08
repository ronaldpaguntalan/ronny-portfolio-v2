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
