import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

export default function Step01Welcome() {
  const { data, updateData } = useOnboarding()
  return (
    <StepWrapper title="שלום! נעים להכיר ✨" subtitle="איך קוראים לך?">
      <input
        autoFocus
        type="text"
        value={data.firstName ?? ''}
        onChange={(e) => updateData({ firstName: e.target.value })}
        placeholder="שרה"
        className="w-full bg-transparent border-0 border-b-2 border-stone/30 focus:border-wine outline-none font-serif text-3xl md:text-5xl py-4 placeholder:text-stone/40 transition-colors"
      />
    </StepWrapper>
  )
}
