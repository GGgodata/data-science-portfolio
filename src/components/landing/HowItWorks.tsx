import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from './anim'

const steps = [
  {
    roman: 'I',
    title: 'הרשמה',
    duration: '5 דקות',
    text: 'ממלאות טופס קצר: פרטים, ניסיון, אזורים, זמינות.',
  },
  {
    roman: 'II',
    title: 'אימות זהות',
    duration: '24 שעות',
    text: 'אנחנו מאמתים את ת.ז., בודקות 2-3 המלצות, ומקיימות ראיון קצר בזום.',
  },
  {
    roman: 'III',
    title: 'פרופיל חי',
    duration: 'יום נוסף',
    text: 'התמונה והפרופיל שלך נכנסים למאגר. הלקוחות יכולות להזמין אותך.',
  },
  {
    roman: 'IV',
    title: 'עבודה ראשונה',
    duration: 'תוך 7 ימים',
    text: 'הזמנה ראשונה. בהמשך — בניית קהל לקוחות קבועים.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start">
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mb-14"
          >
            <h2 className="font-serif font-light text-4xl md:text-5xl text-ink mb-6">
              ארבעה צעדים ל<span className="italic text-wine">הצטרפות</span>
            </h2>
            <p className="text-lg text-stone leading-relaxed max-w-xl">
              התהליך לוקח כמה ימים. אנחנו לא מקבלים את כולן — אנחנו מקבלות את
              הטובות ביותר.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="space-y-10"
          >
            {steps.map((step) => (
              <motion.div
                key={step.roman}
                variants={fadeUp}
                className="flex gap-6 border-r-2 border-wine/15 pr-6"
              >
                <div className="font-serif font-light text-5xl text-wine/30 leading-none w-16 shrink-0">
                  {step.roman}
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="font-serif text-2xl text-ink">{step.title}</h3>
                    <span className="text-sm text-stone">{step.duration}</span>
                  </div>
                  <p className="text-stone leading-relaxed">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-xl sticky top-24">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
              alt="עבודה מקצועית"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
