import { useRef } from 'react'
import { Camera, Check, X } from 'lucide-react'
import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80'
const tips = [
  { ok: true, text: 'אור טבעי' },
  { ok: true, text: 'חיוך' },
  { ok: true, text: 'פנים ברורות' },
  { ok: false, text: 'משקפי שמש' },
  { ok: false, text: 'כובע' },
  { ok: false, text: 'סלפי מהמיטה' },
]

export default function Step14Photo() {
  const { data, updateData } = useOnboarding()
  const inputRef = useRef<HTMLInputElement>(null)
  const photo = data.profilePhoto

  return (
    <StepWrapper
      title="תמונת פרופיל"
      subtitle="תמונה ברורה של הפנים מגדילה את סיכוי הקבלה פי 3"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <button
            onClick={() => inputRef.current?.click()}
            className="relative w-64 h-64 rounded-full border-2 border-dashed border-stone/30 hover:border-wine overflow-hidden flex items-center justify-center bg-white/40 transition-colors"
          >
            {photo ? (
              <img src={photo} alt="תצוגה מקדימה" className="w-full h-full object-cover" />
            ) : (
              <Camera size={48} className="text-stone" strokeWidth={1.5} />
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) updateData({ profilePhoto: PLACEHOLDER })
              }}
            />
          </button>
        </div>
        <ul className="space-y-2">
          {tips.map((t) => (
            <li key={t.text} className="flex items-center gap-2 text-ink">
              {t.ok ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <X size={18} className="text-red-400" />
              )}
              {t.text}
            </li>
          ))}
        </ul>
      </div>
    </StepWrapper>
  )
}
