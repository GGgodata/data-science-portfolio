import { useState } from 'react'
import { cn } from '../../lib/utils'
import type { Booking } from '../../data/mock-bookings'

const HOUR_START = 6
const HOUR_END = 21
const HOURS = Array.from(
  { length: HOUR_END - HOUR_START + 1 },
  (_, i) => i + HOUR_START
)
const DAY_LABELS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']

type CellKey = string

function cellKey(date: Date, hour: number): CellKey {
  return `${date.toISOString().slice(0, 10)}-${hour}`
}

type WeeklyCalendarProps = {
  weekStart: Date
  bookings: Booking[]
}

export default function WeeklyCalendar({ weekStart, bookings }: WeeklyCalendarProps) {
  const [blocked, setBlocked] = useState<Set<CellKey>>(new Set())

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })

  const toggleBlock = (key: CellKey) => {
    setBlocked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // For each day-hour, find booking starting there or covering it
  const dayBookings: Record<number, Booking[]> = {}
  days.forEach((d, idx) => {
    const dayKey = d.toISOString().slice(0, 10)
    dayBookings[idx] = bookings.filter(
      (b) => new Date(b.date).toISOString().slice(0, 10) === dayKey
    )
  })

  // Calc grid: rows 1 = header. body rows 2..17 = 16 hours
  return (
    <div className="overflow-x-auto bg-cream border border-stone/15 rounded-sm">
      <div
        className="grid min-w-[800px]"
        style={{
          gridTemplateColumns: '80px repeat(7, 1fr)',
          gridTemplateRows: `40px repeat(${HOURS.length}, 50px)`,
        }}
      >
        {/* Header row */}
        <div
          className="border-b border-l border-stone/15 text-xs text-stone flex items-center justify-center bg-stone/5"
          style={{ gridColumn: 1, gridRow: 1 }}
        >
          שעה
        </div>
        {days.map((d, i) => (
          <div
            key={`head-${i}`}
            className="border-b border-l last:border-l-0 border-stone/15 text-center bg-stone/5 flex flex-col items-center justify-center"
            style={{ gridColumn: i + 2, gridRow: 1 }}
          >
            <div className="text-xs text-stone">{DAY_LABELS[i]}</div>
            <div className="text-sm font-medium">
              {d.getDate()}.{d.getMonth() + 1}
            </div>
          </div>
        ))}

        {/* Hour labels */}
        {HOURS.map((h, hi) => (
          <div
            key={`hr-${h}`}
            className="border-b border-l border-stone/15 text-xs text-stone flex items-center justify-center"
            style={{ gridColumn: 1, gridRow: hi + 2 }}
          >
            {h.toString().padStart(2, '0')}:00
          </div>
        ))}

        {/* Cells for each day-hour */}
        {days.map((d, di) =>
          HOURS.map((h, hi) => {
            const dayBks = dayBookings[di]
            const startingHere = dayBks.find(
              (b) => new Date(b.date).getHours() === h
            )
            const coveringThis = dayBks.find((b) => {
              const start = new Date(b.date).getHours()
              return h > start && h < start + b.duration
            })

            if (coveringThis) return null

            const key = cellKey(d, h)
            const isBlocked = blocked.has(key)

            if (startingHere) {
              const span = Math.min(startingHere.duration, HOUR_END - h + 1)
              return (
                <div
                  key={`bk-${di}-${h}`}
                  className="border-b border-l last:border-l-0 border-stone/15 bg-wine text-cream p-1.5"
                  style={{
                    gridColumn: di + 2,
                    gridRow: `${hi + 2} / span ${span}`,
                  }}
                >
                  <div className="text-xs font-medium leading-tight truncate">
                    {startingHere.client.name}
                  </div>
                  <div className="text-[10px] opacity-80 leading-tight mt-0.5">
                    {new Date(startingHere.date).toLocaleTimeString('he-IL', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    · {startingHere.duration} ש׳
                  </div>
                </div>
              )
            }

            return (
              <button
                key={`c-${di}-${h}`}
                onClick={() => toggleBlock(key)}
                style={{ gridColumn: di + 2, gridRow: hi + 2 }}
                className={cn(
                  'border-b border-l last:border-l-0 border-stone/15 transition-colors text-[10px]',
                  isBlocked ? 'bg-stone/30 text-stone' : 'hover:bg-wine/5'
                )}
              >
                {isBlocked && 'חסום'}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
