import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'
import { cn } from '../../../lib/utils'

const OPTIONS = ['0-1 שנים', '1-3 שנים', '3-5 שנים', '5-10 שנים', '10+ שנים']

export default function Step07Experience() {
  const { data, updateData } = useOnboarding()

  return (
    <StepWrapper
      title="כמה שנות ניסיון יש לך?"
      subtitle="זה משפיע על המלצות שלנו לתעריף"
    >
      <div className="flex flex-col md:flex-row flex-wrap gap-3">
        {OPTIONS.map((opt) => {
          const active = data.yearsOfExperience === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => updateData({ yearsOfExperience: opt })}
              className={cn(
                'px-6 py-4 rounded-full border-2 text-base font-medium transition-all flex-1 md:flex-none',
                active
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream text-ink border-stone/30 hover:border-wine'
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </StepWrapper>
  )
}
