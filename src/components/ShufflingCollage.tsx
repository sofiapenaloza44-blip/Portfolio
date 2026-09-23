import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, LayoutGroup } from 'motion/react'
import { allCaseStudies } from '../data/work'

// Slot layout: a 3x3 grid of overlapping, slightly rotated tiles, sized so
// adjacent columns/rows overlap by about 7% (col/row start at 0/31/62%,
// each tile is 38% wide/tall). Rotation and z-index vary per slot so the
// cluster reads as a loose stack of cards rather than a rigid grid.
const ROTATIONS = [-4, 5, -3, 4, -5, 3, -6, 6, -2]

const SLOTS = Array.from({ length: 9 }, (_, i) => ({
  top: `${Math.floor(i / 3) * 31}%`,
  left: `${(i % 3) * 31}%`,
  width: '38%',
  height: '38%',
  rotate: ROTATIONS[i],
  zIndex: i + 1,
}))

const items = allCaseStudies.slice(0, 9)

export function ShufflingCollage() {
  const reduce = useReducedMotion()
  const [order, setOrder] = useState(() => items.map((_, i) => i))

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setOrder((current) => [...current.slice(1), current[0]])
    }, 3200)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <LayoutGroup>
      <div className="relative mx-auto aspect-square w-full max-w-md sm:max-w-lg">
        {order.map((itemIndex, slotIndex) => {
          const item = items[itemIndex]
          const slot = SLOTS[slotIndex]
          return (
            <motion.div
              key={item.slug}
              layout
              transition={reduce ? { duration: 0 } : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
