import { useState } from 'react'
import { Star, MessageCircle } from 'lucide-react'
import type { Review } from '../../data/mock-reviews'

type ReviewCardProps = {
  review: Review
  onRespond: (id: string, response: string) => void
}

export default function ReviewCard({ review, onRespond }: ReviewCardProps) {
  const [showInput, setShowInput] = useState(false)
  const [text, setText] = useState('')

  const submit = () => {
    if (text.trim().length === 0) return
    onRespond(review.id, text.trim())
    setText('')
    setShowInput(false)
  }

  return (
    <article className="bg-cream border border-stone/15 rounded-sm p-6">
      <header className="flex items-start gap-4">
        <img
          src={review.clientPhoto}
          alt={review.clientName}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-medium">{review.clientName}</span>
            <span className="flex items-center gap-0.5 text-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className={i <= review.rating ? 'fill-gold text-gold' : 'text-stone/30'}
                />
              ))}
            </span>
            <span className="text-xs text-stone">
              {new Date(review.date).toLocaleDateString('he-IL')}
            </span>
            <span className="text-xs text-stone">· {review.jobCategory}</span>
          </div>
          <p className="mt-3 text-base text-ink leading-relaxed">{review.text}</p>

          {review.hasResponse && review.response && (
            <div className="mt-4 bg-stone/5 border-r-2 border-wine pr-4 pl-4 py-3 rounded-sm">
              <div className="text-[10px] uppercase tracking-wider text-stone mb-1">
                התגובה שלך
              </div>
              <p className="text-sm">{review.response}</p>
            </div>
          )}

          {!review.hasResponse && !showInput && (
            <button
              onClick={() => setShowInput(true)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-wine hover:underline"
            >
              <MessageCircle size={14} />
              השיבי
            </button>
          )}

          {!review.hasResponse && showInput && (
            <div className="mt-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="כתבי תגובה…"
                rows={3}
                className="w-full bg-cream border border-stone/30 focus:border-wine outline-none rounded-sm p-3 text-sm transition-colors"
                autoFocus
              />
              <div className="mt-2 flex items-center gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowInput(false)
                    setText('')
                  }}
                  className="text-xs text-stone hover:text-ink px-3 py-1"
                >
                  ביטול
                </button>
                <button
                  onClick={submit}
                  disabled={text.trim().length === 0}
                  className="bg-wine text-cream text-xs px-4 py-1.5 rounded-full disabled:opacity-30"
                >
                  שלחי
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </article>
  )
}
