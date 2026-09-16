import { motion, useReducedMotion } from 'motion/react'

const lines = ['team leader,', 'product designer,', 'strategist and optimist.']

export function Hero() {
  const reduce = useReducedMotion()
  return (
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
  )
}
