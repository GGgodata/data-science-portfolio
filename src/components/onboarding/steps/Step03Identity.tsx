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
          <label className="block text-xs uppercase tracking-wider text-stone mb-3">
            תעודת זהות (9 ספרות)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={data.idNumber ?? ''}
            onChange={(e) =>
              updateData({ idNumber: e.target.value.replace(/\D/g, '').slice(0, 9) })
            }
            placeholder="123456789"
            dir="ltr"
            className="w-full bg-transparent border-0 border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl md:text-3xl py-3 placeholder:text-stone/40 transition-colors text-right"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone mb-3">
            תאריך לידה
          </label>
          <input
            type="date"
            value={data.birthDate ?? ''}
            onChange={(e) => updateData({ birthDate: e.target.value })}
            className="w-full bg-transparent border-0 border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl md:text-3xl py-3 placeholder:text-stone/40 transition-colors"
          />
        </div>
        <div className="inline-flex items-center gap-2 bg-wine/10 text-wine px-4 py-2 rounded-full text-xs font-medium">
          <Shield size={14} />
          מוצפן ומאובטח
        </div>
      </div>
    </StepWrapper>
  )
}

export function isValidIdNumber(id?: string): boolean {
  return !!id && /^\d{9}$/.test(id)
}
