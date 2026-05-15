import { useLocation } from 'react-router-dom'
import { Bell, MessageCircle, Search } from 'lucide-react'

const PAGE_TITLES: Record<string, string> = {
  '/providers/dashboard': 'הבית שלך',
  '/providers/dashboard/available': 'הזמנות פתוחות',
  '/providers/dashboard/my-jobs': 'ההזמנות שלי',
  '/providers/dashboard/schedule': 'לוז שבועי',
  '/providers/dashboard/earnings': 'הכנסות',
  '/providers/dashboard/reviews': 'דירוגים',
  '/providers/dashboard/profile': 'פרופיל',
}

export default function TopBar() {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] ?? 'הדשבורד'

  return (
    <header className="sticky top-0 z-30 h-16 bg-cream/80 backdrop-blur-md border-b border-stone/20">
      <div className="h-full px-8 lg:px-12 flex items-center justify-between">
        <h1 className="font-serif text-xl">{title}</h1>
        <div className="flex items-center gap-4 text-stone">
          <button className="relative hover:text-ink transition-colors" aria-label="התראות">
            <Bell size={20} strokeWidth={1.6} />
            <span className="absolute -top-1 -left-1 w-2 h-2 bg-wine rounded-full" />
          </button>
          <button className="hover:text-ink transition-colors" aria-label="הודעות">
            <MessageCircle size={20} strokeWidth={1.6} />
          </button>
          <button className="hover:text-ink transition-colors" aria-label="חיפוש">
            <Search size={20} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </header>
  )
}
