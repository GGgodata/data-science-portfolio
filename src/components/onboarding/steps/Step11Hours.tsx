import { Moon } from 'lucide-react'
import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

export default function Step11Hours() {
  const { data, updateData } = useOnboarding()
  const hours = data.availableHours ?? { from: '08:00', to: '18:00', nightShift: false }

  const update = (partial: Partial<typeof hours>) => {
    updateData({ availableHours: { ...hours, ...partial } })
  }

  return (
    <StepWrapper title="שעות עבודה" subtitle="באילו שעות את זמינה?">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone mb-3">
            מ-
          </label>
          <input
            type="time"
            value={hours.from}
            onChange={(e) => update({ from: e.target.value })}
            className="w-full bg-transparent border-0 border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl md:text-3xl py-3"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone mb-3">
            עד-
          </label>
          <input
            type="time"
            value={hours.to}
            onChange={(e) => update({ to: e.target.value })}
            className="w-full bg-transparent border-0 border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl md:text-3xl py-3"
          />
        </div>
      </div>
      <label className="mt-10 flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={!!hours.nightShift}
          onChange={(e) => update({ nightShift: e.target.checked })}
          className="w-5 h-5 accent-wine cursor-pointer"
        />
        <Moon size={18} className="text-stone" />
        <span className="text-base">גם בשעות לילה (אחיות לילה, סייעות 24/7)</span>
      </label>
    </StepWrapper>
  )
}
