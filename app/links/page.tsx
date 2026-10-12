import type { Metadata } from 'next'
import { ArrowUpRight, Landmark } from 'lucide-react'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Links — A1 Tradelines',
  description: 'Quick links from A1 Tradelines videos: the business credit tools we use and recommend.',
}

const affiliateLinks = [
  { label: 'How I check my business credit — NAV', href: 'https://nav.nkwcmr.net/gRk02A' },
  { label: "What's on a business credit report — NAV", href: 'https://nav.nkwcmr.net/WO351A' },
  { label: 'Get paid on time: BILL', href: 'https://bill.sjv.io/aNQg0R' },
  { label: 'Automate your bill pay: BILL', href: 'https://bill.sjv.io/Gb3Wvm' },
]

export default function LinksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-5 py-12 text-foreground">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="A1 Tradelines" className="h-16 w-auto" />
          <h1 className="mt-4 text-2xl font-semibold tracking-[-0.02em]">A1 Tradelines</h1>
          <p className="mt-1 text-sm text-muted-foreground">Links from our videos</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {affiliateLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="sponsored noopener"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-left shadow-sm transition hover:border-primary/40 hover:shadow"
            >
              <span className="text-[15px] font-medium leading-6">{link.label}</span>
              <ArrowUpRight
                className="size-5 shrink-0 text-muted-foreground transition group-hover:text-primary"
                aria-hidden
              />
            </a>
          ))}

          <a
            href={site.url}
            target="_blank"
            rel="noopener"
            className="group flex items-center justify-between gap-3 rounded-2xl bg-primary px-5 py-4 text-left text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <span className="flex items-center gap-2.5 text-[15px] font-medium leading-6">
              <Landmark className="size-5 shrink-0" aria-hidden />
              Learn more about A1 Tradelines
            </span>
            <ArrowUpRight className="size-5 shrink-0" aria-hidden />
          </a>
        </div>

        <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
          Some links may earn me a commission.
        </p>
      </div>
    </main>
  )
}
