import { Children, useLayoutEffect, useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'motion/react'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const EDGE_FADE = 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)'

// A horizontal strip that loops forever.
//   direction: -1 moves left, 1 moves right
//   duration:  seconds for the strip to travel one full set of items
//   velocity:  optional MotionValue of the page scroll speed (px/s). Scrolling down speeds the
//              strip up a little; scrolling up slows it and can briefly reverse it.
//
// The children are rendered three times, so there is never an empty gap. When the strip has
// moved exactly one set, it jumps back by one set, which looks identical (seamless).
// Movement runs on a motion value, so React never re-renders while it moves.
export default function MarqueeRow({
  children,
  direction = -1,
  duration = 26,
  startAt = 0,
  velocity,
  className = '',
}) {
  const x = useMotionValue(0)
  const containerRef = useRef(null)
  const setRef = useRef(null)
  const setWidth = useRef(0)
  const slowdown = useRef(1)
  const speedScale = useRef(1)
  const hovered = useRef(false)
  const visible = useRef(true)
  const ready = useRef(false)

  // Measure one set of items before the first paint, so there is no flash or layout shift.
  useLayoutEffect(() => {
    const set = setRef.current
    const measure = () => {
      const width = set.offsetWidth
      if (!width) return
      setWidth.current = width
      speedScale.current = window.matchMedia('(max-width: 639px)').matches ? 1.4 : 1
      if (!ready.current) {
        x.set(-width * startAt)
        ready.current = true
      } else {
        x.set(-((-x.get() % width) + width) % width)
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(set)
    return () => observer.disconnect()
  }, [x, startAt])

  // Only animate while the row is on screen.
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
      },
      { rootMargin: '150px' },
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    const width = setWidth.current
    if (!width || !visible.current) return

    const seconds = Math.min(delta, 64) / 1000
    // Ease towards a slower pace while the pointer is over the row.
    slowdown.current += ((hovered.current ? 0.4 : 1) - slowdown.current) * Math.min(1, seconds * 6)
    const scrollBoost = velocity ? clamp(velocity.get() / 1800, -1.3, 1.5) : 0

    const pixelsPerSecond = (width / (duration * speedScale.current)) * slowdown.current
    let next = x.get() + direction * pixelsPerSecond * (1 + scrollBoost) * seconds
    if (next <= -width) next += width
    else if (next > 0) next -= width
    x.set(next)
  })

  const items = Children.toArray(children)

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
      className={`overflow-hidden ${className}`}
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <motion.div style={{ x }} className="flex w-max will-change-transform">
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            ref={copy === 0 ? setRef : undefined}
            // The extra copies only exist to fill the screen, so they are hidden from assistive tech.
            aria-hidden={copy > 0 ? true : undefined}
            inert={copy > 0}
            className="flex shrink-0 gap-5 pr-5"
          >
            {items}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
