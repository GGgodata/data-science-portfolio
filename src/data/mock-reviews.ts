export type Review = {
  id: string
  clientName: string
  clientPhoto: string
  rating: number
  date: string
  text: string
  jobCategory: string
  hasResponse?: boolean
  response?: string
}

export const MOCK_REVIEWS = {
  averageRating: 4.8,
  totalReviews: 47,
  distribution: { 5: 38, 4: 7, 3: 2, 2: 0, 1: 0 } as Record<number, number>,
  reviews: [
    { id: 'r1', clientName: 'יעל ה.', clientPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80', rating: 5, date: '2026-05-13', text: 'שרה הגיעה בדיוק בזמן, עבדה בשקט וביעילות, והבית פשוט מבריק. כבר קבעתי איתה לקבועה.', jobCategory: 'ניקיון שוטף', hasResponse: false },
    { id: 'r2', clientName: 'נטע פ.', clientPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80', rating: 4, date: '2026-05-09', text: 'הילדים מאוד אהבו אותה. רק תזכורת — בפעם הבאה אנא לתת אוכל לפי הסדר שכתבתי.', jobCategory: 'בייביסיטר', hasResponse: true, response: 'תודה רבה על המשוב! לקחתי לתשומת לב, יהיה בסדר בפעם הבאה ✨' },
    { id: 'r3', clientName: 'אסתר ל.', clientPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80', rating: 5, date: '2026-05-06', text: 'מנקה מצוינת. שמתי לב גם לפרטים הקטנים שאני אישה לא הייתי שמה לב.', jobCategory: 'ניקיון שוטף', hasResponse: false },
    { id: 'r4', clientName: 'דניאל ק.', clientPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80', rating: 5, date: '2026-04-29', text: 'אמא אישה אמיתית. עבדה מהר, לא בזבזה זמן, התוצאה מעולה. ממליץ בחום.', jobCategory: 'ניקיון שוטף', hasResponse: false },
    { id: 'r5', clientName: 'שני ה.', clientPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80', rating: 4, date: '2026-04-27', text: 'עבודה טובה. רק לקח קצת יותר זמן ממה שתכננו.', jobCategory: 'ניקיון שוטף', hasResponse: false },
    { id: 'r6', clientName: 'רותם א.', clientPhoto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&q=80', rating: 5, date: '2026-04-25', text: 'הזמנתי לניקיון יסודי לפני אירוח — שרה עשתה עבודה מושלמת. הבית מהמם.', jobCategory: 'ניקיון יסודי', hasResponse: false },
  ] satisfies Review[],
}
