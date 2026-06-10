import { motion } from "framer-motion"
import { profile } from "../../data/content"
import { FloatingCandles } from "../atmosphere/FloatingCandles"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import heroWizard from "../../assets/images/hero-wizard.png"

export function Hero() {
  const reduced = usePrefersReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
  }
  const item = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
      }

  return (
    <section id="hall" className="relative min-h-screen flex items-start lg:items-center overflow-hidden pt-24 lg:pt-0">
      <FloatingCandles />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* ── text column ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.p
            variants={item}
            className="font-heading uppercase tracking-[0.4em] text-xs sm:text-sm text-[color:var(--color-gold)]"
          >
            ✦ Welcome to the Great Hall ✦
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl sm:text-6xl md:text-7xl text-[color:var(--color-parchment)] mt-6 leading-[1.05]"
            style={{ textShadow: "0 0 40px rgba(201,162,75,0.25)" }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="font-heading uppercase tracking-[0.3em] text-sm md:text-base text-[color:var(--color-gold-bright)] mt-5"
          >
            {profile.role}
          </motion.p>

          <motion.p
            variants={item}
            className="font-accent italic text-xl md:text-2xl text-[color:var(--color-parchment-2)] mt-6 lg:max-w-md"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-4 mt-10 lg:justify-start"
          >
            <a
              href="#enchantments"
              className="group relative overflow-hidden rounded-full border border-[color:var(--color-gold)] px-7 py-3 font-heading text-xs uppercase tracking-[0.2em] text-[color:var(--color-parchment)] transition-colors hover:text-[color:var(--color-midnight)]"
            >
              <span className="relative z-10">Explore my work</span>
              <span className="absolute inset-0 -z-0 bg-[color:var(--color-gold)] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </a>
            <a
              href="#owl-post"
              className="rounded-full px-7 py-3 font-heading text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold)] hover:text-[color:var(--color-gold-bright)] transition-colors"
            >
              Send an owl →
            </a>
          </motion.div>
        </motion.div>

        {/* ── portrait column ── */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <motion.div
            animate={reduced ? {} : { y: [0, -16, 0] }}
            transition={reduced ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* golden aura behind the portrait */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(201,162,75,0.45), transparent 65%)",
              }}
            />

            {/* arcane medallion frame */}
            <div className="relative aspect-square w-[260px] sm:w-[340px] md:w-[400px] lg:w-[440px]">
              {/* faint outer orbit ring */}
              <div className="pointer-events-none absolute -inset-4 rounded-full border border-[color:var(--color-gold)]/15" />
              {/* portrait masked into a circle with a single refined gold ring + soft glow */}
              <div className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-[color:var(--color-gold)]/50 shadow-[0_0_50px_-12px_rgba(201,162,75,0.45)]">
                <img
                  src={heroWizard}
                  alt={`${profile.displayName} — ${profile.role}`}
                  className="h-full w-full object-cover select-none"
                  draggable="false"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[color:var(--color-gold)]">
        <div className="flex flex-col items-center gap-2">
          <span className="font-heading uppercase tracking-[0.3em] text-[10px] text-[color:var(--color-parchment-2)]">Descend</span>
          <span style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }}>↓</span>
        </div>
      </div>
    </section>
  )
}
