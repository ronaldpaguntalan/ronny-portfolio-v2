import { footer, profile } from "../../data/content"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 border-t border-[color:var(--color-gold)]/15 py-10 text-center">
      <div className="text-2xl text-[color:var(--color-gold)] mb-3">⚡</div>
      <p className="font-accent italic text-[color:var(--color-parchment)] text-lg">
        {footer.tagline}
      </p>
      <p className="mt-3 text-sm text-[color:var(--color-parchment-2)]">
        © {year} {profile.name} · {footer.builtWith}
      </p>
    </footer>
  )
}
