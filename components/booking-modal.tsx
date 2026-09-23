'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { site } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'
import { GhlForm } from '@/components/ghl-form'

const summaryLabels: Record<string, string> = {
  goal: 'Goal',
  timeline: 'Timeline',
  budget: 'Budget',
}

export function BookingModal({
  open,
  onClose,
  answers,
  source,
}: {
  open: boolean
  onClose: () => void
  answers?: Record<string, string>
  /** Where the booking flow was started from: 'quiz' | 'pricing' | 'inventory' | 'simulator' */
  source?: string
}) {
  useEffect(() => {
    if (!open) return
    trackEvent('booking_started', { source: source ?? 'unknown' })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, source])

  if (!open) return null

  const summaryEntries = answers ? Object.entries(answers).filter(([key]) => summaryLabels[key]) : []

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background" role="dialog" aria-modal="true" aria-label="Book your free consultation">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <span className="font-sans text-lg font-semibold tracking-[-0.04em]">
          {site.name} <span className="font-normal text-primary">Free consultation</span>
        </span>
        <button
          onClick={onClose}
          aria-label="Close consultation"
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary"
        >
          <X className="size-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-5 py-8 lg:py-12">
          <h1 className="text-balance text-3xl font-semibold tracking-[-0.04em]">Reserve your free consultation</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Share your details below and one of our specialists will reach out to confirm the tradelines that fit your
            goals. No payment is collected until you confirm your pick is the right fit.
          </p>

          {summaryEntries.length > 0 && (
            <>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">Your assessment</p>
              <dl className="mt-3 grid gap-2 sm:grid-cols-3">
                {summaryEntries.map(([key, value]) => (
                  <div key={key} className="rounded-xl border border-border bg-secondary/50 px-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {summaryLabels[key]}
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-snug">{value}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          <div className="mt-8">
            {/* Quiz answers ride along as GHL custom-field prefill params so
                they are saved on the contact record when the form submits. */}
            <GhlForm
              prefill={
                answers
                  ? {
                      quiz_goal: answers.goal ?? '',
                      quiz_timeline: answers.timeline ?? '',
                      quiz_budget: answers.budget ?? '',
                    }
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
