import { Link } from 'react-router-dom'
import Hero from '../components/landing/Hero'
import WhyNany from '../components/landing/WhyNany'
import HowItWorks from '../components/landing/HowItWorks'
import Testimonials from '../components/landing/Testimonials'
import FAQ from '../components/landing/FAQ'
import FinalCTA from '../components/landing/FinalCTA'

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 backdrop-blur bg-cream/80 border-b border-stone/10">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
          <Link to="/providers/join" className="font-serif text-2xl tracking-wide text-wine">
            NANY
          </Link>
          <Link
            to="/providers/dashboard"
            className="text-sm text-stone hover:text-wine transition-colors"
          >
            כניסת ספקיות ←
          </Link>
        </div>
      </header>
      <main>
        <Hero />
        <WhyNany />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <footer className="bg-ink text-cream/60 py-12 px-6 text-center text-sm">
        <p className="font-serif text-cream text-lg mb-2">NANY</p>
        <p>© 2026 NANY · פלטפורמה לשירותי בית</p>
      </footer>
    </div>
  )
}
