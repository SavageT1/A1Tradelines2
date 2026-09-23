'use client'

import Link from 'next/link'
import useSWR from 'swr'
import { ArrowUpRight } from 'lucide-react'
import type { Tradeline } from '@/app/api/inventory/route'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function formatPrice(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

// Live "popular tradelines" strip for service pages — pulls real inventory
// from the A1 inventory feed instead of mock data.
export function FeaturedTradelines() {
  const { data, error } = useSWR<{ tradelines: Tradeline[] }>('/api/inventory', fetcher)

  if (error || !data?.tradelines?.length) return null

  const featured = [...data.tradelines]
    .sort((a, b) => b.ageYears - a.ageYears)
    .slice(0, 3)

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="flex items-end justify-between gap-6 border-b border-border pb-8">
        <h2 className="text-3xl font-semibold tracking-[-0.04em] lg:text-4xl">
          Popular <span className="text-primary">tradelines</span>
        </h2>
        <Link href="/inventory" className="shrink-0 text-sm font-medium text-primary hover:underline">
          See full inventory
        </Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {featured.map((t) => (
          <Link
            key={t.id}
            href="/inventory"
            className="group flex flex-col justify-between border border-border bg-background p-6 transition-transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium tracking-tight">{t.lender}</h3>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{t.accountAge} old</p>
              <dl className="mt-5 flex flex-col gap-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Age</dt><dd>{t.accountAge}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Limit</dt><dd>${t.limit.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Spots left</dt><dd className="text-primary">{t.spots}</dd></div>
              </dl>
            </div>
            <p className="mt-6 border-t border-border pt-4 text-lg font-semibold">{formatPrice(t.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
