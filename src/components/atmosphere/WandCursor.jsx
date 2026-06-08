import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

// Golden glow that trails the pointer. Mounts only on fine-pointer (mouse)
// devices and when motion is allowed. Spawns short-lived sparkle particles.
export function WandCursor() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [sparks, setSparks] = useState([])

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 })

  useEffect(() => {
    if (reduced) return
    const finePointer = window.matchMedia("(pointer: fine)").matches
    if (!finePointer) return
    setEnabled(true)

    let lastSpark = 0
    function onMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
      const now = performance.now()
      if (now - lastSpark > 60) {
        lastSpark = now
        const id = now + Math.random()
        setSparks((prev) => [
          ...prev.slice(-14),
          { id, x: e.clientX, y: e.clientY, dx: (Math.random() - 0.5) * 24, dy: (Math.random() - 0.5) * 24 },
        ])
        setTimeout(() => {
          setSparks((prev) => prev.filter((s) => s.id !== id))
        }, 650)
      }
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[60] pointer-events-none">
      {/* main glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: sx,
          y: sy,
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          background: "radial-gradient(circle, rgba(240,214,138,0.9) 0%, rgba(201,162,75,0.4) 50%, transparent 70%)",
        }}
      />
      {/* sparkle trail */}
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, x: s.dx, y: s.dy }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            left: s.x,
            top: s.y,
            width: 4,
            height: 4,
            marginLeft: -2,
            marginTop: -2,
            background: "#f0d68a",
            boxShadow: "0 0 6px 2px rgba(240,214,138,0.7)",
          }}
        />
      ))}
    </div>
  )
}
