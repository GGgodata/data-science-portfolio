import { useNavigate } from 'react-router-dom'
import { Pencil, Check } from 'lucide-react'
import { useOnboarding, STORAGE_KEY } from '../../../context/OnboardingContext'
import { CATEGORY_BY_ID } from '../../../data/categories'
import { SUBCATEGORIES } from '../../../data/subcategories'
import { saveProfile } from '../../../lib/profile'
import StepWrapper from '../StepWrapper'
import Button from '../../ui/Button'
import { shekel } from '../../../lib/format'

const SUB_NAME: Record<string, string> = Object.fromEntries(
  Object.values(SUBCATEGORIES).flat().map((s) => [s.id, s.name]),
)

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-wine/5 text-wine text-sm px-3 py-1 rounded-full">{children}</span>
  )
}

export default function Step16Summary() {
  const { data, setStep } = useOnboarding()
  const navigate = useNavigate()

  const submit = () => {
    saveProfile(data)
    localStorage.removeItem(STORAGE_KEY)
    navigate('/providers/onboarding/success')
  }

  const Section = ({
    title,
    editStep,
    children,
  }: {
    title: string
    editStep: number
    children: React.ReactNode
  }) => (
    <div className="bg-white/60 border border-stone/15 rounded-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-serif text-lg text-ink">{title}</h4>
        <button
          onClick={() => setStep(editStep)}
          className="text-stone hover:text-wine flex items-center gap-1 text-sm"
        >
          <Pencil size={14} />
          עריכה
        </button>
      </div>
      <div className="text-stone text-sm space-y-2">{children}</div>
    </div>
  )

  return (
    <StepWrapper title="סיכום הפרטים" subtitle="תוודאי שהכל נכון לפני השליחה">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="פרטים אישיים" editStep={1}>
          <p>
            {data.firstName} {data.lastName}
          </p>
          <p dir="ltr" className="text-left">{data.phone}</p>
        </Section>

        <Section title="כתובת" editStep={4}>
          <p>{data.city}</p>
          <p>{data.address}</p>
        </Section>

        <Section title="שירותים" editStep={5}>
          <div className="flex flex-wrap gap-2">
            {(data.categories || []).map((c) => (
              <Chip key={c}>{CATEGORY_BY_ID[c]?.name}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {(data.subCategories || []).map((s) => (
              <span key={s} className="text-xs text-stone">
                {SUB_NAME[s]}
              </span>
            ))}
          </div>
        </Section>

        <Section title="תעריף וניסיון" editStep={8}>
          <p>{shekel(data.hourlyRate ?? 0)} / שעה</p>
          <p>{data.yearsOfExperience} ניסיון</p>
        </Section>

        <Section title="זמינות" editStep={10}>
          <p>ימים: {(data.availableDays || []).join(', ') || '—'}</p>
          <p>
            שעות: {data.availableHours?.from}–{data.availableHours?.to}
            {data.availableHours?.nightShift ? ' · כולל לילה' : ''}
          </p>
          <p>אזורים: {data.anywhere ? 'עד 30 ק״מ' : (data.serviceAreas || []).join(', ')}</p>
        </Section>

        <Section title="מסמכים" editStep={12}>
          <p>ת.ז.: {data.idDocument ? '✓' : '—'}</p>
          <p>{(data.certifications?.length ?? 0)} תעודות</p>
        </Section>
      </div>

      <div className="mt-8 flex justify-center">
        <Button size="lg" onClick={submit}>
          שלחי בקשה
          <Check size={18} />
        </Button>
      </div>
    </StepWrapper>
  )
}
