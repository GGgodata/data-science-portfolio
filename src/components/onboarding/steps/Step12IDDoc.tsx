import { useRef } from 'react'
import { Upload, FileCheck } from 'lucide-react'
import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

export default function Step12IDDoc() {
  const { data, updateData } = useOnboarding()
  const fileRef = useRef<HTMLInputElement>(null)
  const fileName = data.idDocument

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) updateData({ idDocument: f.name })
  }

  return (
    <StepWrapper
      title="צילום של תעודת זהות"
      subtitle="תמונה ברורה של הת.ז. שלך. המסמך מוצפן ויישמש אך ורק לאימות."
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFile}
        className="hidden"
      />

      {!fileName ? (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-stone/40 rounded-sm py-16 px-6 flex flex-col items-center gap-4 hover:border-wine transition-colors bg-cream"
        >
          <Upload className="text-stone" size={48} strokeWidth={1.5} />
          <span className="text-base text-stone">
            גררי את הקובץ לכאן או לחצי לבחירה
          </span>
        </button>
      ) : (
        <div className="border-2 border-wine/30 rounded-sm py-10 px-6 flex flex-col items-center gap-4 bg-wine/5">
          <FileCheck className="text-wine" size={48} strokeWidth={1.5} />
          <div className="text-center">
            <div className="font-medium">{fileName}</div>
            <div className="text-xs text-wine mt-1">מאומת ✓</div>
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="text-sm text-wine hover:underline"
          >
            החלפי קובץ
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2 justify-center text-xs">
        <span className="bg-stone/10 px-3 py-1 rounded-full">מוצפן</span>
        <span className="bg-stone/10 px-3 py-1 rounded-full">חסוי</span>
        <span className="bg-stone/10 px-3 py-1 rounded-full">נמחק לאחר 90 יום</span>
      </div>
    </StepWrapper>
  )
}
