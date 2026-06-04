import { Shield } from 'lucide-react'
import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

export default function Step03Identity() {
  const { data, updateData } = useOnboarding()
  return (
    <StepWrapper
      title="אימות זהות"
      subtitle="המידע הזה חסוי לחלוטין ומשמש אך ורק לאימות"
    >
      <div className="space-y-8">
        <div>
          <label className="block text-sm text-stone mb-2">תעודת זהות (9 ספרות)</label>
          <input
            type="text"
            inputMode="numeric"
            dir="ltr"
            value={data.idNumber || ''}
            onChange={(e) =>
              updateData({ idNumber: e.target.value.replace(/\D/g, '').slice(0, 9) })
            }
            placeholder="123456789"
            className="w-full bg-transparent border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl py-2 text-ink placeholder:text-stone/40 transition-colors text-left"
          />
        </div>
        <div>
          <label className="block text-sm text-stone mb-2">תאריך לידה</label>
          <input
            type="date"
            value={data.birthDate || ''}
            onChange={(e) => updateData({ birthDate: e.target.value })}
            className="w-full bg-transparent border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl py-2 text-ink transition-colors"
          />
        </div>
        <div className="inline-flex items-center gap-2 text-sm text-wine bg-wine/5 px-4 py-2 rounded-sm">
          <Shield size={16} />
          מוצפן ומאובטח
        </div>
      </div>
    </StepWrapper>
  )
}
