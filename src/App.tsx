import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import DashboardHome from './pages/dashboard/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/providers/join" replace />} />
        <Route
          path="/providers/join"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />
        <Route path="/providers/onboarding" element={<Onboarding />} />
        <Route path="/providers/dashboard" element={<DashboardHome />} />
      </Routes>
    </BrowserRouter>
  )
}
