import { useState } from 'react'
import { Star } from 'lucide-react'
import type { Review } from '../../data/mock-reviews'
import { formatDate } from '../../lib/format'
import Button from '../ui/Button'

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? 'text-gold' : 'text-stone/30'}
          fill={i <= rating ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  )
}

export default function ReviewCard({ review }: { review: Review }) {
  const [responded, setResponded] = useState(review.hasResponse)
  const [response, setResponse] = useState(review.response || '')
  const [editing, setEditing] = useState(false)

  return (
    <div className="bg-white/60 border border-stone/15 rounded-sm p-5">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={review.clientPhoto}
          alt={review.clientName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-medium text-ink">{review.clientName}</div>
          <div className="flex items-center gap-2">
            <Stars rating={review.rating} />
            <span className="text-xs text-stone">{review.jobCategory}</span>
          </div>
        </div>
        <span className="text-xs text-stone">{formatDate(review.date)}</span>
      </div>

      <p className="text-ink leading-relaxed">{review.text}</p>

      {responded ? (
        <div className="mt-4 bg-wine/5 border-r-2 border-wine/30 rounded-sm p-3">
          <div className="text-xs text-wine mb-1">התגובה שלך</div>
          <p className="text-sm text-ink">{response}</p>
        </div>
      ) : editing ? (
        <div className="mt-4">
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={3}
            placeholder="כתבי תגובה..."
            className="w-full bg-white/60 border border-stone/20 focus:border-wine outline-none rounded-sm p-3 text-sm resize-none"
          />
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              onClick={() => {
                if (response.trim()) setResponded(true)
              }}
            >
              שלחי תגובה
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
              ביטול
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mt-3 text-sm text-wine hover:underline"
        >
          השיבי
        </button>
      )}
    </div>
  )
}
