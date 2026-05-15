import { Star } from 'lucide-react'
import type { AvailableJob } from '../../data/mock-jobs'

type JobPreviewCardProps = {
  job: AvailableJob
  onDetails?: (job: AvailableJob) => void
}

export default function JobPreviewCard({ job, onDetails }: JobPreviewCardProps) {
  const d = new Date(job.date)
  const dateStr = d.toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })
  const timeStr = d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="bg-cream border border-stone/15 rounded-sm p-4 flex items-start gap-4 hover:border-wine/40 transition-colors">
      <img
        src={job.client.photo}
        alt={job.client.name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs text-stone">
          <span>{job.client.name}</span>
          <span className="flex items-center gap-0.5">
            <Star size={12} className="fill-gold text-gold" />
            {job.client.rating}
          </span>
        </div>
        <div className="font-medium text-sm mt-1 truncate">{job.title}</div>
        <div className="text-xs text-stone mt-2 flex flex-wrap gap-x-3 gap-y-1">
          <span>📅 {dateStr} · {timeStr}</span>
          <span>📍 {job.city}</span>
          <span>💰 {job.hourlyRate}₪/ש׳</span>
        </div>
      </div>
      <button
        onClick={() => onDetails?.(job)}
        className="text-xs text-wine hover:underline flex-shrink-0 self-center"
      >
        פרטים
      </button>
    </div>
  )
}
