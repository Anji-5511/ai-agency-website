import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Compass, Layers, Rocket } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'
import SectionBackground from '../ui/SectionBackground'
import { RevealGroup, RevealItem } from '../ui/Reveal'

// Capability tiles. Each one is a stage of the same pipeline: strategy -> build -> launch.
// `offset` staggers the tiles to the right on large screens.
const STAGES = [
  {
    number: '01',
    title: 'Product Strategy',
    description: 'Discovery, roadmaps and technical scoping before a line of code.',
    tags: ['Discovery', 'Roadmap', 'MVP'],
    icon: Compass,
    offset: 'lg:[--offset:0rem]',
  },
  {
    number: '02',
    title: 'Design & Engineering',
    description: 'Interfaces and systems built together, from UI/UX to backend.',
    tags: ['UI/UX', 'Web & Mobile', 'AI'],
    icon: Layers,
    offset: 'lg:[--offset:2.5rem]',
  },
  {
    number: '03',
    title: 'Launch & Scale',
    description: 'Cloud deployment and ongoing engineering that grows with you.',
    tags: ['Cloud', 'Backend', 'Enterprise'],
    icon: Rocket,
    offset: 'lg:[--offset:5rem]',
  },
]

const SLOW_FLOAT = { duration: 9, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatType: 'mirror' }

export default function Hero() {
  const reduceMotion = useReducedMotion()

  // Decorative layers drift at different speeds while scrolling, which adds depth.
  const { scrollY } = useScroll()
  const plateY = useTransform(scrollY, [0, 600], [0, -36])
  const ringY = useTransform(scrollY, [0, 600], [0, -90])
  const stackY = useTransform(scrollY, [0, 600], [0, -18])

  return (
    <SectionBackground
      variant="hero"
      aria-labelledby="hero-heading"
      className="flex min-h-svh items-center pb-16 pt-28 md:pt-32"
    >
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 xl:gap-16">
        {/* Left: message */}
        <RevealGroup stagger={0.12} className="max-w-2xl">
          <RevealItem>
            <Badge className="tracking-[0.2em]">BUILD • SCALE • INNOVATE</Badge>
          </RevealItem>

     
        <RevealItem
  as="h1"
  id="hero-heading"
  className="mt-7 text-[2.5rem] font-semibold leading-[1.02] tracking-tight text-fg sm:text-[2rem] lg:text-[2rem] xl:text-[3rem]"
>
  <span className="block">Build Smarter.</span>
  <span className="block bg-linear-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
    Scale Faster.
  </span>
</RevealItem> 

          <RevealItem as="p" className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted md:text-xl">
            We design and build high-performance software that turns ambitious ideas into products
            people love to use.
          </RevealItem>

          <RevealItem className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#contact" variant="solid" size="lg" className="w-full sm:w-auto">
              Start a Project
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href="#ai-demo" variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Our Work
            </Button>
          </RevealItem>

          <RevealItem
            as="p"
            className="mt-12 max-w-md border-l border-line-strong pl-4 text-sm leading-relaxed text-fg-muted"
          >
            From strategy and product design to development and deployment, we build reliable
            digital products engineered for growth.
          </RevealItem>
        </RevealGroup>

        {/* Right: the product pipeline */}
        <div className="relative">
          {/* Blueprint plate behind the tiles */}
          <motion.div
            aria-hidden="true"
            style={{ y: reduceMotion ? 0 : plateY }}
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 hidden rounded-2xl border border-line bg-white/[0.015] md:block"
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundImage:
                  'linear-gradient(rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
              }}
            />
            <div className="absolute inset-x-5 top-4 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-white/15" />
              <span className="size-1.5 rounded-full bg-white/15" />
              <span className="size-1.5 rounded-full bg-white/15" />
            </div>
          </motion.div>

          {/* Slowly floating ring */}
          <motion.div
            aria-hidden="true"
            style={{ y: reduceMotion ? 0 : ringY }}
            className="pointer-events-none absolute -right-8 -top-12 hidden lg:block"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10] }}
              transition={SLOW_FLOAT}
              className="size-44 rounded-full border border-brand-cyan/20"
            >
              <div className="m-5 size-[calc(100%-2.5rem)] rounded-full border border-dashed border-brand-blue/20" />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: reduceMotion ? 0 : stackY }} className="relative">
            <RevealGroup as="ol" stagger={0.18} aria-label="How we work" className="relative">
              {/* Pipeline line */}
              <span
                aria-hidden="true"
                className="absolute bottom-8 left-[5px] top-8 w-px bg-linear-to-b from-brand-blue/60 via-brand-cyan/30 to-transparent"
              />
              {STAGES.map((stage) => {
                const Icon = stage.icon
                return (
                  <RevealItem
                    as="li"
                    key={stage.number}
                    className={`relative pb-4 pl-8 last:pb-0 [--offset:0rem] ${stage.offset}`}
                  >
                    {/* Node and connector on the pipeline */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[1.65rem] size-[11px] rounded-full border border-brand-cyan/70 bg-ink-950"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-[11px] top-[calc(1.65rem+5px)] hidden h-px bg-linear-to-r from-brand-cyan/40 to-line lg:block"
                      style={{ width: 'calc(1.25rem + var(--offset))' }}
                    />
                    <Card className="p-5 lg:ml-(--offset)">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-brand-cyan">{stage.number}</span>
                          <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
                          <p className="font-display text-lg font-medium tracking-tight text-fg">
                            {stage.title}
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="flex size-8 shrink-0 items-center justify-center rounded-control border border-line bg-white/5 text-fg-muted"
                        >
                          <Icon size={16} />
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{stage.description}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {stage.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md border border-line px-2.5 py-0.5 text-xs text-fg-muted"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </motion.div>
        </div>
      </div>
    </SectionBackground>
  )
}
