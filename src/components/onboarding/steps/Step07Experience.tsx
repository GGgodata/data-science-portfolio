import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

const OPTIONS = ['0-1 שנים', '1-3 שנים', '3-5 שנים', '5-10 שנים', '10+ שנים']

export default function Step07Experience() {
  const { data, updateData } = useOnboarding()
  return (
    <StepWrapper
      title="כמה שנות ניסיון יש לך?"
      subtitle="זה משפיע על ההמלצות שלנו לתעריף"
    >
      <div className="flex flex-col md:flex-row gap-3">
        {OPTIONS.map((opt) => {
          const active = data.yearsOfExperience === opt
          return (
            <button
              key={opt}
              onClick={() => updateData({ yearsOfExperience: opt })}
              className={`flex-1 rounded-sm border px-4 py-4 font-medium transition-all ${
                active
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream border-stone/30 text-ink hover:border-wine'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </StepWrapper>
  )
}
