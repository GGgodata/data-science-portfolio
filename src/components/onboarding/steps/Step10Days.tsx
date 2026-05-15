import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'
import { cn } from '../../../lib/utils'

const DAYS = [
  { id: 'sun', label: 'א' },
  { id: 'mon', label: 'ב' },
  { id: 'tue', label: 'ג' },
  { id: 'wed', label: 'ד' },
  { id: 'thu', label: 'ה' },
  { id: 'fri', label: 'ו' },
  { id: 'sat', label: 'ש' },
]

export default function Step10Days() {
  const { data, updateData } = useOnboarding()
  const selected = data.availableDays ?? []

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id]
    updateData({ availableDays: next })
  }

  const selectAll = () => {
    updateData({ availableDays: DAYS.map((d) => d.id) })
  }

  return (
    <StepWrapper title="ימי עבודה" subtitle="באילו ימים את זמינה?">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {DAYS.map((d) => {
          const active = selected.includes(d.id)
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => toggle(d.id)}
              className={cn(
                'w-16 h-16 md:w-20 md:h-20 rounded-full border-2 font-serif text-2xl transition-all',
                active
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream text-ink border-stone/30 hover:border-wine'
              )}
            >
              {d.label}
            </button>
          )
        })}
      </div>
      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={selectAll}
          className="text-sm text-wine hover:underline"
        >
          כל הימים
        </button>
      </div>
    </StepWrapper>
  )
}
