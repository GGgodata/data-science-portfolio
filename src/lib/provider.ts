export const PROVIDER_SUMMARY_KEY = 'nany_provider_summary'

export type ProviderSummary = {
  firstName?: string
  lastName?: string
  phone?: string
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

export function loadProvider(): ProviderSummary | null {
  try {
    const raw = localStorage.getItem(PROVIDER_SUMMARY_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ProviderSummary
  } catch {
    return null
  }
}

export function saveProvider(p: ProviderSummary): void {
  localStorage.setItem(PROVIDER_SUMMARY_KEY, JSON.stringify(p))
}
