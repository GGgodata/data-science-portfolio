import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

const DAYS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']

export default function Step10Days() {
  const { data, updateData } = useOnboarding()
  const days = data.availableDays || []

  const toggle = (day: string) => {
    const next = days.includes(day) ? days.filter((d) => d !== day) : [...days, day]
    updateData({ availableDays: next })
  }

  const allSelected = days.length === DAYS.length

  return (
    <StepWrapper title="ימי עבודה" subtitle="באילו ימים את זמינה?">
      <div className="flex justify-between gap-2 mb-6">
        {DAYS.map((day) => {
          const active = days.includes(day)
          return (
            <button
              key={day}
              onClick={() => toggle(day)}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border font-serif text-lg transition-all ${
                active
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream border-stone/30 text-ink hover:border-wine'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
      <button
        onClick={() => updateData({ availableDays: allSelected ? [] : [...DAYS] })}
        className="text-sm text-wine hover:underline"
      >
        {allSelected ? 'נקי הכל' : 'כל הימים'}
      </button>
    </StepWrapper>
  )
}
