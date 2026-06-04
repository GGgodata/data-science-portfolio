import { Calendar, Clock, Navigation, MessageCircle, X, Bell, Eye } from 'lucide-react'
import type { Booking, BookingStatus } from '../../data/mock-bookings'
import { formatDate, formatTime, shekel } from '../../lib/format'
import Button from '../ui/Button'

const STATUS: Record<BookingStatus, { label: string; cls: string }> = {
  upcoming: { label: '📅 קרוב', cls: 'bg-green-500/10 text-green-700' },
  pending: { label: '⏳ ממתין לאישור', cls: 'bg-yellow-500/10 text-yellow-700' },
  completed: { label: '✓ הושלם', cls: 'bg-stone/10 text-stone' },
  cancelled: { label: '✗ בוטל', cls: 'bg-red-500/10 text-red-600' },
}

export default function BookingCard({ booking }: { booking: Booking }) {
  const s = STATUS[booking.status]

  return (
    <div className="bg-white/60 border border-stone/15 rounded-sm p-4 flex flex-wrap items-center gap-4">
      <img
        src={booking.client.photo}
        alt={booking.client.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="min-w-0">
        <div className="font-medium text-ink">{booking.client.name}</div>
        <div className="text-sm text-stone">
          {booking.category} · {booking.city}
        </div>
      </div>

      <div className="text-sm text-stone space-y-1 sm:mr-4">
        <div className="inline-flex items-center gap-1.5">
          <Calendar size={14} />
          {formatDate(booking.date)} · {formatTime(booking.date)}
        </div>
        <div className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {booking.duration} שעות
          </span>
          <span className="text-ink font-medium">{shekel(booking.totalEarnings)}</span>
        </div>
      </div>

      <span className={`text-xs px-3 py-1 rounded-full mr-auto ${s.cls}`}>{s.label}</span>

      <div className="flex gap-2">
        {booking.status === 'upcoming' && (
          <>
            <Button variant="outline" size="sm">
              <Navigation size={14} />
              ניווט
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle size={14} />
            </Button>
            <Button variant="ghost" size="sm">
              <X size={14} />
            </Button>
          </>
        )}
        {booking.status === 'pending' && (
          <Button variant="outline" size="sm">
            <Bell size={14} />
            תזכורת
          </Button>
        )}
        {booking.status === 'completed' && (
          <Button variant="outline" size="sm">
            <Eye size={14} />
            {booking.hasReview ? 'צפי בביקורת' : 'מחכה לביקורת'}
          </Button>
        )}
        {booking.status === 'cancelled' && (
          <Button variant="ghost" size="sm">
            פרטים
          </Button>
        )}
      </div>
    </div>
  )
}
