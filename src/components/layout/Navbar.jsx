import { useEffect, useState } from "react"
import { nav, profile } from "../../data/content"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[color:var(--color-midnight)]/85 backdrop-blur-md border-b border-[color:var(--color-gold)]/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hall" className="flex items-center gap-2 group">
          <span className="text-xl text-[color:var(--color-gold)] transition-transform group-hover:scale-110">⚡</span>
          <span className="font-heading tracking-[0.25em] text-sm text-[color:var(--color-parchment)] uppercase">
            {profile.displayName}
          </span>
        </a>

        {/* desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group relative font-heading text-xs uppercase tracking-[0.2em] text-[color:var(--color-parchment-2)] hover:text-[color:var(--color-parchment)] transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--color-gold)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-[color:var(--color-gold)] text-2xl leading-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <ul className="md:hidden bg-[color:var(--color-midnight-2)]/95 backdrop-blur-md border-t border-[color:var(--color-gold)]/20 px-6 py-4 flex flex-col gap-4">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block font-heading text-sm uppercase tracking-[0.2em] text-[color:var(--color-parchment-2)] hover:text-[color:var(--color-gold)] transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
