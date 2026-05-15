import { Calendar, Clock, Navigation, MessageCircle, X, Bell, Star } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Booking } from '../../data/mock-bookings'

const STATUS_BADGE: Record<Booking['status'], { text: string; cls: string }> = {
  upcoming: { text: '📅 קרוב', cls: 'bg-emerald-700/10 text-emerald-700' },
  pending: { text: '⏳ ממתין לאישור', cls: 'bg-amber-600/10 text-amber-700' },
  completed: { text: '✓ הושלם', cls: 'bg-stone/15 text-stone' },
  cancelled: { text: '✗ בוטל', cls: 'bg-red-700/10 text-red-700' },
}

type BookingCardProps = {
  booking: Booking
}

export default function BookingCard({ booking }: BookingCardProps) {
  const d = new Date(booking.date)
  const dateStr = d.toLocaleDateString('he-IL', {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
  })
  const timeStr = d.toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const badge = STATUS_BADGE[booking.status]

  return (
    <article className="bg-cream border border-stone/15 rounded-sm p-5 flex flex-col md:flex-row md:items-center gap-4">
      <img
        src={booking.client.photo}
        alt={booking.client.name}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="font-medium">{booking.client.name}</div>
        <div className="text-xs text-stone mt-1 flex flex-wrap gap-x-3 gap-y-1">
          <span>{booking.category}</span>
          <span>·</span>
          <span>{booking.city}</span>
        </div>
      </div>

      <div className="text-sm text-stone flex flex-col gap-1 md:items-end">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          {dateStr} · {timeStr}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} />
          {booking.duration} שעות · ₪{booking.totalEarnings}
        </div>
      </div>

      <span
        className={cn(
          'text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap',
          badge.cls
        )}
      >
        {badge.text}
      </span>

      <div className="flex items-center gap-1 text-stone">
        {booking.status === 'upcoming' && (
          <>
            <button
              className="hover:text-wine transition-colors p-2"
              aria-label="ניווט"
            >
              <Navigation size={16} />
            </button>
            <button
              className="hover:text-wine transition-colors p-2"
              aria-label="הודעה"
            >
              <MessageCircle size={16} />
            </button>
            <button
              className="hover:text-wine transition-colors p-2"
              aria-label="ביטול"
            >
              <X size={16} />
            </button>
          </>
        )}
        {booking.status === 'pending' && (
          <button
            className="hover:text-wine transition-colors p-2"
            aria-label="תזכורת"
          >
            <Bell size={16} />
          </button>
        )}
        {booking.status === 'completed' && (
          <span className="text-xs flex items-center gap-1">
            {booking.hasReview ? (
              <>
                <Star size={14} className="fill-gold text-gold" />
                {booking.reviewRating}
              </>
            ) : (
              <span className="text-stone">מחכה לביקורת</span>
            )}
          </span>
        )}
      </div>
    </article>
  )
}
