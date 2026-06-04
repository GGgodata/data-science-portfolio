import { Star } from 'lucide-react'
import type { OnboardingData } from '../../context/OnboardingContext'
import { CATEGORY_BY_ID } from '../../data/categories'
import { shekel } from '../../lib/format'

const AVATAR_FALLBACK =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'

export default function ProfilePreview({ data }: { data: OnboardingData }) {
  const name = [data.firstName, data.lastName].filter(Boolean).join(' ') || 'ספקית NANY'

  return (
    <div className="bg-cream border border-stone/15 rounded-sm shadow-sm p-6 text-center">
      <img
        src={data.profilePhoto || AVATAR_FALLBACK}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
      />
      <h3 className="font-serif text-2xl text-ink">{name}</h3>
      <div className="inline-flex items-center gap-1 text-gold mt-1">
        <Star size={16} fill="currentColor" />
        <span className="text-lg">4.8</span>
        <span className="text-stone text-sm">· 47 ביקורות</span>
      </div>
      <p className="text-sm text-stone mt-1">47 הזמנות · חברה מ-2024</p>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {(data.categories || []).map((c) => (
          <span key={c} className="bg-wine/5 text-wine text-sm px-3 py-1 rounded-full">
            {CATEGORY_BY_ID[c]?.name}
          </span>
        ))}
      </div>

      {data.bio && (
        <p className="font-serif italic text-ink mt-5 leading-relaxed">“{data.bio}”</p>
      )}

      <div className="border-t border-stone/15 mt-6 pt-4 text-sm text-stone space-y-1 text-right">
        <p>תעריף: {shekel(data.hourlyRate ?? 0)} / שעה</p>
        <p>
          אזורים:{' '}
          {data.anywhere ? 'עד 30 ק״מ' : (data.serviceAreas || []).join(', ') || '—'}
        </p>
        <p>ימים זמינים: {(data.availableDays || []).join(', ') || '—'}</p>
      </div>
    </div>
  )
}
