import { useState } from 'react'
import KPICard from '../../components/dashboard/KPICard'
import EarningsChart from '../../components/dashboard/EarningsChart'
import PaymentsTable from '../../components/dashboard/PaymentsTable'
import WithdrawModal from '../../components/dashboard/WithdrawModal'
import { MOCK_EARNINGS } from '../../data/mock-earnings'

export default function Earnings() {
  const [open, setOpen] = useState(false)
  const trend =
    ((MOCK_EARNINGS.thisMonth - MOCK_EARNINGS.lastMonth) / MOCK_EARNINGS.lastMonth) *
    100

  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="סה״כ הכנסות"
          value={
            <span className="text-5xl">
              ₪{MOCK_EARNINGS.totalAllTime.toLocaleString('he-IL')}
            </span>
          }
          footer="מתחילת ההצטרפות"
        />
        <KPICard
          label="החודש"
          value={`₪${MOCK_EARNINGS.thisMonth.toLocaleString('he-IL')}`}
          trend={{ value: `${trend.toFixed(0)}%`, positive: trend >= 0 }}
        />
        <KPICard
          label="בהמתנה לתשלום"
          value={`₪${MOCK_EARNINGS.pending.toLocaleString('he-IL')}`}
          footer="ישוחרר תוך 48 שעות"
        />
        <div className="bg-wine text-cream rounded-sm p-6 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.15em] font-medium text-cream/80">
              משיכה
            </div>
            <div className="font-serif text-3xl mt-2">
              ₪{MOCK_EARNINGS.thisMonth.toLocaleString('he-IL')}
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mt-3 bg-cream text-wine text-sm px-4 py-2 rounded-full hover:bg-cream/90 transition-colors"
          >
            משוך לחשבון ←
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-5">הכנסות לפי חודש</h2>
        <EarningsChart data={MOCK_EARNINGS.monthlyData} />
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-5">תשלומים אחרונים</h2>
        <PaymentsTable payments={MOCK_EARNINGS.recentPayments} />
      </section>

      <WithdrawModal
        open={open}
        max={MOCK_EARNINGS.thisMonth}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}
