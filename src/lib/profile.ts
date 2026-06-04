import type { OnboardingData } from '../context/OnboardingContext'

const PROFILE_KEY = 'nany_provider_profile'

export function saveProfile(data: OnboardingData) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
}

export function getProfile(): OnboardingData | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    return raw ? (JSON.parse(raw) as OnboardingData) : null
  } catch {
    return null
  }
}

export function getProviderName(): string {
  const p = getProfile()
  return p?.firstName?.trim() || 'ספקית'
}
