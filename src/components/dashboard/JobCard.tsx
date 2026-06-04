import { Star, Calendar, Clock, MapPin, Coins, Users } from 'lucide-react'
import type { AvailableJob } from '../../data/mock-jobs'
import { formatDate, formatTime, timeAgo, shekel } from '../../lib/format'
import Button from '../ui/Button'

export default function JobCard({
  job,
  onDetails,
  onApply,
}: {
  job: AvailableJob
  onDetails: () => void
  onApply: () => void
}) {
  return (
    <div className="bg-white/60 border border-stone/15 rounded-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={job.client.photo}
          alt={job.client.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-sm">
          <span className="text-ink font-medium">{job.client.name}</span>
          <span className="inline-flex items-center gap-0.5 text-gold mx-2">
            <Star size={12} fill="currentColor" />
            {job.client.rating}
          </span>
          <span className="text-stone">
            ({job.client.bookingsCount} הזמנות, חברה מ-{job.client.memberSince})
          </span>
        </div>
      </div>

      <div className="text-sm text-wine mb-2">
        🏷️ {job.category} · {job.subCategory}
      </div>
      <h3 className="font-serif text-xl text-ink mb-1">{job.title}</h3>
      <p className="text-stone text-sm mb-4 line-clamp-2">{job.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-stone mb-4">
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={14} />
          {formatDate(job.date)} · {formatTime(job.date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock size={14} />
          {job.duration} שעות
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={14} />
          {job.city}, {job.neighborhood} · {job.distance} ק״מ ממך
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Coins size={14} />
          {job.hourlyRate}₪/שעה · סה״כ {shekel(job.totalBudget)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone/15">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone">
          <span>🕐 פורסם {timeAgo(job.postedAt)}</span>
          <span className="inline-flex items-center gap-1">
            <Users size={12} />
            {job.applicantsCount} ספקיות הגישו הצעה
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={onDetails}>
            פרטים
          </Button>
          <Button size="sm" onClick={onApply}>
            הגישי הצעה ←
          </Button>
        </div>
      </div>
    </div>
  )
}
