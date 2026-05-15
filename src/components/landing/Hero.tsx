import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  const scrollToWhy = () => {
    const el = document.getElementById('why-nany')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-[85vh] flex items-center py-20 px-8 lg:px-16">
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3 space-y-8"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-stone font-medium">
            FOR OUR PROVIDERS · התשכ״ו 2026
          </span>
          <h1 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl leading-tight">
            הצטרפי לצוות{' '}
            <span className="italic">NANY</span>
          </h1>
          <p className="text-lg md:text-xl text-stone leading-relaxed max-w-xl font-light">
            שכר הוגן, גמישות מלאה, ולקוחות איכותיים. את מקצועית — מגיע לך פלטפורמה שמתייחסת אלייך ככזו.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/providers/onboarding')}
              className="bg-wine text-cream px-8 py-4 rounded-full text-sm font-medium hover:bg-wine/90 transition-colors"
            >
              התחילי הרשמה
            </button>
            <button
              onClick={scrollToWhy}
              className="border border-ink/20 text-ink px-8 py-4 rounded-full text-sm font-medium hover:bg-ink/5 transition-colors"
            >
              ספרי לי עוד
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-12 border-t border-stone/20 max-w-xl">
            <div>
              <div className="font-serif text-3xl">180+</div>
              <div className="text-xs text-stone mt-1">עובדות</div>
            </div>
            <div>
              <div className="font-serif text-3xl">65₪</div>
              <div className="text-xs text-stone mt-1">ממוצע לשעה</div>
            </div>
            <div>
              <div className="font-serif text-3xl">4.9★</div>
              <div className="text-xs text-stone mt-1">דירוג ספקיות</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-2 relative"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl shadow-ink/15">
            <img
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=900&q=80"
              alt="Provider at work"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-cream border border-ink/10 px-5 py-3 rounded-sm shadow-lg">
            <div className="text-[10px] tracking-[0.2em] uppercase text-stone">Est.</div>
            <div className="font-serif text-xl">2026</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
