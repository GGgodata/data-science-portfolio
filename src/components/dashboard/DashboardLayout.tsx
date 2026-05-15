import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { loadProvider, type ProviderSummary } from '../../lib/provider'

export default function DashboardLayout() {
  const [provider, setProvider] = useState<ProviderSummary | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setProvider(loadProvider())
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-cream">
      <Sidebar
        provider={provider}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:mr-[280px] min-h-screen flex flex-col">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 lg:py-10">
          <Outlet context={{ provider }} />
        </main>
      </div>
    </div>
  )
}
