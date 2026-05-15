import { useRef } from 'react'
import { Upload, FileCheck, X } from 'lucide-react'
import { useOnboarding } from '../../../context/OnboardingContext'
import StepWrapper from '../StepWrapper'

export default function Step13Certs() {
  const { data, updateData, next } = useOnboarding()
  const fileRef = useRef<HTMLInputElement>(null)
  const files = data.certifications ?? []

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files
    if (!list) return
    const names = Array.from(list).map((f) => f.name)
    updateData({ certifications: [...files, ...names] })
    if (fileRef.current) fileRef.current.value = ''
  }

  const remove = (name: string) => {
    updateData({ certifications: files.filter((f) => f !== name) })
  }

  return (
    <StepWrapper
      title="תעודות מקצועיות"
      subtitle="תעודות מסייעות לקבל יותר עבודות — אבל הן לא חובה. אפשר לדלג."
    >
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={handleFile}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="w-full border-2 border-dashed border-stone/40 rounded-sm py-12 px-6 flex flex-col items-center gap-4 hover:border-wine transition-colors bg-cream"
      >
        <Upload className="text-stone" size={40} strokeWidth={1.5} />
        <span className="text-base text-stone">
          גררי את הקבצים לכאן או לחצי לבחירה
        </span>
      </button>

      {files.length > 0 && (
        <ul className="mt-6 space-y-2">
          {files.map((f) => (
            <li
              key={f}
              className="flex items-center justify-between bg-wine/5 border border-wine/20 rounded-sm px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <FileCheck size={18} className="text-wine" />
                <span className="text-sm">{f}</span>
              </div>
              <button
                type="button"
                onClick={() => remove(f)}
                className="text-stone hover:text-wine"
                aria-label="הסירי"
              >
                <X size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => next()}
          className="text-sm text-wine hover:underline"
        >
          דלגי
        </button>
      </div>
    </StepWrapper>
  )
}
