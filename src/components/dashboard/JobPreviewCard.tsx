import { Star, Calendar, MapPin, Coins } from 'lucide-react'
import type { AvailableJob } from '../../data/mock-jobs'
import { formatDate } from '../../lib/format'
import Button from '../ui/Button'

export default function JobPreviewCard({
  job,
  onDetails,
}: {
  job: AvailableJob
  onDetails?: () => void
}) {
  return (
    <div className="bg-white/60 border border-stone/15 rounded-sm p-4 flex items-center gap-4">
      <img
        src={job.client.photo}
        alt={job.client.name}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm text-stone">
          <span className="text-ink">{job.client.name}</span>
          <span className="inline-flex items-center gap-0.5 text-gold">
            <Star size={12} fill="currentColor" />
            {job.client.rating}
          </span>
        </div>
        <div className="font-medium text-ink truncate">{job.title}</div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone mt-1">
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(job.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} />
            {job.city}
          </span>
          <span className="inline-flex items-center gap-1">
            <Coins size={12} />
            {job.hourlyRate}₪/שעה
          </span>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onDetails} className="shrink-0">
        פרטים
      </Button>
    </div>
  )
}
