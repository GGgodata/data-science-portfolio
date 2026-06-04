import { useOnboarding } from '../../context/OnboardingContext'

export default function ProgressBar() {
  const { step, totalSteps } = useOnboarding()
  const pct = (step / totalSteps) * 100

  return (
    <div className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-stone/15">
      <div className="mx-auto max-w-2xl px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-serif text-lg text-wine">NANY</span>
          <span className="text-sm text-stone">
            שלב {step} מתוך {totalSteps}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-stone/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-wine transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
