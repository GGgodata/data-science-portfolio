import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from './anim'

const testimonials = [
  {
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    quote:
      'אחרי 8 שנים בחברת ניקיון שלקחה לי 40% — סוף סוף אני עובדת ישירות. הכפלתי את ההכנסה ועובדת פחות שעות.',
    name: 'שרה, 38',
    meta: 'ניקיון בית · 14 חודשים ב-NANY',
  },
  {
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    quote:
      'בניתי לעצמי 5 משפחות קבועות שאני מטפלת אצלן בילדים. ההורים נהדרים, התעריף הוגן, וסוף סוף יש לי קביעות.',
    name: 'רותם, 29',
    meta: 'בייביסיטר · 6 חודשים',
  },
  {
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    quote:
      'אחרי 20 שנה במסעדות, NANY נתנה לי להיות שף עצמאית. אני מבשלת אצל לקוחות פעמיים בשבוע ומרוויחה יותר.',
    name: 'מיכל, 45',
    meta: 'שף פרטית · 22 חודשים',
  },
]

export default function Testimonials() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-white/40">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="font-serif font-light text-4xl md:text-5xl text-ink mb-16 text-center"
        >
          <span className="italic text-wine">נשים</span> שהצטרפו
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="bg-cream border border-stone/15 rounded-sm p-8 flex flex-col items-center text-center"
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover mb-6"
              />
              <p className="font-serif italic text-xl text-ink leading-relaxed mb-6">
                “{t.quote}”
              </p>
              <div className="mt-auto">
                <div className="font-medium text-ink">{t.name}</div>
                <div className="text-sm text-stone mt-1">{t.meta}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
