import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { allCaseStudies } from '../data/work'

const items = allCaseStudies.slice(0, 12)
const N = items.length

// Reverse-engineered by stepping through the animo-orbit-globe reference
// video frame by frame: despite the filename, it isn't a rotating 3D
// sphere at all. It's a fixed scattered mosaic of same-size cards — the
// whole layout holds still for several seconds, then every slot
// cross-fades to a different case study at once, and holds again.
const SLOTS = [
  { left: 32, top: 30, width: 34, height: 34 },
  { left: 4, top: 6, width: 26, height: 27 },
  { left: 34, top: 2, width: 27, height: 26 },
  { left: 64, top: 10, width: 28, height: 27 },
  { left: 2, top: 40, width: 25, height: 26 },
  { left: 68, top: 44, width: 27, height: 27 },
  { left: 10, top: 64, width: 26, height: 27 },
  { left: 40, top: 68, width: 27, height: 27 },
  { left: 66, top: 66, width: 27, height: 27 },
]
// Each slot starts on a different case study so the mosaic doesn't repeat
// the same item nine times over; as `step` advances every slot cycles
// through all 12 in turn regardless of its starting offset.
const SLOT_OFFSETS = SLOTS.map((_, i) => i)

const HOLD_SECONDS = 8
const FADE_SECONDS = 0.6
const STAGGER_SECONDS = 0.05

export function ShufflingCollage() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])
  const hoveredRef = useRef<number | null>(null)

  useEffect(() => {
    if (reduce) return

    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout>

    const advance = () => {
      timeoutId = setTimeout(() => {
        if (cancelled) return
        const fadeOutTargets = imgRefs.current.filter((_, i) => hoveredRef.current !== i) as HTMLImageElement[]
        gsap.to(fadeOutTargets, {
          opacity: 0,
          duration: FADE_SECONDS / 2,
          stagger: STAGGER_SECONDS,
          onComplete: () => {
            if (cancelled) return
            setStep((s) => (s + 1) % N)
            requestAnimationFrame(() => {
              const fadeInTargets = imgRefs.current.filter((_, i) => hoveredRef.current !== i) as HTMLImageElement[]
              gsap.to(fadeInTargets, { opacity: 1, duration: FADE_SECONDS / 2, stagger: STAGGER_SECONDS })
            })
            advance()
          },
        })
      }, HOLD_SECONDS * 1000)
    }

    advance()
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [reduce])

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl sm:max-w-2xl lg:max-w-3xl">
      {SLOTS.map((slot, i) => {
        const item = items[(step + SLOT_OFFSETS[i]) % N]
        return (
          <div
            key={i}
            ref={(el) => {
              wrapperRefs.current[i] = el
            }}
            className="absolute"
            style={{
              left: `${slot.left}%`,
              top: `${slot.top}%`,
              width: `${slot.width}%`,
              height: `${slot.height}%`,
              zIndex: 10 + i,
            }}
            onMouseEnter={() => {
              hoveredRef.current = i
              const el = wrapperRefs.current[i]
              if (el) gsap.to(el, { scale: 1.1, zIndex: 100, duration: 0.25, ease: 'power2.out' })
            }}
            onMouseLeave={() => {
              hoveredRef.current = null
              const el = wrapperRefs.current[i]
              if (el) gsap.to(el, { scale: 1, zIndex: 10 + i, duration: 0.25, ease: 'power2.out' })
            }}
          >
            <Link to={`/work/${item.slug}`} className="block h-full w-full">
              <img
                ref={(el) => {
                  imgRefs.current[i] = el
                }}
                src={`case-studies/${item.slug}.png`}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
