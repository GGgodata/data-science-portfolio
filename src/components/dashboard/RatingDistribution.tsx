import { Star } from 'lucide-react'
import { MOCK_REVIEWS } from '../../data/mock-reviews'

export default function RatingDistribution() {
  const { distribution, totalReviews } = MOCK_REVIEWS
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = distribution[star] || 0
        const pct = totalReviews ? (count / totalReviews) * 100 : 0
        return (
          <div key={star} className="flex items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 text-stone w-10">
              {star}
              <Star size={12} className="text-gold" fill="currentColor" />
            </span>
            <div className="flex-1 h-2 rounded-full bg-stone/15 overflow-hidden">
              <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-stone w-16 text-left">{count} ביקורות</span>
          </div>
        )
      })}
    </div>
  )
}
