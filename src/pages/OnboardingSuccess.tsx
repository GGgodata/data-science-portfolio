import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Phone, Briefcase } from 'lucide-react'
import Button from '../components/ui/Button'
import { getProviderName } from '../lib/profile'

const steps = [
  { icon: Clock, time: 'עכשיו', text: 'אנחנו בודקות את הפרטים' },
  { icon: Phone, time: 'תוך 24 שעות', text: 'שיחת וואטסאפ לתיאום ראיון' },
  { icon: Briefcase, time: 'תוך 7 ימים', text: 'אישור + פרופיל חי + עבודה ראשונה' },
]

export default function OnboardingSuccess() {
  const navigate = useNavigate()
  const name = getProviderName()

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-wine/5 flex items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <CheckCircle size={96} className="text-wine" strokeWidth={1.25} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-serif font-light text-4xl md:text-5xl text-ink mb-4">
            <span className="italic text-wine">תודה</span>, {name}!
          </h1>
          <p className="text-stone text-lg leading-relaxed mb-10">
            הבקשה שלך התקבלה. אנחנו נחזור אלייך תוך 24 שעות בוואטסאפ עם תיאום ראיון קצר.
          </p>

          <div className="bg-white/70 border border-stone/15 rounded-sm p-6 text-right mb-8">
            <h3 className="font-serif text-lg text-ink mb-4">מה קורה עכשיו?</h3>
            <ul className="space-y-4">
              {steps.map((s) => (
                <li key={s.time} className="flex items-start gap-3">
                  <s.icon size={20} className="text-wine mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-ink">{s.time}</span>
                    <span className="text-stone"> — {s.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Button size="lg" onClick={() => navigate('/providers/dashboard')}>
            כניסה לדשבורד (תצוגה מקדימה)
          </Button>
          <p className="text-sm text-stone mt-4">
            בינתיים תוכלי לראות איך הדשבורד שלך יראה
          </p>
        </motion.div>
      </div>
    </div>
  )
}
