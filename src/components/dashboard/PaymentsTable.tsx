import { useState } from 'react'
import { Download } from 'lucide-react'
import { MOCK_EARNINGS, type Payment } from '../../data/mock-earnings'
import { formatDate, shekel } from '../../lib/format'

type StatusFilter = 'all' | 'completed' | 'pending'

export default function PaymentsTable() {
  const [filter, setFilter] = useState<StatusFilter>('all')

  const rows: Payment[] = MOCK_EARNINGS.recentPayments.filter(
    (p) => filter === 'all' || p.status === filter,
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex gap-2 text-sm">
          {(['all', 'completed', 'pending'] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full transition-colors ${
                filter === f ? 'bg-wine text-cream' : 'bg-stone/10 text-stone hover:text-ink'
              }`}
            >
              {f === 'all' ? 'כל הסטטוסים' : f === 'completed' ? 'הושלמו' : 'בהמתנה'}
            </button>
          ))}
        </div>
        <button
          onClick={() => alert('יוצא ל-CSV ✓')}
          className="inline-flex items-center gap-1.5 text-sm text-wine hover:underline"
        >
          <Download size={14} />
          ייצוא ל-CSV
        </button>
      </div>

      <div className="bg-white/60 border border-stone/15 rounded-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[520px]">
          <thead>
            <tr className="text-stone text-right border-b border-stone/15">
              <th className="font-medium px-4 py-3">תאריך</th>
              <th className="font-medium px-4 py-3">לקוחה</th>
              <th className="font-medium px-4 py-3">עבודה</th>
              <th className="font-medium px-4 py-3">סכום</th>
              <th className="font-medium px-4 py-3">סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-stone/10 last:border-0 text-ink">
                <td className="px-4 py-3 text-stone">{formatDate(p.date)}</td>
                <td className="px-4 py-3">{p.clientName}</td>
                <td className="px-4 py-3">{p.jobTitle}</td>
                <td className="px-4 py-3 font-medium">{shekel(p.amount)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      p.status === 'completed'
                        ? 'bg-green-500/10 text-green-700'
                        : 'bg-yellow-500/10 text-yellow-700'
                    }`}
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
