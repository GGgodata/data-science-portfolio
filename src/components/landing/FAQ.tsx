import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { fadeUp, viewport } from './anim'

const faqs = [
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
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="font-serif font-light text-4xl md:text-5xl text-ink mb-14 text-center"
        >
          שאלות <span className="italic text-wine">נפוצות</span>
        </motion.h2>

        <div className="divide-y divide-stone/15 border-t border-stone/15">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-6 text-right"
              >
                <span className="font-serif text-xl text-ink">{faq.q}</span>
                {open === i ? (
                  <Minus size={20} className="text-wine shrink-0" />
                ) : (
                  <Plus size={20} className="text-stone shrink-0" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-stone leading-relaxed pb-6 pl-8">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
