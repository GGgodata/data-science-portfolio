import { useLocation } from 'react-router-dom'
import { Bell, MessageCircle, Search } from 'lucide-react'
import { NAV_ITEMS } from './nav'

export default function TopBar() {
  const { pathname } = useLocation()
  const match =
    [...NAV_ITEMS]
      .filter((i) => !i.end)
      .find((i) => pathname.startsWith(i.to)) ||
    NAV_ITEMS.find((i) => i.to === pathname) ||
    NAV_ITEMS[0]

  return (
    <header className="sticky top-0 z-20 h-16 bg-cream/80 backdrop-blur border-b border-stone/20">
      <div className="h-full px-6 flex items-center justify-between flex-row-reverse">
        <h1 className="font-serif text-xl text-ink">{match.label}</h1>
        <div className="flex items-center gap-4 text-stone">
          <button className="relative hover:text-wine transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -left-1 w-2 h-2 bg-wine rounded-full" />
          </button>
          <button className="hover:text-wine transition-colors">
            <MessageCircle size={20} />
          </button>
          <button className="hover:text-wine transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
