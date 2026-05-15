import { motion } from 'framer-motion'
import { Coins, Calendar, Zap, Shield, Heart, Users } from 'lucide-react'

const PROMISES = [
  {
    icon: Coins,
    title: 'שכר הוגן',
    text: 'את קובעת את התעריף שלך. אנחנו לוקחים עמלה קבועה של 15% — נמוך משמעותית מהשוק.',
  },
  {
    icon: Calendar,
    title: 'גמישות מלאה',
    text: 'את בוחרת מתי לעבוד, איפה לעבוד, ועם מי. בלי משמרות כפויות, בלי קריאות פתע.',
  },
  {
    icon: Zap,
    title: 'תשלום ישיר',
    text: 'תוך 48 שעות מסיום העבודה, הכסף נכנס לחשבון שלך. אין המתנות של 30 או 60 יום.',
  },
  {
    icon: Shield,
    title: 'לקוחות איכותיים',
    text: 'כל משפחה עוברת אימות — ת.ז., כתובת, היסטוריית הזמנות. אין לקוחות אנונימיים.',
  },
  {
    icon: Heart,
    title: 'ליווי ותמיכה',
    text: 'מנהלת אזור אישית, קבוצת וואטסאפ של ספקיות, ותמיכה 7 ימים בשבוע.',
  },
  {
    icon: Users,
    title: 'בסיס לקוחות קבוע',
    text: 'אחרי 3 חודשים, רוב הספקיות שלנו עובדות עם 5-7 משפחות קבועות. זו עבודה אמיתית.',
  },
]

export default function WhyNany() {
  return (
    <section id="why-nany" className="py-24 lg:py-32 px-8 lg:px-16 bg-cream">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-stone font-medium">
            The NANY Promise
          </span>
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight">
            למה <span className="italic">לעבוד</span> איתנו?
          </h2>
          <p className="mt-6 text-stone text-lg font-light leading-relaxed">
            אנחנו לא חברת תיווך. אנחנו פלטפורמה. את לא נותנת לנו אחוזים — את משלמת עמלה קבועה נמוכה, וכל השאר שלך.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {PROMISES.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Icon className="text-wine" size={32} strokeWidth={1.5} />
                <h4 className="font-serif text-2xl mt-5 mb-3">{p.title}</h4>
                <p className="text-stone font-light leading-relaxed">{p.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
