import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ContactCtas } from '@/components/contact-ctas'

export const metadata: Metadata = {
  title: 'About A1 Tradelines — Transparent Tradeline Marketplace',
  description:
    'A1 Tradelines is built on transparency: clear pricing, honest expectations, and real support. Learn who we are and how we help people buy tradelines with confidence.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About A1 Tradelines', description: 'A transparent tradeline marketplace built on clear pricing and honest guidance.', url: '/about' },
}

const values = [
  { title: 'Transparency first', body: 'Every listing shows age, limit, utilization, and reporting. No mystery fees and no hidden terms.' },
  { title: 'Honest expectations', body: 'We never promise a specific score. We tell you what a tradeline can and cannot do, up front.' },
  { title: 'Real support', body: 'Talk to a real person before and after you buy. We answer the phone and we follow through.' },
  { title: 'Your privacy', body: 'We ask only for what we need and protect the information you share with us.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-primary">About us</p>
          <h1 className="text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            A more transparent way to buy <span className="text-primary">tradelines.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-7 text-muted-foreground">
            A1 Tradelines was built for people who are tired of vague promises and hidden pricing. We believe buying a tradeline should feel clear, respectful, and honest from start to finish.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:px-10 lg:py-24">
          {values.map((value) => (
            <div key={value.title} className="border-t-2 border-primary pt-5">
              <h2 className="text-xl font-medium tracking-tight">{value.title}</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-8 border border-border bg-background p-8 md:flex-row md:items-center lg:p-12">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] lg:text-4xl">Talk to a real person.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              Have a question before you buy? Call, text, or have us call you back — we will help you compare options with zero pressure.
            </p>
            <div className="mt-6">
              <ContactCtas
                source="about"
                primary={
                  <Link href="/inventory" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    Browse inventory <ArrowUpRight className="ml-2 size-4" />
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
