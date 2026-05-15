import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const BASE_NAME = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined
import Layout from './components/shared/Layout'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import OnboardingSuccess from './pages/OnboardingSuccess'
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardHome from './pages/dashboard/Home'
import AvailableJobs from './pages/dashboard/AvailableJobs'
import MyJobs from './pages/dashboard/MyJobs'
import Schedule from './pages/dashboard/Schedule'
import Earnings from './pages/dashboard/Earnings'
import Reviews from './pages/dashboard/Reviews'
import Profile from './pages/dashboard/Profile'

export default function App() {
  return (
    <BrowserRouter basename={BASE_NAME}>
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
        <Route path="/providers/onboarding/success" element={<OnboardingSuccess />} />
        <Route path="/providers/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="available" element={<AvailableJobs />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
