import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useOnboarding } from '../../context/OnboardingContext'
import ProgressBar from './ProgressBar'

type OnboardingLayoutProps = {
  children: ReactNode
  isValid: boolean
  onNext?: () => void
}

export default function OnboardingLayout({ children, isValid, onNext }: OnboardingLayoutProps) {
  const { step, next, prev, totalSteps } = useOnboarding()
  const navigate = useNavigate()
  const isLast = step === totalSteps

  const handlePrev = () => {
    if (step === 1) {
      navigate('/providers/join')
    } else {
      prev()
    }
  }

  const handleNext = () => {
    if (!isValid) return
    if (onNext) onNext()
    else next()
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <ProgressBar />
      <main className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12">
        {children}
      </main>
      <footer className="border-t border-stone/15 bg-cream sticky bottom-0">
        <div className="mx-auto max-w-2xl px-6 lg:px-12 py-5 flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 text-stone hover:text-ink transition-colors text-sm font-medium"
          >
            <ArrowRight size={18} />
            הקודם
          </button>
          {!isLast && (
            <button
              onClick={handleNext}
              disabled={!isValid}
              className="flex items-center gap-2 bg-wine text-cream px-7 py-3 rounded-full text-sm font-medium hover:bg-wine/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              המשך
              <ArrowLeft size={18} />
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
