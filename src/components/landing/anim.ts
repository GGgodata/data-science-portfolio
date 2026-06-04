import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export const viewport = { once: true, margin: '-80px' } as const
