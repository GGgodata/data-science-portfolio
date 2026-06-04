import type { Variants } from 'framer-motion'

// Animations disabled for the simplified, design-light prototype.
// Content renders immediately with no motion.
export const fadeUp: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
}

export const stagger: Variants = {
  hidden: {},
  show: {},
}

export const viewport = { once: true } as const
