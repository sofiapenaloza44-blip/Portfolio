import { motion, useReducedMotion } from 'motion/react'

const lines = ['team leader,', 'product designer,', 'strategist and optimist.']

const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.3  0 0 0 0 0.3  0 0 0 0 0.4  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

function Watercolor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
    >
      <div
        className="absolute -left-[10%] -top-[30%] h-[85%] w-[55%] rounded-full bg-[#b9d6ff] opacity-70 blur-3xl will-change-transform"
        style={{ animation: 'watercolor-drift-a 18s ease-in-out infinite' }}
      />
      <div
        className="absolute -right-[8%] top-[5%] h-[80%] w-[50%] rounded-full bg-[#fdeaa6] opacity-80 blur-3xl will-change-transform"
        style={{ animation: 'watercolor-drift-b 22s ease-in-out infinite' }}
      />
      <div
        className="absolute left-[30%] top-[35%] h-[70%] w-[45%] rounded-full bg-[#cfe3ff] opacity-60 blur-3xl will-change-transform"
        style={{ animation: 'watercolor-drift-c 26s ease-in-out infinite' }}
      />
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-multiply"
        style={{ backgroundImage: grain }}
      />
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <div className="relative isolate">
      <Watercolor />
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {"I'm a "}
          {lines.map((line, i) => (
            <motion.span
              key={line}
              className="block"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.span>
          ))}
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-soft">I really love what I do.</p>
      </section>
    </div>
  )
}
