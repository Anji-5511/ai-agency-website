import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  ChevronRight,
  Cloud,
  Compass,
  Cpu,
  Database,
  FileText,
  Globe2,
  Layers3,
  Network,
  Workflow,
  Zap,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import SectionBackground from '../ui/SectionBackground'
import SectionHeading from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { EASE } from '../../lib/motion'

const SERVICES = [
  {
    id: 'product',
    number: '01',
    title: 'AI Product Development',
    label: 'BUILD',
    icon: Layers3,
    description:
      'We design and build AI-native products that combine intelligent models, thoughtful UX, and production-grade engineering.',
    points: [
      'AI-native applications',
      'Copilots & assistants',
      'Intelligent SaaS products',
      'AI-powered user experiences',
    ],
    visual: 'product',
  },
  {
    id: 'automation',
    number: '02',
    title: 'AI Automation',
    label: 'AUTOMATE',
    icon: Workflow,
    description:
      'Turn repetitive operations into intelligent workflows that connect your data, tools, and teams.',
    points: ['Workflow automation', 'API integrations', 'Document processing', 'Operational intelligence'],
    visual: 'automation',
  },
  {
    id: 'agents',
    number: '03',
    title: 'AI Agents',
    label: 'ACT',
    icon: Bot,
    description:
      'Build autonomous systems that understand objectives, reason through tasks, use tools, and execute multi-step workflows.',
    points: ['Autonomous agents', 'Tool use', 'Multi-step reasoning', 'Human-in-the-loop systems'],
    visual: 'agents',
  },
  {
    id: 'custom',
    number: '04',
    title: 'Custom AI Solutions',
    label: 'ENGINEER',
    icon: BrainCircuit,
    description:
      "When off-the-shelf tools aren't enough, we engineer intelligent systems around your specific data, workflows, and business requirements.",
    points: ['Custom AI systems', 'Private knowledge', 'Multimodal intelligence', 'Enterprise workflows'],
    visual: 'custom',
  },
  {
    id: 'strategy',
    number: '05',
    title: 'AI Consulting & Strategy',
    label: 'TRANSFORM',
    icon: Compass,
    description:
      'Identify where AI can create real business impact and define a practical path from experimentation to production.',
    points: ['AI opportunity mapping', 'Technology selection', 'AI roadmaps', 'Implementation strategy'],
    visual: 'strategy',
  },
]

function ProductVisual() {
  return (
    <div className="relative flex h-full min-h-[20rem] items-center justify-center overflow-hidden rounded-xl border border-line bg-ink-950/50 p-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgb(79_124_255/0.12),transparent_60%),radial-gradient(ellipse_at_78%_14%,rgb(34_211_238/0.08),transparent_42%)]" />
      <div className="relative w-full max-w-sm -rotate-2 rounded-xl border border-line-strong bg-ink-900/90 p-5 shadow-[0_24px_70px_-34px_rgb(0_0_0/0.9)] transition-transform duration-500 hover:rotate-0">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <span className="flex size-8 items-center justify-center rounded-lg border border-brand-blue/20 bg-brand-blue/10 text-brand-cyan"><Layers3 size={15} /></span>
          <span className="text-xs font-medium text-fg">Product intelligence</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] text-fg-subtle"><span className="size-1.5 rounded-full bg-brand-cyan" />READY</span>
        </div>
        <div className="mt-5 flex gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-violet/10 text-brand-violet"><BrainCircuit size={16} /></span>
          <div className="flex-1 space-y-2 pt-1">
            <span className="block h-2 w-3/4 rounded-full bg-fg/15" />
            <span className="block h-1.5 w-full rounded-full bg-fg/8" />
            <span className="block h-1.5 w-5/6 rounded-full bg-fg/8" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-line bg-white/[0.025] p-3"><Globe2 size={14} className="text-brand-cyan/70" /><span className="mt-3 block text-[10px] text-fg-muted">Product surface</span></div>
          <div className="rounded-lg border border-line bg-white/[0.025] p-3"><Database size={14} className="text-brand-violet/70" /><span className="mt-3 block text-[10px] text-fg-muted">Knowledge layer</span></div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-[10px] text-fg-subtle"><Check size={12} className="text-brand-cyan/70" />Experience and intelligence, designed together</div>
      </div>
      <div aria-hidden="true" className="absolute right-7 top-8 hidden items-center gap-2 rounded-lg border border-line bg-ink-900/80 px-3 py-2 text-[10px] text-fg-subtle sm:flex"><Cpu size={12} className="text-brand-cyan/70" />SYSTEM LAYER</div>
    </div>
  )
}

function FlowVisual({ agent = false }) {
  const steps = agent
    ? [
        { label: 'Goal', icon: Compass },
        { label: 'Reason', icon: BrainCircuit },
        { label: 'Tools', icon: Zap },
        { label: 'Action', icon: ArrowRight },
        { label: 'Result', icon: Check },
      ]
    : [
        { label: 'Input', icon: FileText },
        { label: 'AI', icon: BrainCircuit },
        { label: 'Decision', icon: Compass },
        { label: 'Action', icon: Zap },
      ]
  return (
    <div className="relative flex min-h-[20rem] flex-col justify-center overflow-hidden rounded-xl border border-line bg-ink-950/50 p-5 sm:p-7">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgb(139_92_246/0.1),transparent_65%)]" />
      <p className="relative mb-7 text-[10px] font-medium uppercase tracking-[0.18em] text-fg-subtle">{agent ? 'Autonomous execution path' : 'Connected workflow'}</p>
      <ol className={`relative flex ${agent ? 'flex-col items-start' : 'items-center'} justify-center gap-3 sm:gap-4`}>
        {steps.map(({ label, icon: Icon }, index) => (
          <li key={label} className={`flex ${agent ? 'flex-col items-center gap-2' : 'min-w-0 flex-1 flex-col gap-3'}`}>
            <span className={agent ? 'flex items-center gap-3' : 'contents'}>
              <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-ink-800/80 text-fg-muted transition-colors duration-300 hover:border-brand-cyan/35 hover:text-brand-cyan">
                <Icon size={17} />
                {index === 1 && <span aria-hidden="true" className="absolute -inset-1 -z-10 rounded-xl bg-brand-violet/15 blur-md" />}
              </span>
              <span className={agent ? 'text-xs text-fg-muted' : 'text-center text-[10px] text-fg-muted sm:text-xs'}>{label}</span>
            </span>
            {agent && index < steps.length - 1 && <ArrowDown aria-hidden="true" size={13} className="text-brand-violet/45" />}
          </li>
        ))}
        {!agent && <span aria-hidden="true" className="pointer-events-none absolute left-[17%] right-[17%] top-[22px] -z-0 h-px bg-linear-to-r from-brand-blue/20 via-brand-violet/45 to-brand-cyan/25" />}
      </ol>
      <div className="relative mt-8 flex items-center gap-3 rounded-lg border border-line bg-white/[0.02] px-3 py-2.5">
        <span className="size-1.5 rounded-full bg-brand-cyan/80" />
        <span className="text-xs text-fg-muted">{agent ? 'Human review stays in control' : 'Systems connected and ready to run'}</span>
        <ArrowRight size={13} className="ml-auto text-fg-subtle" />
      </div>
    </div>
  )
}

function CustomVisual() {
  const sources = [
    { label: 'Data', icon: Database },
    { label: 'Documents', icon: FileText },
    { label: 'Systems', icon: Workflow },
    { label: 'APIs', icon: Cloud },
  ]
  return (
    <div className="relative flex min-h-[20rem] flex-col items-center justify-center overflow-hidden rounded-xl border border-line bg-ink-950/50 p-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgb(79_124_255/0.12),transparent_60%),radial-gradient(ellipse_at_50%_55%,rgb(34_211_238/0.06),transparent_72%)]" />
      <ul className="relative grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
        {sources.map(({ label, icon: Icon }) => <li key={label} className="flex flex-col items-center gap-2 rounded-lg border border-line bg-ink-900/80 py-3 text-fg-muted"><Icon size={15} className="text-brand-cyan/70" /><span className="text-[10px]">{label}</span></li>)}
      </ul>
      <ArrowDown aria-hidden="true" size={17} className="relative my-3 text-brand-violet/60" />
      <div className="relative flex items-center gap-3 rounded-xl border border-brand-blue/20 bg-brand-blue/[0.07] px-5 py-3 text-sm font-medium text-fg shadow-[0_0_35px_-18px_rgb(79_124_255/0.45)]"><BrainCircuit size={17} className="text-brand-cyan" />AI CORE</div>
      <ArrowDown aria-hidden="true" size={17} className="relative my-3 text-brand-cyan/50" />
      <div className="relative flex w-full max-w-md items-center justify-between gap-3 rounded-lg border border-line bg-ink-900/80 px-4 py-3"><span className="flex items-center gap-2 text-xs text-fg-muted"><Network size={14} className="text-brand-cyan/70" />Business outcome</span><ArrowUpRight size={14} className="text-fg-subtle" /></div>
    </div>
  )
}

function StrategyVisual() {
  const steps = ['Discover', 'Prioritize', 'Design', 'Build', 'Scale']
  return (
    <div className="relative flex min-h-[20rem] flex-col justify-center overflow-hidden rounded-xl border border-line bg-ink-950/50 p-5 sm:p-7">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgb(34_211_238/0.07),transparent_62%)]" />
      <p className="relative mb-8 text-[10px] font-medium uppercase tracking-[0.18em] text-fg-subtle">A practical path to production</p>
      <ol className="relative flex flex-wrap items-center justify-center gap-y-5">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center">
            <span className="flex flex-col items-center gap-3">
              <span className={`flex size-10 items-center justify-center rounded-full border text-xs font-mono ${index === 0 ? 'border-brand-cyan/45 bg-brand-cyan/10 text-brand-cyan' : 'border-line bg-ink-900/70 text-fg-muted'}`}>{`0${index + 1}`}</span>
              <span className="text-[10px] text-fg-muted sm:text-xs">{step}</span>
            </span>
            {index < steps.length - 1 && <span aria-hidden="true" className="mx-2 mb-5 h-px w-5 bg-linear-to-r from-brand-blue/40 to-brand-violet/40 sm:mx-3 sm:w-8" />}
          </li>
        ))}
      </ol>
      <div className="relative mt-8 flex items-center gap-2 border-t border-line pt-4 text-xs text-fg-subtle"><Compass size={14} className="text-brand-cyan/70" />A roadmap grounded in business value<span className="ml-auto font-mono text-[10px]">01 — 05</span></div>
    </div>
  )
}

function ServiceVisual({ type }) {
  if (type === 'product') return <ProductVisual />
  if (type === 'automation') return <FlowVisual />
  if (type === 'agents') return <FlowVisual agent />
  if (type === 'custom') return <CustomVisual />
  return <StrategyVisual />
}

function ServiceExplorer() {
  const [activeId, setActiveId] = useState(SERVICES[0].id)
  const reducedMotion = useReducedMotion()
  const activeService = SERVICES.find((service) => service.id === activeId)

  return (
    <div className="relative mx-auto mt-12 max-w-[80rem] overflow-hidden rounded-2xl border border-line-strong bg-ink-900/70 shadow-[0_30px_100px_-50px_rgb(0_0_0/0.9)] backdrop-blur-xl md:mt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_35%,rgb(79_124_255/0.08),transparent_45%),radial-gradient(ellipse_at_95%_80%,rgb(139_92_246/0.06),transparent_42%)]" />
      <div className="relative grid md:grid-cols-[17rem_minmax(0,1fr)] lg:grid-cols-[19rem_minmax(0,1fr)]">
        <nav aria-label="Services" className="border-b border-line px-5 py-6 sm:px-8 md:border-b-0 md:border-r md:px-5 md:py-9 lg:px-7">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-fg-subtle">Explore services</p>
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-1">
            {SERVICES.map((service) => {
              const selected = service.id === activeId
              const Icon = service.icon
              return (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(service.id)}
                    aria-pressed={selected}
                    className={`group relative flex min-h-12 w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-[color,background-color,transform] duration-300 ease-premium hover:translate-x-1 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan ${selected ? 'bg-white/[0.045] text-fg' : 'text-fg-muted hover:bg-white/[0.025]'}`}
                  >
                    {selected && <motion.span layoutId="service-indicator" className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-linear-to-b from-brand-blue via-brand-violet to-brand-cyan" transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }} />}
                    <span className={`font-mono text-[11px] ${selected ? 'text-brand-cyan' : 'text-fg-subtle'}`}>{service.number}</span>
                    <Icon size={15} aria-hidden="true" className={`shrink-0 ${selected ? 'text-brand-cyan/90' : 'text-fg-subtle'}`} />
                    <span className="min-w-0 flex-1 text-sm font-medium">{service.title}</span>
                    <ChevronRight size={14} aria-hidden="true" className={`shrink-0 transition-all duration-300 ${selected ? 'translate-x-0 text-brand-cyan opacity-100' : '-translate-x-1 text-fg-subtle opacity-0 group-hover:translate-x-0 group-hover:opacity-70'}`} />
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 hidden border-t border-line pt-5 text-xs leading-relaxed text-fg-subtle md:block">Connected expertise for every stage of your AI journey.</p>
        </nav>

        <div className="relative min-w-0 p-5 sm:p-8 lg:p-9 xl:p-11">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activeService.id}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -5 }}
              transition={{ duration: reducedMotion ? 0 : 0.32, ease: EASE }}
              aria-labelledby="service-title"
            >
              <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] xl:items-center xl:gap-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-brand-cyan/80">{activeService.number}</span>
                    <span className="h-px w-8 bg-line-strong" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-fg-subtle">{activeService.label}</span>
                  </div>
                  <h3 id="service-title" className="mt-5 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">{activeService.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-fg-muted md:text-base">{activeService.description}</p>
                  <ul className="mt-6 grid gap-x-4 gap-y-3 sm:grid-cols-2 xl:grid-cols-1">
                    {activeService.points.map((point) => <li key={point} className="flex items-center gap-2.5 text-xs text-fg-muted"><Check size={14} aria-hidden="true" className="shrink-0 text-brand-cyan/70" />{point}</li>)}
                  </ul>
                  <a href="#contact" className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-brand-cyan focus-visible:text-brand-cyan">Discuss a project<ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></a>
                </div>
                <ServiceVisual type={activeService.visual} />
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <SectionBackground id="services" variant="services" aria-labelledby="services-heading" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="WHAT WE BUILD"
          title="From intelligent ideas to production-ready systems."
          description="We combine AI engineering, product design, automation, and software development to build intelligent systems that create measurable business value."
          headingId="services-heading"
        />
        <Reveal delay={0.45}>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.2em] text-fg-subtle">AI <span className="px-1.5 text-brand-cyan/55">•</span> PRODUCT <span className="px-1.5 text-brand-cyan/55">•</span> AUTOMATION <span className="px-1.5 text-brand-cyan/55">•</span> ENGINEERING</p>
        </Reveal>
        <Reveal variant="scale" delay={0.2}>
          <ServiceExplorer />
        </Reveal>
      </div>
    </SectionBackground>
  )
}
