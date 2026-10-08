import { motion } from 'motion/react'

const base =
  'inline-flex items-center justify-center gap-2 rounded-control border font-medium cursor-pointer transition-colors duration-300'

const sizes = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const variants = {
  primary:
    'border-line-strong bg-linear-to-b from-white/15 to-white/5 text-fg hover:from-white/20 hover:to-white/8',
  // Highest emphasis: use for the main call to action on a page.
  solid:
    'border-transparent bg-fg text-ink-950 shadow-glow-blue hover:bg-white',
  secondary:
    'border-line bg-ink-900/60 text-fg-muted hover:text-fg hover:bg-ink-800/80',
}

// Renders a link when `href` is given, otherwise a button.
export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) {
  const Tag = href ? motion.a : motion.button
  return (
    <Tag
      href={href}
      type={href ? undefined : 'button'}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}


