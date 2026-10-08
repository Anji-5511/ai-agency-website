import { motion, useReducedMotion } from 'motion/react'
import { VIEWPORT, groupVariants, revealVariants } from '../../lib/motion'

// Reveal: animates one element when it scrolls into view.
//   <Reveal>…</Reveal>                       fade + move up
//   <Reveal variant="scale" delay={0.2}>…    for images / visuals
//
// RevealGroup + RevealItem: children appear one after another.
//   <RevealGroup className="grid …">
//     <RevealItem>…</RevealItem>
//     <RevealItem>…</RevealItem>
//   </RevealGroup>
//
// With reduced motion enabled they render plain elements, so content is shown immediately.

export function Reveal({
  as = 'div',
  variant = 'fadeUp',
  delay = 0,
  className,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const Tag = reduceMotion ? as : motion[as]
  if (reduceMotion) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }
  return (
    <Tag
      variants={revealVariants[variant]}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function RevealGroup({ as = 'div', stagger = 0.12, className, children, ...props }) {
  const reduceMotion = useReducedMotion()
  const Tag = reduceMotion ? as : motion[as]
  if (reduceMotion) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }
  return (
    <Tag
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}

// Must be placed inside a RevealGroup; it follows the group's timing.
export function RevealItem({ as = 'div', variant = 'fadeUp', className, children, ...props }) {
  const reduceMotion = useReducedMotion()
  const Tag = reduceMotion ? as : motion[as]
  if (reduceMotion) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }
  return (
    <Tag variants={revealVariants[variant]} className={className} {...props}>
      {children}
    </Tag>
  )
}
