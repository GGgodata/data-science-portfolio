import { useEffect, useState } from 'react'
import ProfilePreview from '../../components/dashboard/ProfilePreview'
import ProfileEditor from '../../components/dashboard/ProfileEditor'
import { loadProvider, type ProviderSummary } from '../../lib/provider'

const FALLBACK: ProviderSummary = {
  firstName: 'שרה',
  lastName: 'כהן',
  phone: '050-1234567',
  city: 'תל אביב',
  address: 'בן יהודה 89',
  categories: ['cleaning'],
  subCategories: ['regular', 'deep'],
  yearsOfExperience: '5-10 שנים',
  hourlyRate: 85,
  serviceAreas: ['תל אביב', 'רמת גן', 'גבעתיים'],
  nearbyOnly: false,
  availableDays: ['sun', 'mon', 'tue', 'wed', 'thu'],
  availableHours: { from: '08:00', to: '18:00', nightShift: false },
  bio: 'אמא לשלושה, 12 שנות ניסיון בניקיון בתים. אוהבת לסדר ולראות איך הבית מאיר.',
  profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
}

export default function Profile() {
  const [provider, setProvider] = useState<ProviderSummary>(FALLBACK)

  useEffect(() => {
    const saved = loadProvider()
    if (saved) setProvider({ ...FALLBACK, ...saved })
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ProfilePreview provider={provider} />
      <ProfileEditor provider={provider} onChange={setProvider} />
    </div>
  )
}
