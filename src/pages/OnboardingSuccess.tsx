import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Phone, Briefcase } from 'lucide-react'

const SUMMARY_STORAGE_KEY = 'nany_provider_summary'

type SavedSummary = { firstName?: string }

export default function OnboardingSuccess() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState<string | undefined>(undefined)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SUMMARY_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as SavedSummary
        setFirstName(parsed.firstName)
      }
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-wine/5 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="inline-block"
        >
          <CheckCircle size={96} className="text-wine mx-auto" strokeWidth={1.2} />
        </motion.div>

        <h1 className="font-serif font-light text-5xl md:text-6xl mt-8 leading-tight">
          <span className="italic">תודה</span>
          {firstName ? `, ${firstName}` : ''}!
        </h1>
        <p className="mt-6 text-stone text-lg font-light">
          הבקשה שלך התקבלה. אנחנו נחזור אלייך תוך 24 שעות בוואטסאפ עם תיאום ראיון קצר.
        </p>

        <div className="mt-12 bg-cream border border-stone/20 rounded-sm p-8 text-right">
          <div className="text-xs uppercase tracking-wider text-stone mb-6">
            מה קורה עכשיו?
          </div>
          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <Clock className="text-wine flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-medium">עכשיו</div>
                <div className="text-sm text-stone">אנחנו בודקות את הפרטים</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-wine flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-medium">תוך 24 שעות</div>
                <div className="text-sm text-stone">שיחת וואטסאפ לתיאום ראיון</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Briefcase className="text-wine flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-medium">תוך 7 ימים</div>
                <div className="text-sm text-stone">
                  אישור · פרופיל חי · עבודה ראשונה
                </div>
              </div>
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate('/providers/dashboard')}
          className="mt-12 bg-wine text-cream px-10 py-4 rounded-full text-base font-medium hover:bg-wine/90 transition-colors"
        >
          כניסה לדשבורד (תצוגה מקדימה)
        </button>
        <p className="mt-4 text-xs text-stone">
          בינתיים תוכלי לראות איך הדשבורד שלך יראה
        </p>
      </motion.div>
    </div>
  )
}
