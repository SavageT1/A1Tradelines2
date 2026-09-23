import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export type LegalContent = {
  title: string
  updated: string
  intro: string
  sections: { heading: string; body: string[] }[]
}

export function LegalPage({ content }: { content: LegalContent }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Legal</p>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] lg:text-6xl">{content.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {content.updated}</p>
        <p className="mt-8 text-base leading-7 text-muted-foreground">{content.intro}</p>

        <div className="mt-10 flex flex-col gap-9">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold tracking-[-0.03em]">{section.heading}</h2>
              {section.body.map((paragraph, index) => (
                <p key={index} className="mt-3 text-sm leading-7 text-muted-foreground">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs leading-6 text-muted-foreground">
          This page is provided for general information and is not legal advice. Please have your own attorney review these terms before publishing them on your live site.
        </p>
      </section>
      <SiteFooter />
    </main>
  )
}
