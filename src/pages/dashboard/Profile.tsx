import { useState } from 'react'
import type { OnboardingData } from '../../context/OnboardingContext'
import { getProfile } from '../../lib/profile'
import ProfilePreview from '../../components/dashboard/ProfilePreview'
import ProfileEditor from '../../components/dashboard/ProfileEditor'

const DEMO_PROFILE: OnboardingData = {
  firstName: 'שרה',
  lastName: 'כהן',
  phone: '052-1234567',
  city: 'תל אביב',
  address: 'דיזנגוף 100',
  categories: ['cleaning', 'childcare'],
  subCategories: ['regular', 'deep', 'babysitter'],
  hourlyRate: 85,
  yearsOfExperience: '5-10 שנים',
  serviceAreas: ['תל אביב', 'רמת גן', 'גבעתיים'],
  availableDays: ['א', 'ב', 'ג', 'ד', 'ה'],
  bio: 'אני שרה, אמא לשלושה, עם 12 שנות ניסיון בניקיון בתים. אוהבת לסדר ולראות איך הבית מאיר.',
}

export default function Profile() {
  const [data, setData] = useState<OnboardingData>(() => getProfile() || DEMO_PROFILE)

  const update = (partial: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...partial }))

  return (
    <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="lg:order-2">
        <ProfilePreview data={data} />
      </div>
      <div className="lg:order-1">
        <ProfileEditor data={data} onChange={update} />
      </div>
    </div>
  )
}
