import { useEffect, useRef } from "react"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

// Fixed full-viewport canvas behind all content.
// Twinkling stars + slowly drifting golden "snitch dust".
// Pauses when the tab is hidden; renders a single static frame under reduced motion.
export function Starfield() {
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let width, height, dpr
    let stars = []
    let dust = []
    let rafId = null

    const rand = (min, max) => Math.random() * (max - min) + min

    function seed() {
      const starCount = Math.min(220, Math.floor((width * height) / 7000))
      const dustCount = Math.min(60, Math.floor((width * height) / 26000))
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(0.3, 1.4),
        baseAlpha: rand(0.2, 0.8),
        twinkleSpeed: rand(0.005, 0.02),
        phase: rand(0, Math.PI * 2),
      }))
      dust = Array.from({ length: dustCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(0.6, 2.2),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.25, -0.05),
        alpha: rand(0.15, 0.5),
      }))
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      if (reduced) staticFrame() // keep static field visible after resize under reduced motion
    }

    function drawStar(s, t) {
      const alpha = s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.phase) * 0.25
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
      ctx.fillStyle = "#f3e7c9"
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawDust(d) {
      ctx.globalAlpha = d.alpha
      const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4)
      grad.addColorStop(0, "rgba(240, 214, 138, 0.9)")
      grad.addColorStop(1, "rgba(240, 214, 138, 0)")
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(d.x, d.y, d.r * 4, 0, Math.PI * 2)
      ctx.fill()
    }

    function frame(t) {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) drawStar(s, t)
      for (const d of dust) {
        d.x += d.vx
        d.y += d.vy
        if (d.y < -10) { d.y = height + 10; d.x = Math.random() * width }
        if (d.x < -10) d.x = width + 10
        if (d.x > width + 10) d.x = -10
        drawDust(d)
      }
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(frame)
    }

    function staticFrame() {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) drawStar(s, 0)
      for (const d of dust) drawDust(d)
      ctx.globalAlpha = 1
    }

    function start() {
      if (rafId == null && !reduced) rafId = requestAnimationFrame(frame)
    }
    function stop() {
      if (rafId != null) { cancelAnimationFrame(rafId); rafId = null }
    }
    function onVisibility() {
      if (document.hidden) stop()
      else start()
    }

    resize()
    if (reduced) staticFrame()
    else start()

    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      stop()
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
