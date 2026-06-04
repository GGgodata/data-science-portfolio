import { motion } from 'framer-motion'
import { Coins, Calendar, Zap, Shield, Heart, Users, type LucideIcon } from 'lucide-react'
import { fadeUp, stagger, viewport } from './anim'

type Item = { icon: LucideIcon; title: string; text: string }

const items: Item[] = [
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
    <section id="why-nany" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-white/40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs tracking-[0.25em] text-stone uppercase mb-4">The NANY Promise</p>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-ink mb-6">
            למה <span className="italic text-wine">לעבוד</span> איתנו?
          </h2>
          <p className="text-lg text-stone leading-relaxed">
            אנחנו לא חברת תיווך. אנחנו פלטפורמה. את לא נותנת לנו אחוזים — את משלמת
            עמלה קבועה נמוכה, וכל השאר שלך.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {items.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <item.icon size={32} className="text-wine mb-4" strokeWidth={1.5} />
              <h4 className="font-serif text-xl text-ink mb-2">{item.title}</h4>
              <p className="text-stone leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
