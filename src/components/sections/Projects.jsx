import { projects } from "../../data/content"
import { SectionHeading } from "../ui/SectionHeading"
import { Reveal } from "../ui/Reveal"

export function Projects() {
  return (
    <section id="enchantments" className="relative z-10 max-w-6xl mx-auto px-6 py-28">
      <SectionHeading eyebrow="The Workshop" title="Projects" />

      <div className="grid md:grid-cols-3 gap-7">
        {projects.map((project, i) => {
          const comingSoon = project.status === "coming-soon"
          const hasDemo = project.demo && project.demo !== "#"
          const hasSource = project.source && project.source !== "#"
          const hasLinks = hasDemo || hasSource
          return (
            <Reveal key={project.title} delay={i * 0.1}>
              <article className={`group relative h-full flex flex-col rounded-xl border border-[color:var(--color-gold)]/25 bg-[color:var(--color-ink)]/40 parchment-grain p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:var(--color-gold)]/70 hover:shadow-[0_18px_50px_-12px_rgba(201,162,75,0.35)] ${comingSoon ? "border-dashed opacity-90" : ""}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl text-[color:var(--color-gold)]">✧</div>
                  {comingSoon && (
                    <span className="font-heading uppercase tracking-[0.16em] text-[10px] text-[color:var(--color-gold)] border border-[color:var(--color-gold)]/40 rounded-full px-3 py-1">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-lg uppercase tracking-[0.12em] text-[color:var(--color-parchment)]">
                  {project.title}
                </h3>
                <p className="mt-3 text-[color:var(--color-parchment-2)] leading-relaxed flex-1">
                  {project.blurb}
                </p>

                {project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-[11px] text-[color:var(--color-gold-bright)] bg-[color:var(--color-midnight)]/60 rounded px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {hasLinks && (
                  <div className="flex gap-5 mt-6 pt-5 border-t border-[color:var(--color-gold)]/15">
                    {hasDemo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="font-heading text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-gold)] hover:text-[color:var(--color-gold-bright)]">
                        Live Demo →
                      </a>
                    )}
                    {hasSource && (
                      <a href={project.source} target="_blank" rel="noreferrer" className="font-heading text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-parchment-2)] hover:text-[color:var(--color-parchment)]">
                        Source Code
                      </a>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
