import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

const EXAMPLES = [
  'אני שרה, אמא לשלושה, עם 12 שנות ניסיון בניקיון בתים. אני אוהבת לסדר ולראות איך הבית מאיר.',
  'מטפלת מסורה עם אהבה אמיתית לילדים. סבלנית, אחראית, ועם המלצות חמות ממשפחות שעבדתי איתן.',
  'שף עם רקע במסעדות, מתמחה באוכל ים-תיכוני ביתי. אבשל אצלכם ארוחות בריאות וטעימות.',
]

export default function Step15Bio() {
  const { data, updateData } = useOnboarding()
  const bio = data.bio || ''

  return (
    <StepWrapper
      title="ספרי על עצמך"
      subtitle="כמה שורות שיעזרו ללקוחות להכיר אותך. זה מה שיופיע בפרופיל שלך."
    >
      <textarea
        value={bio}
        maxLength={300}
        rows={5}
        onChange={(e) => updateData({ bio: e.target.value })}
        placeholder="אני שרה, אמא לשלושה, עם 12 שנות ניסיון בניקיון בתים. אני אוהבת לסדר ולראות איך הבית מאיר…"
        className="w-full bg-white/50 border border-stone/20 focus:border-wine outline-none rounded-sm p-4 font-serif text-xl text-ink placeholder:text-stone/40 transition-colors resize-none"
      />
      <div className="text-sm text-stone text-left mt-1">{bio.length} / 300 תווים</div>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => updateData({ bio: ex })}
            className="text-sm text-wine border border-wine/30 rounded-full px-3 py-1.5 hover:bg-wine/5 transition-colors"
          >
            דוגמה {i + 1}
          </button>
        ))}
      </div>
    </StepWrapper>
  )
}
