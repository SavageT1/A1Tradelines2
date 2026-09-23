import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Customer Reviews',
  description:
    'A1 Tradelines collects verified reviews from real customers. Read them here — and share your own experience.',
  alternates: { canonical: '/reviews' },
  openGraph: { title: 'A1 Tradelines Reviews', description: 'What customers say about A1 Tradelines.', url: '/reviews' },
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-primary">Customer reviews</p>
          <h1 className="text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            What customers <span className="text-primary">say.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-7 text-muted-foreground">
            We are building a collection of verified reviews from real customers. If you have bought a tradeline from us, we would love to hear about your experience.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Verified reviews are coming soon.</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              We only publish genuine reviews from real customers — never fabricated testimonials. This page will fill in as customers share their experiences. If you have worked with us, your honest feedback is welcome.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] lg:text-4xl">Bought from us? Share your story.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              Call or email us and let us know how it went. Real feedback helps other people buy with confidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={site.phoneHref} className="inline-flex items-center rounded-full border border-border px-6 py-4 text-sm font-medium hover:bg-secondary">Call {site.phone}</a>
            <Link href="/inventory" className="inline-flex items-center rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Browse inventory <ArrowUpRight className="ml-2 size-4" /></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
