import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { OnboardingData } from '../../context/OnboardingContext'
import Button from '../ui/Button'

type Props = {
  data: OnboardingData
  onChange: (partial: Partial<OnboardingData>) => void
}

const inputClass =
  'w-full bg-white/60 border border-stone/20 focus:border-wine outline-none rounded-sm px-3 py-2 text-sm'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-stone/15 rounded-sm bg-white/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <span className="font-serif text-lg text-ink">{title}</span>
        <ChevronDown
          size={18}
          className={`text-stone transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          {children}
          <Button size="sm" onClick={() => alert('נשמר ✓')}>
            שמרי
          </Button>
        </div>
      )}
    </div>
  )
}

export default function ProfileEditor({ data, onChange }: Props) {
  return (
    <div className="space-y-3">
      <Section title="מידע אישי">
        <input
          className={inputClass}
          value={data.firstName || ''}
          onChange={(e) => onChange({ firstName: e.target.value })}
          placeholder="שם פרטי"
        />
        <input
          className={inputClass}
          value={data.lastName || ''}
          onChange={(e) => onChange({ lastName: e.target.value })}
          placeholder="שם משפחה"
        />
        <input
          className={inputClass}
          dir="ltr"
          value={data.phone || ''}
          onChange={(e) => onChange({ phone: e.target.value })}
          placeholder="טלפון"
        />
      </Section>

      <Section title="כתובת ועיר">
        <input
          className={inputClass}
          value={data.city || ''}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="עיר"
        />
        <input
          className={inputClass}
          value={data.address || ''}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="כתובת"
        />
      </Section>

      <Section title="קטגוריות שירות">
        <p className="text-sm text-stone">
          {(data.categories || []).length} קטגוריות,{' '}
          {(data.subCategories || []).length} שירותים נבחרו.
        </p>
      </Section>

      <Section title="תעריפים">
        <label className="block text-sm text-stone">תעריף שעתי: ₪{data.hourlyRate ?? 0}</label>
        <input
          type="range"
          min={50}
          max={300}
          step={5}
          value={data.hourlyRate ?? 85}
          onChange={(e) => onChange({ hourlyRate: Number(e.target.value) })}
          className="w-full"
        />
      </Section>

      <Section title="אזורי שירות וזמינות">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={data.anywhere || false}
            onChange={(e) => onChange({ anywhere: e.target.checked })}
            className="accent-wine"
          />
          עד 30 ק״מ מהבית
        </label>
        <p className="text-sm text-stone">
          ימים: {(data.availableDays || []).join(', ') || '—'}
        </p>
      </Section>

      <Section title="ביו ותמונה">
        <textarea
          className={`${inputClass} resize-none`}
          rows={4}
          maxLength={300}
          value={data.bio || ''}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="ספרי על עצמך..."
        />
      </Section>
    </div>
  )
}
