import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'
import MockUpload from '../MockUpload'

export default function Step12IDDoc() {
  const { data, updateData } = useOnboarding()
  return (
    <StepWrapper
      title="צילום של תעודת זהות"
      subtitle="תמונה ברורה של הת.ז. שלך. המסמך מוצפן ומשמש אך ורק לאימות."
    >
      <MockUpload
        value={data.idDocument ? [data.idDocument] : []}
        onChange={(names) => updateData({ idDocument: names[0] })}
      />
      <div className="flex flex-wrap gap-2 mt-4 text-xs">
        {['מוצפן', 'חסוי', 'נמחק לאחר 90 יום'].map((b) => (
          <span key={b} className="bg-wine/5 text-wine px-3 py-1 rounded-full">
            {b}
          </span>
        ))}
      </div>
    </StepWrapper>
  )
}
