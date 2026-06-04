import { useState } from 'react'
import RatingDistribution from '../../components/dashboard/RatingDistribution'
import ReviewCard from '../../components/dashboard/ReviewCard'
import { MOCK_REVIEWS } from '../../data/mock-reviews'

type Filter = 'all' | '5' | 'low'

export default function Reviews() {
  const [filter, setFilter] = useState<Filter>('all')

  const list = MOCK_REVIEWS.reviews.filter((r) => {
    if (filter === '5') return r.rating === 5
    if (filter === 'low') return r.rating <= 4
    return true
  })

  return (
    <div className="max-w-4xl space-y-10">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-right">
          <div className="font-serif text-7xl text-wine leading-none">
            {MOCK_REVIEWS.averageRating}
            <span className="text-gold text-5xl">★</span>
          </div>
          <p className="text-stone mt-2">מבוסס על {MOCK_REVIEWS.totalReviews} ביקורות</p>
        </div>
        <RatingDistribution />
      </section>

      <section>
        <div className="flex gap-2 text-sm mb-4">
          {(['all', '5', 'low'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full transition-colors ${
                filter === f ? 'bg-wine text-cream' : 'bg-stone/10 text-stone hover:text-ink'
              }`}
            >
              {f === 'all' ? 'כל הביקורות' : f === '5' ? '5★' : '4★ ומטה'}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {list.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>
    </div>
  )
}
