import { useRef } from 'react'
import { Camera, Check, X } from 'lucide-react'
import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

const TIPS_DO = ['אור טבעי', 'חיוך', 'פנים ברורות']
const TIPS_DONT = ['משקפי שמש', 'כובע', 'סלפי מהמיטה']

export default function Step14Photo() {
  const { data, updateData } = useOnboarding()
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    updateData({ profilePhoto: url })
  }

  return (
    <StepWrapper
      title="תמונת פרופיל"
      subtitle="תמונה ברורה של הפנים מגדילה את סיכוי הקבלה פי 3"
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-64 h-64 rounded-full border-2 border-dashed border-stone/40 hover:border-wine flex items-center justify-center overflow-hidden bg-cream mx-auto transition-colors"
        >
          {data.profilePhoto ? (
            <img
              src={data.profilePhoto}
              alt="פרופיל"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="text-stone" size={48} strokeWidth={1.5} />
          )}
        </button>
        <ul className="space-y-3 text-base">
          {TIPS_DO.map((t) => (
            <li key={t} className="flex items-center gap-2 text-ink">
              <Check size={18} className="text-wine" /> {t}
            </li>
          ))}
          {TIPS_DONT.map((t) => (
            <li key={t} className="flex items-center gap-2 text-stone">
              <X size={18} className="text-stone" /> {t}
            </li>
          ))}
        </ul>
      </div>
    </StepWrapper>
  )
}
