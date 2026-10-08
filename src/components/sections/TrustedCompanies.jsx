import SectionBackground from '../ui/SectionBackground'
import { RevealGroup, RevealItem } from '../ui/Reveal'

// Placeholder brands drawn with CSS and inline SVG only. They are fictional and
// must be replaced with real client names/logos (with permission) before launch.
const Mark = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="shrink-0 text-fg/35 transition-colors duration-300 ease-premium group-hover:text-brand-cyan"
  >
    {children}
  </svg>
)

const BRANDS = [
  {
    name: 'NEXORA',
    wordmark: (
      <>
        <Mark>
          <path d="M12 3l9 9-9 9-9-9z" />
        </Mark>
        <span className="font-display text-lg font-semibold tracking-[0.28em]">NEXORA</span>
      </>
    ),
  },
  {
    name: 'VERTEX',
    wordmark: (
      <>
        <Mark>
          <path d="M12 4l9 16H3z" />
        </Mark>
        <span className="font-display text-lg font-bold tracking-tight">VERTEX</span>
      </>
    ),
  },
  {
    name: 'LUMEN',
    wordmark: (
      <>
        <Mark>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </Mark>
        <span className="text-lg font-light tracking-[0.4em]">LUMEN</span>
      </>
    ),
  },
  {
    name: 'AETHER',
    wordmark: (
      <>
        <Mark>
          <path d="M4 8h16M4 12h10M4 16h16" />
        </Mark>
        <span className="font-display text-lg font-medium tracking-[0.18em]">AETHER</span>
      </>
    ),
  },
  {
    name: 'NOVA LABS',
    wordmark: (
      <>
        <Mark>
          <path d="M5 13a7 7 0 0 1 14 0M5 18h14" />
        </Mark>
        <span className="font-display text-lg leading-none tracking-wide">
          <span className="font-bold">NOVA</span> <span className="font-light">LABS</span>
        </span>
      </>
    ),
  },
  {
    name: 'QUANTIX',
    wordmark: (
      <>
        <Mark>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M13 13l5 5" />
        </Mark>
        <span className="font-mono text-base font-medium tracking-[0.2em]">QUANTIX</span>
      </>
    ),
  },
]

export default function TrustedCompanies() {
  return (
    <SectionBackground
      variant="caseStudies"
      aria-labelledby="trusted-heading"
      className="py-24 md:py-32"
    >
      <div className="container-page">
        <RevealGroup stagger={0.12} className="mx-auto max-w-2xl text-center">
          <RevealItem
            as="h2"
            id="trusted-heading"
            className="text-3xl font-semibold text-fg md:text-4xl"
          >
            Trusted by teams building the future
          </RevealItem>
          <RevealItem as="p" className="mt-4 text-base text-fg-muted md:text-lg">
            Trusted by ambitious teams building what&rsquo;s next.
          </RevealItem>
        </RevealGroup>

        <RevealGroup
          as="ul"
          stagger={0.09}
          className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:gap-4 xl:grid-cols-6"
        >
          {BRANDS.map((brand) => (
            <RevealItem as="li" key={brand.name}>
              <div className="group relative flex h-24 items-center justify-center gap-2.5 overflow-hidden rounded-card border border-line bg-white/[0.02] px-3 text-fg/55 transition-[color,border-color,filter] duration-300 ease-premium hover:border-line-strong hover:text-fg/90 hover:[filter:drop-shadow(0_0_12px_rgb(139_92_246/0.22))] md:h-28">
                {/* Soft accent wash that appears on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgb(79_124_255/0.14),transparent_70%)] opacity-0 transition-opacity duration-300 ease-premium group-hover:opacity-100"
                />
                <span className="relative flex items-center gap-2.5">{brand.wordmark}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </SectionBackground>
  )
}


