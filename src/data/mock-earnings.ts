export type Payment = {
  id: string
  date: string
  clientName: string
  jobTitle: string
  amount: number
  status: 'completed' | 'pending'
}

export type MonthlyEarnings = { month: string; amount: number }

export const MOCK_EARNINGS = {
  totalAllTime: 28640,
  thisMonth: 3240,
  pending: 780,
  lastMonth: 2890,
  monthlyData: [
    { month: 'יוני 23', amount: 0 },
    { month: 'יולי 23', amount: 1200 },
    { month: 'אוגוסט 23', amount: 1850 },
    { month: 'ספטמבר 23', amount: 2100 },
    { month: 'אוקטובר 23', amount: 1980 },
    { month: 'נובמבר 23', amount: 2240 },
    { month: 'דצמבר 23', amount: 2680 },
    { month: 'ינואר 24', amount: 2350 },
    { month: 'פברואר 24', amount: 2500 },
    { month: 'מרץ 24', amount: 2750 },
    { month: 'אפריל 24', amount: 2890 },
    { month: 'מאי 24', amount: 3240 },
  ] satisfies MonthlyEarnings[],
  recentPayments: [
    { id: 'p1', date: '2026-05-12', clientName: 'רותם א.', jobTitle: 'ניקיון יסודי', amount: 480, status: 'completed' },
    { id: 'p2', date: '2026-05-10', clientName: 'יעל ה.', jobTitle: 'ניקיון שוטף', amount: 300, status: 'completed' },
    { id: 'p3', date: '2026-05-08', clientName: 'נטע פ.', jobTitle: 'בייביסיטר', amount: 325, status: 'completed' },
    { id: 'p4', date: '2026-05-05', clientName: 'אסתר ל.', jobTitle: 'ניקיון שוטף', amount: 300, status: 'completed' },
    { id: 'p5', date: '2026-05-03', clientName: 'יעל ה.', jobTitle: 'ניקיון שוטף', amount: 300, status: 'completed' },
    { id: 'p6', date: '2026-05-16', clientName: 'נועה ס.', jobTitle: 'ניקיון שוטף', amount: 300, status: 'pending' },
    { id: 'p7', date: '2026-05-17', clientName: 'אורית ב.', jobTitle: 'ניקיון יסודי', amount: 480, status: 'pending' },
  ] satisfies Payment[],
}
