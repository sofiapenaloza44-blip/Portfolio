import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { allCaseStudies } from '../data/work'

const items = allCaseStudies.slice(0, 12)

// Reverse-engineered from the "Orbit Globe" canvas template behind the
// animo-orbit-globe reference video: each card sits at a fixed
// (latitude, longitude) on an imaginary sphere, and every card spins
// together around the sphere's vertical axis over time. Projecting that
// 3D position back to 2D each frame (below) is what produces the
// size/opacity/z-index depth cues on its own — there's no separate
// "3 layers" system, depth falls straight out of the projection math.
const BAND_LAT_DEG = [-33, -11, 11, 33]
const BAND_STAGGER = 0.37 // radians — offsets each ring so cards don't line up vertically
const PER_BAND = Math.ceil(items.length / BAND_LAT_DEG.length)

const CARDS = items.map((item, i) => {
  const band = Math.floor(i / PER_BAND)
  const posInBand = i % PER_BAND
  const lat = (BAND_LAT_DEG[band] * Math.PI) / 180
  const longitude = band * BAND_STAGGER + (posInBand * 2 * Math.PI) / PER_BAND
  return { item, lat, longitude }
})

const GLOBE_SIZE = 37.5 // % of container size — sphere radius
const CARD_SIZE = 27.5 // % of container size — card width/height at full (front-most) scale
const CAMERA = GLOBE_SIZE * 1.5
const TILT_DEG = 24 // tilts the whole projected sphere, like the reference video
const BACK_FADE = 0.4
const DIRECTION = 1
const REVOLUTION_SECONDS = 34

const tiltRad = (TILT_DEG * Math.PI) / 180
const cosTilt = Math.cos(tiltRad)
const sinTilt = Math.sin(tiltRad)

export function ShufflingCollage() {
  const reduce = useReducedMotion()
  const tileRefs = useRef<(HTMLDivElement | null)[]>([])
  const hoveredRef = useRef<number | null>(null)
  const currentProgressRef = useRef(0)
  const placeRef = useRef<(progress: number) => void>(() => {})

  useEffect(() => {
    const place = (progress: number) => {
      currentProgressRef.current = progress
      CARDS.forEach(({ lat, longitude }, i) => {
        // A hovered tile is fully owned by the hover handlers below (frozen
        // position, scaled up) — skip it entirely so this per-frame update
        // doesn't fight that state.
        if (hoveredRef.current === i) return

        const el = tileRefs.current[i]
        if (!el) return

        const longitudeNow = longitude + DIRECTION * 2 * Math.PI * progress
        const ringRadius = Math.cos(lat)
        const height3d = Math.sin(lat)
        const x3d = Math.sin(longitudeNow) * ringRadius
        const facing = Math.cos(longitudeNow) * ringRadius // -1 (back) .. 1 (front)

        const depth = CAMERA + GLOBE_SIZE * (1 - facing)
        const perspective = CAMERA / depth
        const px = GLOBE_SIZE * x3d * perspective
        const py = -GLOBE_SIZE * height3d * perspective

        const sx = 50 + px * cosTilt - py * sinTilt
        const sy = 50 + px * sinTilt + py * cosTilt
        const size = CARD_SIZE * perspective

        gsap.set(el, {
          left: `${sx - size / 2}%`,
          top: `${sy - size / 2}%`,
          width: `${size}%`,
          height: `${size}%`,
          opacity: 1 - BACK_FADE * ((1 - facing) / 2),
          zIndex: Math.round((facing + 1) * 45),
          scale: 1,
        })
      })
    }

    placeRef.current = place

    // Static pose, no ongoing motion, for reduced-motion viewers. Hover
    // handlers below call placeRef.current directly to still react, since
    // there's no running loop to pick up the change otherwise.
    if (reduce) {
      place(0)
      return
    }

    const proxy = { progress: 0 }
    const tween = gsap.to(proxy, {
      progress: 1,
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
    <div className="relative mx-auto aspect-square w-full max-w-xl sm:max-w-2xl lg:max-w-3xl">
      {CARDS.map(({ item }, i) => (
        <div
          key={item.slug}
          ref={(el) => {
            tileRefs.current[i] = el
          }}
          className="absolute"
          onMouseEnter={() => {
            hoveredRef.current = i
            const el = tileRefs.current[i]
            if (el) {
              gsap.to(el, { scale: 1.1, opacity: 1, zIndex: 1000, duration: 0.25, ease: 'power2.out' })
            }
          }}
          onMouseLeave={() => {
            hoveredRef.current = null
            placeRef.current(currentProgressRef.current)
          }}
        >
          <Link
            to={`/work/${item.slug}`}
            className="block h-full w-full overflow-hidden rounded-xl border-[5px] border-line bg-bg shadow-sm"
          >
            <img
              src={`case-studies/${item.slug}.png`}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-contain p-3"
            />
          </Link>
        </div>
      ))}
    </div>
  )
}
