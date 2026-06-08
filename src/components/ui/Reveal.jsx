import { motion } from "framer-motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

// Staggered fade/slide-in wrapper. Animates once when scrolled into view.
// Under reduced motion it renders a plain, fully-visible element.
export function Reveal({ children, delay = 0, y = 24, as = "div", className = "" }) {
  const reduced = usePrefersReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
