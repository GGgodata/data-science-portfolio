import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function StepWrapper({ title, subtitle, children }: Props) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full"
    >
      <h2 className="font-serif font-light text-3xl md:text-4xl text-ink mb-3">{title}</h2>
      {subtitle && <p className="text-stone text-lg mb-10">{subtitle}</p>}
      <div className={subtitle ? '' : 'mt-8'}>{children}</div>
    </motion.div>
  )
}
