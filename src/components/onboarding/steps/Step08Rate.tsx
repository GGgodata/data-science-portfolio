import { useEffect } from 'react'
import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

export default function Step08Rate() {
  const { data, updateData } = useOnboarding()
  const rate = data.hourlyRate ?? 85

  useEffect(() => {
    if (data.hourlyRate === undefined) {
      updateData({ hourlyRate: 85 })
    }
  }, [data.hourlyRate, updateData])

  const monthly = rate * 80

  return (
    <StepWrapper
      title="מה התעריף השעתי שלך?"
      subtitle="תוכלי לשנות בכל עת. השוק בקטגוריות שלך: 65-120₪ לשעה."
    >
      <div className="text-center space-y-8">
        <div className="font-serif text-6xl md:text-7xl">
          {rate} <span className="text-stone text-3xl">₪ / שעה</span>
        </div>
        <input
          type="range"
          min={50}
          max={300}
          step={5}
          value={rate}
          onChange={(e) => updateData({ hourlyRate: Number(e.target.value) })}
          className="w-full accent-wine cursor-pointer"
        />
        <div className="flex justify-between text-xs text-stone">
          <span>50₪</span>
          <span>300₪</span>
        </div>
        <div className="border-t border-stone/20 pt-8 space-y-3 text-sm">
          <div className="flex justify-between text-stone">
            <span>התעריף שלך</span>
            <span className="text-ink font-medium">{rate}₪</span>
          </div>
          <div className="flex justify-between text-stone">
            <span>ממוצע בקטגוריה</span>
            <span className="text-ink font-medium">78₪</span>
          </div>
          <div className="flex justify-between text-stone">
            <span>אומדן הכנסה חודשי (20 עבודות)</span>
            <span className="text-ink font-medium">
              {monthly.toLocaleString('he-IL')}₪
            </span>
          </div>
        </div>
      </div>
    </StepWrapper>
  )
}
