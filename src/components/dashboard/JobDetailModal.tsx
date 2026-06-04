import { motion, AnimatePresence } from 'framer-motion'
import { X, Star } from 'lucide-react'
import type { AvailableJob } from '../../data/mock-jobs'
import { formatLongDate, formatTime, timeAgo, shekel } from '../../lib/format'
import Button from '../ui/Button'

export default function JobDetailModal({
  job,
  onClose,
  onApply,
}: {
  job: AvailableJob | null
  onClose: () => void
  onApply: () => void
}) {
  return (
    <AnimatePresence>
      {job && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream rounded-sm w-full max-w-3xl max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-stone/15">
              <h2 className="font-serif text-2xl text-ink">{job.title}</h2>
              <button onClick={onClose} className="text-stone hover:text-wine">
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-8">
              {/* Client */}
              <section className="flex items-center gap-4">
                <img
                  src={job.client.photo}
                  alt={job.client.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-ink flex items-center gap-2">
                    {job.client.name}
                    <span className="inline-flex items-center gap-0.5 text-gold text-sm">
                      <Star size={14} fill="currentColor" />
                      {job.client.rating}
                    </span>
                  </div>
                  <div className="text-sm text-stone">
                    {job.client.bookingsCount} הזמנות עם NANY · חברה מ-{job.client.memberSince}
                  </div>
                  <button className="text-sm text-wine hover:underline mt-1">
                    צפי בפרופיל הלקוחה ←
                  </button>
                </div>
              </section>

              {/* Details */}
              <section>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-wine/5 text-wine text-sm px-3 py-1 rounded-full">
                    {job.category}
                  </span>
                  <span className="bg-wine/5 text-wine text-sm px-3 py-1 rounded-full">
                    {job.subCategory}
                  </span>
                </div>
                <p className="text-ink leading-relaxed">{job.description}</p>
              </section>

              {/* When & where */}
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info label="מתי" value={`${formatLongDate(job.date)} · ${formatTime(job.date)}`} />
                <Info label="משך מוערך" value={`${job.duration} שעות`} />
                <Info
                  label="היכן"
                  value={`${job.city}, ${job.neighborhood} · ${job.distance} ק״מ ממך`}
                />
              </section>

              {/* Payment */}
              <section className="bg-white/60 border border-stone/15 rounded-sm p-5">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-stone">תעריף שעתי</span>
                  <span className="text-ink">{job.hourlyRate}₪</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-stone">סה״כ</span>
                  <span className="font-serif text-xl text-wine">{shekel(job.totalBudget)}</span>
                </div>
                <p className="text-xs text-stone">תשלום: 48 שעות לאחר סיום העבודה</p>
              </section>

              {/* Activity */}
              <section className="text-sm text-stone space-y-1">
                <p>פורסם {timeAgo(job.postedAt)}</p>
                <p>{job.applicantsCount + 18} ספקיות צפו</p>
                <p>{job.applicantsCount} ספקיות הגישו הצעה</p>
              </section>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-stone/15">
              <Button variant="ghost" onClick={onClose}>
                סגירה
              </Button>
              <Button size="lg" onClick={onApply}>
                הגישי הצעה
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-stone mb-1">{label}</div>
      <div className="text-ink">{value}</div>
    </div>
  )
}
