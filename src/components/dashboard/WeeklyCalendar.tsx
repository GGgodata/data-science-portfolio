import { useState } from 'react'
import type { Booking } from '../../data/mock-bookings'

const DAY_LABELS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']
const HOURS = Array.from({ length: 16 }, (_, i) => i + 6) // 06:00 - 21:00

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export default function WeeklyCalendar({
  weekStart,
  bookings,
}: {
  weekStart: Date
  bookings: Booking[]
}) {
  const [blocked, setBlocked] = useState<Set<string>>(new Set())

  const days = Array.from({ length: 7 }, (_, d) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + d)
    return date
  })

  const toggleBlock = (key: string) => {
    setBlocked((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <div className="overflow-x-auto">
      <div
        className="grid min-w-[700px] border border-stone/15 rounded-sm bg-white/40"
        style={{
          gridTemplateColumns: '56px repeat(7, 1fr)',
          gridTemplateRows: `auto repeat(${HOURS.length}, 40px)`,
        }}
      >
        {/* corner */}
        <div className="border-b border-l border-stone/15" />
        {/* day headers */}
        {days.map((date, d) => (
          <div
            key={d}
            className="border-b border-l last:border-l-0 border-stone/15 text-center py-2 text-sm"
          >
            <div className="text-ink font-medium">{DAY_LABELS[d]}</div>
            <div className="text-xs text-stone">
              {date.getDate()}.{date.getMonth() + 1}
            </div>
          </div>
        ))}

        {/* hour labels + background cells */}
        {HOURS.map((h, hi) => (
          <div key={`label-${h}`} className="contents">
            <div
              className="border-l border-stone/15 text-xs text-stone text-center pt-1"
              style={{ gridColumn: 1, gridRow: hi + 2 }}
            >
              {String(h).padStart(2, '0')}:00
            </div>
            {days.map((_, d) => {
              const key = `${d}-${h}`
              const isBlocked = blocked.has(key)
              return (
                <button
                  key={key}
                  onClick={() => toggleBlock(key)}
                  style={{ gridColumn: d + 2, gridRow: hi + 2 }}
                  className={`border-b border-l last:border-l-0 border-stone/10 transition-colors ${
                    isBlocked ? 'bg-lavender' : 'hover:bg-wine/5'
                  }`}
                  title={isBlocked ? 'חסום — לחצי לפינוי' : 'זמינה — לחצי לחסימה'}
                />
              )
            })}
          </div>
        ))}

        {/* booking blocks */}
        {bookings.map((b) => {
          const date = new Date(b.date)
          const dayIndex = days.findIndex((d) => sameDay(d, date))
          if (dayIndex === -1) return null
          const startHour = date.getHours()
          const startRow = startHour - 6 + 2
          if (startRow < 2) return null
          const span = Math.min(b.duration, HOURS.length - (startHour - 6))
          return (
            <div
              key={b.id}
              style={{
                gridColumn: dayIndex + 2,
                gridRow: `${startRow} / span ${span}`,
              }}
              className="m-0.5 rounded-sm bg-wine text-cream text-xs p-1.5 overflow-hidden z-10"
            >
              <div className="font-medium truncate">{b.client.name}</div>
              <div className="opacity-80">
                {String(startHour).padStart(2, '0')}:00
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 mt-3 text-xs text-stone">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-wine inline-block" /> עבודה
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-lavender inline-block" /> חסום
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-stone/30 inline-block" /> זמינה
        </span>
      </div>
    </div>
  )
}
