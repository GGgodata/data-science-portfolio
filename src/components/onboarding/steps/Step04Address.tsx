import { useOnboarding } from '../../../context/OnboardingContext'
import { CITIES } from '../../../data/cities'
import StepWrapper from '../StepWrapper'

export default function Step04Address() {
  const { data, updateData } = useOnboarding()

  return (
    <StepWrapper
      title="איפה את גרה?"
      subtitle="האזור שלך עוזר לנו לקשר אותך ללקוחות קרובים"
    >
      <div className="space-y-8">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone mb-3">
            עיר
          </label>
          <select
            value={data.city ?? ''}
            onChange={(e) => updateData({ city: e.target.value })}
            className="w-full bg-transparent border-0 border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl md:text-3xl py-3 transition-colors appearance-none cursor-pointer"
          >
            <option value="">בחרי עיר…</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone mb-3">
            כתובת מלאה
          </label>
          <input
            type="text"
            value={data.address ?? ''}
            onChange={(e) => updateData({ address: e.target.value })}
            placeholder="רחוב הרצל 25"
            className="w-full bg-transparent border-0 border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl md:text-3xl py-3 placeholder:text-stone/40 transition-colors"
          />
        </div>
      </div>
    </StepWrapper>
  )
}
