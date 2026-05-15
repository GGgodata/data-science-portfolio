import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

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
  nearbyOnly?: boolean
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
  reset: () => void
}

const TOTAL_STEPS = 16
export const ONBOARDING_STORAGE_KEY = 'nany_provider_onboarding'

const OnboardingContext = createContext<OnboardingContextType | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(ONBOARDING_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { step?: number; data?: OnboardingData }
        if (parsed.step) setStep(parsed.step)
        if (parsed.data) setData(parsed.data)
      } catch {
        /* ignore */
      }
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify({ step, data }))
  }, [step, data, hydrated])

  const updateData = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const prev = () => setStep((s) => Math.max(s - 1, 1))
  const reset = () => {
    localStorage.removeItem(ONBOARDING_STORAGE_KEY)
    setStep(1)
    setData({})
  }

  return (
    <OnboardingContext.Provider
      value={{ step, setStep, data, updateData, next, prev, totalSteps: TOTAL_STEPS, reset }}
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
