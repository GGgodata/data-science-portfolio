import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { MonthlyEarnings } from '../../data/mock-earnings'

type EarningsChartProps = {
  data: MonthlyEarnings[]
}

export default function EarningsChart({ data }: EarningsChartProps) {
  return (
    <div className="bg-cream border border-stone/15 rounded-sm p-6">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#8B868033" />
            <XAxis
              dataKey="month"
              reversed
              tick={{ fontSize: 11, fill: '#8B8680' }}
              stroke="#8B8680"
            />
            <YAxis
              orientation="right"
              tick={{ fontSize: 11, fill: '#8B8680' }}
              stroke="#8B8680"
              tickFormatter={(v) => `₪${(v as number).toLocaleString('he-IL')}`}
            />
            <Tooltip
              cursor={{ fill: '#7C2D2810' }}
              contentStyle={{
                backgroundColor: '#F5F1EA',
                border: '1px solid #8B868033',
                borderRadius: 2,
                fontFamily: 'Heebo, sans-serif',
                fontSize: 13,
              }}
              formatter={(v) => [
                `₪${Number(v).toLocaleString('he-IL')}`,
                'הכנסה',
              ]}
            />
            <Bar dataKey="amount" fill="#7C2D28" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
