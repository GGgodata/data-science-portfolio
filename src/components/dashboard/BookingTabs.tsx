import { cn } from '../../lib/utils'
import type { Booking } from '../../data/mock-bookings'

export type BookingTab = 'upcoming' | 'pending' | 'completed' | 'cancelled'

const TAB_LABELS: Record<BookingTab, string> = {
  upcoming: 'קרובות',
  pending: 'בהמתנה',
  completed: 'הסתיימו',
  cancelled: 'בוטלו',
}

type BookingTabsProps = {
  active: BookingTab
  setActive: (t: BookingTab) => void
  counts: Record<BookingTab, number>
}

export default function BookingTabs({ active, setActive, counts }: BookingTabsProps) {
  const tabs: BookingTab[] = ['upcoming', 'pending', 'completed', 'cancelled']
  return (
    <div className="flex items-center gap-6 border-b border-stone/15 mb-8">
      {tabs.map((t) => {
        const isActive = active === t
        return (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={cn(
              'pb-3 -mb-px text-sm font-medium border-b-2 transition-colors',
              isActive
                ? 'text-wine border-wine'
                : 'text-stone border-transparent hover:text-ink'
            )}
          >
            {TAB_LABELS[t]} ({counts[t]})
          </button>
        )
      })}
    </div>
  )
}

export function countByStatus(bookings: Booking[]): Record<BookingTab, number> {
  return bookings.reduce(
    (acc, b) => {
      acc[b.status] += 1
      return acc
    },
    { upcoming: 0, pending: 0, completed: 0, cancelled: 0 } as Record<BookingTab, number>
  )
}
