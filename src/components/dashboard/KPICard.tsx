import { TrendingUp, TrendingDown } from 'lucide-react'

type Props = {
  label: string
  value: string
  trend?: { value: string; up: boolean }
  footer?: string
}

export default function KPICard({ label, value, trend, footer }: Props) {
  return (
    <div className="bg-white/60 border border-stone/15 rounded-sm p-5">
      <div className="text-xs uppercase tracking-wider font-medium text-stone mb-2">
        {label}
      </div>
      <div className="font-serif text-4xl text-ink">{value}</div>
      <div className="flex items-center gap-2 mt-2">
        {trend && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${
              trend.up ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {trend.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend.value}
          </span>
        )}
        {footer && <span className="text-xs text-stone">{footer}</span>}
      </div>
    </div>
  )
}
