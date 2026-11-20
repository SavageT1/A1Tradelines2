import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Credit Report Checklist Before Buying a Tradeline',
  description:
    'Review your credit reports before comparing authorized-user tradelines. Learn what to check, how to spot errors, and where to get free reports.',
  alternates: { canonical: '/blog/credit-report-checklist-before-buying-tradeline' },
  openGraph: {
    title: 'Credit Report Checklist Before Buying a Tradeline',
    description:
      'Review your credit reports before comparing authorized-user tradelines. Learn what to check, how to spot errors, and where to get free reports.',
    url: '/blog/credit-report-checklist-before-buying-tradeline',
    siteName: 'A1 Tradelines',
    type: 'article',
    publishedTime: '2026-11-19',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Report Checklist Before Buying a Tradeline',
    description:
      'Review your credit reports before comparing authorized-user tradelines. Learn what to check, how to spot errors, and where to get free reports.',
  },
}

export default function CreditReportChecklistPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-6 pb-20 pt-12 lg:pb-28 lg:pt-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All articles
        </Link>

        <header className="border-b border-border pb-10 pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            Credit education · 6 min read
          </p>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            Before You Buy a Tradeline, Check These 5 Things on Your Credit Reports
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A clear picture of your current reports can help you ask better questions and compare
            options with realistic expectations. Here is a practical checklist to use before you
            shop.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">November 19, 2026</p>
        </header>

        <div className="prose prose-lg mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary">
          <p>
            A credit report lists information associated with your credit history. A credit score
            is calculated from report information using a particular scoring model. The reports
            from Equifax, Experian, and TransUnion can differ, so it helps to look at each one
            before deciding what questions to ask about an authorized-user tradeline.
          </p>

          <h2>1. Start with all three reports</h2>
          <p>
            You can request free online reports from the three nationwide credit reporting
            companies at{' '}
            <a href="https://www.annualcreditreport.com/" target="_blank" rel="noreferrer">
              AnnualCreditReport.com
            </a>
            . The CFPB says reports are available weekly there. Checking your own report does not
            hurt your credit score.
          </p>
          <p>
            Use the official site and review each report separately. An account or update that
            appears on one report may not appear on another.
          </p>

          <h2>2. Check your personal information</h2>
          <p>
            Look over your name, addresses, and other identifying details. Unfamiliar information
            can be a sign of a reporting error or possible identity theft. Follow the reporting
            company’s instructions if you need to correct an item.
          </p>

          <h2>3. List the accounts already reporting</h2>
          <p>
            Note which revolving accounts appear on each report, along with the account status,
            opening date, credit limit, balance, and payment history shown. This gives you a
            baseline for comparing account details and spotting information that needs attention.
          </p>

          <h2>4. Look at balances and reported limits</h2>
          <p>
            For revolving accounts, compare the reported balance with the reported credit limit.
            Those figures can change as account activity is reported. If a balance or limit looks
            wrong, contact the company that supplied the information and the credit reporting
            company to ask about a correction.
          </p>

          <h2>5. Mark anything inaccurate or unfamiliar</h2>
          <p>
            Write down the account name, the report where it appears, and the specific detail you
            believe is wrong. The{' '}
            <a
              href="https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-an-error-on-my-credit-report-en-314/"
              target="_blank"
              rel="noreferrer"
            >
              CFPB explains how to dispute a credit report error
            </a>
            . Resolve identity or accuracy concerns directly with the reporting company and
            information provider before making a purchase decision.
          </p>

          <h2>Questions to ask when comparing tradelines</h2>
          <ul>
            <li>Which card issuer and reporting companies are involved?</li>
            <li>What account details, price, and expected reporting window are confirmed in writing?</li>
            <li>What happens if the account does not report as described?</li>
            <li>Are the terms clear about what is included and what is not guaranteed?</li>
          </ul>
          <p>
            A tradeline cannot correct unrelated inaccurate information, and no provider can
            guarantee a particular score change or lending decision. Credit outcomes depend on
            your overall file and the scoring model used. Compare the written terms and make sure
            the purchase fits your situation.
          </p>

          <h2>Frequently asked questions</h2>
          <h3>Does checking my own credit report lower my score?</h3>
          <p>
            No. The CFPB says requesting your own report does not hurt your score. Use
            AnnualCreditReport.com to access the free reports.
          </p>
          <h3>Do all three reports show the same information?</h3>
          <p>
            Not necessarily. Information can vary by reporting company, which is why reviewing
            each report separately is useful.
          </p>
          <h3>What should I do if I find an error?</h3>
          <p>
            Follow the dispute instructions from the credit reporting company and contact the
            company that furnished the information. Keep a copy of what you submit and any
            responses.
          </p>
        </div>

        <aside className="mt-12 border border-border bg-secondary/30 p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            Need help comparing?
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Get clear answers before you choose.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Review current account details and purchase terms with an A1 Tradelines specialist.
            Availability and results vary, and no specific credit outcome is promised.
          </p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            Talk to A1 <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </aside>

        <p className="mt-8 text-xs leading-5 text-muted-foreground">
          Educational content is for general information only. It is not financial, legal, or
          credit-repair advice. Credit results vary by individual profile, and no specific score
          increase or lending approval is guaranteed. Information checked November 19, 2026.
        </p>

        <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
          Sources:{' '}
          <a href="https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-a-free-copy-of-my-credit-reports-en-5/" target="_blank" rel="noreferrer">
            CFPB: Getting free credit reports
          </a>
          {' · '}
          <a href="https://www.consumerfinance.gov/ask-cfpb/does-requesting-my-credit-report-hurt-my-credit-score-en-1229/" target="_blank" rel="noreferrer">
            CFPB: Checking your own report
          </a>
          {' · '}
          <a href="https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-an-error-on-my-credit-report-en-314/" target="_blank" rel="noreferrer">
            CFPB: Disputing an error
          </a>
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
