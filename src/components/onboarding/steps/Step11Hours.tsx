import { Moon } from 'lucide-react'
import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

export default function Step11Hours() {
  const { data, updateData } = useOnboarding()
  const hours = data.availableHours || { from: '08:00', to: '17:00', nightShift: false }

  const set = (partial: Partial<typeof hours>) =>
    updateData({ availableHours: { ...hours, ...partial } })

  return (
    <StepWrapper title="שעות עבודה" subtitle="באילו שעות את זמינה?">
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block text-sm text-stone mb-2">מ-</label>
          <input
            type="time"
            value={hours.from}
            onChange={(e) => set({ from: e.target.value })}
            className="w-full bg-transparent border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl py-2 text-ink"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-stone mb-2">עד-</label>
          <input
            type="time"
            value={hours.to}
            onChange={(e) => set({ to: e.target.value })}
            className="w-full bg-transparent border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-2xl py-2 text-ink"
          />
        </div>
      </div>

      <label className="flex items-center gap-3 mt-8 cursor-pointer">
        <input
          type="checkbox"
          checked={hours.nightShift || false}
          onChange={(e) => set({ nightShift: e.target.checked })}
          className="w-5 h-5 accent-wine"
        />
        <Moon size={18} className="text-wine" />
        <span className="text-ink">גם בשעות לילה (אחיות לילה, סייעות 24/7)</span>
      </label>
    </StepWrapper>
  )
}
