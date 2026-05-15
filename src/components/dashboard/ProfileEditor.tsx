import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { CATEGORIES } from '../../data/categories'
import { CITIES } from '../../data/cities'
import type { ProviderSummary } from '../../lib/provider'

type ProfileEditorProps = {
  provider: ProviderSummary
  onChange: (next: ProviderSummary) => void
}

type SectionProps = {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  onSave: () => void
}

function Section({ title, children, defaultOpen, onSave }: SectionProps) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="border border-stone/15 rounded-sm bg-cream">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-right hover:bg-stone/[0.03]"
      >
        <span className="font-serif text-lg">{title}</span>
        <ChevronDown
          size={18}
          className={cn('text-stone transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-stone/15 pt-5 space-y-4">
          {children}
          <div className="flex justify-end">
            <button
              onClick={onSave}
              className="bg-wine text-cream text-sm px-5 py-2 rounded-full hover:bg-wine/90 transition-colors"
            >
              שמרי
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProfileEditor({ provider, onChange }: ProfileEditorProps) {
  const update = (partial: Partial<ProviderSummary>) =>
    onChange({ ...provider, ...partial })

  const saved = () => alert('נשמר ✓')

  const toggleCategory = (id: string) => {
    const list = provider.categories ?? []
    const next = list.includes(id) ? list.filter((c) => c !== id) : [...list, id]
    update({ categories: next })
  }

  return (
    <div className="space-y-3">
      <Section title="מידע אישי" onSave={saved} defaultOpen>
        <Input
          label="שם פרטי"
          value={provider.firstName ?? ''}
          onChange={(v) => update({ firstName: v })}
        />
        <Input
          label="שם משפחה"
          value={provider.lastName ?? ''}
          onChange={(v) => update({ lastName: v })}
        />
        <Input
          label="טלפון"
          value={provider.phone ?? ''}
          onChange={(v) => update({ phone: v })}
        />
      </Section>

      <Section title="כתובת ועיר" onSave={saved}>
        <SelectField
          label="עיר"
          value={provider.city ?? ''}
          options={CITIES.map((c) => ({ value: c, label: c }))}
          onChange={(v) => update({ city: v })}
        />
        <Input
          label="כתובת"
          value={provider.address ?? ''}
          onChange={(v) => update({ address: v })}
        />
      </Section>

      <Section title="קטגוריות שירות" onSave={saved}>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = (provider.categories ?? []).includes(c.id)
            return (
              <button
                key={c.id}
                onClick={() => toggleCategory(c.id)}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-full border transition-all',
                  active
                    ? 'bg-wine text-cream border-wine'
                    : 'bg-cream text-ink border-stone/30 hover:border-wine'
                )}
              >
                {c.icon} {c.name}
              </button>
            )
          })}
        </div>
      </Section>

      <Section title="תעריפים" onSave={saved}>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={50}
            max={300}
            step={5}
            value={provider.hourlyRate ?? 85}
            onChange={(e) => update({ hourlyRate: Number(e.target.value) })}
            className="flex-1 accent-wine"
          />
          <span className="font-serif text-xl w-24 text-left">
            ₪{provider.hourlyRate ?? 85}
          </span>
        </div>
      </Section>

      <Section title="זמינות ואזורים" onSave={saved}>
        <p className="text-sm text-stone">
          זמין כרגע: {provider.availableHours?.from} — {provider.availableHours?.to}
        </p>
        <p className="text-sm text-stone">
          אזורים:{' '}
          {provider.nearbyOnly
            ? 'עד 30 ק״מ מהבית'
            : provider.serviceAreas?.join(', ') || '—'}
        </p>
        <p className="text-xs text-stone">
          (עריכת זמינות מפורטת תיפתח במסך נפרד)
        </p>
      </Section>

      <Section title="ביו ותמונה" onSave={saved}>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone mb-2">
            ביו
          </label>
          <textarea
            value={provider.bio ?? ''}
            onChange={(e) => update({ bio: e.target.value })}
            rows={4}
            className="w-full bg-cream border border-stone/30 focus:border-wine outline-none rounded-sm p-3 text-sm transition-colors"
          />
        </div>
      </Section>
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-stone mb-2">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-cream border border-stone/30 focus:border-wine outline-none rounded-sm p-2 text-base transition-colors"
      />
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-stone mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-cream border border-stone/30 focus:border-wine outline-none rounded-sm p-2 text-base transition-colors"
      >
        <option value="">בחרי…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
