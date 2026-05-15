import { useOnboarding } from '../../../context/OnboardingContext'
import { CATEGORIES } from '../../../data/categories'
import { SUBCATEGORIES } from '../../../data/subcategories'
import StepWrapper from '../StepWrapper'
import { cn } from '../../../lib/utils'

export default function Step06SubCategories() {
  const { data, updateData } = useOnboarding()
  const selected = data.subCategories ?? []
  const selectedCats = data.categories ?? []

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((c) => c !== id)
      : [...selected, id]
    updateData({ subCategories: next })
  }

  return (
    <StepWrapper
      title="מה את מציעה?"
      subtitle="בחרי את השירותים הספציפיים"
    >
      <div className="space-y-10">
        {selectedCats.map((catId) => {
          const cat = CATEGORIES.find((c) => c.id === catId)
          const subs = SUBCATEGORIES[catId] ?? []
          if (!cat) return null
          return (
            <div key={catId}>
              <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {subs.map((s) => {
                  const active = selected.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggle(s.id)}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm border transition-all',
                        active
                          ? 'bg-wine text-cream border-wine'
                          : 'bg-cream text-ink border-stone/30 hover:border-wine'
                      )}
                    >
                      {s.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </StepWrapper>
  )
}

export function isStep06Valid(
  categories: string[] | undefined,
  subCategories: string[] | undefined
): boolean {
  if (!categories || categories.length === 0) return false
  const subs = subCategories ?? []
  return categories.every((catId) => {
    const subIds = (SUBCATEGORIES[catId] ?? []).map((s) => s.id)
    return subs.some((s) => subIds.includes(s))
  })
}
