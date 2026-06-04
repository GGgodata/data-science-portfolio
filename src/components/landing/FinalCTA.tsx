import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { fadeUp, viewport } from './anim'

export default function FinalCTA() {
  const navigate = useNavigate()

  return (
    <section className="px-6 md:px-12 lg:px-20 py-32 bg-gradient-to-bl from-wine to-wine/80">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mx-auto max-w-2xl text-center text-cream"
      >
        <h2 className="font-serif font-light text-5xl md:text-6xl mb-6">
          מצטרפים <span className="italic">עכשיו</span>
        </h2>
        <p className="text-xl text-cream/80 mb-10">
          180+ נשים כבר עובדות איתנו. את הבאה.
        </p>
        <Button
          size="lg"
          variant="cream"
          onClick={() => navigate('/providers/onboarding')}
        >
          התחילי הרשמה
        </Button>
        <p className="text-sm text-cream/70 mt-6">ההרשמה לוקחת 10-15 דקות</p>
      </motion.div>
    </section>
  )
}
