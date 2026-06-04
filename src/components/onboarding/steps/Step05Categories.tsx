import { useOnboarding } from '../../../context/OnboardingContext'
import { CATEGORIES } from '../../../data/categories'
import StepWrapper from '../StepWrapper'

export default function Step05Categories() {
  const { data, updateData } = useOnboarding()
  const selected = data.categories || []

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
        {CATEGORIES.map((cat) => {
          const active = selected.includes(cat.id)
          return (
            <button
              key={cat.id}
              onClick={() => toggle(cat.id)}
              className={`flex flex-col items-center gap-2 rounded-sm border p-4 transition-all ${
                active
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream border-stone/30 text-ink hover:border-wine'
              }`}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-sm font-medium text-center">{cat.name}</span>
            </button>
          )
        })}
      </div>
    </StepWrapper>
  )
}
