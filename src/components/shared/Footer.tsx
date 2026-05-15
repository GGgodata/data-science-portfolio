const COLUMNS = [
  {
    title: 'הקטגוריות',
    items: [
      'ניקיון ותחזוקה',
      'טיפול בילדים',
      'בישול ואוכל',
      'חיות מחמד',
      'כל השירותים →',
    ],
  },
  {
    title: 'החברה',
    items: ['הסיפור שלנו', 'איך זה עובד', 'הצטרפי כעובדת'],
  },
  {
    title: 'תמיכה',
    items: ['שאלות נפוצות', 'מדיניות פרטיות', 'תנאי שימוש'],
  },
  {
    title: 'צרי קשר',
    items: ['WhatsApp 050-123-4567', 'hello@nany.co.il', '7 ימים בשבוע 08:00—22:00'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-cream py-16">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-serif text-lg mb-5 text-cream">{col.title}</h4>
              <ul className="space-y-3 text-sm font-light text-cream/70">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-cream transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4 border-t border-cream/10 pt-12">
          <span className="w-16 h-16 rounded-full bg-cream text-ink flex items-center justify-center font-serif text-3xl">
            N
          </span>
          <p className="font-serif italic text-xl text-cream/90">
            הבית שלך, מנוהל באהבה — באמת
          </p>
        </div>

        <div className="mt-12 text-center text-xs font-light text-cream/50">
          © 2026 NANY · The Home Edit
        </div>
      </div>
    </footer>
  )
}
