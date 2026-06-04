import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type OnboardingData = {
  firstName?: string
  lastName?: string
  phone?: string
  idNumber?: string
  birthDate?: string
  city?: string
  address?: string
  categories?: string[]
  subCategories?: string[]
  yearsOfExperience?: string
  hourlyRate?: number
  serviceAreas?: string[]
  anywhere?: boolean
  availableDays?: string[]
  availableHours?: { from: string; to: string; nightShift?: boolean }
  idDocument?: string
  certifications?: string[]
  profilePhoto?: string
  bio?: string
}

type OnboardingContextType = {
  step: number
  setStep: (s: number) => void
  data: OnboardingData
  updateData: (partial: Partial<OnboardingData>) => void
  next: () => void
  prev: () => void
  totalSteps: number
}

const TOTAL_STEPS = 16
export const STORAGE_KEY = 'nany_provider_onboarding'

const OnboardingContext = createContext<OnboardingContextType | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({})

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setStep(parsed.step || 1)
        setData(parsed.data || {})
      } catch {
        /* ignore */
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }))
  }, [step, data])

  const updateData = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const prev = () => setStep((s) => Math.max(s - 1, 1))

  return (
    <OnboardingContext.Provider
      value={{ step, setStep, data, updateData, next, prev, totalSteps: TOTAL_STEPS }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
