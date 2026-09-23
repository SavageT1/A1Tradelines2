import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Info, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TradelineSimulator } from '@/components/tradeline-simulator'
import { ContactCtas } from '@/components/contact-ctas'

export const metadata: Metadata = {
  title: 'Tradeline Wizard Score Simulator — Estimate the Effect on Your Credit',
  description:
    'The Tradeline Wizard Score Simulator: pick a real tradeline from live inventory and see how it could change your credit utilization and average account age. Educational estimate only — free to try, no SSN, no credit pull.',
  alternates: { canonical: '/simulator' },
  openGraph: {
    title: 'Tradeline Wizard Score Simulator — A1 Tradelines',
    description:
      'Pick a real tradeline and estimate how it could change your utilization and average account age. Free, no SSN, no credit pull.',
    url: '/simulator',
  },
}

export default function SimulatorPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-10 lg:pb-14 lg:pt-24">
        <div className="max-w-3xl">
          <img
            src="/brand/a1-wizard-monogram.svg"
            alt="Tradeline Wizard monogram"
            className="mb-6 h-20 w-auto sm:h-24"
          />
          <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-primary">
            <Sparkles className="size-4" /> Tradeline Wizard
          </p>
          <h1 className="text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Tradeline Wizard <span className="text-primary">Score Simulator.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-7 text-muted-foreground">
            See what a tradeline could do for your credit. Pick a real tradeline from our live
            inventory, enter a few rough numbers, and get an instant estimate of how your
            utilization and average account age could change. Free, anonymous, no SSN, no credit pull.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#simulator"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Run the simulator <ArrowUpRight className="ml-1 size-4" />
            </a>
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Browse full inventory
            </Link>
          </div>
        </div>
      </section>

      <section id="simulator" className="mx-auto max-w-5xl scroll-mt-24 px-6 pb-20 lg:px-10 lg:pb-28">
        <TradelineSimulator />
      </section>

      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-primary">
            <Info className="size-4" /> How the estimate works
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold tracking-tight">Utilization first</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Adding a tradeline raises your total available credit, which lowers your utilization
                ratio — one of the largest factors in credit scoring. Crossing below common
                thresholds like 30% or 10% carries extra weight in the estimate.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold tracking-tight">Then account age</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A seasoned tradeline also raises the average age of your accounts. Older average age
                generally supports a stronger profile, so the estimate adds a modest factor for it.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-base font-semibold tracking-tight">Conservative by design</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Results are shown as a range, not a promise. The model is intentionally conservative,
                and your real outcome depends on your full profile, bureau behavior, and timing.
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-5 text-muted-foreground">
            Average age is estimated using the age of your oldest account as the baseline — your true
            average may differ. This simulator is for educational purposes only and is not financial
            advice. A1 Tradelines does not guarantee any score change. If your tradeline does not
            post, you are covered by reassignment or refund under your purchase agreement.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Like what you see? <span className="text-primary">Reserve it free.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            Reserving costs nothing. A specialist confirms availability and fit first — payment only
            happens after you confirm your pick, through secure escrow.
          </p>
          <div className="mt-8">
            <ContactCtas
              source="simulator-page"
              className="justify-center"
              primary={
                <Link
                  href="/inventory"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Compare &amp; reserve <ArrowUpRight className="ml-1 size-4" />
                </Link>
              }
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
