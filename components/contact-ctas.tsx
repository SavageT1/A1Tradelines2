'use client'

import { useState, type ReactNode } from 'react'
import { MessageSquareText, Phone, PhoneCall } from 'lucide-react'
import { site } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'
import { BookingModal } from '@/components/booking-modal'

const secondaryBtn =
  'inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary'

/**
 * Full contact-options row: the page's primary CTA plus
 * Text us (SMS), Have us call you (callback form), and Call.
 */
export function ContactCtas({
  primary,
  source = 'website',
  className = '',
}: {
  /** The page's main action button/link, rendered first. */
  primary: ReactNode
  /** Analytics source tag for text/callback interactions. */
  source?: string
  className?: string
}) {
  const [callbackOpen, setCallbackOpen] = useState(false)

  return (
    <>
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {primary}
        <a
          href={site.smsHref}
          onClick={() => trackEvent('text_us_clicked', { source })}
          className={secondaryBtn}
        >
          <MessageSquareText className="mr-2 size-4 text-primary" /> Text us
        </a>
        <button onClick={() => setCallbackOpen(true)} className={secondaryBtn}>
          <PhoneCall className="mr-2 size-4 text-primary" /> Have us call you
        </button>
        <a href={site.phoneHref} className={secondaryBtn}>
          <Phone className="mr-2 size-4 text-primary" /> Call {site.phone}
        </a>
      </div>
      <BookingModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        source={`${source}-callback`}
        variant="callback"
      />
    </>
  )
}
