import { useState } from 'react'
import KPICard from '../../components/dashboard/KPICard'
import EarningsChart from '../../components/dashboard/EarningsChart'
import PaymentsTable from '../../components/dashboard/PaymentsTable'
import WithdrawModal from '../../components/dashboard/WithdrawModal'
import Button from '../../components/ui/Button'
import { MOCK_EARNINGS } from '../../data/mock-earnings'
import { shekel } from '../../lib/format'

export default function Earnings() {
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  return (
    <div className="max-w-5xl space-y-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="סה״כ הכנסות" value={shekel(MOCK_EARNINGS.totalAllTime)} footer="מאז ההצטרפות" />
        <KPICard label="החודש" value={shekel(MOCK_EARNINGS.thisMonth)} trend={{ value: '+12%', up: true }} />
        <KPICard label="בהמתנה לתשלום" value={shekel(MOCK_EARNINGS.pending)} footer="2 תשלומים" />
        <div className="flex items-center justify-center bg-wine/5 border border-wine/20 rounded-sm p-5">
          <Button onClick={() => setWithdrawOpen(true)}>משוך לחשבון</Button>
        </div>
      </div>

      <section>
        <h2 className="font-serif text-2xl text-ink mb-4">הכנסות לפי חודש</h2>
        <EarningsChart />
      </section>

      <section>
        <h2 className="font-serif text-2xl text-ink mb-4">תשלומים אחרונים</h2>
        <PaymentsTable />
      </section>

      <WithdrawModal
        open={withdrawOpen}
        max={MOCK_EARNINGS.pending}
        onClose={() => setWithdrawOpen(false)}
      />
    </div>
  )
}
