import { useEffect, useState } from "react"
import { nav } from "../../data/content"
import { Logo } from "../ui/Logo"

// Split the nav into two balanced groups so the brand can sit between them.
const SPLIT = Math.ceil(nav.length / 2)
const navLeft = nav.slice(0, SPLIT)
const navRight = nav.slice(SPLIT)

function NavLink({ item }) {
  return (
    <li>
      <a
        href={`#${item.id}`}
        className="group relative font-heading text-xs uppercase tracking-[0.2em] text-[color:var(--color-parchment-2)] hover:text-[color:var(--color-parchment)] transition-colors"
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--color-gold)] transition-all duration-300 group-hover:w-full" />
      </a>
    </li>
  )
}

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
      {/*
        Mobile: flex justify-between → brand (left) + hamburger (right).
        Desktop (md+): 3-column grid [1fr | auto | 1fr] keeps the brand
        optically centered regardless of how wide each link group is.
      */}
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* left links — desktop only */}
        <ul className="hidden lg:flex items-center justify-start gap-6 xl:gap-8">
          {navLeft.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </ul>

        {/* centered brand */}
        <a href="#hall" className="group lg:justify-self-center" aria-label="Ronny — home">
          <Logo className="text-lg sm:text-xl" />
        </a>

        {/* right links — desktop only */}
        <ul className="hidden lg:flex items-center justify-end gap-6 xl:gap-8">
          {navRight.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </ul>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-[color:var(--color-gold)] text-2xl leading-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <ul className="lg:hidden bg-[color:var(--color-midnight-2)]/95 backdrop-blur-md border-t border-[color:var(--color-gold)]/20 px-6 py-4 flex flex-col gap-4">
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
