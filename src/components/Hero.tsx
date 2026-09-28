import { motion, useReducedMotion } from 'motion/react'

const lines = ['team leader,', 'product designer,', 'strategist and optimist.']

const fineGrain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.4  0 0 0 0 0.55  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

function WashLayer({ id, seed, className }: { id: string; seed: number; className: string }) {
  return (
    <svg
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full will-change-[opacity] ${className}`}
    >
      <defs>
        <radialGradient id={`${id}-pigment`} cx="0.65" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#fbdf80" stopOpacity="0.4" />
          <stop offset="0.7" stopColor="#f9d766" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f6cf55" stopOpacity="0.62" />
        </radialGradient>
        <filter
          id={id}
          filterUnits="userSpaceOnUse"
          x="-300"
          y="-300"
          width="2040"
          height="1320"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.005 0.008" numOctaves="3" seed="3" result="lobes" />
          <feDisplacementMap in="SourceGraphic" in2="lobes" scale="130" xChannelSelector="R" yChannelSelector="G" result="warped" />
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="4" seed={seed + 11} result="ragged" />
          <feDisplacementMap in="warped" in2="ragged" scale="26" xChannelSelector="G" yChannelSelector="B" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="4" seed={seed + 23} result="mottle" />
          <feColorMatrix in="mottle" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.5 0 0 0 -0.05" result="density" />
          <feComposite in="shape" in2="density" operator="in" result="pigment" />
          <feGaussianBlur in="shape" stdDeviation="9" result="soft" />
          <feComposite in="shape" in2="soft" operator="arithmetic" k1="0" k2="1.6" k3="-1.6" k4="0" result="rim" />
          <feMerge result="painted">
            <feMergeNode in="pigment" />
            <feMergeNode in="rim" />
          </feMerge>
          <feGaussianBlur in="painted" stdDeviation="0.7" />
        </filter>
      </defs>

      <g filter={`url(#${id})`}>
        <ellipse cx="640" cy="350" rx="700" ry="275" fill={`url(#${id}-pigment)`} />
      </g>
    </svg>
  )
}

function Watercolor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
    >
      <div className="absolute inset-0" style={{ animation: 'watercolor-drift 24s ease-in-out infinite' }}>
        <WashLayer id="wc-a" seed={3} className="[animation:watercolor-boil-a_10s_ease-in-out_infinite]" />
        <WashLayer id="wc-b" seed={9} className="[animation:watercolor-boil-b_10s_ease-in-out_infinite]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-multiply"
        style={{ backgroundImage: fineGrain }}
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
