import type { BookingStatus } from '../../data/mock-bookings'

export const TABS: { id: BookingStatus; label: string }[] = [
  { id: 'upcoming', label: 'קרובות' },
  { id: 'pending', label: 'בהמתנה' },
  { id: 'completed', label: 'הסתיימו' },
  { id: 'cancelled', label: 'בוטלו' },
]

export default function BookingTabs({
  active,
  counts,
  onChange,
}: {
  active: BookingStatus
  counts: Record<BookingStatus, number>
  onChange: (s: BookingStatus) => void
}) {
  return (
    <div className="flex gap-6 border-b border-stone/15 mb-6">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`pb-3 -mb-px border-b-2 text-sm transition-colors ${
            active === tab.id
              ? 'border-wine text-wine font-medium'
              : 'border-transparent text-stone hover:text-ink'
          }`}
        >
          {tab.label} ({counts[tab.id]})
        </button>
      ))}
    </div>
  )
}
