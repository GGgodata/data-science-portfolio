import { useOnboarding } from '../../../context/OnboardingContext'
import { CITIES } from '../../../data/categories'
import StepWrapper from '../StepWrapper'

export default function Step09Areas() {
  const { data, updateData } = useOnboarding()
  const areas = data.serviceAreas || []
  const anywhere = data.anywhere || false

  const toggle = (city: string) => {
    const next = areas.includes(city)
      ? areas.filter((c) => c !== city)
      : [...areas, city]
    updateData({ serviceAreas: next })
  }

  return (
    <StepWrapper title="באילו ערים את עובדת?" subtitle="בחרי את האזורים הרלוונטיים">
      <label className="flex items-center gap-3 mb-6 cursor-pointer bg-white/50 border border-stone/15 rounded-sm px-4 py-3">
        <input
          type="checkbox"
          checked={anywhere}
          onChange={(e) => updateData({ anywhere: e.target.checked })}
          className="w-5 h-5 accent-wine"
        />
        <span className="text-ink">עד 30 ק״מ מהבית שלי</span>
        {anywhere && (
          <span className="mr-auto text-sm text-wine bg-wine/10 px-3 py-1 rounded-full">
            מתאים אוטומטית
          </span>
        )}
      </label>

      <div className={`flex flex-wrap gap-2 ${anywhere ? 'opacity-40 pointer-events-none' : ''}`}>
        {CITIES.map((city) => {
          const active = areas.includes(city)
          return (
            <button
              key={city}
              onClick={() => toggle(city)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                active
                  ? 'bg-wine text-cream border-wine'
                  : 'bg-cream border-stone/30 text-ink hover:border-wine'
              }`}
            >
              {city}
            </button>
          )
        })}
      </div>
    </StepWrapper>
  )
}
