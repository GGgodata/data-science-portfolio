import { useNavigate } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { useOnboarding } from '../../../context/OnboardingContext'
import { CATEGORIES } from '../../../data/categories'
import { SUBCATEGORIES } from '../../../data/subcategories'
import StepWrapper from '../StepWrapper'

const DAY_LABEL: Record<string, string> = {
  sun: 'א',
  mon: 'ב',
  tue: 'ג',
  wed: 'ד',
  thu: 'ה',
  fri: 'ו',
  sat: 'ש',
}

const SUMMARY_STORAGE_KEY = 'nany_provider_summary'

export default function Step16Summary() {
  const { data, setStep, reset } = useOnboarding()
  const navigate = useNavigate()

  const goTo = (s: number) => setStep(s)

  const submit = () => {
    // persist a snapshot for success/dashboard pages before clearing onboarding state
    localStorage.setItem(SUMMARY_STORAGE_KEY, JSON.stringify(data))
    reset()
    navigate('/providers/onboarding/success')
  }

  const catNames = (data.categories ?? [])
    .map((id) => CATEGORIES.find((c) => c.id === id)?.name)
    .filter(Boolean)

  const subNames = (data.subCategories ?? [])
    .flatMap((subId) =>
      Object.values(SUBCATEGORIES).flat().find((s) => s.id === subId)?.name ?? []
    )

  const sections: { title: string; step: number; content: React.ReactNode }[] = [
    {
      title: 'פרטים אישיים',
      step: 1,
      content: (
        <div className="text-sm text-stone space-y-1">
          <div>
            {data.firstName} {data.lastName}
          </div>
          <div dir="ltr" className="text-right">{data.phone}</div>
        </div>
      ),
    },
    {
      title: 'כתובת',
      step: 4,
      content: (
        <div className="text-sm text-stone">
          {data.city} · {data.address}
        </div>
      ),
    },
    {
      title: 'שירותים',
      step: 5,
      content: (
        <div className="flex flex-wrap gap-1.5">
          {catNames.map((n) => (
            <span key={n} className="bg-wine/10 text-wine px-2 py-1 rounded-full text-xs">
              {n}
            </span>
          ))}
          {subNames.map((n) => (
            <span key={n} className="bg-stone/10 text-stone px-2 py-1 rounded-full text-xs">
              {n}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'תעריף',
      step: 8,
      content: (
        <div className="text-sm text-stone">
          {data.hourlyRate}₪ / שעה · {data.yearsOfExperience}
        </div>
      ),
    },
    {
      title: 'זמינות',
      step: 10,
      content: (
        <div className="text-sm text-stone space-y-1">
          <div>
            ימים: {(data.availableDays ?? []).map((d) => DAY_LABEL[d] ?? d).join(', ')}
          </div>
          <div>
            שעות: {data.availableHours?.from} — {data.availableHours?.to}
            {data.availableHours?.nightShift ? ' · גם לילה' : ''}
          </div>
          <div>
            אזורים:{' '}
            {data.nearbyOnly
              ? 'עד 30 ק״מ מהבית'
              : (data.serviceAreas ?? []).join(', ')}
          </div>
        </div>
      ),
    },
    {
      title: 'מסמכים',
      step: 12,
      content: (
        <div className="text-sm text-stone">
          ת.ז. {data.idDocument ? '✓' : '✗'} · {(data.certifications ?? []).length}{' '}
          תעודות
        </div>
      ),
    },
  ]

  return (
    <StepWrapper title="סיכום הפרטים" subtitle="תוודאי שהכל נכון לפני השליחה">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div
            key={s.title}
            className="border border-stone/20 bg-cream rounded-sm p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif text-lg">{s.title}</h4>
              <button
                onClick={() => goTo(s.step)}
                className="text-stone hover:text-wine transition-colors"
                aria-label="עריכה"
              >
                <Pencil size={16} />
              </button>
            </div>
            {s.content}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={submit}
        className="mt-10 w-full bg-wine text-cream py-4 rounded-full text-base font-medium hover:bg-wine/90 transition-colors"
      >
        שלחי בקשה ✓
      </button>
    </StepWrapper>
  )
}
