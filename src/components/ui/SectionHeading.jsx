import { RevealGroup, RevealItem } from './Reveal'

// Eyebrow label, heading and description reveal one after another.
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  headingId,
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <RevealGroup stagger={0.15} className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <RevealItem
          as="p"
          className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-brand-cyan"
        >
          {eyebrow}
        </RevealItem>
      )}
      <RevealItem
        as={Heading}
        id={headingId}
        className="text-4xl font-semibold text-fg md:text-5xl"
      >
        {title}
      </RevealItem>
      {description && (
        <RevealItem as="p" className="mt-5 text-lg text-fg-muted">
          {description}
        </RevealItem>
      )}
    </RevealGroup>
  )
}

