'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BookingModal } from '@/components/booking-modal'
import { site } from '@/lib/site'
import { useState } from 'react'
import type { Tradeline } from '@/app/api/inventory/route'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function formatPrice(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

// Live pricing — every row is a real tradeline from the A1 inventory feed.
// "Reserve" opens the free-consultation booking flow: no payment is collected
// until a specialist confirms the pick.
export default function PricingPage() {
  const { data } = useSWR<{ tradelines: Tradeline[] }>('/api/inventory', fetcher)
  const [bookingOpen, setBookingOpen] = useState(false)

  const sorted = [...(data?.tradelines ?? [])].sort((a, b) => a.price - b.price)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pb-14 pt-16 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.22em] text-primary">Transparent pricing</p>
          <h1 className="text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Clear <span className="text-primary">prices.</span> No surprises.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-7 text-muted-foreground">
            Every tradeline is priced by its age, credit limit, and reporting. What you see is what you pay, and it is backed by our posting guarantee: reassignment or refund per the purchase agreement. Prices below are live — they update as inventory changes.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="overflow-hidden border border-border bg-background">
            <div className="hidden grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr_0.8fr_auto] gap-4 border-b border-border px-5 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground sm:grid">
              <span className="text-primary">Tradeline</span><span>Age</span><span>Limit</span><span>Reporting</span><span>Price</span><span className="text-right">Reserve</span>
            </div>
            {sorted.map((t) => (
              <div key={t.id} className="grid gap-4 border-b border-border px-5 py-5 last:border-b-0 sm:grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr_0.8fr_auto] sm:items-center">
                <div>
                  <span className="text-base font-medium tracking-tight">{t.lender}</span>
                  <p className="mt-1 text-sm text-muted-foreground">{t.spots} {t.spots === 1 ? 'spot' : 'spots'} left</p>
                </div>
                <div><span className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:hidden">Age </span><span className="text-base">{t.accountAge}</span></div>
                <div><span className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:hidden">Limit </span><span className="text-base">${t.limit.toLocaleString()}</span></div>
                <div><span className="font-mono text-xs uppercase tracking-widest text-muted-foreground sm:hidden">Reporting </span><span className="text-base font-medium text-primary">{t.reportingDate}</span></div>
                <div className="text-xl font-semibold">{formatPrice(t.price)}</div>
                <button onClick={() => setBookingOpen(true)} className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground hover:bg-primary/90 sm:justify-self-end">Reserve</button>
              </div>
            ))}
            {!sorted.length && (
              <p className="px-5 py-10 text-center text-sm text-muted-foreground">Loading live prices…</p>
            )}
          </div>
          <div className="mt-6 flex items-start gap-3 border border-primary/30 bg-primary/5 p-5 text-sm leading-6 text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" /> {site.guarantee} Review your purchase agreement for complete terms.
          </div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">Reserving is free. No payment is collected until a specialist confirms your tradeline is the right fit.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] lg:text-4xl">Pricing questions</h2>
        <div className="mt-8 border-t border-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-border py-6">
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
        <Link href="/inventory" className="mt-10 inline-flex items-center rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Browse full inventory <ArrowUpRight className="ml-2 size-4" />
        </Link>
      </section>

      <SiteFooter />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} source="pricing" />
    </main>
  )
}

const faqs = [
  { question: 'Why do prices differ between tradelines?', answer: 'Price reflects account age, credit limit, and demand. Older tradelines with higher limits generally cost more.' },
  { question: 'Are there any hidden fees?', answer: 'No. The price you see for each tradeline is the price you pay. Any add-ons are always shown before you confirm.' },
  { question: 'What does the guarantee cover?', answer: 'If your purchased tradeline does not post to your credit report, you receive a full refund under the terms of your purchase agreement.' },
  { question: 'When do I pay?', answer: 'Never up front. You reserve a tradeline for free, a specialist confirms it fits your goals, and only then is payment collected.' },
]
