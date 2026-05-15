import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { loadProvider, type ProviderSummary } from '../../lib/provider'

export default function DashboardLayout() {
  const [provider, setProvider] = useState<ProviderSummary | null>(null)

  useEffect(() => {
    setProvider(loadProvider())
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <Sidebar provider={provider} />
      <div className="mr-[280px] min-h-screen flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 lg:px-12 py-10">
          <Outlet context={{ provider }} />
        </main>
      </div>
    </div>
  )
}
