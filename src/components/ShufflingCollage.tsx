import { useEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { allCaseStudies } from '../data/work'

const items = allCaseStudies.slice(0, 9)

// Each card sits at a fixed angle around an ellipse and continuously
// orbits (constant angular speed, clockwise). Depth is quantized into 3
// bands by the card's current vertical position on the ellipse (top arc =
// back, middle = mid, bottom arc = front): z-index, scale, and opacity all
// step between the 3 bands, so cards visibly pass behind and in front of
// each other as the ring turns, like a carousel.
const RX = 32 // ellipse horizontal radius, % of container
const RY = 24 // ellipse vertical radius, % of container
const TILE_W = 30 // %, uniform tile size
const TILE_H = 34
const REVOLUTION_SECONDS = 30
const TILT = [-3, 2, -2, 3, -3, 2, -2, 3, -1] // small fixed per-card tilt, unrelated to orbit position

const LAYERS = [
  { z: 10, scale: 0.84, opacity: 0.8 }, // back
  { z: 20, scale: 1, opacity: 0.95 }, // mid
  { z: 30, scale: 1.14, opacity: 1 }, // front
] as const

function layerFor(sinTheta: number) {
  if (sinTheta > 1 / 3) return 2
  if (sinTheta < -1 / 3) return 0
  return 1
}

export function ShufflingCollage() {
  const reduce = useReducedMotion()
  const tileRefs = useRef<(HTMLDivElement | null)[]>([])
  const hoveredRef = useRef<number | null>(null)
  const currentAngleRef = useRef(0)
  const placeRef = useRef<(angle: number) => void>(() => {})

  useEffect(() => {
    const baseAngles = items.map((_, i) => (i / items.length) * Math.PI * 2)

    const place = (angle: number) => {
      currentAngleRef.current = angle
      items.forEach((_, i) => {
        const el = tileRefs.current[i]
        if (!el) return
        const theta = baseAngles[i] + angle
        const sinT = Math.sin(theta)
        const cosT = Math.cos(theta)
        const layer = hoveredRef.current === i ? 2 : layerFor(sinT)
        const { z, scale, opacity } = LAYERS[layer]
        gsap.set(el, {
          left: `${50 + RX * cosT}%`,
          top: `${50 + RY * sinT}%`,
          zIndex: hoveredRef.current === i ? 100 : z + i,
          scale: hoveredRef.current === i ? scale * 1.05 : scale,
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

    const proxy = { angle: 0 }
    const tween = gsap.to(proxy, {
      angle: Math.PI * 2,
      duration: REVOLUTION_SECONDS,
      ease: 'none',
      repeat: -1,
      onUpdate: () => place(proxy.angle),
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
          style={{ width: `${TILE_W}%`, height: `${TILE_H}%`, transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => {
            hoveredRef.current = i
            placeRef.current(currentAngleRef.current)
          }}
          onMouseLeave={() => {
            hoveredRef.current = null
            placeRef.current(currentAngleRef.current)
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
