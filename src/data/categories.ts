import {
  Sparkles,
  Baby,
  ChefHat,
  Dog,
  Leaf,
  Wine,
  HeartHandshake,
  ShoppingBag,
  HeartPulse,
  Car,
  Wrench,
  Laptop,
  type LucideIcon,
} from 'lucide-react'

export type Category = {
  id: string
  name: string
  emoji: string
  icon: LucideIcon
}

export const CATEGORIES: Category[] = [
  { id: 'cleaning', name: 'ניקיון בית', emoji: '🧹', icon: Sparkles },
  { id: 'childcare', name: 'טיפול בילדים', emoji: '👶', icon: Baby },
  { id: 'cooking', name: 'בישול ביתי', emoji: '🍳', icon: ChefHat },
  { id: 'pets', name: 'חיות מחמד', emoji: '🐕', icon: Dog },
  { id: 'gardening', name: 'גינון ונוף', emoji: '🌿', icon: Leaf },
  { id: 'hosting', name: 'אירוח ואירועים', emoji: '🥂', icon: Wine },
  { id: 'eldercare', name: 'תמיכה לקשישים', emoji: '🤝', icon: HeartHandshake },
  { id: 'errands', name: 'שליחויות', emoji: '🛍️', icon: ShoppingBag },
  { id: 'wellness', name: 'בריאות ואיכות חיים', emoji: '🧘', icon: HeartPulse },
  { id: 'transport', name: 'תחבורה', emoji: '🚗', icon: Car },
  { id: 'maintenance', name: 'תחזוקת בית', emoji: '🔧', icon: Wrench },
  { id: 'digital', name: 'עזרה דיגיטלית', emoji: '💻', icon: Laptop },
]

export const CATEGORY_BY_ID: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
)

export const CITIES = [
  'תל אביב',
  'רמת גן',
  'גבעתיים',
  'הרצליה',
  'פתח תקווה',
  'ראשון לציון',
  'חולון',
  'בת ים',
  'רעננה',
  'כפר סבא',
  'נתניה',
  'חיפה',
  'ירושלים',
  'באר שבע',
  'אשדוד',
  'אשקלון',
  'רחובות',
  'מודיעין',
]
