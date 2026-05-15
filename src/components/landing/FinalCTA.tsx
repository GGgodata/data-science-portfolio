import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function FinalCTA() {
  const navigate = useNavigate()

  return (
    <section className="py-32 px-8 lg:px-16 bg-gradient-to-br from-wine to-wine/80 text-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl leading-tight">
          מצטרפים <span className="italic">עכשיו</span>
        </h2>
        <p className="mt-8 text-cream/85 text-lg md:text-xl font-light">
          180+ נשים כבר עובדות איתנו. את הבאה.
        </p>
        <button
          onClick={() => navigate('/providers/onboarding')}
          className="mt-12 bg-cream text-wine px-10 py-5 rounded-full text-base font-medium hover:bg-cream/90 transition-colors"
        >
          התחילי הרשמה
        </button>
        <p className="mt-6 text-cream/60 text-sm font-light">
          ההרשמה לוקחת 10-15 דקות
        </p>
      </motion.div>
    </section>
  )
}
