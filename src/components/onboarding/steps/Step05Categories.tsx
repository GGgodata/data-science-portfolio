import { useOnboarding } from '../../../context/OnboardingContext'
import { CATEGORIES } from '../../../data/categories'
import StepWrapper from '../StepWrapper'
import { cn } from '../../../lib/utils'

export default function Step05Categories() {
  const { data, updateData } = useOnboarding()
  const selected = data.categories ?? []

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((c) => c !== id)
      : [...selected, id]
    updateData({ categories: next })
  }

  return (
    <StepWrapper
      title="באילו תחומים את מקצועית?"
      subtitle="בחרי כמה שאת רוצה — תוכלי להתחיל באחת ולהוסיף אחר כך"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {CATEGORIES.map((c) => {
          const active = selected.includes(c.id)
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              className={cn(
                'flex flex-col items-center gap-2 px-4 py-6 rounded-sm border-2 transition-all text-center',
                active
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream border-stone/30 text-ink hover:border-wine'
              )}
            >
              <span className="text-3xl">{c.icon}</span>
              <span className="text-sm font-medium">{c.name}</span>
            </button>
          )
        })}
      </div>
    </StepWrapper>
  )
}
