import { motion } from "framer-motion"
import { profile } from "../../data/content"
import { FloatingCandles } from "../atmosphere/FloatingCandles"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

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
    <section id="hall" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingCandles />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-3xl"
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
          className="font-accent italic text-xl md:text-2xl text-[color:var(--color-parchment-2)] mt-6"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mt-10">
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
