import { Star, MapPin, Calendar } from 'lucide-react'
import { CATEGORIES } from '../../data/categories'
import type { ProviderSummary } from '../../lib/provider'

const DAY_LABEL: Record<string, string> = {
  sun: 'א',
  mon: 'ב',
  tue: 'ג',
  wed: 'ד',
  thu: 'ה',
  fri: 'ו',
  sat: 'ש',
}

type ProfilePreviewProps = {
  provider: ProviderSummary
}

export default function ProfilePreview({ provider }: ProfilePreviewProps) {
  const fullName =
    [provider.firstName, provider.lastName].filter(Boolean).join(' ') || 'ספקית'
  const catNames = (provider.categories ?? [])
    .map((id) => CATEGORIES.find((c) => c.id === id)?.name)
    .filter(Boolean) as string[]

  return (
    <div className="bg-cream border border-stone/15 rounded-sm p-8 shadow-sm">
      <div className="text-[10px] uppercase tracking-wider text-stone text-center mb-6">
        כך לקוחות רואות אותך
      </div>

      <div className="flex flex-col items-center text-center">
        {provider.profilePhoto ? (
          <img
            src={provider.profilePhoto}
            alt={fullName}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-stone/20 flex items-center justify-center font-serif text-3xl text-stone">
            {fullName.charAt(0)}
          </div>
        )}
        <h2 className="font-serif text-3xl mt-5">{fullName}</h2>
        <div className="flex items-center gap-1 mt-2 text-lg">
          <Star size={18} className="fill-gold text-gold" /> 4.8
          <span className="text-sm text-stone mr-2">(47 ביקורות)</span>
        </div>
        <p className="text-xs text-stone mt-1">
          24 הזמנות · חברה מ-2024
        </p>
      </div>

      {catNames.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {catNames.map((c) => (
            <span
              key={c}
              className="bg-wine/10 text-wine text-xs px-3 py-1 rounded-full"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {provider.bio && (
        <p className="mt-6 font-serif italic text-center text-ink leading-relaxed">
          “{provider.bio}”
        </p>
      )}

      <div className="mt-6 border-t border-stone/15 pt-6 space-y-3 text-sm">
        {provider.hourlyRate && (
          <div className="flex justify-between">
            <span className="text-stone">תעריף</span>
            <span className="font-medium">{provider.hourlyRate}₪ / שעה</span>
          </div>
        )}
        {(provider.serviceAreas?.length || provider.nearbyOnly) && (
          <div className="flex items-start gap-2 text-stone">
            <MapPin size={14} className="mt-0.5 flex-shrink-0" />
            <span>
              {provider.nearbyOnly
                ? 'עד 30 ק״מ מהבית'
                : provider.serviceAreas?.join(', ')}
            </span>
          </div>
        )}
        {provider.availableDays?.length ? (
          <div className="flex items-start gap-2 text-stone">
            <Calendar size={14} className="mt-0.5 flex-shrink-0" />
            <span>
              ימים זמינים:{' '}
              {provider.availableDays.map((d) => DAY_LABEL[d] ?? d).join(', ')}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
