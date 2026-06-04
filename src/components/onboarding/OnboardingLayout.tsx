import { ReactNode } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import ProgressBar from './ProgressBar'
import Button from '../ui/Button'

type Props = {
  children: ReactNode
  isValid: boolean
  onNext: () => void
  onPrev: () => void
  nextLabel?: string
}

export default function OnboardingLayout({
  children,
  isValid,
  onNext,
  onPrev,
  nextLabel = 'המשך',
}: Props) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <ProgressBar />
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
      <div className="sticky bottom-0 bg-cream/90 backdrop-blur border-t border-stone/15">
        <div className="mx-auto max-w-2xl px-6 py-4 flex items-center justify-between flex-row-reverse">
          <Button onClick={onNext} disabled={!isValid}>
            {nextLabel}
            <ArrowLeft size={18} />
          </Button>
          <Button variant="ghost" onClick={onPrev}>
            <ArrowRight size={18} />
            הקודם
          </Button>
        </div>
      </div>
    </div>
  )
}
