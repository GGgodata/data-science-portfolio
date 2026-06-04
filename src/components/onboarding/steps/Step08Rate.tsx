import { useEffect } from 'react'
import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'
import { shekel } from '../../../lib/format'

const CATEGORY_AVG = 78

export default function Step08Rate() {
  const { data, updateData } = useOnboarding()
  const rate = data.hourlyRate ?? 85

  useEffect(() => {
    if (data.hourlyRate === undefined) updateData({ hourlyRate: 85 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const monthly = rate * 4 * 20 // rough: 4h avg × 20 jobs

  return (
    <StepWrapper
      title="מה התעריף השעתי שלך?"
      subtitle="תוכלי לשנות בכל עת. השוק בקטגוריות שלך: 65-120₪ לשעה."
    >
      <div className="text-center mb-10">
        <div className="font-serif text-6xl text-wine">
          <span className="ltr-nums">{rate}</span> ₪
        </div>
        <div className="text-stone mt-1">לשעה</div>
      </div>

      <input
        type="range"
        min={50}
        max={300}
        step={5}
        value={rate}
        onChange={(e) => updateData({ hourlyRate: Number(e.target.value) })}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-stone mt-2">
        <span>₪50</span>
        <span>₪300</span>
      </div>

      <div className="mt-10 space-y-3 bg-white/50 border border-stone/15 rounded-sm p-5 text-sm">
        <div className="flex justify-between">
          <span className="text-stone">התעריף שלך</span>
          <span className="font-medium text-ink">{shekel(rate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone">ממוצע בקטגוריה</span>
          <span className="font-medium text-ink">{shekel(CATEGORY_AVG)}</span>
        </div>
        <div className="flex justify-between border-t border-stone/15 pt-3">
          <span className="text-stone">אומדן הכנסה חודשי (ב-20 עבודות)</span>
          <span className="font-serif text-lg text-wine">{shekel(monthly)}</span>
        </div>
      </div>
    </StepWrapper>
  )
}
