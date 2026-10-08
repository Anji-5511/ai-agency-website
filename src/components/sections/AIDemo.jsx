import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  AudioLines,
  BrainCircuit,
  Check,
  Database,
  Search,
  Sparkles,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import SectionBackground from '../ui/SectionBackground'
import SectionHeading from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { EASE } from '../../lib/motion'

const DEMOS = [
  {
    id: 'analyze',
    label: 'Analyze data',
    prompt: 'Analyze our customer support data and identify the biggest opportunities to improve response time.',
    summary: 'Analysis complete',
    insights: [
      {
        title: 'Bottleneck identified',
        detail: '42% of incoming requests wait over 4 hours for initial triage.',
      },
      {
        title: 'Pattern detected',
        detail: 'Order-status questions account for the largest repeat-contact volume.',
      },
      {
        title: 'Recommended next step',
        detail: 'Automate intent routing and surface order context before agent handoff.',
      },
    ],
    stages: ['understand', 'reason', 'connect', 'act'],
    status: ['Context understood', '4 sources analyzed', '3 opportunities identified', 'Action ready'],
  },
  {
    id: 'opportunities',
    label: 'Find opportunities',
    prompt: 'Review our internal knowledge base and find the highest-value opportunities to help our teams work faster.',
    summary: 'Opportunity map ready',
    insights: [
      {
        title: 'Knowledge gap found',
        detail: 'Support guidance is spread across 4 sources with overlapping answers.',
      },
      {
        title: 'High-value opportunity',
        detail: 'A grounded assistant could resolve common policy questions at first contact.',
      },
      {
        title: 'Recommended next step',
        detail: 'Unify approved guidance and connect it to a source-aware retrieval workflow.',
      },
    ],
    stages: ['understand', 'reason', 'connect'],
    status: ['Knowledge understood', '4 sources connected', '3 opportunities identified', 'Plan ready'],
  },
  {
    id: 'automate',
    label: 'Automate workflow',
    prompt: 'Map our customer onboarding workflow and recommend where intelligent automation can remove manual handoffs.',
    summary: 'Workflow mapped',
    insights: [
      {
        title: 'Handoff identified',
        detail: 'Customer details are re-entered between intake, verification, and account setup.',
      },
      {
        title: 'Automation opportunity',
        detail: 'Document extraction can prepare a verified record for a human review step.',
      },
      {
        title: 'Recommended next step',
        detail: 'Connect intake and verification systems, with approval kept in the loop.',
      },
    ],
    stages: ['understand', 'reason', 'connect', 'act'],
    status: ['Workflow understood', '3 steps mapped', '2 handoffs reduced', 'Review ready'],
  },
]

const WORKFLOW_STAGES = [
  { id: 'understand', label: 'Understand', icon: Search },
  { id: 'reason', label: 'Reason', icon: BrainCircuit },
  { id: 'connect', label: 'Connect', icon: Database },
  { id: 'act', label: 'Act', icon: Zap },
]

const EXPLORATION = [
  { label: 'Intent', value: 'Support requests', icon: AudioLines },
  { label: 'Sources', value: '4 connected', icon: Database },
  { label: 'Signals', value: '12 patterns', icon: Activity },
]

function WorkflowMap({ activeStages, reducedMotion }) {
  return (
    <aside aria-label="AI workflow progress" className="rounded-xl border border-line bg-ink-950/45 p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-fg-muted">Intelligence flow</p>
        <span className="flex items-center gap-2 text-[10px] font-medium tracking-[0.12em] text-brand-cyan/90">
          <span className="relative flex size-1.5">
            {!reducedMotion && <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-cyan/50" />}
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-cyan" />
          </span>
          AI SYSTEM ACTIVE
        </span>
      </div>

      <ol className="mt-7 space-y-0">
        {WORKFLOW_STAGES.map((stage, index) => {
          const Icon = stage.icon
          const stagePosition = activeStages.indexOf(stage.id)
          const active = stagePosition >= 0
          const done = active && stagePosition < activeStages.length - 1
          return (
            <li key={stage.id} className="relative flex min-h-[4.25rem] items-start gap-4">
              {index < WORKFLOW_STAGES.length - 1 && (
                <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-0.75rem)] w-px bg-line">
                  <motion.span
                    className="block w-full origin-top bg-linear-to-b from-brand-cyan/70 to-brand-violet/50"
                    initial={reducedMotion ? false : { scaleY: 0 }}
                    animate={{ scaleY: done ? 1 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.45, ease: EASE }}
                    style={{ height: '100%' }}
                  />
                </span>
              )}
              <motion.span
                initial={false}
                animate={{
                  color: active ? 'rgb(34 211 238)' : 'rgb(111 117 134)',
                  borderColor: active ? 'rgb(34 211 238 / 0.55)' : 'rgb(255 255 255 / 0.08)',
                  backgroundColor: active ? 'rgb(34 211 238 / 0.08)' : 'rgb(255 255 255 / 0.02)',
                }}
                transition={{ duration: reducedMotion ? 0 : 0.35 }}
                className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-lg border"
              >
                {done ? <Check size={15} aria-hidden="true" /> : <Icon size={15} aria-hidden="true" />}
              </motion.span>
              <div className="flex min-h-8 flex-1 items-center justify-between gap-3 pt-1">
                <span className={`text-sm transition-colors duration-300 ${active ? 'text-fg' : 'text-fg-subtle'}`}>
                  {stage.label}
                </span>
                <span className="text-[10px] font-mono tracking-wide text-fg-subtle/70">
                  {done ? 'COMPLETE' : active ? 'ACTIVE' : `0${index + 1}`}
                </span>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-2 border-t border-line pt-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-fg-subtle">Live context</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXPLORATION.map(({ label, value, icon: ItemIcon }) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white/[0.02] px-2 py-1 text-[10px] text-fg-muted">
              <ItemIcon size={11} aria-hidden="true" className="text-fg-subtle" />
              <span className="text-fg-subtle">{label}</span>
              <span>{value}</span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}

function StatusStrip({ items }) {
  return (
    <ul aria-label="Analysis status" className="grid grid-cols-2 gap-x-5 gap-y-3 border-t border-line px-5 py-4 sm:grid-cols-4 md:px-7">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-[11px] text-fg-subtle">
          <Check size={12} aria-hidden="true" className="shrink-0 text-brand-cyan/60" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function AIWorkspace() {
  const [selectedId, setSelectedId] = useState(DEMOS[0].id)
  const [activeStageCount, setActiveStageCount] = useState(DEMOS[0].stages.length)
  const reducedMotion = useReducedMotion()
  const previousId = useRef(selectedId)
  const stageCount = useRef(DEMOS[0].stages.length)
  const demo = useMemo(() => DEMOS.find((item) => item.id === selectedId) ?? DEMOS[0], [selectedId])

  useEffect(() => {
    if (reducedMotion) {
      previousId.current = selectedId
      return undefined
    }
    if (previousId.current === selectedId) return undefined
    previousId.current = selectedId

    let timer
    let count = stageCount.current
    const advance = () => {
      count += 1
      stageCount.current = count
      setActiveStageCount(count)
      if (count < demo.stages.length) timer = window.setTimeout(advance, 220)
    }
    timer = window.setTimeout(advance, 180)
    return () => window.clearTimeout(timer)
  }, [demo.stages.length, reducedMotion, selectedId])

  const selectDemo = (id) => {
    if (id === selectedId) return
    const nextDemo = DEMOS.find((item) => item.id === id) ?? DEMOS[0]
    const initialCount = reducedMotion ? nextDemo.stages.length : 1
    stageCount.current = initialCount
    setActiveStageCount(initialCount)
    setSelectedId(id)
  }

  const activeStages = reducedMotion ? demo.stages : demo.stages.slice(0, activeStageCount)
  const isProcessing = !reducedMotion && activeStageCount < demo.stages.length

  return (
    <div className="relative mx-auto mt-12 max-w-[76rem] md:mt-16">
      {/* Low-intensity ambient bloom behind the workspace. */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_15%,rgb(79_124_255/0.12),transparent_60%),radial-gradient(ellipse_at_80%_45%,rgb(139_92_246/0.09),transparent_55%)] blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900/80 shadow-[0_30px_100px_-50px_rgb(0_0_0/0.9)] backdrop-blur-xl">
        {/* Product header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-7">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border border-brand-blue/20 bg-brand-blue/[0.08] text-brand-cyan">
              <Sparkles size={17} aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-sm font-medium text-fg">Intelligence workspace</p>
              <p className="mt-0.5 text-[11px] text-fg-subtle">Customer operations / Analysis</p>
            </div>
          </div>
          <span className="rounded-md border border-line px-2.5 py-1 font-mono text-[10px] text-fg-subtle">DEMO ENVIRONMENT</span>
        </div>

        {/* Main work area */}
        <div className="grid gap-7 p-5 md:p-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.75fr)] lg:gap-8 lg:p-8">
          <section aria-label="AI analysis conversation" className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-subtle">Request</p>
              <span className="font-mono text-[10px] text-fg-subtle/70">TASK 0{DEMOS.findIndex((item) => item.id === selectedId) + 1}</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={demo.id}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -5 }}
                transition={{ duration: reducedMotion ? 0 : 0.28, ease: EASE }}
                className="mt-3 rounded-xl border border-line bg-white/[0.035] px-4 py-4 text-sm leading-relaxed text-fg/90 md:px-5"
              >
                {demo.prompt}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center gap-2 text-xs text-brand-cyan/90">
              <Sparkles size={14} aria-hidden="true" />
              <span className="font-medium">{demo.summary}</span>
              <span className="ml-auto font-mono text-[10px] text-fg-subtle">LOCAL DEMO</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${demo.id}-response`}
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: reducedMotion ? 0 : 0.32, ease: EASE, delay: reducedMotion ? 0 : 0.04 }}
                className={`mt-3 space-y-4 rounded-xl border border-line bg-ink-950/45 p-4 transition-shadow duration-500 md:p-5 ${isProcessing ? 'shadow-[0_0_32px_-20px_rgb(79_124_255/0.5)]' : ''}`}
              >
                {demo.insights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.28, ease: EASE, delay: reducedMotion ? 0 : 0.12 + index * 0.12 }}
                    className="flex gap-3"
                  >
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-cyan/70" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-fg/90">{insight.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-fg-muted">{insight.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>

          <WorkflowMap activeStages={activeStages} reducedMotion={reducedMotion} />
        </div>

        {/* Prompt presets */}
        <div className="border-t border-line px-5 py-4 md:px-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-fg-subtle">Try a scenario</p>
            <div role="group" aria-label="Choose an AI demo scenario" className="flex flex-wrap gap-2">
              {DEMOS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectDemo(item.id)}
                  aria-pressed={selectedId === item.id}
                  className={`inline-flex min-h-9 items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-[color,background-color,border-color] duration-300 ease-premium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan ${
                    selectedId === item.id
                      ? 'border-brand-blue/35 bg-brand-blue/10 text-fg'
                      : 'border-line bg-white/[0.02] text-fg-muted hover:border-line-strong hover:bg-white/[0.05] hover:text-fg'
                  }`}
                >
                  <span className="font-mono text-[10px] text-brand-cyan/70">0{index + 1}</span>
                  {item.label}
                  {selectedId === item.id && <Check size={12} aria-hidden="true" className="text-brand-cyan" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <StatusStrip items={demo.status} />
      </div>

      <p className="mt-4 text-center text-[11px] text-fg-subtle/75">
        A local product simulation — no data leaves this page and no live AI service is connected.
      </p>
    </div>
  )
}

export default function AIDemoSection() {
  return (
    <SectionBackground
      id="ai-demo"
      variant="services"
      aria-labelledby="ai-demo-heading"
      className="py-24 md:py-32"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="INTERACTIVE AI"
            title="See intelligence in action."
            description="From understanding complex information to reasoning through tasks and taking action, our AI systems are designed to turn intelligence into useful outcomes."
            headingId="ai-demo-heading"
          />
        </Reveal>
        <Reveal variant="scale" delay={0.15}>
          <AIWorkspace />
        </Reveal>
      </div>
    </SectionBackground>
  )
}
