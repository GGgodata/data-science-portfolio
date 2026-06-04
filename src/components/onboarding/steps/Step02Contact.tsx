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
          <label className="block text-sm text-stone mb-2">שם משפחה</label>
          <input
            type="text"
            value={data.lastName || ''}
            onChange={(e) => updateData({ lastName: e.target.value })}
            placeholder="כהן"
            className="w-full bg-transparent border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl py-2 text-ink placeholder:text-stone/40 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-stone mb-2">טלפון נייד</label>
          <input
            type="tel"
            dir="ltr"
            value={data.phone || ''}
            onChange={(e) => updateData({ phone: formatPhone(e.target.value) })}
            placeholder="050-1234567"
            className="w-full bg-transparent border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl py-2 text-ink placeholder:text-stone/40 transition-colors text-left"
          />
        </div>
      </div>
    </StepWrapper>
  )
}
