import { Star, Calendar, MapPin, Clock, Users } from 'lucide-react'
import type { AvailableJob } from '../../data/mock-jobs'

type JobCardProps = {
  job: AvailableJob
  onDetails: (job: AvailableJob) => void
  onApply: (job: AvailableJob) => void
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  if (hours < 1) return 'לפני פחות משעה'
  if (hours < 24) return `לפני ${hours} שעות`
  const days = Math.floor(hours / 24)
  return `לפני ${days} ימים`
}

export default function JobCard({ job, onDetails, onApply }: JobCardProps) {
  const d = new Date(job.date)
  const dateStr = d.toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  })
  const timeStr = d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })

  return (
    <article className="bg-cream border border-stone/15 rounded-sm p-6 hover:border-wine/30 transition-colors">
      <header className="flex items-center gap-3">
        <img
          src={job.client.photo}
          alt={job.client.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-medium text-sm">{job.client.name}</div>
          <div className="text-xs text-stone flex items-center gap-2 mt-0.5">
            <span className="flex items-center gap-0.5">
              <Star size={12} className="fill-gold text-gold" /> {job.client.rating}
            </span>
            <span>·</span>
            <span>{job.client.bookingsCount} הזמנות</span>
            <span>·</span>
            <span>חברה מ-{job.client.memberSince}</span>
          </div>
        </div>
      </header>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="bg-wine/10 text-wine text-xs px-2 py-1 rounded-full">
          {job.category}
        </span>
        <span className="bg-stone/10 text-stone text-xs px-2 py-1 rounded-full">
          {job.subCategory}
        </span>
      </div>

      <h3 className="font-serif text-xl mt-4">{job.title}</h3>
      <p className="text-sm text-stone mt-2 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 text-sm">
        <div className="flex items-center gap-2 text-stone">
          <Calendar size={14} />
          <span>
            {dateStr} · {timeStr}
          </span>
        </div>
        <div className="flex items-center gap-2 text-stone">
          <Clock size={14} />
          <span>{job.duration} שעות</span>
        </div>
        <div className="flex items-center gap-2 text-stone">
          <MapPin size={14} />
          <span>
            {job.city} · {job.distance} ק״מ
          </span>
        </div>
        <div className="font-medium text-ink col-span-2 md:col-span-3 mt-1">
          {job.hourlyRate}₪/שעה · סה״כ ₪{job.totalBudget.toLocaleString('he-IL')}
        </div>
      </div>

      <footer className="mt-5 pt-5 border-t border-stone/10 flex items-center justify-between flex-wrap gap-3">
        <div className="text-xs text-stone flex items-center gap-3">
          <span>פורסם {timeAgo(job.postedAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {job.applicantsCount} ספקיות הגישו הצעה
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDetails(job)}
            className="text-sm text-stone hover:text-ink px-4 py-2 transition-colors"
          >
            פרטים
          </button>
          <button
            onClick={() => onApply(job)}
            className="bg-wine text-cream text-sm px-5 py-2 rounded-full hover:bg-wine/90 transition-colors"
          >
            הגישי הצעה ←
          </button>
        </div>
      </footer>
    </article>
  )
}
