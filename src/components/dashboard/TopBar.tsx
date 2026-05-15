import { useLocation } from 'react-router-dom'
import { Bell, MessageCircle, Search, Menu } from 'lucide-react'

const PAGE_TITLES: Record<string, string> = {
  '/providers/dashboard': 'הבית שלך',
  '/providers/dashboard/available': 'הזמנות פתוחות',
  '/providers/dashboard/my-jobs': 'ההזמנות שלי',
  '/providers/dashboard/schedule': 'לוז שבועי',
  '/providers/dashboard/earnings': 'הכנסות',
  '/providers/dashboard/reviews': 'דירוגים',
  '/providers/dashboard/profile': 'פרופיל',
}

type TopBarProps = {
  onMenuClick: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] ?? 'הדשבורד'

  return (
    <header className="sticky top-0 z-30 h-16 bg-cream/80 backdrop-blur-md border-b border-stone/20">
      <div className="h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-stone hover:text-ink"
            aria-label="פתיחת תפריט"
          >
            <Menu size={22} />
          </button>
          <h1 className="font-serif text-lg sm:text-xl truncate">{title}</h1>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-stone">
          <button className="relative hover:text-ink transition-colors" aria-label="התראות">
            <Bell size={20} strokeWidth={1.6} />
            <span className="absolute -top-1 -left-1 w-2 h-2 bg-wine rounded-full" />
          </button>
          <button className="hover:text-ink transition-colors" aria-label="הודעות">
            <MessageCircle size={20} strokeWidth={1.6} />
          </button>
          <button className="hidden sm:block hover:text-ink transition-colors" aria-label="חיפוש">
            <Search size={20} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </header>
  )
}
