'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

// Fires the GA4 key event for a completed booking on the thank-you page.
// This page is intended as the post-submit redirect target for the GHL
// contact form / calendar (configured in GHL, not in code).
export function BookingConfirmedTracker() {
  useEffect(() => {
    trackEvent('appointment_booked')
  }, [])
  return null
}
