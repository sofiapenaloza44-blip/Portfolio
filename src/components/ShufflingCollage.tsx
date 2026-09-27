import { useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { allCaseStudies } from '../data/work'

const items = allCaseStudies.slice(0, 9)

// Measured directly off the reference screenshot (percent of a 966x972
// container), then ordered clockwise around the cluster's centroid so
// tiles can flow smoothly from one measured position to the next. `layer`
// (0 back, 1 mid, 2 front) sets depth: z-index, scale, and opacity.
const SLOTS = [
  { left: 35.2, top: 35.2, width: 28.8, height: 28.6, layer: 1 },
  { left: 61.3, top: 49.1, width: 24.2, height: 25.7, layer: 2 },
  { left: 44.0, top: 68.2, width: 23.8, height: 23.9, layer: 2 },
  { left: 18.3, top: 56.6, width: 24.1, height: 25.2, layer: 2 },
  { left: 7.1, top: 46.8, width: 20.8, height: 18.5, layer: 1 },
  { left: 10.9, top: 25.2, width: 28.0, height: 25.2, layer: 1 },
  { left: 26.5, top: 9.5, width: 15.2, height: 23.5, layer: 0 },
  { left: 40.4, top: 10.0, width: 25.4, height: 24.0, layer: 0 },
  { left: 65.7, top: 23.9, width: 23.5, height: 23.7, layer: 0 },
]

const LAYER_Z = [10, 20, 30]
const LAYER_SCALE = [0.86, 1, 1.12]
const LAYER_OPACITY = [0.82, 0.95, 1]
const TILT = [-3, 2, -2, 3, -3, 2, -2, 3, -1] // small fixed per-tile tilt, unrelated to path position

const REVOLUTION_SECONDS = 32
const N = SLOTS.length

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function ShufflingCollage() {
  const reduce = useReducedMotion()
  const tileRefs = useRef<(HTMLDivElement | null)[]>([])
  const hoveredRef = useRef<number | null>(null)
  const currentProgressRef = useRef(0)
  const placeRef = useRef<(progress: number) => void>(() => {})

  useEffect(() => {
    // Each tile follows the same clockwise path around the measured
    // slots, offset from the others by one slot, so at any instant every
    // slot is occupied by exactly one tile while all 9 continuously flow
    // from slot to slot (the "ring" motion) instead of jumping between
    // fixed positions.
    const place = (progress: number) => {
      currentProgressRef.current = progress
      items.forEach((_, i) => {
        const el = tileRefs.current[i]
        if (!el) return
        const phase = (progress + i) % N
        const index = Math.floor(phase)
        const next = (index + 1) % N
        const frac = phase - index
        const a = SLOTS[index]
        const b = SLOTS[next]

        const isHovered = hoveredRef.current === i
        const scale = isHovered ? LAYER_SCALE[2] * 1.05 : lerp(LAYER_SCALE[a.layer], LAYER_SCALE[b.layer], frac)
        const opacity = isHovered ? 1 : lerp(LAYER_OPACITY[a.layer], LAYER_OPACITY[b.layer], frac)
        const z = isHovered ? 100 : Math.round(lerp(LAYER_Z[a.layer], LAYER_Z[b.layer], frac)) + i

        gsap.set(el, {
          left: `${lerp(a.left, b.left, frac)}%`,
          top: `${lerp(a.top, b.top, frac)}%`,
          width: `${lerp(a.width, b.width, frac)}%`,
          height: `${lerp(a.height, b.height, frac)}%`,
          zIndex: z,
          scale,
          opacity,
        })
      })
    }

    placeRef.current = place

    // Static positions, no ongoing motion, for reduced-motion viewers.
    // Hover handlers below call placeRef.current directly to still react,
    // since there's no running loop to pick up the change otherwise.
    if (reduce) {
      place(0)
      return
    }

    const proxy = { progress: 0 }
    const tween = gsap.to(proxy, {
      progress: N,
      duration: REVOLUTION_SECONDS,
      ease: 'none',
      repeat: -1,
      onUpdate: () => place(proxy.progress),
    })

    return () => {
      tween.kill()
    }
  }, [reduce])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md sm:max-w-lg">
      {items.map((item, i) => (
        <div
          key={item.slug}
          ref={(el) => {
            tileRefs.current[i] = el
          }}
          className="absolute"
          onMouseEnter={() => {
            hoveredRef.current = i
            placeRef.current(currentProgressRef.current)
          }}
          onMouseLeave={() => {
            hoveredRef.current = null
            placeRef.current(currentProgressRef.current)
          }}
        >
          <div
            className="h-full w-full rotate-(--tile-rotate) transition-transform duration-300"
            style={{ '--tile-rotate': reduce ? '0deg' : `${TILT[i]}deg` } as CSSProperties}
          >
            <Link
              to={`/work/${item.slug}`}
              className="group block h-full w-full overflow-hidden rounded-xl border border-line shadow-sm"
            >
              <div className="relative h-full w-full">
                <img
                  src={`https://picsum.photos/seed/${item.gallerySeeds[0]}/400/400`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-2 pt-6">
                  <p className="truncate text-[11px] font-medium text-bg">{item.company ?? item.title}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
