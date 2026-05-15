import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, MapPin, Calendar, Clock, Users, Eye, ArrowLeft } from 'lucide-react'
import type { AvailableJob } from '../../data/mock-jobs'

type JobDetailModalProps = {
  job: AvailableJob | null
  onClose: () => void
  onApply: (job: AvailableJob) => void
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  if (hours < 1) return 'פחות משעה'
  if (hours < 24) return `${hours} שעות`
  const days = Math.floor(hours / 24)
  return `${days} ימים`
}

export default function JobDetailModal({ job, onClose, onApply }: JobDetailModalProps) {
  useEffect(() => {
    if (!job) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [job, onClose])

  return (
    <AnimatePresence>
      {job && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream max-w-3xl w-full max-h-[90vh] rounded-sm shadow-2xl flex flex-col"
          >
            <header className="flex items-start justify-between gap-4 px-8 py-6 border-b border-stone/15">
              <h2 className="font-serif text-2xl flex-1">{job.title}</h2>
              <button
                onClick={onClose}
                className="text-stone hover:text-ink transition-colors flex-shrink-0"
                aria-label="סגירה"
              >
                <X size={22} />
              </button>
            </header>

            <div className="overflow-y-auto flex-1 px-8 py-6 space-y-8">
              <section>
                <div className="flex items-center gap-4">
                  <img
                    src={job.client.photo}
                    alt={job.client.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-lg">{job.client.name}</div>
                    <div className="text-sm text-stone flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <Star size={14} className="fill-gold text-gold" />
                        {job.client.rating}
                      </span>
                      <span>·</span>
                      <span>
                        {job.client.bookingsCount} הזמנות עם NANY · חברה מ-{job.client.memberSince}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-sm text-wine hover:underline">
                  צפי בפרופיל הלקוחה ←
                </button>
              </section>

              <section>
                <div className="text-xs uppercase tracking-wider text-stone mb-3">
                  פרטי העבודה
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-wine/10 text-wine text-xs px-3 py-1 rounded-full">
                    {job.category}
                  </span>
                  <span className="bg-stone/10 text-stone text-xs px-3 py-1 rounded-full">
                    {job.subCategory}
                  </span>
                </div>
                <p className="text-base text-ink leading-relaxed">{job.description}</p>
              </section>

              <section>
                <div className="text-xs uppercase tracking-wider text-stone mb-3">
                  מתי ואיפה
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-stone" />
                    <span>
                      {new Date(job.date).toLocaleDateString('he-IL', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      בשעה{' '}
                      {new Date(job.date).toLocaleTimeString('he-IL', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-stone" />
                    <span>משך מוערך: {job.duration} שעות</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-stone" />
                    <span>
                      {job.city}, {job.neighborhood} · {job.distance} ק״מ ממך
                    </span>
                  </div>
                </div>
              </section>

              <section>
                <div className="text-xs uppercase tracking-wider text-stone mb-3">
                  תשלום
                </div>
                <div className="bg-wine/5 border border-wine/20 rounded-sm p-5 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone">תעריף שעתי</span>
                    <span className="font-medium">{job.hourlyRate}₪</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone">סה״כ צפוי</span>
                    <span className="font-serif text-xl">
                      ₪{job.totalBudget.toLocaleString('he-IL')}
                    </span>
                  </div>
                  <div className="text-xs text-stone mt-3">
                    תשלום: 48 שעות לאחר סיום העבודה
                  </div>
                </div>
              </section>

              <section>
                <div className="text-xs uppercase tracking-wider text-stone mb-3">
                  פעילות
                </div>
                <ul className="text-sm text-stone space-y-2">
                  <li className="flex items-center gap-2">
                    <Clock size={14} />
                    פורסם לפני {timeAgo(job.postedAt)}
                  </li>
                  <li className="flex items-center gap-2">
                    <Eye size={14} />
                    {job.applicantsCount * 4} ספקיות צפו
                  </li>
                  <li className="flex items-center gap-2">
                    <Users size={14} />
                    {job.applicantsCount} ספקיות הגישו הצעה
                  </li>
                </ul>
              </section>
            </div>

            <footer className="px-8 py-5 border-t border-stone/15 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="text-sm text-stone hover:text-ink px-5 py-3 transition-colors"
              >
                סגירה
              </button>
              <button
                onClick={() => onApply(job)}
                className="bg-wine text-cream text-sm px-7 py-3 rounded-full hover:bg-wine/90 transition-colors flex items-center gap-2"
              >
                הגישי הצעה
                <ArrowLeft size={16} />
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
