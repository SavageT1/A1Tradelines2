// Lightweight GA4 event helper.
//
// The gtag.js snippet is injected by app/layout.tsx in production builds.
// trackEvent is a safe no-op when gtag is unavailable (SSR, dev builds,
// ad-blockers), so call sites never need their own guards.
//
// Event names use snake_case to match the existing GA4 property conventions
// (inventory_sort_change, form_started, ...). Parameter values should be
// strings or numbers only.
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, params)
  } catch {
    // Analytics must never break the page.
  }
}
