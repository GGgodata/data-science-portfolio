import { Outlet, Link } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-stone/15 px-6 h-16 flex items-center justify-between">
        <Link to="/providers/dashboard" className="font-serif text-xl text-wine">
          NANY
        </Link>
        <nav className="flex gap-4 text-sm text-stone">
          <Link to="/providers/dashboard">בית</Link>
          <Link to="/providers/dashboard/available">הזמנות</Link>
          <Link to="/providers/dashboard/my-jobs">ההזמנות שלי</Link>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
