// Decorative floating candles for the hero (Great Hall ceiling).
// Pure CSS animation (flicker + float). Hidden from assistive tech.
const CANDLES = [
  { left: "12%", top: "14%", h: 70, delay: 0 },
  { left: "26%", top: "8%", h: 54, delay: 1.2 },
  { left: "44%", top: "18%", h: 84, delay: 0.6 },
  { left: "63%", top: "10%", h: 60, delay: 1.8 },
  { left: "78%", top: "16%", h: 76, delay: 0.3 },
  { left: "88%", top: "9%", h: 48, delay: 2.1 },
]

export function FloatingCandles() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {CANDLES.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: c.left,
            top: c.top,
            animation: `float-candle ${5 + (i % 3)}s ease-in-out ${c.delay}s infinite`,
          }}
        >
          {/* flame */}
          <div
            className="mx-auto rounded-full"
            style={{
              width: 8,
              height: 14,
              background: "radial-gradient(circle at 50% 65%, #fff 0%, #f0d68a 45%, #c9a24b 80%, transparent 100%)",
              boxShadow: "0 0 16px 6px rgba(240, 214, 138, 0.55), 0 0 40px 12px rgba(201, 162, 75, 0.25)",
              animation: `flicker ${1.6 + (i % 4) * 0.3}s ease-in-out infinite`,
            }}
          />
          {/* candle body */}
          <div
            className="mx-auto"
            style={{
              width: 6,
              height: c.h,
              background: "linear-gradient(180deg, #f3e7c9 0%, #cdbfa0 60%, #8a5a2b 100%)",
              borderRadius: "2px",
              boxShadow: "0 0 2px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      ))}
    </div>
  )
}
