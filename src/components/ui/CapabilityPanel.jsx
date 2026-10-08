import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { EASE } from '../../lib/motion'

// Small, finite hover animation for each icon, chosen to match its meaning.
const ICON_MOTION = {
  spin: { rotate: [0, 14, -10, 0], scale: [1, 1.15, 1] },
  nudge: { x: [0, 2.5, -2.5, 0] },
  travel: { x: [0, 3, 0], y: [0, -2, 0] },
  stack: { y: [0, -2.5, 0] },
  scan: { scale: [1, 1.06, 1] },
  pulse: { scale: [1, 1.14, 1] },
  wave: { scaleY: [1, 1.2, 0.88, 1] },
  rise: { x: [0, 2, 0], y: [0, -3, 0] },
  snap: { scale: [1, 0.9, 1.1, 1] },
  tilt: { rotate: [0, 24, -8, 0] },
  search: { x: [0, 2, -1, 0], y: [0, -2, 1, 0] },
}

const HOVER_LIGHT =
  'radial-gradient(circle at 18% 14%, rgb(79 124 255 / 0.22), transparent 45%), radial-gradient(circle at 42% 22%, rgb(139 92 246 / 0.15), transparent 50%), radial-gradient(circle at 68% 8%, rgb(34 211 238 / 0.1), transparent 45%)'

// One capability module: number, label, icon, title, description, tags and direction cue.
export default function CapabilityPanel({ item, direction = -1, className = '' }) {
  const reduceMotion = useReducedMotion()
  const Icon = item.icon
  const Arrow = direction === -1 ? ArrowLeft : ArrowRight

  const iconVariants = {
    rest: {},
    hover: { ...ICON_MOTION[item.motion], transition: { duration: 0.8, ease: 'easeInOut' } },
  }

  const Wrapper = reduceMotion ? 'article' : motion.article
  const motionProps = reduceMotion
    ? {}
    : {
        initial: 'rest',
        whileHover: 'hover',
        variants: { rest: { y: 0 }, hover: { y: -4 } },
        transition: { duration: 0.35, ease: EASE },
      }
  const IconWrap = reduceMotion ? 'span' : motion.span
  const iconProps = reduceMotion ? {} : { variants: iconVariants }

  return (
    <Wrapper
      {...motionProps}
      className={`group relative flex min-h-[17.5rem] flex-col overflow-hidden rounded-card border border-line bg-ink-900/70 p-6 transition-colors duration-300 ease-premium hover:border-line-strong ${className}`}
    >
      {/* Faint resting light behind the icon, richer blue/violet/cyan light on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 -top-8 size-44 rounded-full bg-[radial-gradient(circle,rgb(79_124_255/0.12),transparent_70%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100"
        style={{ backgroundImage: HOVER_LIGHT }}
      />

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-xs text-brand-cyan/80">{item.number}</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-fg-muted/80">
          {item.label}
        </span>
      </div>

      <div className="relative mt-5 flex size-11 items-center justify-center overflow-hidden rounded-control border border-line bg-white/[0.04] text-fg/65 transition-[color,box-shadow,background-color,border-color] duration-300 ease-premium group-hover:border-line-strong group-hover:bg-white/10 group-hover:text-fg group-hover:shadow-[0_0_22px_-4px_rgb(139_92_246/0.55)]">
        <IconWrap {...iconProps} className="flex">
          <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
        </IconWrap>
        {item.motion === 'scan' && !reduceMotion && (
          <motion.span
            aria-hidden="true"
            variants={{
              rest: { opacity: 0, y: -16 },
              hover: { opacity: [0, 1, 0], y: [-16, 16], transition: { duration: 0.9, ease: 'easeInOut' } },
            }}
            className="absolute inset-x-1 h-px bg-brand-cyan shadow-[0_0_6px_rgb(34_211_238/0.9)]"
          />
        )}
      </div>

      <h3 className="relative mt-4 font-display text-2xl font-semibold tracking-tight text-fg/90 transition-colors duration-300 group-hover:text-fg">
        {item.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-fg-muted">{item.description}</p>

      <div className="relative mt-auto flex items-end justify-between gap-3 pt-5">
        <ul className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-line px-2.5 py-0.5 text-[11px] text-fg-muted/70 transition-colors duration-300 group-hover:border-line-strong group-hover:text-fg-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <Arrow
          size={16}
          aria-hidden="true"
          className="shrink-0 text-fg/25 transition-colors duration-300 group-hover:text-brand-cyan/80"
        />
      </div>
    </Wrapper>
  )
}
