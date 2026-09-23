import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, LayoutGroup } from 'motion/react'
import { allCaseStudies } from '../data/work'

// Slot layout: hand-placed, varied-size tiles overlapping in a loose
// cross/diamond cluster (not a uniform grid) — modeled on a reference
// animation of an overlapping card collage. Percentages are of a square
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (reduce) return

    // Swap just one random pair of tiles per tick, on a jittered delay,
    // instead of moving the whole cluster on a fixed interval. That keeps
    // one or two cards drifting at any moment while the rest hold still —
    // continuous, asynchronous motion rather than a synchronized batch jump.
    const scheduleNext = () => {
      const delay = 900 + Math.random() * 900
      timeoutRef.current = setTimeout(() => {
        setOrder((current) => {
          const next = [...current]
          const a = Math.floor(Math.random() * next.length)
          let b = Math.floor(Math.random() * next.length)
          if (b === a) b = (b + 1) % next.length
          ;[next[a], next[b]] = [next[b], next[a]]
          return next
        })
        scheduleNext()
      }, delay)
    }

    scheduleNext()
    return () => clearTimeout(timeoutRef.current)
  }, [reduce])

  return (
    <LayoutGroup>
      <div className="relative mx-auto aspect-[9/10] w-full max-w-md sm:max-w-lg">
        {order.map((itemIndex, slotIndex) => {
          const item = items[itemIndex]
          const slot = SLOTS[slotIndex]
          return (
            <motion.div
              key={item.slug}
              layout
              transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute"
              style={{ top: slot.top, left: slot.left, width: slot.width, height: slot.height, zIndex: slot.zIndex }}
            >
              {/* Rotation lives on a nested, non-layout-animated element:
                  combining Motion's `layout` FLIP transform with an animated
                  `rotate` on the same element distorts the box (its scale
                  correction assumes an axis-aligned rect). Rotation is set
                  via a CSS variable (not inline `transform`) so the
                  hover:rotate-0/hover:scale-105 utilities below can still
                  override it — an inline `transform` style would always win
                  over a class-based one regardless of the `:hover` state. */}
              <div
                className="h-full w-full rotate-(--tile-rotate) transition-transform duration-300 hover:z-50 hover:scale-105 hover:rotate-0"
                style={{ '--tile-rotate': reduce ? '0deg' : `${slot.rotate}deg` } as CSSProperties}
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
            </motion.div>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
