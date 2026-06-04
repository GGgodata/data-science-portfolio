import { useMemo, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import WeeklyCalendar from '../../components/dashboard/WeeklyCalendar'
import { MOCK_BOOKINGS } from '../../data/mock-bookings'

const HE_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
]

function getSunday(d: Date): Date {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() - date.getDay())
  return date
}

const UPCOMING = MOCK_BOOKINGS.filter((b) => b.status === 'upcoming')

export default function Schedule() {
  const [weekStart, setWeekStart] = useState(() => getSunday(new Date('2026-05-17')))

  const weekEnd = useMemo(() => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + 6)
    return d
  }, [weekStart])

  const shift = (weeks: number) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + weeks * 7)
    setWeekStart(d)
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => shift(-1)}
          className="inline-flex items-center gap-1 text-sm text-stone hover:text-wine"
        >
          <ChevronRight size={18} />
          שבוע קודם
        </button>
        <div className="font-serif text-lg text-ink">
          {weekStart.getDate()}.{weekStart.getMonth() + 1} – {weekEnd.getDate()}.
          {weekEnd.getMonth() + 1} · {HE_MONTHS[weekStart.getMonth()]} {weekStart.getFullYear()}
        </div>
        <button
          onClick={() => shift(1)}
          className="inline-flex items-center gap-1 text-sm text-stone hover:text-wine"
        >
          שבוע הבא
          <ChevronLeft size={18} />
        </button>
      </div>

      <WeeklyCalendar weekStart={weekStart} bookings={UPCOMING} />
    </div>
  )
}
