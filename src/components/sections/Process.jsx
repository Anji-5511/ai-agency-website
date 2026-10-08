import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  Code2,
  PenTool,
  PlugZap,
  Search,
  Target,
  TrendingUp,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import SectionBackground from '../ui/SectionBackground'
import SectionHeading from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { EASE } from '../../lib/motion'

const PROCESS_STAGES = [
  {
    id: 'discover', number: '01', title: 'Discover', icon: Search,
    description: 'We understand the business problem, users, workflows, data, and opportunities where AI can create meaningful value.',
    label: 'Understand the opportunity', meta: ['Business Goals', 'Users', 'Data', 'Constraints'],
    detailTitle: 'Understand the opportunity',
    detail: 'We work with your team to understand the business problem, the people it affects, and the context around it. This gives us a grounded view of where intelligent systems can make a meaningful difference.',
    outputs: ['Opportunity map', 'User and workflow insights', 'Data landscape', 'Constraints'],
    outcome: 'A clearly understood problem worth solving.',
  },
  {
    id: 'define', number: '02', title: 'Define', icon: Target,
    description: 'We turn the opportunity into a clear product direction, technical architecture, AI strategy, and measurable definition of success.',
    label: 'Turn opportunity into direction', meta: ['Strategy', 'Architecture', 'Success Metrics'],
    detailTitle: 'Give the opportunity a direction',
    detail: 'We shape the opportunity into a practical product and AI strategy. The team aligns on architecture, scope, measures of success, and a plan that can move confidently into design.',
    outputs: ['Product direction', 'AI strategy', 'Technical architecture', 'Success measures'],
    outcome: 'A shared plan with a measurable definition of success.',
  },
  {
    id: 'design', number: '03', title: 'Design', icon: PenTool,
    description: 'We design the experience, intelligence layer, workflows, and interaction model before moving into full implementation.',
    label: 'Design the intelligent experience', meta: ['UX', 'AI Interaction', 'Workflows'],
    detailTitle: 'Design the intelligent experience',
    detail: 'We design how people and AI work together across the product. Product flows, interaction patterns, and prototypes make the experience tangible before full implementation begins.',
    outputs: ['Product flows', 'AI interaction model', 'Technical specification', 'Prototype'],
    outcome: 'A validated experience ready for engineering.',
  },
  {
    id: 'build', number: '04', title: 'Build', icon: Code2,
    description: 'We engineer the AI models, applications, agents, automations, APIs, and infrastructure required to bring the system to life.',
    label: 'Engineer the system', meta: ['AI', 'Software', 'Infrastructure'],
    detailTitle: 'Engineering the intelligence',
    detail: 'We turn the validated concept into a working system by combining AI models, application logic, APIs, data infrastructure, and production-ready engineering.',
    outputs: ['AI architecture', 'Production application', 'Model integration', 'Testing & evaluation'],
    outcome: 'A working intelligent system ready for real-world integration.',
  },
  {
    id: 'integrate', number: '05', title: 'Integrate', icon: PlugZap,
    description: 'We connect intelligence with the tools, data, applications, and operational systems your business already relies on.',
    label: 'Connect intelligence to reality', meta: ['APIs', 'Data', 'Systems'],
    detailTitle: 'Connect intelligence to the business',
    detail: 'We bring the new system into the tools and workflows your teams already depend on. Thoughtful integration keeps data moving securely and makes intelligent capabilities useful in day-to-day operations.',
    outputs: ['API connections', 'Data pathways', 'Operational workflows', 'Deployment plan'],
    outcome: 'A connected system that works in its real environment.',
  },
  {
    id: 'scale', number: '06', title: 'Scale', icon: TrendingUp,
    description: 'We continuously evaluate, optimize, monitor, and improve the system so it becomes more reliable and valuable over time.',
    label: 'Improve continuously', meta: ['Evaluate', 'Optimize', 'Grow'],
    detailTitle: 'Improve continuously',
    detail: 'After launch, we measure how the system performs and learn from real use. Evaluation, monitoring, and focused optimization help it become more reliable and valuable as needs evolve.',
    outputs: ['Evaluation loop', 'Performance monitoring', 'Model optimization', 'Growth roadmap'],
    outcome: 'An intelligent system that improves with use.',
  },
]

function ProcessStage({
  stage,
  index,
  selected,
  onSelect,
  reducedMotion,
  className = '',
}) {
  const Icon = stage.icon
  const complete = selected && index < selected.index
  const active = selected?.index === index
  return (
    <motion.li
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.07, ease: EASE }}
      className={`relative min-w-0 ${className}`}
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-pressed={selected?.index === index}
        aria-label={`${stage.number} ${stage.title}: ${stage.description}`}
        className={`group relative flex min-h-[8.5rem] w-full flex-col items-start p-2 text-left transition-transform duration-300 ease-premium hover:-translate-y-1 focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan sm:min-h-[9.5rem] xl:min-h-[12.5rem] ${selected && !active ? 'xl:opacity-70' : ''}`}
      >
        <span className="flex w-full items-center justify-between">
          <span className={`font-mono text-xs transition-colors duration-300 ${active ? 'text-brand-cyan' : 'text-fg-subtle group-hover:text-fg-muted'}`}>{stage.number}</span>
          <span className={`text-[9px] font-medium uppercase tracking-[0.14em] ${active ? 'text-brand-cyan/80' : 'text-fg-subtle/60'}`}>{active ? 'Selected' : complete ? 'Complete' : 'Stage'}</span>
        </span>
        <motion.span
          animate={{
            color: active ? 'rgb(34 211 238)' : 'rgb(161 167 182)',
            borderColor: active ? 'rgb(34 211 238 / 0.3)' : 'rgb(255 255 255 / 0.08)',
            boxShadow: active ? '0 0 22px -10px rgb(34 211 238 / 0.55)' : '0 0 0 transparent',
          }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
          className="mt-3 flex size-10 items-center justify-center rounded-full border"
        >
          <Icon size={17} aria-hidden="true" />
        </motion.span>
        <span className={`mt-3 font-display text-sm font-semibold transition-colors duration-300 ${active ? 'text-fg' : 'text-fg/85 group-hover:text-fg'}`}>{stage.title}</span>
        <span className={`mt-1.5 text-[10px] leading-relaxed sm:text-[11px] ${active ? 'text-fg-muted' : 'text-fg-subtle'}`}>{stage.description}</span>
        <span className="mt-auto flex flex-wrap gap-x-2 gap-y-1 pt-3">
          {stage.meta.map((item) => <span key={item} className="text-[9px] text-fg-subtle/70">{item}</span>)}
        </span>
      </button>
      {index < PROCESS_STAGES.length - 1 && (
        <>
          <span aria-hidden="true" className={`absolute -bottom-3 left-[1.05rem] z-10 translate-y-1/2 md:hidden ${active || complete ? 'text-brand-cyan/65' : 'text-fg-subtle/40'}`}>
            <ArrowDown size={13} />
          </span>
          <span aria-hidden="true" className={`absolute z-20 hidden items-center text-fg-subtle/45 md:flex xl:hidden ${index === 2 ? 'left-1/2 top-full h-7 -translate-x-1/2' : index < 2 ? 'right-[-0.75rem] top-[2.7rem]' : 'left-[-0.75rem] top-[2.7rem] rotate-180'} ${active || complete ? 'text-brand-cyan/65' : ''}`}>
            {index === 2 ? <ArrowDown size={13} /> : <ArrowRight size={13} />}
          </span>
        </>
      )}
    </motion.li>
  )
}

function ProcessJourney({ selected, onSelect, reducedMotion }) {
  const [inView, setInView] = useState(false)
  const trackRef = useRef(null)

  useEffect(() => {
    const element = trackRef.current
    if (!element) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '100px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={trackRef} className="relative mt-14">
      <div className="relative flex items-center justify-between gap-3 border-b border-line/70 pb-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-fg-muted">Connected transformation journey</p>
        <p className="font-mono text-[9px] tracking-[0.12em] text-fg-subtle">01 — 06</p>
      </div>

      <div className="relative mt-5 xl:mt-7">
        <span aria-hidden="true" className="absolute bottom-8 left-[1.3rem] top-8 w-px bg-line md:hidden" />
        <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-[2.65rem] hidden h-px bg-line xl:block" />
        {!reducedMotion && inView && (
          <motion.span
            aria-hidden="true"
            className="absolute left-[8%] top-[calc(2.65rem-1px)] z-10 hidden h-[2px] w-8 rounded-full bg-linear-to-r from-transparent via-brand-cyan to-transparent shadow-[0_0_7px_rgb(34_211_238/0.5)] xl:block"
            animate={{ left: ['8%', '90%'] }}
            transition={{ duration: 7, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
        <ol aria-label="Six-stage agency process" className="relative grid gap-2 md:grid-cols-3 md:gap-x-4 md:gap-y-7 xl:grid-cols-6 xl:gap-1">
          {PROCESS_STAGES.map((stage, index) => {
            const tabletPosition =
              index === 3 ? 'md:col-start-3' : index === 4 ? 'md:col-start-2' : index === 5 ? 'md:col-start-1' : ''
            return (
              <ProcessStage
                key={stage.id}
                stage={stage}
                index={index}
                selected={selected}
                onSelect={onSelect}
                reducedMotion={reducedMotion}
                className={tabletPosition}
              />
            )
          })}
        </ol>
        <div className="pointer-events-none absolute bottom-5 left-1/2 hidden h-px w-[58%] -translate-x-1/2 bg-linear-to-r from-brand-cyan/25 via-brand-violet/30 to-brand-blue/25 md:block xl:hidden" />
        <div className="pointer-events-none absolute bottom-5 left-[16%] hidden h-px w-[68%] bg-linear-to-r from-brand-cyan/20 via-brand-violet/25 to-brand-blue/20 xl:hidden" />
      </div>

      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
        <span className="text-[9px] uppercase tracking-[0.15em] text-fg-subtle">Current stage</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={selected.id}
            initial={reducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -3 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
            className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-cyan/85"
          >
            STEP {selected.stage.number} / 06 <ArrowRight size={12} aria-hidden="true" /> {selected.stage.title}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

function ProcessDetails({ stage, reducedMotion }) {
  return (
    <div className="mt-7 border-t border-line px-1 pt-6 sm:mt-9 sm:pt-8">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stage.id}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
          className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.17em] text-brand-cyan/80">{stage.label}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{stage.detailTitle}</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">{stage.detail}</p>
          </div>
          <div className="flex flex-col justify-center gap-5">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-fg-subtle">Typical outputs</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {stage.outputs.map((output) => <li key={output} className="rounded-md border border-line px-2.5 py-1 text-[10px] text-fg-muted">{output}</li>)}
              </ul>
            </div>
            <p className="flex items-start gap-2 border-l border-brand-cyan/35 pl-3 text-xs leading-relaxed text-fg/80"><Check size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-cyan/75" />{stage.outcome}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function ProcessSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const selected = { index: selectedIndex, stage: PROCESS_STAGES[selectedIndex] }

  return (
    <SectionBackground id="process" variant="process" aria-labelledby="process-heading" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="From first idea to intelligent system."
          description="We combine strategy, product thinking, AI engineering, and continuous iteration to move ideas from possibility to production."
          headingId="process-heading"
        />
        <Reveal delay={0.4}>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.16em] text-fg-subtle">Discover <span className="px-1.5 text-brand-cyan/50">/</span> Define <span className="px-1.5 text-brand-cyan/50">/</span> Design <span className="px-1.5 text-brand-cyan/50">/</span> Build <span className="px-1.5 text-brand-cyan/50">/</span> Integrate <span className="px-1.5 text-brand-cyan/50">/</span> Scale</p>
        </Reveal>
        <ProcessJourney selected={selected} onSelect={setSelectedIndex} reducedMotion={reducedMotion} />
        <ProcessDetails stage={selected.stage} reducedMotion={reducedMotion} />
      </div>
    </SectionBackground>
  )
}
