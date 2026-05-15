import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'כמה זמן לוקח להירשם?',
    a: 'הטופס עצמו לוקח 10-15 דקות. תהליך האימות לוקח בין 24-72 שעות. בסך הכל, מהרישום לעבודה הראשונה — בערך שבוע.',
  },
  {
    q: 'מי קובע את התעריף שלי?',
    a: 'את. את קובעת את התעריף השעתי שלך. אנחנו ממליצות על טווח לפי הקטגוריה והאזור, אבל ההחלטה תמיד שלך.',
  },
  {
    q: 'מתי אני מקבלת את הכסף?',
    a: 'תוך 48 שעות מסיום העבודה. הכסף עובר ישירות לחשבון הבנק שלך — בלי המתנות, בלי תיווכים.',
  },
  {
    q: 'אני יכולה לעבוד גם בעבודה אחרת?',
    a: 'כמובן. רוב הספקיות שלנו עובדות גם בעוד מקומות. את קובעת את הזמינות שלך, ואת בוחרת אילו הזמנות לקבל.',
  },
  {
    q: 'מה אם לקוח מבטל ברגע האחרון?',
    a: 'אם הביטול נעשה פחות מ-24 שעות לפני, את מקבלת 50% מהתשלום. בלי שאלות.',
  },
  {
    q: 'אני צריכה ביטוח?',
    a: 'אנחנו מספקות ביטוח אחריות מקצועית לכל ספקית פעילה — מכוסה בעמלה. את לא צריכה להוסיף ביטוח משלך.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-24 lg:py-32 px-8 lg:px-16 bg-ink/[0.02]">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center font-serif font-light text-4xl md:text-5xl lg:text-6xl mb-16 leading-tight"
        >
          שאלות <span className="italic">נפוצות</span>
        </motion.h2>

        <div className="divide-y divide-stone/20 border-y border-stone/20">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 flex items-center justify-between gap-6 text-right hover:opacity-70 transition-opacity"
                >
                  <span className="font-serif text-xl lg:text-2xl flex-1">{f.q}</span>
                  {isOpen ? (
                    <Minus className="text-wine flex-shrink-0" size={20} />
                  ) : (
                    <Plus className="text-wine flex-shrink-0" size={20} />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-stone font-light leading-relaxed text-lg">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
