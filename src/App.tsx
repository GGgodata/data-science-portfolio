import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import OnboardingSuccess from './pages/OnboardingSuccess'
import { OnboardingProvider } from './context/OnboardingContext'
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
    <Routes>
      <Route path="/" element={<Navigate to="/providers/join" replace />} />
      <Route path="/providers/join" element={<Landing />} />
      <Route
        path="/providers/onboarding"
        element={
          <OnboardingProvider>
            <Onboarding />
          </OnboardingProvider>
        }
      />
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
      <Route path="*" element={<Navigate to="/providers/join" replace />} />
    </Routes>
  )
}
