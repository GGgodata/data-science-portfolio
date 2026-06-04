import { useMemo, useState } from 'react'
import { MOCK_BOOKINGS, type BookingStatus } from '../../data/mock-bookings'
import BookingCard from '../../components/dashboard/BookingCard'
import BookingTabs from '../../components/dashboard/BookingTabs'

export default function MyJobs() {
  const [active, setActive] = useState<BookingStatus>('upcoming')

  const counts = useMemo(() => {
    const c: Record<BookingStatus, number> = {
      upcoming: 0,
      pending: 0,
      completed: 0,
      cancelled: 0,
    }
    MOCK_BOOKINGS.forEach((b) => (c[b.status] += 1))
    return c
  }, [])

  const list = useMemo(() => {
    const filtered = MOCK_BOOKINGS.filter((b) => b.status === active)
    return filtered.sort((a, b) => {
      const ta = new Date(a.date).getTime()
      const tb = new Date(b.date).getTime()
      return active === 'upcoming' ? ta - tb : tb - ta
    })
  }, [active])

  return (
    <div className="max-w-4xl">
      <BookingTabs active={active} counts={counts} onChange={setActive} />
      {list.length === 0 ? (
        <div className="bg-white/40 border border-stone/15 rounded-sm py-16 text-center text-stone">
          אין הזמנות בקטגוריה זו
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((b) => (
            <BookingCard key={b.id} booking={b} />
          ))}
        </div>
      )}
    </div>
  )
}
