import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useOnboarding, OnboardingData } from '../context/OnboardingContext'
import OnboardingLayout from '../components/onboarding/OnboardingLayout'
import Step01Welcome from '../components/onboarding/steps/Step01Welcome'
import Step02Contact from '../components/onboarding/steps/Step02Contact'
import Step03Identity from '../components/onboarding/steps/Step03Identity'
import Step04Address from '../components/onboarding/steps/Step04Address'

const phoneDigits = (p?: string) => (p || '').replace(/\D/g, '')

export const validators: Record<number, (d: OnboardingData) => boolean> = {
  1: (d) => (d.firstName?.trim().length ?? 0) >= 2,
  2: (d) => !!d.lastName?.trim() && /^05\d{8}$/.test(phoneDigits(d.phone)),
  3: (d) => (d.idNumber?.length ?? 0) === 9 && !!d.birthDate,
  4: (d) => !!d.city && !!d.address?.trim(),
}

const STEP_COMPONENTS: Record<number, () => JSX.Element> = {
  1: Step01Welcome,
  2: Step02Contact,
  3: Step03Identity,
  4: Step04Address,
}

const MAX_BUILT_STEP = 4

export default function Onboarding() {
  const { step, data, next, prev } = useOnboarding()
  const navigate = useNavigate()

  const handlePrev = () => {
    if (step === 1) navigate('/providers/join')
    else prev()
  }

  const isValid = validators[step] ? validators[step](data) : true
  const StepComponent = STEP_COMPONENTS[step]

  return (
    <OnboardingLayout isValid={isValid} onNext={next} onPrev={handlePrev}>
      <AnimatePresence mode="wait">
        <div key={step}>
          {StepComponent ? (
            <StepComponent />
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-stone">
                שלב {step} — בקרוב
              </p>
              <p className="text-stone mt-2">
                {step > MAX_BUILT_STEP ? 'שלב זה ייבנה בפאזה הבאה.' : ''}
              </p>
            </div>
          )}
        </div>
      </AnimatePresence>
    </OnboardingLayout>
  )
}
