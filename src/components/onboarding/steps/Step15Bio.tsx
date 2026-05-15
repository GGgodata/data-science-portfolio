import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

const EXAMPLES = [
  'אמא לשלושה, 12 שנות ניסיון בניקיון בתים, אוהבת לראות איך הבית מאיר.',
  'בייביסיטר כבר 7 שנים. סבלנות, יצירתיות, וגבולות ברורים.',
  'שף בכירה לשעבר במסעדה בתל אביב. בישול ים-תיכוני ובריא.',
]

const MAX = 300

export default function Step15Bio() {
  const { data, updateData } = useOnboarding()
  const bio = data.bio ?? ''

  return (
    <StepWrapper
      title="ספרי על עצמך"
      subtitle="כמה שורות שיעזרו ללקוחות להכיר אותך. זה מה שיופיע בפרופיל שלך."
    >
      <textarea
        value={bio}
        onChange={(e) => updateData({ bio: e.target.value.slice(0, MAX) })}
        placeholder="אני שרה, אמא לשלושה, עם 12 שנות ניסיון בניקיון בתים. אני אוהבת לסדר ולראות איך הבית מאיר…"
        rows={5}
        className="w-full bg-transparent border-2 border-stone/30 focus:border-wine outline-none font-serif text-xl py-4 px-4 rounded-sm placeholder:text-stone/40 resize-none transition-colors"
      />
      <div className="mt-2 text-xs text-stone text-left" dir="ltr">
        {bio.length} / {MAX} תווים
      </div>

      <div className="mt-8">
        <div className="text-xs uppercase tracking-wider text-stone mb-3">דוגמאות</div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => updateData({ bio: ex.slice(0, MAX) })}
              className="text-xs bg-stone/10 hover:bg-wine/10 hover:text-wine px-3 py-2 rounded-full text-right max-w-md text-stone transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </StepWrapper>
  )
}
