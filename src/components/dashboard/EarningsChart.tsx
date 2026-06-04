import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { MOCK_EARNINGS } from '../../data/mock-earnings'

export default function EarningsChart() {
  return (
    <div className="bg-white/60 border border-stone/15 rounded-sm p-5" dir="ltr">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={MOCK_EARNINGS.monthlyData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e3ef" vertical={false} />
          <XAxis
            dataKey="month"
            reversed
            tick={{ fontSize: 11, fill: '#8a8178' }}
            interval={0}
            angle={-35}
            textAnchor="end"
            height={60}
          />
          <YAxis
            orientation="right"
            tick={{ fontSize: 11, fill: '#8a8178' }}
            tickFormatter={(v) => `₪${v}`}
          />
          <Tooltip
            formatter={(value: number) => [`₪${value.toLocaleString()}`, 'הכנסה']}
            labelStyle={{ direction: 'rtl' }}
            contentStyle={{
              background: '#faf6f0',
              border: '1px solid #8a817833',
              borderRadius: 4,
              direction: 'rtl',
            }}
          />
          <Bar dataKey="amount" fill="#6b2436" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
