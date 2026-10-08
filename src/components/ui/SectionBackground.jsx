import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const COLORS = {
  blue: '79 124 255',
  violet: '139 92 246',
  cyan: '34 211 238',
}

const SLOW = [0.45, 0, 0.55, 1]

// Each variant describes its own atmosphere. Positions are % of the section,
// sizes are px, drift is how far (px) a light slowly wanders.
const VARIANTS = {
  hero: {
    base: '#07080c',
    glows: [
      { color: 'blue', x: 25, y: 20, w: 900, opacity: 0.2, drift: [60, 40], duration: 48 },
      { color: 'violet', x: 78, y: 35, w: 800, opacity: 0.16, drift: [-50, 50], duration: 56 },
      { color: 'cyan', x: 55, y: 80, w: 560, opacity: 0.08, drift: [40, -30], duration: 64 },
      { color: 'violet', x: 50, y: 45, w: 1000, h: 520, opacity: 0.08, drift: [0, 0], duration: 60, pulse: true },
    ],
    particles: 14,
    noise: 0.05,
  },
  capabilities: {
    base: '#07080c',
    glows: [
      { color: 'cyan', x: 18, y: 30, w: 760, opacity: 0.12, drift: [70, 30], duration: 52 },
      { color: 'violet', x: 82, y: 70, w: 820, opacity: 0.14, drift: [-60, -30], duration: 60 },
    ],
    grid: true,
    particles: 6,
    noise: 0.04,
  },
  services: {
    base: '#05060a',
    glows: [
      { color: 'violet', x: 50, y: 50, w: 1100, h: 640, opacity: 0.11, drift: [30, 20], duration: 70 },
      { color: 'blue', x: 20, y: 80, w: 600, opacity: 0.07, drift: [30, -20], duration: 62 },
    ],
    noise: 0.04,
  },
  workflow: {
    base: '#07080c',
    glows: [
      { color: 'blue', x: 25, y: 50, w: 1100, h: 300, rotate: -6, opacity: 0.14, drift: [140, 0], duration: 44 },
      { color: 'violet', x: 55, y: 55, w: 1100, h: 280, rotate: -6, opacity: 0.14, drift: [140, 0], duration: 52 },
      { color: 'cyan', x: 85, y: 50, w: 900, h: 260, rotate: -6, opacity: 0.1, drift: [-120, 0], duration: 60 },
    ],
    particles: 8,
    noise: 0.04,
  },
  process: {
    base: '#05060a',
    glows: [
      { color: 'blue', x: 12, y: 18, w: 800, h: 460, opacity: 0.09, drift: [25, 10], duration: 64 },
      { color: 'violet', x: 88, y: 82, w: 840, h: 500, opacity: 0.08, drift: [-25, -10], duration: 70 },
    ],
    noise: 0.025,
  },
  caseStudies: {
    base: '#04050a',
    glows: [{ color: 'blue', x: 50, y: 10, w: 1000, h: 480, opacity: 0.07, drift: [30, 10], duration: 72 }],
    noise: 0.03,
  },
  cta: {
    base: '#07080c',
    glows: [
      { color: 'blue', x: 30, y: 50, w: 900, opacity: 0.2, drift: [40, 20], duration: 48 },
      { color: 'violet', x: 70, y: 50, w: 900, opacity: 0.18, drift: [-40, -20], duration: 54 },
      { color: 'cyan', x: 50, y: 85, w: 640, h: 360, opacity: 0.08, drift: [25, 0], duration: 60 },
    ],
    grid: true,
    noise: 0.05,
  },
}

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const EDGE_FADE =
  'linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)'

// Deterministic pseudo-random numbers, so particles are stable between renders.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

function makeParticles(count) {
  const rand = seeded(42)
  const tints = ['255 255 255', COLORS.cyan, COLORS.violet]
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: 1 + rand() * 1.5,
    tint: tints[i % tints.length],
    rise: 20 + rand() * 40,
    duration: 18 + rand() * 14,
    delay: -rand() * 20,
    // Hide every other particle on small screens to keep mobile light.
    desktopOnly: i % 2 === 1,
  }))
}

function Glow({ glow, animate }) {
  const { color, x, y, w, h = w, rotate = 0, opacity, drift, duration, pulse } = glow
  const rgb = COLORS[color]
  return (
    <motion.div
      className="absolute rounded-full will-change-transform"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        rotate,
        backgroundImage: `radial-gradient(closest-side, rgb(${rgb} / ${opacity}), transparent)`,
      }}
      animate={
        animate
          ? pulse
            ? { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }
            : { x: [0, drift[0]], y: [0, drift[1]], scale: [1, 1.1] }
          : undefined
      }
      transition={{ duration, ease: SLOW, repeat: Infinity, repeatType: 'mirror' }}
    />
  )
}

function Particles({ count, animate }) {
  const particles = useMemo(() => makeParticles(count), [count])
  return particles.map((p) => (
    <motion.span
      key={p.id}
      className={`absolute rounded-full ${p.desktopOnly ? 'hidden md:block' : ''}`}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        backgroundColor: `rgb(${p.tint})`,
        opacity: 0.25,
      }}
      animate={animate ? { y: [0, -p.rise], opacity: [0.08, 0.5, 0.08] } : undefined}
      transition={{
        duration: p.duration,
        delay: p.delay,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
      }}
    />
  ))
}

// Animated atmosphere that sits behind a section's content.
// Usage: <SectionBackground variant="hero" className="py-24">...content...</SectionBackground>
export default function SectionBackground({
  variant = 'hero',
  as: Tag = 'section',
  className = '',
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const config = VARIANTS[variant] ?? VARIANTS.hero
  const animate = !reduceMotion

  return (
    <Tag
      className={`relative isolate overflow-hidden ${className}`}
      style={{ backgroundColor: config.base }}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        {config.glows.map((glow, i) => (
          <Glow key={i} glow={glow} animate={animate} />
        ))}

        {config.grid && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse at center, #000 15%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, #000 15%, transparent 70%)',
            }}
          />
        )}

        {config.particles > 0 && <Particles count={config.particles} animate={animate} />}

        {config.noise > 0 && (
          <div
            className="absolute inset-0 mix-blend-overlay"
            style={{ backgroundImage: NOISE, opacity: config.noise }}
          />
        )}
      </div>
      {children}
    </Tag>
  )
}
