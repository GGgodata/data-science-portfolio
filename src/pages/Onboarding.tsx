import { AnimatePresence } from 'framer-motion'
import { OnboardingProvider, useOnboarding, type OnboardingData } from '../context/OnboardingContext'
import OnboardingLayout from '../components/onboarding/OnboardingLayout'
import Step01Welcome from '../components/onboarding/steps/Step01Welcome'
import Step02Contact, { isValidPhone } from '../components/onboarding/steps/Step02Contact'
import Step03Identity, { isValidIdNumber } from '../components/onboarding/steps/Step03Identity'
import Step04Address from '../components/onboarding/steps/Step04Address'
import Step05Categories from '../components/onboarding/steps/Step05Categories'
import Step06SubCategories, { isStep06Valid } from '../components/onboarding/steps/Step06SubCategories'
import Step07Experience from '../components/onboarding/steps/Step07Experience'
import Step08Rate from '../components/onboarding/steps/Step08Rate'
import Step09Areas from '../components/onboarding/steps/Step09Areas'
import Step10Days from '../components/onboarding/steps/Step10Days'
import Step11Hours from '../components/onboarding/steps/Step11Hours'
import Step12IDDoc from '../components/onboarding/steps/Step12IDDoc'
import Step13Certs from '../components/onboarding/steps/Step13Certs'
import Step14Photo from '../components/onboarding/steps/Step14Photo'
import Step15Bio from '../components/onboarding/steps/Step15Bio'
import Step16Summary from '../components/onboarding/steps/Step16Summary'

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
    case 5:
      return !!data.categories && data.categories.length > 0
    case 6:
      return isStep06Valid(data.categories, data.subCategories)
    case 7:
      return !!data.yearsOfExperience
    case 8:
      return typeof data.hourlyRate === 'number' && data.hourlyRate >= 50
    case 9:
      return data.nearbyOnly || (!!data.serviceAreas && data.serviceAreas.length > 0)
    case 10:
      return !!data.availableDays && data.availableDays.length > 0
    case 11:
      return !!data.availableHours?.from && !!data.availableHours?.to
    case 12:
      return !!data.idDocument
    case 13:
      return true
    case 14:
      return !!data.profilePhoto
    case 15:
      return !!data.bio && data.bio.trim().length >= 10
    case 16:
      return true
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
    case 5:
      return <Step05Categories key={5} />
    case 6:
      return <Step06SubCategories key={6} />
    case 7:
      return <Step07Experience key={7} />
    case 8:
      return <Step08Rate key={8} />
    case 9:
      return <Step09Areas key={9} />
    case 10:
      return <Step10Days key={10} />
    case 11:
      return <Step11Hours key={11} />
    case 12:
      return <Step12IDDoc key={12} />
    case 13:
      return <Step13Certs key={13} />
    case 14:
      return <Step14Photo key={14} />
    case 15:
      return <Step15Bio key={15} />
    case 16:
      return <Step16Summary key={16} />
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
