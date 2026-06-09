import sharp from "sharp"
import { mkdir } from "node:fs/promises"
import path from "node:path"

const SRC = "src/assets/images"
const OUT = "src/assets/images/web"

// width = max display width (retina-friendly); withoutEnlargement avoids upscaling.
const jobs = [
  { in: "Grad-SAKBAY.png",              out: "grad-sakbay.webp",             width: 800,  quality: 80 },
  { in: "Grad-TOGA.png",                out: "grad-toga.webp",               width: 800,  quality: 80 },
  { in: "Present-Profile-Working.jpg",  out: "present-profile-working.webp", width: 700,  quality: 80 },
  { in: "HP_Costume.jpg",               out: "hp-costume.webp",              width: 700,  quality: 80 },
  { in: "HP_Costume2.jpg",              out: "hp-costume2.webp",             width: 700,  quality: 80 },
  { in: "HP_Creative.jpg",              out: "hp-creative.webp",             width: 1600, quality: 70 },
  { in: "HP_Creative2.jpg",             out: "hp-creative2.webp",            width: 1600, quality: 70 },
]

await mkdir(OUT, { recursive: true })

for (const job of jobs) {
  const outPath = path.join(OUT, job.out)
  await sharp(path.join(SRC, job.in))
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(outPath)
  console.log(`done ${job.in} -> ${job.out}`)
}
console.log("All images optimized.")
