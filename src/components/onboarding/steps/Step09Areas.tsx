import { useOnboarding } from '../../../context/OnboardingContext'
import { CITIES } from '../../../data/cities'
import StepWrapper from '../StepWrapper'
import { cn } from '../../../lib/utils'

export default function Step09Areas() {
  const { data, updateData } = useOnboarding()
  const selected = data.serviceAreas ?? []
  const nearbyOnly = data.nearbyOnly ?? false

  const toggle = (c: string) => {
    const next = selected.includes(c)
      ? selected.filter((x) => x !== c)
      : [...selected, c]
    updateData({ serviceAreas: next })
  }

  return (
    <StepWrapper title="באילו ערים את עובדת?" subtitle="בחרי את האזורים הרלוונטיים">
      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={nearbyOnly}
          onChange={(e) => updateData({ nearbyOnly: e.target.checked })}
          className="w-5 h-5 accent-wine cursor-pointer"
        />
        <span className="text-base">עד 30 ק״מ מהבית שלי</span>
      </label>

      {nearbyOnly && (
        <div className="inline-block bg-wine/10 text-wine px-4 py-2 rounded-full text-xs font-medium mb-6">
          מתאים אוטומטית
        </div>
      )}

      {!nearbyOnly && (
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => {
            const active = selected.includes(c)
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggle(c)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm border transition-all',
                  active
                    ? 'bg-wine text-cream border-wine'
                    : 'bg-cream text-ink border-stone/30 hover:border-wine'
                )}
              >
                {c}
              </button>
            )
          })}
        </div>
      )}
    </StepWrapper>
  )
}
