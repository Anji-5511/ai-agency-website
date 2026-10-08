import {
  AudioLines,
  BrainCircuit,
  Bot,
  Compass,
  DatabaseZap,
  Layers3,
  PlugZap,
  ScanEye,
  Search,
  Sparkles,
  TrendingUp,
  Workflow,
} from 'lucide-react'

// `motion` picks the small hover animation of the icon (see CapabilityPanel).
// `label` is the short verb shown in the corner of the panel.
export const CAPABILITY_ROWS = [
  {
    id: 'row-1',
    direction: -1, // moves left
    duration: 26,
    startAt: 0,
    items: [
      {
        number: '01',
        title: 'Generative AI',
        icon: Sparkles,
        motion: 'spin',
        label: 'Create',
        description:
          'Create intelligent experiences that understand language, context, and intent. We build AI systems for content generation, knowledge assistance, multimodal interaction, and creative workflows.',
        tags: ['LLMs', 'Multimodal', 'Content AI'],
      },
      {
        number: '02',
        title: 'AI Agents',
        icon: Bot,
        motion: 'nudge',
        label: 'Autonomous',
        description:
          'Build autonomous systems that can reason through tasks, use external tools, access information, and execute multi-step workflows with minimal human intervention.',
        tags: ['Agents', 'Tools', 'Reasoning'],
      },
      {
        number: '03',
        title: 'Intelligent Automation',
        icon: Workflow,
        motion: 'travel',
        label: 'Automate',
        description:
          'Transform repetitive business processes into intelligent workflows. Connect AI with applications, APIs, and internal systems to reduce manual operations and accelerate execution.',
        tags: ['Workflows', 'APIs', 'Automation'],
      },
      {
        number: '04',
        title: 'AI-Powered Products',
        icon: Layers3,
        motion: 'stack',
        label: 'Build',
        description:
          'Design products where intelligence is built into the experience from day one — from AI assistants and copilots to complete AI-native applications.',
        tags: ['AI Apps', 'Copilots', 'Product'],
      },
      {
        number: '05',
        title: 'Computer Vision',
        icon: ScanEye,
        motion: 'scan',
        label: 'See',
        description:
          'Enable software to understand visual information. Analyze images, documents, video, objects, and visual patterns to turn unstructured media into useful intelligence.',
        tags: ['Vision', 'OCR', 'Video AI'],
      },
      {
        number: '06',
        title: 'RAG & Knowledge AI',
        icon: DatabaseZap,
        motion: 'pulse',
        label: 'Understand',
        description:
          "Connect AI models to trusted private knowledge. Build retrieval systems that let AI search, understand, and respond using your organization's documents and data.",
        tags: ['RAG', 'Embeddings', 'Knowledge'],
      },
    ],
  },
  {
    id: 'row-2',
    direction: 1, // moves right
    duration: 30,
    startAt: 0.4,
    items: [
      {
        number: '07',
        title: 'Voice AI',
        icon: AudioLines,
        motion: 'wave',
        label: 'Listen',
        description:
          'Create natural voice experiences that listen, understand, respond, and take action. Build conversational systems for support, assistants, sales, and operations.',
        tags: ['Speech', 'Realtime', 'Conversation'],
      },
      {
        number: '08',
        title: 'Predictive Intelligence',
        icon: TrendingUp,
        motion: 'rise',
        label: 'Predict',
        description:
          'Turn historical and real-time data into actionable predictions. Identify patterns, forecast outcomes, and help teams make faster and more informed decisions.',
        tags: ['ML', 'Forecasting', 'Analytics'],
      },
      {
        number: '09',
        title: 'AI Integrations',
        icon: PlugZap,
        motion: 'snap',
        label: 'Connect',
        description:
          'Connect intelligent models with the tools your business already uses. Integrate AI across CRMs, databases, APIs, communication platforms, and internal systems.',
        tags: ['APIs', 'Integrations', 'Systems'],
      },
      {
        number: '10',
        title: 'LLM Engineering',
        icon: BrainCircuit,
        motion: 'pulse',
        label: 'Engineer',
        description:
          'Move beyond simple prompting. Design production-ready language model systems with structured outputs, evaluation, orchestration, optimization, and reliable application architecture.',
        tags: ['LLMs', 'Evaluation', 'Orchestration'],
      },
      {
        number: '11',
        title: 'AI Strategy',
        icon: Compass,
        motion: 'tilt',
        label: 'Transform',
        description:
          'Find where AI can create meaningful business impact. We identify opportunities, define practical roadmaps, select the right technologies, and guide teams from experimentation to production.',
        tags: ['Strategy', 'Roadmaps', 'Innovation'],
      },
      {
        number: '12',
        title: 'Intelligent Search',
        icon: Search,
        motion: 'search',
        label: 'Discover',
        description:
          'Build search experiences that understand meaning rather than simply matching keywords. Combine semantic retrieval, natural language, and contextual intelligence.',
        tags: ['Semantic', 'Search', 'Retrieval'],
      },
    ],
  },
]
