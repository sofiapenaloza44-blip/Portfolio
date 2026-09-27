import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { allCaseStudies } from '../data/work'

// Slot layout: hand-placed, varied-size tiles overlapping in a loose
// cross/diamond cluster (not a uniform grid) — modeled on a reference
// animation of an overlapping card collage. Slots themselves never move;
// only their rotation is fixed per slot. Percentages are of a square
// container.
const SLOTS = [
  { top: '0%', left: '32%', width: '36%', height: '42%', rotate: -5 },
  { top: '8%', left: '2%', width: '30%', height: '36%', rotate: 4 },
  { top: '6%', left: '66%', width: '32%', height: '34%', rotate: -3 },
  { top: '30%', left: '22%', width: '30%', height: '36%', rotate: 6 },
  { top: '28%', left: '56%', width: '34%', height: '38%', rotate: -4 },
  { top: '34%', left: '0%', width: '26%', height: '32%', rotate: 3 },
  { top: '36%', left: '74%', width: '26%', height: '30%', rotate: -6 },
  { top: '58%', left: '30%', width: '38%', height: '42%', rotate: 2 },
  { top: '64%', left: '2%', width: '28%', height: '34%', rotate: -3 },
].map((slot, i) => ({ ...slot, zIndex: i + 1 }))

const items = allCaseStudies.slice(0, 9)

export function ShufflingCollage() {
  const reduce = useReducedMotion()
  const [order, setOrder] = useState(() => items.map((_, i) => i))
  const floatRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const swapTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Continuous idle drift: every tile gently floats on its own randomized
  // loop the whole time, so the cluster never sits perfectly still between
  // shuffles (GSAP timeline work per Section 5's "motion must be motivated"
  // guidance — this communicates "alive", not just decoration).
  useEffect(() => {
    if (reduce) return
    const tweens = floatRefs.current.map((el, i) => {
      if (!el) return null
      return gsap.to(el, {
        x: () => gsap.utils.random(-8, 8),
        y: () => gsap.utils.random(-7, 7),
        duration: () => gsap.utils.random(2.6, 4.2),
        delay: i * 0.15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      })
    })
    return () => tweens.forEach((t) => t?.kill())
  }, [reduce])

  // Periodic swap: cross-fade the content of two random slots instead of
  // physically sliding tiles across the cluster. Animating opacity/scale
  // (not left/top) keeps this compositor-friendly, and a GSAP timeline
  // gives precise control over the two-step "fade out, swap data, fade
  // in" sequence that a single CSS transition can't express.
  useEffect(() => {
    if (reduce) return

    const scheduleNext = () => {
      const delay = gsap.utils.random(1100, 2000)
      swapTimeout.current = setTimeout(() => {
        const a = Math.floor(Math.random() * items.length)
        let b = Math.floor(Math.random() * items.length)
        if (b === a) b = (b + 1) % items.length

        const elA = contentRefs.current[a]
        const elB = contentRefs.current[b]
        const tl = gsap.timeline({
          onComplete: () => {
            setOrder((current) => {
              const next = [...current]
              ;[next[a], next[b]] = [next[b], next[a]]
              return next
            })
            scheduleNext()
          },
        })
        if (elA && elB) {
          tl.to([elA, elB], { opacity: 0, scale: 0.92, duration: 0.28, ease: 'power2.in' })
        }
      }, delay)
    }

    scheduleNext()
    return () => clearTimeout(swapTimeout.current)
  }, [reduce])

  // Once `order` updates (new content swapped in while faded out), fade
  // the two changed slots back in. Simple approach: fade every slot's
  // content ref up to opacity 1 on every order change — cheap no-op for
  // slots that never left 1.
  useEffect(() => {
    contentRefs.current.forEach((el) => {
      if (!el) return
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' })
    })
  }, [order])

  return (
    <div className="relative mx-auto aspect-[9/10] w-full max-w-md sm:max-w-lg">
      {order.map((itemIndex, slotIndex) => {
        const item = items[itemIndex]
        const slot = SLOTS[slotIndex]
        return (
          <div
            key={slotIndex}
            className="absolute"
            style={{ top: slot.top, left: slot.left, width: slot.width, height: slot.height, zIndex: slot.zIndex }}
          >
            <div ref={(el) => { floatRefs.current[slotIndex] = el }} className="h-full w-full">
              <div
                className="h-full w-full rotate-(--tile-rotate) transition-transform duration-300 hover:z-50 hover:scale-105 hover:rotate-0"
                style={{ '--tile-rotate': reduce ? '0deg' : `${slot.rotate}deg` } as CSSProperties}
              >
                <div ref={(el) => { contentRefs.current[slotIndex] = el }} className="h-full w-full">
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
            </div>
          </div>
        )
      })}
    </div>
  )
}
