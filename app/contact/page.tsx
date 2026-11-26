import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GhlForm } from '@/components/ghl-form'
import { CallLink } from '@/components/call-link'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact A1 Tradelines',
  description:
    'Contact A1 Tradelines with your questions about seasoned authorized-user tradelines. Send a message and a specialist will reply.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact A1 Tradelines',
    description: 'Send us a message and a specialist will get back to you.',
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-10 lg:pt-24">
        <p className="mb-6 font-mono text-sm uppercase tracking-[0.22em] text-primary">Contact us</p>
        <h1 className="text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl">
          Send us a <span className="text-primary">message.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-7 text-muted-foreground">
          Tell us what you are looking for and a specialist will reply with options that fit your goals. Prefer to talk now?{' '}
          <CallLink source="contact_page" className="font-medium text-primary underline-offset-4 hover:underline">
            Call {site.phone}
          </CallLink>
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 lg:px-10 lg:pb-28">
        <GhlForm minHeight={760} />
      </section>

      <SiteFooter />
    </main>
  )
}
