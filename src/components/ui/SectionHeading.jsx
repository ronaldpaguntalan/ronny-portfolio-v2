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
