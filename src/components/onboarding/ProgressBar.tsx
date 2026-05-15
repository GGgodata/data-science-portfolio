import { useOnboarding } from '../../context/OnboardingContext'

export default function ProgressBar() {
  const { step, totalSteps } = useOnboarding()
  const percent = (step / totalSteps) * 100

  return (
    <div className="sticky top-0 z-30 bg-cream/95 backdrop-blur-md border-b border-stone/15">
      <div className="mx-auto max-w-5xl px-6 lg:px-12 py-5 flex items-center gap-6">
        <span className="font-serif text-xl text-ink">NANY</span>
        <div className="flex-1 h-1 bg-stone/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-wine transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-sm text-stone font-medium whitespace-nowrap">
          שלב {step} מתוך {totalSteps}
        </span>
      </div>
    </div>
  )
}
