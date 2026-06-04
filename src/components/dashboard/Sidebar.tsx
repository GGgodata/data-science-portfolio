import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { NAV_ITEMS } from './nav'
import { getProfile, getProviderName } from '../../lib/profile'

const AVATAR_FALLBACK =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80'

export default function Sidebar() {
  const navigate = useNavigate()
  const profile = getProfile()
  const name = getProviderName()
  const lastName = profile?.lastName || ''

  return (
    <aside className="fixed top-0 right-0 z-30 h-screen w-[280px] bg-cream/95 border-l border-stone/20 flex flex-col">
      <div className="px-8 py-6">
        <span className="font-serif text-2xl text-wine tracking-wide">NANY</span>
      </div>

      <div className="px-8 py-4 flex items-center gap-3">
        <img
          src={profile?.profilePhoto || AVATAR_FALLBACK}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="font-serif text-ink truncate">
            {name} {lastName}
          </div>
          <span className="text-xs text-wine bg-wine/10 px-2 py-0.5 rounded-full">
            ✓ מאומתת
          </span>
        </div>
      </div>

      <div className="border-t border-stone/15 my-2 mx-8" />

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-sm px-4 py-3 text-sm transition-colors ${
                isActive
                  ? 'bg-wine/10 text-wine border-r-[3px] border-wine font-medium'
                  : 'text-ink hover:bg-stone/10'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} className={isActive ? 'text-wine' : 'text-stone'} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-xs bg-wine text-cream rounded-full px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-4 py-6">
        <button
          onClick={() => navigate('/providers/join')}
          className="flex items-center gap-3 rounded-sm px-4 py-3 text-sm text-stone hover:bg-stone/10 w-full transition-colors"
        >
          <LogOut size={18} />
          התנתקי
        </button>
      </div>
    </aside>
  )
}
