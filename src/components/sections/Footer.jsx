import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { BRAND_LOGO, BRAND_NAME } from '../../lib/brand'

const CONTACT_EMAIL = 'hello@aiagency.com'

// Visual only (not links). Lucide has no brand icons, so these are small inline glyphs.
const SOCIAL_ICONS = [
  { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'GitHub', path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.921.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
]
// Add real pages to `href` when they exist; until then they render as plain text.
const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '' },
  { label: 'Terms of Service', href: '' },
]

const EXPLORE_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'AI Capabilities', href: '#capabilities' },
  { label: 'AI Demo', href: '#ai-demo' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
]

const SOLUTION_LINKS = [
  { label: 'Generative AI', href: '#capabilities' },
  { label: 'AI Agents', href: '#services' },
  { label: 'Intelligent Automation', href: '#services' },
  { label: 'AI-Powered Products', href: '#services' },
  { label: 'RAG & Knowledge AI', href: '#capabilities' },
  { label: 'Voice AI', href: '#capabilities' },
]

const linkClass =
  'inline-flex min-h-8 items-center text-sm text-fg-subtle transition-colors duration-200 hover:text-fg focus-visible:rounded-sm'

function FooterBrand() {
  return (
    <div>
      <a
        href="#top"
        aria-label={`${BRAND_NAME}, back to top`}
        className="flex w-fit items-center gap-2.5 whitespace-nowrap font-display text-lg font-semibold tracking-tight text-fg transition-colors duration-200 hover:text-white focus-visible:rounded-sm"
      >
        <span className="flex h-14 w-[5.6rem] items-center justify-center overflow-hidden rounded-lg bg-white">
          <img src={BRAND_LOGO} alt="" className="size-full scale-[1.6] object-contain" />
        </span>
        {BRAND_NAME}
      </a>
      <p className="mt-4 text-sm font-medium text-fg-muted">Intelligent systems for a smarter tomorrow.</p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-fg-subtle">
        We design and build AI products, agents, and automation that turn ambitious ideas into real-world impact.
      </p>
      <ul aria-hidden="true" className="mt-5 flex gap-2">
        {SOCIAL_ICONS.map(({ label, path }) => (
          <li
            key={label}
            className="flex size-10 cursor-pointer items-center justify-center rounded-control border border-line text-fg-subtle transition-colors duration-200 hover:border-line-strong hover:text-fg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path d={path} />
            </svg>
          </li>
        ))}
      </ul>    </div>
  )
}

function FooterColumn({ title, links }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">{title}</h2>
      <ul className="mt-4 flex flex-col items-start gap-1.5">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={linkClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function FooterContact({ onOpenContact }) {
  return (
    <div>
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-muted">Contact</h2>
      <p className="mt-4 text-sm leading-relaxed text-fg-subtle">Have a project in mind? Tell us what you&apos;re building.</p>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-3 inline-flex min-h-8 items-center text-sm text-fg transition-colors duration-200 hover:text-brand-cyan focus-visible:rounded-sm"
      >
        {CONTACT_EMAIL}
      </a>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        onClick={(event) => { event.preventDefault(); onOpenContact() }}
        className="group mt-4 flex min-h-11 w-fit items-center gap-2 rounded-control border border-line-strong px-4 text-sm font-medium text-fg transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.04]"
      >
        Start a conversation
        <ArrowUpRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  )
}

function FooterBottom() {
  return (
    <div className="flex flex-col gap-3 border-t border-line py-6 text-[11px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </p>
      <ul className="flex gap-5">
        {LEGAL_LINKS.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <a href={link.href} className="transition-colors duration-200 hover:text-fg focus-visible:rounded-sm">
                {link.label}
              </a>
            ) : (
              <span>{link.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer({ onOpenContact }) {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.1] bg-[#030407]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[linear-gradient(180deg,rgb(10_14_24/0.8),transparent_85%)]"
      />
      <div className="container-page">
        <div aria-hidden="true" className="h-px w-full bg-linear-to-r from-transparent via-brand-blue/25 to-transparent" />
        <Reveal className="grid gap-10 pb-12 pt-16 sm:grid-cols-2 sm:gap-x-12 sm:pt-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8 lg:pb-16 lg:pt-24">
          <FooterBrand />
          <FooterColumn title="Explore" links={EXPLORE_LINKS} />
          <FooterColumn title="AI Solutions" links={SOLUTION_LINKS} />
          <FooterContact onOpenContact={onOpenContact} />
        </Reveal>
        <FooterBottom />
      </div>
    </footer>
  )
}

