import type { Metadata } from 'next'
import { CheckCircle2, Phone } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BookingConfirmedTracker } from '@/components/booking-confirmed-tracker'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Booking confirmed — A1 Tradelines',
  description: 'Your consultation request has been received. A specialist will reach out shortly.',
  // Thank-you page: reachable only as a post-submit redirect, not indexed.
  robots: { index: false, follow: false },
}

export default function BookingConfirmedPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <BookingConfirmedTracker />
      <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-32">
        <CheckCircle2 className="mx-auto size-14 text-primary" aria-hidden />
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-primary">
          Request received
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          You&rsquo;re booked in.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-7 text-muted-foreground">
          Thanks for reaching out — one of our specialists will review your request and contact
          you shortly to confirm your free consultation.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Phone className="mr-2 size-4" /> Call {site.phone}
          </a>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Questions in the meantime? Call or text {site.phone}.
        </p>
      </section>
      <SiteFooter />
    </main>
  )
}
