import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { fadeUp, stagger } from './anim'

const stats = [
  { value: '180+', label: 'עובדות' },
  { value: '65₪', label: 'ממוצע לשעה' },
  { value: '4.9★', label: 'דירוג' },
]

export default function Hero() {
  const navigate = useNavigate()

  const scrollToWhy = () => {
    document.getElementById('why-nany')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[88vh] px-6 md:px-12 lg:px-20 pt-16 pb-24 flex items-center">
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
        {/* Text — first in RTL = right */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.25em] text-stone uppercase mb-6"
          >
            FOR OUR PROVIDERS · התשכ״ו 2026
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-serif font-light text-5xl md:text-6xl lg:text-7xl leading-tight text-ink mb-8"
          >
            הצטרפי לצוות <span className="italic text-wine">NANY</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-stone leading-relaxed max-w-xl mb-10"
          >
            שכר הוגן, גמישות מלאה, ולקוחות איכותיים. את מקצועית — מגיע לך
            פלטפורמה שמתייחסת אלייך ככזו.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
            <Button size="lg" onClick={() => navigate('/providers/onboarding')}>
              התחילי הרשמה
            </Button>
            <Button size="lg" variant="ghost" onClick={scrollToWhy}>
              ספרי לי עוד
            </Button>
          </motion.div>
          <motion.div variants={fadeUp} className="flex gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl md:text-4xl text-wine">{s.value}</div>
                <div className="text-sm text-stone mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=900&q=80"
              alt="ספקית NANY"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-cream border border-stone/20 px-5 py-3 rounded-sm shadow-lg">
            <span className="font-serif text-sm tracking-widest text-wine">EST. 2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
