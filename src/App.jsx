import { Starfield } from "./components/atmosphere/Starfield"
import { WandCursor } from "./components/atmosphere/WandCursor"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import { Hero } from "./components/sections/Hero"
import { About } from "./components/sections/About"
import { Skills } from "./components/sections/Skills"
import { Projects } from "./components/sections/Projects"
import { Education } from "./components/sections/Education"
import { Experience } from "./components/sections/Experience"
import { Contact } from "./components/sections/Contact"

export default function App() {
  return (
    <>
      <Starfield />
      <WandCursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
