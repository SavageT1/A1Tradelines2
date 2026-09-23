import Link from 'next/link'
import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { JsonLd, faqSchema } from '@/components/json-ld'
import { HighlightTradelines } from '@/components/highlight-tradelines'
import { FeaturedTradelines } from '@/components/featured-tradelines'
import { site } from '@/lib/site'

export type ServiceContent = {
  slug: string
  eyebrow: string
  title: string
  highlight: string
  intro: string
  sections: { heading: string; body: string }[]
  bullets: string[]
  faqs: { question: string; answer: string }[]
}

export function ServicePage({ content }: { content: ServiceContent }) {
  return (
    <>
      <JsonLd data={faqSchema(content.faqs)} />
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="max-w-4xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-primary">{content.eyebrow}</p>
            <h1 className="text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              <HighlightTradelines text={content.title} /> <span className="text-primary">{content.highlight}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-7 text-muted-foreground">{content.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/inventory" className="inline-flex items-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                View available tradelines <ArrowUpRight className="ml-2 size-4" />
              </Link>
              <a href={site.phoneHref} className="inline-flex items-center rounded-full border border-border px-6 py-3.5 text-sm font-medium hover:bg-secondary">
                Call {site.phone}
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
            <div className="flex flex-col gap-10">
              {content.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] lg:text-3xl">{section.heading}</h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{section.body}</p>
                </div>
              ))}
            </div>
            <div className="h-fit border border-border bg-background p-6 lg:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">What you get</p>
              <ul className="mt-5 flex flex-col gap-4">
                {content.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm leading-6">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-start gap-3 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /> {site.guarantee}
              </div>
            </div>
          </div>
        </section>

        <FeaturedTradelines />

        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] lg:text-4xl">Frequently asked questions</h2>
            <div className="mt-8 border-t border-border">
              {content.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-border py-6">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  )
}
