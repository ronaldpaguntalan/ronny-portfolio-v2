import { Starfield } from "./components/atmosphere/Starfield"

export default function App() {
  return (
    <>
      <Starfield />
      <main className="relative z-10 min-h-[200vh] grid place-items-center">
        <p className="font-display text-3xl text-[color:var(--color-parchment)]">
          Starfield test ⚡ (scroll — it stays fixed)
        </p>
      </main>
    </>
  )
}
