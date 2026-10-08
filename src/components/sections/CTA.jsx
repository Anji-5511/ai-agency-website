import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import SectionBackground from '../ui/SectionBackground'
import { Reveal } from '../ui/Reveal'
import { EASE } from '../../lib/motion'

function CTAVisual({ reducedMotion }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[22rem] w-full max-w-5xl -translate-y-1/2 sm:h-[27rem]"
    >
      <svg
        viewBox="0 0 1000 450"
        fill="none"
        className="absolute inset-0 size-full opacity-45 transition-opacity duration-300 group-hover/cta:opacity-70"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="cta-line-a" x1="120" y1="90" x2="500" y2="225" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4f7cff" stopOpacity=".08" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity=".32" />
          </linearGradient>
          <linearGradient id="cta-line-b" x1="880" y1="90" x2="500" y2="225" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5cf6" stopOpacity=".08" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity=".3" />
          </linearGradient>
        </defs>
        <path d="M90 80C245 80 280 160 500 225" stroke="url(#cta-line-a)" />
        <path d="M910 80C755 80 720 160 500 225" stroke="url(#cta-line-b)" />
        <path d="M70 350C240 350 330 270 500 225" stroke="url(#cta-line-b)" />
        <path d="M930 350C760 350 670 270 500 225" stroke="url(#cta-line-a)" />
        <path d="M500 35V415" stroke="white" strokeOpacity=".035" strokeDasharray="2 10" />
        <circle cx="90" cy="80" r="2" fill="#4f7cff" fillOpacity=".4" />
        <circle cx="910" cy="80" r="2" fill="#8b5cf6" fillOpacity=".4" />
        <circle cx="70" cy="350" r="2" fill="#22d3ee" fillOpacity=".35" />
        <circle cx="930" cy="350" r="2" fill="#4f7cff" fillOpacity=".35" />
      </svg>
      <motion.span
        animate={reducedMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
        className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-brand-cyan/20 bg-ink-900/70 text-brand-cyan/75 shadow-[0_0_70px_-32px_rgb(79_124_255/0.55)] backdrop-blur-sm sm:size-16"
      >
        <Sparkles size={21} strokeWidth={1.5} />
      </motion.span>
      <span className="absolute left-[9%] top-[17%] hidden font-mono text-[9px] uppercase tracking-[0.16em] text-fg-subtle/45 sm:block">Ideas</span>
      <span className="absolute right-[9%] top-[17%] hidden font-mono text-[9px] uppercase tracking-[0.16em] text-fg-subtle/45 sm:block">Data</span>
      <span className="absolute bottom-[13%] left-[7%] hidden font-mono text-[9px] uppercase tracking-[0.16em] text-fg-subtle/45 sm:block">Systems</span>
      <span className="absolute bottom-[13%] right-[7%] hidden font-mono text-[9px] uppercase tracking-[0.16em] text-fg-subtle/45 sm:block">Outcomes</span>
    </div>
  )
}

function CTAButtons({ onOpenContact }) {
  return (
    <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-7">
      <motion.a
        href="mailto:hello@aiagency.com"
        onClick={(event) => { event.preventDefault(); onOpenContact() }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="group/button inline-flex min-h-12 items-center justify-center gap-3 rounded-control border border-white/75 bg-fg px-6 py-3 text-sm font-semibold text-ink-950 shadow-[0_0_35px_-20px_rgb(34_211_238/0.55)] transition-[background-color,box-shadow] duration-250 hover:bg-white hover:shadow-[0_0_42px_-18px_rgb(79_124_255/0.65)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan"
      >
        Start a conversation
        <ArrowUpRight size={17} aria-hidden="true" className="transition-transform duration-250 group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
      </motion.a>
      <a
        href="#capabilities"
        className="group/link inline-flex min-h-11 items-center justify-center gap-2 px-2 text-sm font-medium text-fg-muted transition-colors duration-200 hover:text-fg focus-visible:rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan"
      >
        Explore our capabilities
        <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-1" />
      </a>
    </div>
  )
}

export default function CTASection({ onOpenContact }) {
  const reducedMotion = useReducedMotion()

  return (
    <SectionBackground
      id="contact"
      variant="cta"
      aria-labelledby="cta-heading"
      className="group/cta relative flex min-h-[min(90vh,900px)] items-center py-24 md:py-28"
    >
      <div className="container-page relative z-10 flex w-full flex-col items-center text-center">
        <Reveal variant="scale" className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[22rem] w-full max-w-5xl -translate-y-1/2 sm:h-[27rem]">
          <CTAVisual reducedMotion={reducedMotion} />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-cyan/85">Start Building</p>
        </Reveal>
        <Reveal delay={0.16}>
          <h2
            id="cta-heading"
            className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-fg sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Let&apos;s build what&apos;s next.
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-base md:text-lg">
            Have an ambitious idea, a complex workflow, or a business problem that AI could transform? Let&apos;s turn it into something real.
          </p>
        </Reveal>
        <Reveal delay={0.34}>
          <CTAButtons onOpenContact={onOpenContact} />
        </Reveal>
        <Reveal delay={0.48}>
          <p className="mt-10 text-[9px] font-medium uppercase tracking-[0.17em] text-fg-subtle sm:text-[10px]">
            AI Product <span className="px-1.5 text-brand-violet/60">•</span> Agents <span className="px-1.5 text-brand-violet/60">•</span> Automation <span className="px-1.5 text-brand-violet/60">•</span> Intelligent Systems
          </p>
        </Reveal>
        <Reveal delay={0.55}>
          <p className="mt-3 text-xs text-fg-subtle/80">Tell us what you&apos;re building.</p>
        </Reveal>
      </div>
    </SectionBackground>
  )
}
