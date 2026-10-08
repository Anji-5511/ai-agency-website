// Shared motion settings so every reveal feels the same across the site.
export const EASE = [0.22, 1, 0.36, 1]

// Reveal once, slightly before the element is fully inside the viewport.
export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -60px 0px' }

// `custom` is an optional delay (seconds).
export const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE, delay },
    }),
  },
  // For images and visual elements: a barely-there scale on top of the fade.
  scale: {
    hidden: { opacity: 0, y: 14, scale: 0.97 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: EASE, delay },
    }),
  },
}

// Parent of a staggered group: children appear one after another.
export const groupVariants = {
  hidden: {},
  visible: (stagger = 0.12) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  }),
}
