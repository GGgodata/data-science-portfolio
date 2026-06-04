import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <Sidebar />
      <div className="mr-0 md:mr-[280px] min-h-screen flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
