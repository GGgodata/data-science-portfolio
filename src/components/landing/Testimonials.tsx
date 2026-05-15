import { motion } from 'framer-motion'

const STORIES = [
  {
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    quote:
      'אחרי 8 שנים בחברת ניקיון שלקחה לי 40% — סוף סוף אני עובדת ישירות. הכפלתי את ההכנסה ועובדת פחות שעות.',
    name: 'שרה',
    age: 38,
    category: 'ניקיון בית',
    tenure: '14 חודשים ב-NANY',
  },
  {
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    quote:
      'בניתי לעצמי 5 משפחות קבועות שאני מטפלת אצלן בילדים. ההורים נהדרים, התעריף הוגן, וסוף סוף יש לי קביעות.',
    name: 'רותם',
    age: 29,
    category: 'בייביסיטר',
    tenure: '6 חודשים',
  },
  {
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    quote:
      'אחרי 20 שנה במסעדות, NANY נתנה לי להיות שף עצמאית. אני מבשלת אצל לקוחות פעמיים בשבוע ומרוויחה יותר ממה שהרווחתי בשף סו.',
    name: 'מיכל',
    age: 45,
    category: 'שף פרטית',
    tenure: '22 חודשים',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 px-8 lg:px-16 bg-cream">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center font-serif font-light text-4xl md:text-5xl lg:text-6xl leading-tight"
        >
          <span className="italic">נשים</span> שהצטרפו
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {STORIES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="text-center flex flex-col items-center"
            >
              <img
                src={s.photo}
                alt={s.name}
                className="w-24 h-24 rounded-full object-cover mb-8 shadow-md"
              />
              <p className="font-serif italic text-xl lg:text-2xl leading-relaxed text-ink mb-8">
                “{s.quote}”
              </p>
              <div className="mt-auto">
                <div className="font-serif text-lg">
                  {s.name}, {s.age}
                </div>
                <div className="text-xs uppercase tracking-wider text-stone mt-2">
                  {s.category} · {s.tenure}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
