import { motion, useReducedMotion } from 'motion/react'

const lines = ['team leader,', 'product designer,', 'strategist and optimist.']

const blobs = [
  { pos: '-left-[10%] -top-[30%] h-[85%] w-[55%]', base: '#e2eeff', tint: '#fff6d6', drift: 18, tintDur: 14, delay: 0 },
  { pos: '-right-[8%] top-[5%] h-[80%] w-[50%]', base: '#fff6d6', tint: '#e2eeff', drift: 22, tintDur: 17, delay: -5 },
  { pos: 'left-[30%] top-[35%] h-[70%] w-[45%]', base: '#eef5ff', tint: '#fffae3', drift: 26, tintDur: 20, delay: -9 },
]

function Watercolor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute ${b.pos} will-change-transform`}
          style={{ animation: `watercolor-drift-${'abc'[i]} ${b.drift}s ease-in-out infinite` }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-80 blur-3xl will-change-[opacity]"
            style={{ backgroundColor: b.base, animation: `watercolor-base ${b.tintDur}s ease-in-out ${b.delay}s infinite` }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-0 blur-3xl will-change-[opacity]"
            style={{ backgroundColor: b.tint, animation: `watercolor-tint ${b.tintDur}s ease-in-out ${b.delay}s infinite` }}
          />
        </div>
      ))}
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
