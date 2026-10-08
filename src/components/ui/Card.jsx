import { motion } from 'motion/react'

export default function Card({ children, className = '', ...props }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-card border border-line bg-ink-800/60 p-6 border-travel ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}


