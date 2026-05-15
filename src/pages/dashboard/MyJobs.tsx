import { useMemo, useState } from 'react'
import { Inbox } from 'lucide-react'
import BookingTabs, {
  countByStatus,
  type BookingTab,
} from '../../components/dashboard/BookingTabs'
import BookingCard from '../../components/dashboard/BookingCard'
import { MOCK_BOOKINGS } from '../../data/mock-bookings'

export default function MyJobs() {
  const [tab, setTab] = useState<BookingTab>('upcoming')
  const counts = useMemo(() => countByStatus(MOCK_BOOKINGS), [])

  const visible = useMemo(() => {
    const list = MOCK_BOOKINGS.filter((b) => b.status === tab)
    if (tab === 'upcoming') {
      return list.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    }
    return list.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [tab])

  return (
    <div>
      <BookingTabs active={tab} setActive={setTab} counts={counts} />

      {visible.length === 0 ? (
        <div className="bg-cream border border-dashed border-stone/30 rounded-sm py-16 text-center text-stone">
          <Inbox className="mx-auto mb-3 text-stone/60" size={40} strokeWidth={1.4} />
          <p>אין עבודות בקטגוריה הזו</p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((b) => (
            <BookingCard key={b.id} booking={b} />
          ))}
        </div>
      )}
    </div>
  )
}
