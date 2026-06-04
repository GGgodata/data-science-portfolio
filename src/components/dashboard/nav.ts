import {
  Home,
  Search,
  Briefcase,
  Calendar,
  DollarSign,
  Star,
  User,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  badge?: string
  end?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/providers/dashboard', label: 'בית', icon: Home, end: true },
  { to: '/providers/dashboard/available', label: 'הזמנות פתוחות', icon: Search, badge: '12' },
  { to: '/providers/dashboard/my-jobs', label: 'ההזמנות שלי', icon: Briefcase, badge: '5' },
  { to: '/providers/dashboard/schedule', label: 'לוז שבועי', icon: Calendar },
  { to: '/providers/dashboard/earnings', label: 'הכנסות', icon: DollarSign },
  { to: '/providers/dashboard/reviews', label: 'דירוגים', icon: Star },
  { to: '/providers/dashboard/profile', label: 'פרופיל', icon: User },
]
