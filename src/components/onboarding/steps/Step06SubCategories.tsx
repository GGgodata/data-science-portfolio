import { useOnboarding } from '../../../context/OnboardingContext'
import { CATEGORY_BY_ID } from '../../../data/categories'
import { SUBCATEGORIES } from '../../../data/subcategories'
import StepWrapper from '../StepWrapper'

export default function Step06SubCategories() {
  const { data, updateData } = useOnboarding()
  const cats = data.categories || []
  const selected = data.subCategories || []

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id]
    updateData({ subCategories: next })
  }

  return (
    <StepWrapper
      title="מה את מציעה בתחומים שבחרת?"
      subtitle="בחרי את השירותים הספציפיים"
    >
      <div className="space-y-8">
        {cats.map((catId) => {
          const cat = CATEGORY_BY_ID[catId]
          const subs = SUBCATEGORIES[catId] || []
          return (
            <div key={catId}>
              <h4 className="font-serif text-lg text-ink mb-3 flex items-center gap-2">
                <span>{cat?.emoji}</span>
                {cat?.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {subs.map((sub) => {
                  const active = selected.includes(sub.id)
                  return (
                    <button
                      key={sub.id}
                      onClick={() => toggle(sub.id)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        active
                          ? 'bg-wine text-cream border-wine'
                          : 'bg-cream border-stone/30 text-ink hover:border-wine'
                      }`}
                    >
                      {sub.name}
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
