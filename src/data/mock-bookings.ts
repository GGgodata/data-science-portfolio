export type BookingStatus = 'upcoming' | 'pending' | 'completed' | 'cancelled'

export type Booking = {
  id: string
  jobId: string
  client: { name: string; photo: string; rating: number; phone: string }
  category: string
  date: string
  duration: number
  city: string
  address: string
  hourlyRate: number
  totalEarnings: number
  status: BookingStatus
  hasReview?: boolean
  reviewRating?: number
}

export const MOCK_BOOKINGS: Booking[] = [
  // Upcoming (3)
  { id: 'b1', jobId: 'past-1', client: { name: 'נועה ס.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80', rating: 5.0, phone: '052-1234567' }, category: 'ניקיון שוטף', date: '2026-05-16T09:00:00', duration: 4, city: 'תל אביב', address: 'בן יהודה 89, ת״א', hourlyRate: 75, totalEarnings: 300, status: 'upcoming' },
  { id: 'b2', jobId: 'past-2', client: { name: 'אורית ב.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80', rating: 4.8, phone: '054-9876543' }, category: 'ניקיון יסודי', date: '2026-05-17T08:00:00', duration: 6, city: 'רמת גן', address: 'ביאליק 12, רמת גן', hourlyRate: 80, totalEarnings: 480, status: 'upcoming' },
  { id: 'b3', jobId: 'past-3', client: { name: 'דנה כ.', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80', rating: 4.9, phone: '050-5555555' }, category: 'בייביסיטר', date: '2026-05-18T19:00:00', duration: 4, city: 'גבעתיים', address: 'כצנלסון 24, גבעתיים', hourlyRate: 65, totalEarnings: 260, status: 'upcoming' },

  // Pending (2)
  { id: 'b4', jobId: 'job-1', client: { name: 'יעל ה.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80', rating: 4.9, phone: '052-9999999' }, category: 'ניקיון שוטף', date: '2026-05-20T09:00:00', duration: 4, city: 'רמת גן', address: 'ז׳בוטינסקי 45, רמת גן', hourlyRate: 75, totalEarnings: 300, status: 'pending' },
  { id: 'b5', jobId: 'job-9', client: { name: 'גלית ע.', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80', rating: 4.9, phone: '053-1111111' }, category: 'ניקיון שוטף', date: '2026-05-19T08:00:00', duration: 3, city: 'תל אביב', address: 'הרצל 78, ת״א', hourlyRate: 70, totalEarnings: 210, status: 'pending' },

  // Completed (8)
  { id: 'b6', jobId: 'past-4', client: { name: 'רותם א.', photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&q=80', rating: 5.0, phone: '050-1' }, category: 'ניקיון יסודי', date: '2026-05-12T08:00:00', duration: 6, city: 'תל אביב', address: 'רוטשילד 100, ת״א', hourlyRate: 80, totalEarnings: 480, status: 'completed', hasReview: true, reviewRating: 5 },
  { id: 'b7', jobId: 'past-5', client: { name: 'יעל ה.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80', rating: 4.9, phone: '050-2' }, category: 'ניקיון שוטף', date: '2026-05-10T09:00:00', duration: 4, city: 'רמת גן', address: 'ז׳בוטינסקי 45, רמת גן', hourlyRate: 75, totalEarnings: 300, status: 'completed', hasReview: true, reviewRating: 5 },
  { id: 'b8', jobId: 'past-6', client: { name: 'נטע פ.', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80', rating: 4.7, phone: '050-3' }, category: 'בייביסיטר', date: '2026-05-08T18:00:00', duration: 5, city: 'הרצליה', address: 'סוקולוב 30, הרצליה', hourlyRate: 65, totalEarnings: 325, status: 'completed', hasReview: true, reviewRating: 4 },
  { id: 'b9', jobId: 'past-7', client: { name: 'אסתר ל.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80', rating: 5.0, phone: '050-4' }, category: 'ניקיון שוטף', date: '2026-05-05T09:00:00', duration: 4, city: 'גבעתיים', address: 'הרצל 25, גבעתיים', hourlyRate: 75, totalEarnings: 300, status: 'completed', hasReview: true, reviewRating: 5 },
  { id: 'b10', jobId: 'past-8', client: { name: 'יעל ה.', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80', rating: 4.9, phone: '050-5' }, category: 'ניקיון שוטף', date: '2026-05-03T09:00:00', duration: 4, city: 'רמת גן', address: 'ז׳בוטינסקי 45, רמת גן', hourlyRate: 75, totalEarnings: 300, status: 'completed', hasReview: true, reviewRating: 5 },
  { id: 'b11', jobId: 'past-9', client: { name: 'תהילה ש.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80', rating: 4.6, phone: '050-6' }, category: 'ניקיון יסודי', date: '2026-05-01T08:00:00', duration: 5, city: 'תל אביב', address: 'דיזנגוף 200, ת״א', hourlyRate: 80, totalEarnings: 400, status: 'completed', hasReview: false },
  { id: 'b12', jobId: 'past-10', client: { name: 'דניאל ק.', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80', rating: 4.8, phone: '050-7' }, category: 'ניקיון שוטף', date: '2026-04-28T10:00:00', duration: 3, city: 'תל אביב', address: 'ארלוזורוב 50, ת״א', hourlyRate: 75, totalEarnings: 225, status: 'completed', hasReview: true, reviewRating: 5 },
  { id: 'b13', jobId: 'past-11', client: { name: 'שני ה.', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80', rating: 5.0, phone: '050-8' }, category: 'ניקיון שוטף', date: '2026-04-26T09:00:00', duration: 4, city: 'רמת גן', address: 'הראשונים 15, רמת גן', hourlyRate: 75, totalEarnings: 300, status: 'completed', hasReview: true, reviewRating: 4 },

  // Cancelled (1)
  { id: 'b14', jobId: 'past-12', client: { name: 'מורן ל.', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80', rating: 4.5, phone: '050-9' }, category: 'ניקיון שוטף', date: '2026-05-09T09:00:00', duration: 3, city: 'תל אביב', address: 'אבן גבירול 88, ת״א', hourlyRate: 70, totalEarnings: 210, status: 'cancelled' },
]
