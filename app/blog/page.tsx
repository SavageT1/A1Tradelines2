import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Blog | Tradeline Guides & Credit Education',
  description: 'Straightforward guides on how tradelines work, how to compare tradelines, and when tradelines post to your credit report.',
  alternates: { canonical: '/blog' },
}

const posts = [
  { category: 'Credit basics', title: 'What is a tradeline?', excerpt: 'A simple explanation of authorized-user tradelines, how they report, and what buyers should know before getting started.', date: 'May 14, 2026', read: '4 min read' },
  { category: 'Buying guide', title: 'How to compare tradelines', excerpt: 'The five details that matter most when you are reviewing available tradelines: age, limit, utilization, bureaus, and timing.', date: 'May 8, 2026', read: '5 min read' },
  { category: 'Expectations', title: 'When will a tradeline post?', excerpt: 'Understand statement dates, reporting windows, and why timing can vary from one tradeline to another.', date: 'April 29, 2026', read: '3 min read' },
  { category: 'Credit education', title: 'What a tradeline can—and cannot—do', excerpt: 'Set realistic expectations with a clear look at how a tradeline may support a credit profile without promising a specific score.', date: 'April 17, 2026', read: '6 min read' },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="max-w-4xl"><p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">The A1 journal</p><h1 className="mt-5 text-balance text-6xl font-semibold leading-[0.95] tracking-[-0.07em] lg:text-[7rem]">Credit made <span className="text-primary">clearer.</span></h1><p className="mt-8 max-w-xl text-lg leading-7 text-muted-foreground">Straightforward guides to help you understand tradelines, compare your options, and buy with confidence.</p></div>
      </section>

      <section className="border-y border-border bg-secondary/30"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"><div className="grid gap-5 md:grid-cols-2">{posts.map((post) => <article key={post.title} className="group flex min-h-72 flex-col justify-between border border-border bg-background p-6 transition-transform hover:-translate-y-1 lg:p-8"><div><div className="flex items-center justify-between gap-4"><span className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{post.category}</span><ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" /></div><h2 className="mt-12 max-w-md text-3xl font-semibold leading-tight tracking-[-0.05em]">{post.title}</h2><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{post.excerpt}</p></div><div className="mt-10 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground"><span>{post.date}</span><span className="flex items-center gap-1"><Clock className="size-3" /> {post.read}</span></div></article>)}</div></div></section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"><div className="flex flex-col justify-between gap-8 border-t border-border pt-8 md:flex-row md:items-start"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Still have questions?</p><h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.05em] lg:text-5xl">Talk to a real person before you buy.</h2></div><Link href="/#contact" className="inline-flex items-center rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground">Contact A1 <ArrowUpRight className="ml-2 size-4" /></Link></div><p className="mt-16 max-w-2xl text-xs leading-5 text-muted-foreground">Educational content is for general information only. Credit results vary by individual profile, and no specific score increase is guaranteed.</p></section>

      <SiteFooter />
    </main>
  )
}
