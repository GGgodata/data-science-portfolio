import { useNavigate } from 'react-router-dom'
import { Star, DollarSign, Inbox } from 'lucide-react'
import KPICard from '../../components/dashboard/KPICard'
import JobPreviewCard from '../../components/dashboard/JobPreviewCard'
import { MOCK_AVAILABLE_JOBS } from '../../data/mock-jobs'
import { MOCK_BOOKINGS } from '../../data/mock-bookings'
import { loadProvider } from '../../lib/provider'

function formatHebrewDate(d: Date): string {
  return d.toLocaleDateString('he-IL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function DashboardHome() {
  const navigate = useNavigate()
  const provider = loadProvider()
  const firstName = provider?.firstName ?? 'ספקית'
  const isVerified = !!provider

  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)
  const todayUpcoming = MOCK_BOOKINGS.filter(
    (b) => b.status === 'upcoming' && b.date.startsWith(todayStr)
  )

  return (
    <div className="space-y-12">
      {/* Banner */}
      <section className="bg-cream border border-stone/15 rounded-sm p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl">ברוכה הבאה, {firstName}</h2>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            {isVerified ? (
              <span className="inline-flex items-center gap-1 bg-wine/10 text-wine text-xs font-medium px-3 py-1 rounded-full">
                ✓ פרופיל מאומת
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-stone/10 text-stone text-xs font-medium px-3 py-1 rounded-full">
                ⏳ ממתינה לאישור
              </span>
            )}
            {!provider && (
              <button
                onClick={() => navigate('/providers/onboarding')}
                className="text-xs text-wine hover:underline"
              >
                השלימי פרופיל →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="הכנסות החודש"
          value="₪3,240"
          trend={{ value: '+12% מהחודש שעבר', positive: true }}
        />
        <KPICard label="עבודות החודש" value="8" footer="מתוך 24 בכל הזמנים" />
        <KPICard
          label="דירוג ממוצע"
          value={<span className="flex items-baseline gap-1">4.8 <Star size={20} className="fill-gold text-gold inline-block" /></span>}
          footer="12 ביקורות"
        />
        <KPICard label="שעות עבודה" value="34" footer="החודש" />
      </section>

      {/* Available jobs preview */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-2xl">הזמנות פתוחות באזור</h3>
          <button
            onClick={() => navigate('/providers/dashboard/available')}
            className="text-sm text-wine hover:underline"
          >
            צפי בכולן ←
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {MOCK_AVAILABLE_JOBS.slice(0, 3).map((j) => (
            <JobPreviewCard
              key={j.id}
              job={j}
              onDetails={() => navigate('/providers/dashboard/available')}
            />
          ))}
        </div>
      </section>

      {/* Today */}
      <section>
        <h3 className="font-serif text-2xl mb-5">היום, {formatHebrewDate(today)}</h3>
        {todayUpcoming.length === 0 ? (
          <div className="bg-cream border border-dashed border-stone/30 rounded-sm py-12 text-center text-stone">
            <Inbox className="mx-auto mb-3 text-stone/60" size={40} strokeWidth={1.4} />
            <p>אין עבודות מתוזמנות להיום</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayUpcoming.map((b) => (
              <div
                key={b.id}
                className="bg-cream border border-stone/15 rounded-sm p-4 flex items-center gap-4"
              >
                <img
                  src={b.client.photo}
                  alt={b.client.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{b.client.name}</div>
                  <div className="text-xs text-stone">
                    {b.category} · {b.address}
                  </div>
                </div>
                <div className="text-sm text-wine font-medium">
                  {new Date(b.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Notifications */}
      <section>
        <h3 className="font-serif text-2xl mb-5">התראות אחרונות</h3>
        <ul className="space-y-3">
          <li className="bg-cream border border-stone/15 rounded-sm p-4 flex items-center gap-4">
            <Star size={20} className="fill-gold text-gold" />
            <div className="flex-1 text-sm">ביקורת חדשה (5★) מ-יעל ה.</div>
            <div className="text-xs text-stone">לפני 2 שעות</div>
          </li>
          <li className="bg-cream border border-stone/15 rounded-sm p-4 flex items-center gap-4">
            <DollarSign size={20} className="text-emerald-700" />
            <div className="flex-1 text-sm">תשלום של 480₪ הועבר לחשבונך</div>
            <div className="text-xs text-stone">לפני יום</div>
          </li>
          <li className="bg-cream border border-stone/15 rounded-sm p-4 flex items-center gap-4">
            <Inbox size={20} className="text-wine" />
            <div className="flex-1 text-sm">12 הזמנות חדשות באזור שלך</div>
            <div className="text-xs text-stone">לפני 3 שעות</div>
          </li>
        </ul>
      </section>
    </div>
  )
}
