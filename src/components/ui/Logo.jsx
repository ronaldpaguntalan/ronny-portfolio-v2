// Brand wordmark: <RO⚡NY/>
// - name in Cinzel (parchment), brackets in JetBrains Mono (dim gold) for a
//   programmer feel, and a custom lightning bolt as the middle "N" (bright gold).
// - everything is sized in `em`, so a single font-size on the root scales the
//   whole lockup. Collapses to a compact <R⚡/> monogram below the `sm` breakpoint.

function Bolt({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 30"
      aria-hidden="true"
      className={`h-[1.05em] w-auto shrink-0 text-[color:var(--color-gold-bright)] transition-transform duration-300 group-hover:scale-110 ${className}`}
      style={{ filter: "drop-shadow(0 0 5px rgba(240,214,138,0.65))" }}
    >
      <path d="M12 0 L2 17 L9 17 L7 30 L18 11 L11 11 Z" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className = "" }) {
  return (
    <span
      className={`group inline-flex items-center font-heading leading-none select-none ${className}`}
      aria-label="RONNY"
    >
      {/* opening bracket */}
      <span className="font-mono text-[0.78em] font-medium text-[color:var(--color-gold)]/55 mr-[0.16em] transition-colors group-hover:text-[color:var(--color-gold)]/90">
        {"<"}
      </span>

      {/* full wordmark — sm and up */}
      <span className="hidden sm:inline-flex items-center tracking-[0.16em] text-[color:var(--color-parchment)]">
        RO
        <Bolt className="mx-[0.04em]" />
        NY
      </span>

      {/* compact monogram — below sm */}
      <span className="inline-flex sm:hidden items-center tracking-[0.08em] text-[color:var(--color-parchment)]">
        R
        <Bolt className="ml-[0.04em]" />
      </span>

      {/* closing bracket */}
      <span className="font-mono text-[0.78em] font-medium text-[color:var(--color-gold)]/55 ml-[0.16em] transition-colors group-hover:text-[color:var(--color-gold)]/90">
        {"/>"}
      </span>
    </span>
  )
}
