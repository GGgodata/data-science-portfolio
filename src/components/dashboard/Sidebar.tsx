import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Search,
  Briefcase,
  Calendar,
  DollarSign,
  Star,
  User,
  LogOut,
  X,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import type { ProviderSummary } from '../../lib/provider'

const NAV_ITEMS = [
  { to: '/providers/dashboard', icon: Home, label: 'בית', end: true },
  { to: '/providers/dashboard/available', icon: Search, label: 'הזמנות פתוחות', badge: '12' },
  { to: '/providers/dashboard/my-jobs', icon: Briefcase, label: 'ההזמנות שלי', badge: '5' },
  { to: '/providers/dashboard/schedule', icon: Calendar, label: 'לוז שבועי' },
  { to: '/providers/dashboard/earnings', icon: DollarSign, label: 'הכנסות' },
  { to: '/providers/dashboard/reviews', icon: Star, label: 'דירוגים' },
  { to: '/providers/dashboard/profile', icon: User, label: 'פרופיל' },
]

type SidebarProps = {
  provider: ProviderSummary | null
  open: boolean
  onClose: () => void
}

export default function Sidebar({ provider, open, onClose }: SidebarProps) {
  const navigate = useNavigate()

  const fullName = [provider?.firstName, provider?.lastName]
    .filter(Boolean)
    .join(' ') || 'ספקית'

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <button
          aria-label="סגירת תפריט"
          onClick={onClose}
          className="lg:hidden fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 right-0 h-screen w-[280px] bg-cream/95 backdrop-blur-sm border-l border-stone/20 flex flex-col z-50 transition-transform duration-300',
          'lg:translate-x-0',
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-ink text-cream flex items-center justify-center font-serif text-sm">
              N
            </span>
            <span className="font-serif text-xl">NANY</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-stone hover:text-ink"
            aria-label="סגירה"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-8 py-4 flex items-center gap-3">
          {provider?.profilePhoto ? (
            <img
              src={provider.profilePhoto}
              alt={fullName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-stone/20 flex items-center justify-center font-serif text-lg text-stone">
              {fullName.charAt(0) || '?'}
            </div>
          )}
          <div>
            <div className="font-serif text-base">{fullName}</div>
            <span className="inline-block bg-wine/10 text-wine text-[10px] font-medium px-2 py-0.5 rounded-full mt-1">
              ✓ מאומתת
            </span>
          </div>
        </div>

        <div className="border-t border-stone/15 my-2" />

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between gap-3 px-4 py-3 rounded-sm text-sm transition-all',
                    isActive
                      ? 'bg-wine/10 text-wine border-r-2 border-wine font-medium'
                      : 'text-stone hover:bg-stone/10 hover:text-ink'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} strokeWidth={1.6} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-wine/10 text-wine text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="px-4 py-6">
          <button
            onClick={() => navigate('/providers/join')}
            className="flex items-center gap-3 px-4 py-3 text-sm text-stone hover:text-ink transition-colors w-full"
          >
            <LogOut size={18} strokeWidth={1.6} />
            <span>התנתקי</span>
          </button>
        </div>
      </aside>
    </>
  )
}
