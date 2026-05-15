import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  return `${digits.slice(0, 3)}-${digits.slice(3)}`
}

export default function Step02Contact() {
  const { data, updateData } = useOnboarding()

  return (
    <StepWrapper title={`מצוין, ${data.firstName || ''}!`} subtitle="איך נוכל להגיע אלייך?">
      <div className="space-y-8">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone mb-3">
            שם משפחה
          </label>
          <input
            type="text"
            value={data.lastName ?? ''}
            onChange={(e) => updateData({ lastName: e.target.value })}
            placeholder="כהן"
            className="w-full bg-transparent border-0 border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl md:text-3xl py-3 placeholder:text-stone/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone mb-3">
            טלפון נייד
          </label>
          <input
            type="tel"
            value={data.phone ?? ''}
            onChange={(e) => updateData({ phone: formatPhone(e.target.value) })}
            placeholder="050-1234567"
            dir="ltr"
            className="w-full bg-transparent border-0 border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl md:text-3xl py-3 placeholder:text-stone/40 transition-colors text-right"
          />
        </div>
      </div>
    </StepWrapper>
  )
}

export function isValidPhone(phone?: string): boolean {
  if (!phone) return false
  const digits = phone.replace(/\D/g, '')
  return /^05\d{8}$/.test(digits)
}
