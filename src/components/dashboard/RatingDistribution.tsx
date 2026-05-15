import { Star } from 'lucide-react'

type RatingDistributionProps = {
  distribution: Record<number, number>
  total: number
}

export default function RatingDistribution({ distribution, total }: RatingDistributionProps) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((r) => {
        const count = distribution[r] ?? 0
        const pct = total === 0 ? 0 : (count / total) * 100
        return (
          <div key={r} className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 w-12 text-stone">
              {r}
              <Star size={12} className="fill-gold text-gold" />
            </div>
            <div className="flex-1 h-2 bg-stone/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="text-stone text-xs w-16 text-left">{count} ביקורות</div>
          </div>
        )
      })}
    </div>
  )
}
