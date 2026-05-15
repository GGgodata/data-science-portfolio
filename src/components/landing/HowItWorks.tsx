import { motion } from 'framer-motion'

const STEPS = [
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
    <section className="py-24 lg:py-32 px-8 lg:px-16 bg-ink/[0.02]">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl leading-tight">
            ארבעה צעדים ל<span className="italic">הצטרפות</span>
          </h2>
          <p className="mt-6 text-stone text-lg font-light leading-relaxed">
            התהליך לוקח כמה ימים. אנחנו לא מקבלים את כולן — אנחנו מקבלות את הטובות ביותר.
          </p>

          <div className="mt-14 space-y-12">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.roman}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-8 relative"
              >
                <div className="flex-shrink-0 w-16">
                  <div className="font-serif italic text-5xl text-wine">{s.roman}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                    <h3 className="font-serif text-2xl">{s.title}</h3>
                    <span className="text-xs uppercase tracking-wider text-stone">
                      {s.duration}
                    </span>
                  </div>
                  <p className="text-stone font-light leading-relaxed">{s.text}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="absolute right-7 top-14 bottom-[-3rem] w-px bg-stone/20" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="order-1 lg:order-2"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl shadow-ink/15">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
              alt="Professional at work"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
