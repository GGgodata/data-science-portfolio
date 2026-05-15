import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import WeeklyCalendar from '../../components/dashboard/WeeklyCalendar'
import { MOCK_BOOKINGS } from '../../data/mock-bookings'

function getWeekStart(d: Date): Date {
  const result = new Date(d)
  result.setHours(0, 0, 0, 0)
  // Hebrew week starts Sunday; getDay returns 0 for Sunday
  const dayOfWeek = result.getDay()
  result.setDate(result.getDate() - dayOfWeek)
  return result
}

export default function Schedule() {
  const [weekStart, setWeekStart] = useState<Date>(() => getWeekStart(new Date('2026-05-17')))

  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)

  const monthLabel = weekStart.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })

  const prevWeek = () => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() - 7)
    setWeekStart(d)
  }
  const nextWeek = () => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + 7)
    setWeekStart(d)
  }

  const weekBookings = useMemo(() => {
    const end = new Date(weekStart)
    end.setDate(end.getDate() + 7)
    return MOCK_BOOKINGS.filter(
      (b) =>
        b.status === 'upcoming' &&
        new Date(b.date) >= weekStart &&
        new Date(b.date) < end
    )
  }, [weekStart])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevWeek}
          className="flex items-center gap-1 text-sm text-stone hover:text-ink"
        >
          <ChevronRight size={16} /> שבוע קודם
        </button>
        <div className="font-serif text-xl">
          {weekStart.getDate()}—{weekEnd.getDate()} {monthLabel}
        </div>
        <button
          onClick={nextWeek}
          className="flex items-center gap-1 text-sm text-stone hover:text-ink"
        >
          שבוע הבא <ChevronLeft size={16} />
        </button>
      </div>

      <WeeklyCalendar weekStart={weekStart} bookings={weekBookings} />

      <p className="mt-4 text-xs text-stone text-center">
        לחיצה על תא ריק חוסמת אותו ללוז. עבודות מתוזמנות מסומנות ב-wine.
      </p>
    </div>
  )
}
