import { useState } from 'react'
import { Download } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Payment } from '../../data/mock-earnings'

type PaymentsTableProps = {
  payments: Payment[]
}

type Filter = 'all' | 'completed' | 'pending'

export default function PaymentsTable({ payments }: PaymentsTableProps) {
  const [filter, setFilter] = useState<Filter>('all')

  const visible = payments.filter((p) =>
    filter === 'all' ? true : p.status === filter
  )

  const exportCSV = () => {
    alert('יצוא ל-CSV מוכן (mock)')
  }

  return (
    <div className="bg-cream border border-stone/15 rounded-sm">
      <div className="flex items-center justify-between gap-4 p-5 border-b border-stone/15 flex-wrap">
        <div className="flex items-center gap-1">
          {(['all', 'completed', 'pending'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'text-xs px-3 py-1.5 rounded-full transition-colors',
                filter === f
                  ? 'bg-wine text-cream'
                  : 'text-stone hover:bg-stone/10'
              )}
            >
              {f === 'all' ? 'כל הסטטוסים' : f === 'completed' ? 'הושלמו' : 'בהמתנה'}
            </button>
          ))}
        </div>
        <button
          onClick={exportCSV}
          className="text-xs text-stone hover:text-ink flex items-center gap-1.5"
        >
          <Download size={14} />
          יצוא ל-CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-right text-xs uppercase tracking-wider text-stone border-b border-stone/10">
              <th className="px-5 py-3 font-medium">תאריך</th>
              <th className="px-5 py-3 font-medium">לקוחה</th>
              <th className="px-5 py-3 font-medium">עבודה</th>
              <th className="px-5 py-3 font-medium">סכום</th>
              <th className="px-5 py-3 font-medium">סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr
                key={p.id}
                className="border-b border-stone/10 last:border-0 hover:bg-stone/[0.03]"
              >
                <td className="px-5 py-3 text-stone">
                  {new Date(p.date).toLocaleDateString('he-IL')}
                </td>
                <td className="px-5 py-3">{p.clientName}</td>
                <td className="px-5 py-3 text-stone">{p.jobTitle}</td>
                <td className="px-5 py-3 font-medium">
                  ₪{p.amount.toLocaleString('he-IL')}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      p.status === 'completed'
                        ? 'bg-emerald-700/10 text-emerald-700'
                        : 'bg-amber-600/10 text-amber-700'
                    )}
                  >
                    {p.status === 'completed' ? 'הושלם' : 'בהמתנה'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
