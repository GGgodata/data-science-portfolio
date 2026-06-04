import { Link } from 'react-router-dom'

export default function OnboardingSuccess() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-serif text-4xl text-wine mb-4">תודה!</h1>
        <p className="text-stone mb-6">הבקשה שלך התקבלה.</p>
        <Link to="/providers/dashboard" className="text-wine underline">
          לדשבורד ←
        </Link>
      </div>
    </div>
  )
}
