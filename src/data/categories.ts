export const CATEGORIES = [
  { id: 'cleaning', name: 'ניקיון בית', icon: '🧹' },
  { id: 'childcare', name: 'טיפול בילדים', icon: '👶' },
  { id: 'cooking', name: 'בישול ביתי', icon: '🍳' },
  { id: 'pets', name: 'חיות מחמד', icon: '🐕' },
  { id: 'gardening', name: 'גינון ונוף', icon: '🌿' },
  { id: 'hosting', name: 'אירוח ואירועים', icon: '🥂' },
  { id: 'eldercare', name: 'תמיכה לקשישים', icon: '👵' },
  { id: 'errands', name: 'שליחויות אישיות', icon: '📦' },
  { id: 'wellness', name: 'בריאות ורווחה', icon: '💆' },
  { id: 'transport', name: 'תחבורה ורכב', icon: '🚗' },
  { id: 'maintenance', name: 'תחזוקת בית', icon: '🔧' },
  { id: 'digital', name: 'סיוע דיגיטלי', icon: '💻' }
] as const

export type CategoryId = typeof CATEGORIES[number]['id']
