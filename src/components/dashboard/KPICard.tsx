import { type ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

type KPICardProps = {
  label: string
  value: ReactNode
  trend?: { value: string; positive: boolean }
  footer?: string
}

export default function KPICard({ label, value, trend, footer }: KPICardProps) {
  const TrendIcon = trend?.positive ? TrendingUp : TrendingDown
  return (
    <div className="bg-cream border border-stone/15 rounded-sm p-6">
      <div className="text-[10px] uppercase tracking-[0.15em] font-medium text-stone">
        {label}
      </div>
      <div className="font-serif text-4xl mt-3 text-ink">{value}</div>
      {trend && (
        <div
          className={`mt-3 inline-flex items-center gap-1 text-xs font-medium ${
            trend.positive ? 'text-emerald-700' : 'text-wine'
          }`}
        >
          <TrendIcon size={14} />
          {trend.value}
        </div>
      )}
      {footer && (
        <div className="mt-3 text-xs text-stone">{footer}</div>
      )}
    </div>
  )
}
