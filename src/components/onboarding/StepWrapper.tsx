import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

type StepWrapperProps = {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function StepWrapper({ title, subtitle, children }: StepWrapperProps) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-10">
        <h1 className="font-serif font-light text-4xl md:text-5xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-stone text-lg font-light">{subtitle}</p>
        )}
      </div>
      <div>{children}</div>
    </motion.div>
  )
}
