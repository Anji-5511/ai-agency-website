import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  Check,
  CircleCheck,
  GitBranch,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import SectionBackground from '../ui/SectionBackground'
import SectionHeading from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { EASE } from '../../lib/motion'

const STAGES = [
  { id: 'goal', number: '01', title: 'Goal', icon: Target, description: 'The agent receives an objective, request, or business task.', example: '“Reduce customer response time.”' },
  { id: 'understand', number: '02', title: 'Understand', icon: BrainCircuit, description: 'The system interprets intent, context, available information, and constraints.', example: 'Context + Intent' },
  { id: 'reason', number: '03', title: 'Reason', icon: GitBranch, description: 'The agent breaks the objective into logical steps and determines the best path forward.', example: 'Plan → Prioritize → Decide' },
  { id: 'tools', number: '04', title: 'Use Tools', icon: Wrench, description: 'The agent accesses APIs, databases, applications, documents, and external systems when needed.', example: 'APIs + Data + Systems' },
  { id: 'execute', number: '05', title: 'Execute', icon: Zap, description: 'The agent performs actions, coordinates workflows, and moves the task toward completion.', example: 'Action in progress' },
  { id: 'learn', number: '06', title: 'Learn', icon: RotateCcw, description: 'The system incorporates feedback and results to adapt its next step.', example: 'Observe → Adapt' },
  { id: 'outcome', number: '07', title: 'Outcome', icon: CircleCheck, description: 'The system delivers a useful result while keeping humans informed and in control.', example: 'Task completed' },
]

const EXAMPLE_STEPS = [
  'Understand customer context',
  'Search support history',
  'Analyze sentiment',
  'Check account signals',
  'Prioritize risks',
  'Notify support team',
]

function WorkflowStage({
  stage,
  index,
  activeIndex,
  onSelect,
  reducedMotion,
  className = '',
  mobileConnector = false,
  tabletConnector = false,
}) {
  const Icon = stage.icon
  const active = activeIndex === index
  const complete = activeIndex > index

  return (
    <motion.li
      layout={!reducedMotion}
      className={`relative min-w-0 ${mobileConnector && index < STAGES.length - 1 ? 'pb-3' : ''} ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: EASE, delay: reducedMotion ? 0 : index * 0.07 }}
    >
      <button
        type="button"
        onClick={() => onSelect(index)}
        aria-pressed={active}
        aria-label={`${stage.number} ${stage.title}: ${stage.description}`}
        className={`group relative flex min-h-[10.5rem] w-full flex-col items-start rounded-xl border p-4 text-left transition-[background-color,border-color,transform] duration-300 ease-premium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan sm:p-5 xl:min-h-[15rem] xl:border-transparent xl:bg-transparent xl:p-3 ${
          active
            ? 'border-brand-blue/30 bg-ink-900/75 shadow-[0_0_30px_-22px_rgb(79_124_255/0.6)] xl:border-transparent xl:bg-transparent xl:shadow-none'
            : 'border-line bg-ink-900/45 hover:-translate-y-0.5 hover:border-line-strong hover:bg-ink-900/70 xl:border-transparent xl:bg-transparent xl:hover:translate-y-0 xl:hover:border-transparent xl:hover:bg-white/[0.02]'
        }`}
      >
        <span className="flex w-full items-center justify-between gap-2">
          <span className={`font-mono text-[10px] tracking-wider transition-colors ${active ? 'text-brand-cyan' : 'text-fg-subtle'}`}>{stage.number}</span>
          <span className={`text-[9px] font-medium uppercase tracking-[0.12em] ${active ? 'text-brand-cyan/85' : 'text-fg-subtle/65'}`}>
            {complete ? 'Complete' : active ? 'Active' : 'Stage'}
          </span>
        </span>
        <motion.span
          animate={{
            color: active ? 'rgb(34 211 238)' : complete ? 'rgb(161 167 182)' : 'rgb(111 117 134)',
            borderColor: active ? 'rgb(34 211 238 / 0.35)' : 'rgb(255 255 255 / 0.08)',
            backgroundColor: active ? 'rgb(79 124 255 / 0.1)' : 'rgb(255 255 255 / 0.025)',
            boxShadow: active ? '0 0 22px -10px rgb(34 211 238 / 0.6)' : '0 0 0 transparent',
          }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
          className="mt-4 flex size-10 items-center justify-center rounded-lg border"
        >
          {complete ? <Check size={17} aria-hidden="true" /> : <Icon size={18} aria-hidden="true" />}
        </motion.span>
        <span className={`mt-3 font-display text-sm font-semibold transition-colors sm:text-base ${active ? 'text-fg' : 'text-fg/80 group-hover:text-fg'}`}>{stage.title}</span>
        <span className={`mt-2 text-[11px] leading-relaxed transition-colors sm:text-xs ${active ? 'text-fg-muted' : 'text-fg-subtle group-hover:text-fg-muted'}`}>{stage.description}</span>
        <span className={`mt-auto pt-3 font-mono text-[9px] leading-relaxed transition-colors ${active ? 'text-brand-cyan/80' : 'text-fg-subtle/60'}`}>{stage.example}</span>
      </button>
      {mobileConnector && index < STAGES.length - 1 && (
        <span aria-hidden="true" className={`absolute bottom-0 left-[1.3rem] z-10 translate-y-1/2 md:hidden ${complete || active ? 'text-brand-cyan/65' : 'text-fg-subtle/45'}`}>
          <ArrowDown size={13} />
        </span>
      )}
      {tabletConnector && (
        <span
          aria-hidden="true"
          className={`absolute z-20 hidden items-center justify-center text-fg-subtle/50 md:flex xl:hidden ${
            index === 3
              ? 'left-1/2 top-full h-7 -translate-x-1/2'
              : index < 3
                ? 'right-[-0.65rem] top-[2.8rem]'
                : 'left-[-0.65rem] top-[2.8rem] rotate-180'
          } ${complete || active ? 'text-brand-cyan/65' : ''}`}
        >
          {index === 3 ? <ArrowDown size={13} /> : <ArrowRight size={13} />}
        </span>
      )}
    </motion.li>
  )
}

function WorkflowTrack({ reducedMotion }) {
  const [inView, setInView] = useState(false)
  const [running, setRunning] = useState(true)
  const [current, setCurrent] = useState(0)
  const trackRef = useRef(null)

  useEffect(() => {
    const node = trackRef.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '120px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!running || !inView || reducedMotion) return undefined
    const timer = window.setInterval(() => setCurrent((step) => (step + 1) % STAGES.length), 1650)
    return () => window.clearInterval(timer)
  }, [inView, reducedMotion, running])

  const selectedIndex = current
  const selectStage = (index) => {
    setRunning(false)
    setCurrent(index)
  }
  const selected = STAGES[selectedIndex]
  const SelectedIcon = selected.icon

  return (
    <div ref={trackRef} className="relative mt-12 overflow-hidden rounded-2xl border border-line-strong bg-ink-900/65 p-4 shadow-[0_30px_100px_-55px_rgb(0_0_0/0.9)] backdrop-blur-xl sm:p-6 lg:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(79_124_255/0.08),transparent_48%),radial-gradient(ellipse_at_50%_100%,rgb(139_92_246/0.05),transparent_50%)]" />

      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <Sparkles size={15} aria-hidden="true" className="text-brand-cyan/80" />
          <span className="text-[10px] font-medium uppercase tracking-[0.17em] text-fg-muted">Agent orchestration</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.1em] text-fg-subtle">
            <span className={`size-1.5 rounded-full ${running && !reducedMotion ? 'bg-brand-cyan' : 'bg-fg-subtle'}`} />
            {running && !reducedMotion ? 'AGENT ACTIVE' : 'WORKFLOW READY'}
          </span>
          <button
            type="button"
            onClick={() => { setRunning((value) => !value); if (!running) setCurrent(0) }}
            aria-label={running ? 'Pause autonomous workflow simulation' : 'Resume autonomous workflow simulation'}
            className="flex size-8 items-center justify-center rounded-md border border-line bg-white/[0.025] text-fg-muted transition-colors hover:border-line-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
          >
            {running ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="relative mt-5 xl:mt-7">
        <span aria-hidden="true" className="absolute bottom-8 left-[1.3rem] top-8 w-px bg-line md:hidden" />
        <span aria-hidden="true" className="absolute left-[7%] right-[7%] top-[2.85rem] hidden h-px bg-line xl:block" />
        <motion.span
          aria-hidden="true"
          className="absolute left-[7%] top-[calc(2.85rem-2px)] z-10 hidden size-1 rounded-full bg-brand-cyan shadow-[0_0_8px_rgb(34_211_238/0.8)] xl:block"
          animate={reducedMotion ? { opacity: 0 } : { left: `${7 + (selectedIndex / (STAGES.length - 1)) * 86}%`, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: EASE }}
        />
        <ol aria-label="Autonomous agent workflow" className="relative grid gap-2 md:grid-cols-4 md:gap-x-3 md:gap-y-8 xl:grid-cols-7 xl:gap-1">
          {STAGES.map((stage, index) => {
            const tabletPosition =
              index === 4 ? 'md:col-start-4' : index === 5 ? 'md:col-start-3' : index === 6 ? 'md:col-start-2' : ''
            return (
              <WorkflowStage
                key={stage.id}
                stage={stage}
                index={index}
                activeIndex={selectedIndex}
                onSelect={selectStage}
                reducedMotion={reducedMotion}
                className={tabletPosition}
                mobileConnector
                tabletConnector
              />
            )
          })}
        </ol>
      </div>

      <div className="relative mt-5 grid gap-4 border-t border-line pt-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-fg-subtle">Human control checkpoint</p>
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:gap-3">
          <span className="text-fg-muted">Agent proposes action</span>
          <ArrowRight size={12} aria-hidden="true" className="text-fg-subtle" />
          <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-violet/20 bg-brand-violet/[0.05] px-2 py-1 text-fg-muted"><ShieldCheck size={12} aria-hidden="true" className="text-brand-cyan/80" />Human approval</span>
          <ArrowRight size={12} aria-hidden="true" className="text-fg-subtle" />
          <span className="text-fg-muted">Agent executes</span>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={selected.id} initial={reducedMotion ? false : { opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }} className="flex items-center gap-2 text-xs text-fg-subtle md:justify-end">
            <SelectedIcon size={13} aria-hidden="true" className="text-brand-cyan/70" />
            Current stage: <span className="text-fg-muted">{selected.title}</span>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

function ExampleJourney() {
  return (
    <Reveal delay={0.25}>
      <div className="mt-8 border-t border-line pt-6 sm:mt-10 sm:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.17em] text-fg-subtle">Customer support agent</p>
          <p className="max-w-xl text-xs leading-relaxed text-fg-muted">“Find unresolved customer issues and prioritize the ones most likely to churn.”</p>
        </div>
        <ol className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {EXAMPLE_STEPS.map((step, index) => (
            <li key={step} className="flex min-h-10 items-center gap-2.5 border-l border-line pl-3 text-[11px] text-fg-muted">
              <span className="font-mono text-[9px] text-brand-cyan/65">0{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  )
}

export default function AgentWorkflowSection() {
  const reducedMotion = useReducedMotion()

  return (
    <SectionBackground id="agent-workflow" variant="workflow" aria-labelledby="agent-workflow-heading" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="AI AGENTS"
          title="From intention to action."
          description="Our AI agents don't just answer questions. They understand goals, reason through complexity, use the right tools, and execute workflows that move work forward."
          headingId="agent-workflow-heading"
        />
        <Reveal delay={0.4}>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-fg-subtle">Autonomous intelligence <span className="px-2 text-brand-cyan/55">/</span> Human control</p>
        </Reveal>
        <WorkflowTrack reducedMotion={reducedMotion} />
        <ExampleJourney />
      </div>
    </SectionBackground>
  )
}
