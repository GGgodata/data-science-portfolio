import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useOnboarding, OnboardingData } from '../context/OnboardingContext'
import OnboardingLayout from '../components/onboarding/OnboardingLayout'
import Step01Welcome from '../components/onboarding/steps/Step01Welcome'
import Step02Contact from '../components/onboarding/steps/Step02Contact'
import Step03Identity from '../components/onboarding/steps/Step03Identity'
import Step04Address from '../components/onboarding/steps/Step04Address'
import Step05Categories from '../components/onboarding/steps/Step05Categories'
import Step06SubCategories from '../components/onboarding/steps/Step06SubCategories'
import Step07Experience from '../components/onboarding/steps/Step07Experience'
import Step08Rate from '../components/onboarding/steps/Step08Rate'
import Step09Areas from '../components/onboarding/steps/Step09Areas'
import Step10Days from '../components/onboarding/steps/Step10Days'
import Step11Hours from '../components/onboarding/steps/Step11Hours'
import Step12IDDoc from '../components/onboarding/steps/Step12IDDoc'
import Step13Certs from '../components/onboarding/steps/Step13Certs'
import { SUBCATEGORIES } from '../data/subcategories'

const phoneDigits = (p?: string) => (p || '').replace(/\D/g, '')

const hasSubForEachCategory = (d: OnboardingData) => {
  const cats = d.categories || []
  const subs = d.subCategories || []
  if (cats.length === 0) return false
  return cats.every((catId) =>
    (SUBCATEGORIES[catId] || []).some((s) => subs.includes(s.id)),
  )
}

export const validators: Record<number, (d: OnboardingData) => boolean> = {
  1: (d) => (d.firstName?.trim().length ?? 0) >= 2,
  2: (d) => !!d.lastName?.trim() && /^05\d{8}$/.test(phoneDigits(d.phone)),
  3: (d) => (d.idNumber?.length ?? 0) === 9 && !!d.birthDate,
  4: (d) => !!d.city && !!d.address?.trim(),
  5: (d) => (d.categories?.length ?? 0) >= 1,
  6: hasSubForEachCategory,
  7: (d) => !!d.yearsOfExperience,
  8: (d) => (d.hourlyRate ?? 0) >= 50,
  9: (d) => !!d.anywhere || (d.serviceAreas?.length ?? 0) >= 1,
  10: (d) => (d.availableDays?.length ?? 0) >= 1,
  11: (d) => !!d.availableHours?.from && !!d.availableHours?.to,
  12: (d) => !!d.idDocument,
  13: () => true,
}

const STEP_COMPONENTS: Record<number, () => JSX.Element> = {
  1: Step01Welcome,
  2: Step02Contact,
  3: Step03Identity,
  4: Step04Address,
  5: Step05Categories,
  6: Step06SubCategories,
  7: Step07Experience,
  8: Step08Rate,
  9: Step09Areas,
  10: Step10Days,
  11: Step11Hours,
  12: Step12IDDoc,
  13: Step13Certs,
}

const MAX_BUILT_STEP = 13

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
