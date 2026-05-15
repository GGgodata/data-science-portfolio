import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'
import RatingDistribution from '../../components/dashboard/RatingDistribution'
import ReviewCard from '../../components/dashboard/ReviewCard'
import { MOCK_REVIEWS, type Review } from '../../data/mock-reviews'

type Filter = 'all' | 'high' | 'low'

export default function Reviews() {
  const [filter, setFilter] = useState<Filter>('all')
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS.reviews)

  const visible = useMemo(() => {
    if (filter === 'all') return reviews
    if (filter === 'high') return reviews.filter((r) => r.rating === 5)
    return reviews.filter((r) => r.rating <= 4)
  }, [reviews, filter])

  const handleRespond = (id: string, response: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, hasResponse: true, response } : r))
    )
  }

  return (
    <div className="space-y-12">
      <section className="bg-cream border border-stone/15 rounded-sm p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-right">
          <div className="font-serif text-7xl flex items-baseline gap-3 justify-center md:justify-end">
            {MOCK_REVIEWS.averageRating}
            <Star size={32} className="fill-gold text-gold" />
          </div>
          <p className="text-stone text-sm mt-3">
            מבוסס על {MOCK_REVIEWS.totalReviews} ביקורות
          </p>
        </div>
        <RatingDistribution
          distribution={MOCK_REVIEWS.distribution}
          total={MOCK_REVIEWS.totalReviews}
        />
      </section>

      <section>
        <div className="flex items-center gap-2 mb-6">
          {(['all', 'high', 'low'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full transition-colors',
                filter === f
                  ? 'bg-wine text-cream'
                  : 'bg-stone/10 text-stone hover:text-ink'
              )}
            >
              {f === 'all' ? 'כל הביקורות' : f === 'high' ? '5★' : '4★ ומטה'}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {visible.map((r) => (
            <ReviewCard key={r.id} review={r} onRespond={handleRespond} />
          ))}
        </div>
      </section>
    </div>
  )
}
