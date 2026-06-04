import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'
import MockUpload from '../MockUpload'

export default function Step13Certs() {
  const { data, updateData } = useOnboarding()
  return (
    <StepWrapper
      title="תעודות מקצועיות"
      subtitle="תעודות מסייעות לקבל יותר עבודות — אבל הן לא חובה. אפשר לדלג."
    >
      <MockUpload
        multiple
        value={data.certifications || []}
        onChange={(names) => updateData({ certifications: names })}
      />
    </StepWrapper>
  )
}
