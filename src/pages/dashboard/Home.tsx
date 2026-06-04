import { Link, useNavigate } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import KPICard from '../../components/dashboard/KPICard'
import JobPreviewCard from '../../components/dashboard/JobPreviewCard'
import { MOCK_AVAILABLE_JOBS } from '../../data/mock-jobs'
import { getProviderName } from '../../lib/profile'
import { formatTodayHe } from '../../lib/format'

const notifications = [
  { icon: '⭐', text: 'ביקורת חדשה (5★) מ-יעל ה.', time: 'לפני 2 שעות' },
  { icon: '💰', text: 'תשלום של 480₪ הועבר לחשבונך', time: 'לפני יום' },
  { icon: '🆕', text: '12 הזמנות חדשות באזור שלך', time: 'לפני 3 שעות' },
]

export default function Home() {
  const navigate = useNavigate()
  const name = getProviderName()

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-ink">
            ברוכה הבאה, {name}
          </h2>
          <span className="inline-block mt-2 text-sm text-wine bg-wine/10 px-3 py-1 rounded-full">
            ✓ פרופיל מאומת
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="הכנסות החודש" value="₪3,240" trend={{ value: '+12%', up: true }} footer="מהחודש שעבר" />
        <KPICard label="עבודות החודש" value="8" footer="מתוך 24 בכל הזמנים" />
        <KPICard label="דירוג ממוצע" value="4.8★" footer="12 ביקורות" />
        <KPICard label="שעות עבודה" value="34" footer="החודש" />
      </div>

      {/* Open jobs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl text-ink">הזמנות פתוחות באזור</h3>
          <Link
            to="/providers/dashboard/available"
            className="text-sm text-wine hover:underline"
          >
            צפי בכולן ←
          </Link>
        </div>
        <div className="space-y-3">
          {MOCK_AVAILABLE_JOBS.slice(0, 3).map((job) => (
            <JobPreviewCard
              key={job.id}
              job={job}
              onDetails={() => navigate('/providers/dashboard/available')}
            />
          ))}
        </div>
      </section>

      {/* Today */}
      <section>
        <h3 className="font-serif text-2xl text-ink mb-4">היום, {formatTodayHe()}</h3>
        <div className="bg-white/40 border border-stone/15 rounded-sm py-12 text-center">
          <CalendarDays size={40} className="mx-auto text-stone/50 mb-3" strokeWidth={1.5} />
          <p className="text-stone">אין עבודות מתוזמנות להיום</p>
        </div>
      </section>

      {/* Notifications */}
      <section>
        <h3 className="font-serif text-2xl text-ink mb-4">התראות אחרונות</h3>
        <ul className="space-y-2">
          {notifications.map((n, i) => (
            <li
              key={i}
              className="flex items-center gap-3 bg-white/60 border border-stone/15 rounded-sm px-4 py-3"
            >
              <span className="text-xl">{n.icon}</span>
              <span className="flex-1 text-ink text-sm">{n.text}</span>
              <span className="text-xs text-stone">{n.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
