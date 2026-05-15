import { AnimatePresence } from 'framer-motion'
import { OnboardingProvider, useOnboarding, type OnboardingData } from '../context/OnboardingContext'
import OnboardingLayout from '../components/onboarding/OnboardingLayout'
import Step01Welcome from '../components/onboarding/steps/Step01Welcome'
import Step02Contact, { isValidPhone } from '../components/onboarding/steps/Step02Contact'
import Step03Identity, { isValidIdNumber } from '../components/onboarding/steps/Step03Identity'
import Step04Address from '../components/onboarding/steps/Step04Address'

function isStepValid(step: number, data: OnboardingData): boolean {
  switch (step) {
    case 1:
      return !!data.firstName && data.firstName.trim().length >= 2
    case 2:
      return (
        !!data.lastName &&
        data.lastName.trim().length >= 2 &&
        isValidPhone(data.phone)
      )
    case 3:
      return isValidIdNumber(data.idNumber) && !!data.birthDate
    case 4:
      return !!data.city && !!data.address && data.address.trim().length >= 3
    default:
      return false
  }
}

function renderStep(step: number) {
  switch (step) {
    case 1:
      return <Step01Welcome key={1} />
    case 2:
      return <Step02Contact key={2} />
    case 3:
      return <Step03Identity key={3} />
    case 4:
      return <Step04Address key={4} />
    default:
      return null
  }
}

function OnboardingFlow() {
  const { step, data } = useOnboarding()
  const valid = isStepValid(step, data)

  return (
    <OnboardingLayout isValid={valid}>
      <AnimatePresence mode="wait">{renderStep(step)}</AnimatePresence>
    </OnboardingLayout>
  )
}

export default function Onboarding() {
  return (
    <OnboardingProvider>
      <OnboardingFlow />
    </OnboardingProvider>
  )
}
