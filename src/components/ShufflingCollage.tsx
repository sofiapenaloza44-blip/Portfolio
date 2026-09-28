import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { findCaseStudy, type CaseStudy } from '../data/work'

// Replicates the animo "Orbit Globe" reference video. Settings were fitted
// against the video frame by frame (card silhouettes across 12 frames, a
// tracked card's path, and template-matching each icon to its slot), so
// ring counts, spacing, speed and which icon sits where all match it.
// Units are % of the container's side, like the template's % of the frame.
// The three main case studies keep their captioned artwork in the globe.
const CAPTIONED = new Set(['teradata-ai-assistant-trust', 'teradata-one-identity', 'stori-compliant-application'])

const GLOBE_SIZE = 48 // sphere radius
const CARD_SIZE = 30 // card width/height when directly facing the viewer
const GAP = 4.5 // spacing between cards along a ring and between rings
const TILT_DEG = 27 // tilts the whole projected sphere in the screen plane
const BACK_FADE = 0.55 // opacity lost at the very back of the sphere
const REVOLUTION_SECONDS = 30
const CAMERA = GLOBE_SIZE * 1.5

// Image order the video assigns to slots; with 23 positions and 12 images,
// each case study appears about twice around the globe.
const SLOT_ORDER = [
  'bbva-appointment-scheduling',
  'customer-obsession',
  'design-system-implementation',
  'frisa-sales-system-modernization',
  'litera-edtech-foundations',
  'teradata-one-identity',
  'santander-mobile-app-features',
  'stori-black-card-beta',
  'skooli-classroom-experience',
  'sony-internal-communications',
  'stori-compliant-application',
  'teradata-ai-assistant-trust',
]
const images = SLOT_ORDER.map((slug) => findCaseStudy(slug)).filter((c): c is CaseStudy => !!c)

// Latitude rings, spaced one card-plus-gap apart, each filled with as many
// cards as fit its circumference and staggered so columns don't line up.
const RING_STEP = (CARD_SIZE + GAP) / GLOBE_SIZE
const HALF_RINGS = Math.max(1, Math.floor(1.15 / RING_STEP))
const RING_COUNT = HALF_RINGS * 2 + 1
const SLOTS_PER_RING = Math.max(1, Math.round(images.length / RING_COUNT))

const CARDS = Array.from({ length: RING_COUNT }).flatMap((_, ring) => {
  const lat = (ring - HALF_RINGS) * RING_STEP
  const perRing = Math.max(3, Math.round((2 * Math.PI * GLOBE_SIZE * Math.cos(lat)) / (CARD_SIZE + GAP)))
  return Array.from({ length: perRing }, (_, j) => ({
    key: `${ring}-${j}`,
    item: images[(j + ring * SLOTS_PER_RING) % images.length],
    lat,
    longitude: ring * 0.37 + (2 * Math.PI * j) / perRing,
  }))
})

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
        // position, scaled up) — skip it so this per-frame update doesn't
        // fight that state.
        if (hoveredRef.current === i) return

        const el = tileRefs.current[i]
        if (!el) return

        const longitudeNow = longitude + 2 * Math.PI * progress
        const ringRadius = Math.cos(lat)
        const x3d = Math.sin(longitudeNow) * ringRadius
        const facing = Math.cos(longitudeNow) * ringRadius // -1 (back) .. 1 (front)

        const perspective = CAMERA / (CAMERA + GLOBE_SIZE * (1 - facing))
        const px = GLOBE_SIZE * x3d * perspective
        const py = -GLOBE_SIZE * Math.sin(lat) * perspective

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
      {CARDS.map(({ key, item }, i) => (
        <div
          key={key}
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
            className="block h-full w-full overflow-hidden rounded-xl border border-line bg-bg shadow-sm"
          >
            <img
              src={`case-studies/${item.slug}${CAPTIONED.has(item.slug) ? '-caption' : ''}.png`}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-contain p-1.5"
            />
          </Link>
        </div>
      ))}
    </div>
  )
}
