import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'השירותים', href: '#' },
  { label: 'הסיפור', href: '#' },
  { label: 'איך זה עובד', href: '#' },
  { label: 'לעובדות', href: '#', active: true },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-ink/5">
      <div className="mx-auto max-w-7xl px-8 lg:px-16 h-20 flex items-center justify-between">
        <Link to="/providers/join" className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-ink text-cream flex items-center justify-center font-serif text-lg">
            N
          </span>
          <span className="font-serif text-2xl tracking-wide">NANY</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={
                item.active
                  ? 'font-semibold text-ink border-b border-ink pb-1'
                  : 'text-stone hover:text-ink transition-colors'
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          to="/providers/onboarding"
          className="bg-wine text-cream px-6 py-3 rounded-full text-sm font-medium hover:bg-wine/90 transition-colors"
        >
          התחילי הרשמה
        </Link>
      </div>
    </header>
  )
}
