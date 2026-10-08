import { useReducedMotion, useScroll, useSpring, useVelocity } from 'motion/react'
import SectionBackground from '../ui/SectionBackground'
import SectionHeading from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import MarqueeRow from '../ui/MarqueeRow'
import CapabilityPanel from '../ui/CapabilityPanel'
import { CAPABILITY_ROWS } from '../../lib/capabilities'

// Two rows of capability panels moving in opposite directions (left, right).
export default function AICapabilities() {
  const reduceMotion = useReducedMotion()

  // Smoothed page scroll speed. The rows read it every frame; it never triggers a re-render.
  const { scrollY } = useScroll()
  const scrollVelocity = useSpring(useVelocity(scrollY), { stiffness: 60, damping: 25 })

  return (
    <SectionBackground
      id="capabilities"
      variant="capabilities"
      aria-labelledby="capabilities-heading"
      className="py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="AI CAPABILITIES"
          title="AI that moves from possibility to production."
          description="We combine intelligent models, automation, data, and product engineering to create AI systems that solve meaningful problems — not just impressive demos."
          headingId="capabilities-heading"
        />
        <Reveal delay={0.5}>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-fg-subtle md:text-base">
            Explore the capabilities behind our intelligent products, autonomous workflows, and
            next-generation digital experiences.
          </p>
        </Reveal>

        <Reveal delay={0.6} className="mt-14 flex items-center gap-4 md:mt-16">
          <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-muted/80">
            One ecosystem. Many intelligent layers.
          </p>
        </Reveal>
      </div>

      <div className="mt-8 space-y-5">
        {CAPABILITY_ROWS.map((row, index) =>
          reduceMotion ? (
            <ul key={row.id} className="container-page grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {row.items.map((item) => (
                <li key={item.number} className="flex">
                  <CapabilityPanel item={item} direction={row.direction} className="w-full" />
                </li>
              ))}
            </ul>
          ) : (
            <Reveal key={row.id} delay={0.3 + index * 0.15}>
              <MarqueeRow
                direction={row.direction}
                duration={row.duration}
                startAt={row.startAt}
                velocity={scrollVelocity}
              >
                {row.items.map((item) => (
                  <CapabilityPanel
                    key={item.number}
                    item={item}
                    direction={row.direction}
                    className="w-[19rem] sm:w-[23.5rem] md:w-[26rem]"
                  />
                ))}
              </MarqueeRow>
            </Reveal>
          ),
        )}
      </div>
    </SectionBackground>
  )
}
