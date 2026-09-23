'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Tradeline } from '@/app/api/inventory/route'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const qualityScore = (t: Tradeline) => t.ageYears * 10000 + t.limit

function formatPosts(dateStr: string) {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function PreviewCard({ t }: { t: Tradeline }) {
  return (
    <Link
      href="/inventory"
      className="group flex w-[228px] shrink-0 snap-start flex-col rounded-2xl border border-border bg-background p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-2.5">
        {t.lenderImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.lenderImage} alt={t.lender} className="size-9 rounded-lg object-contain" loading="lazy" />
        ) : (
          <span className="flex size-9 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-muted-foreground">
            {t.lender.slice(0, 1)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">{t.lender}</p>
          <p className="text-[11px] text-muted-foreground">{t.accountAge}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-[11px]">
        <div>
          <p className="text-muted-foreground">Limit</p>
          <p className="mt-0.5 text-[13px] font-semibold">{usd(t.limit)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Posts by</p>
          <p className="mt-0.5 text-[13px] font-semibold">{formatPosts(t.postingDate)}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <p className="text-base font-semibold tracking-tight text-primary">{usd(t.price)}</p>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
          View <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

function SkeletonCard() {
  return <div className="w-[228px] shrink-0 snap-start animate-pulse rounded-2xl border border-border bg-secondary/40 p-4"><div className="h-9 w-9 rounded-lg bg-secondary" /><div className="mt-3 h-4 w-3/4 rounded bg-secondary" /><div className="mt-2 h-4 w-1/2 rounded bg-secondary" /></div>
}

export function HomeInventoryPreview() {
  const { data, error, isLoading } = useSWR<{ tradelines: Tradeline[] }>('/api/inventory', fetcher, {
    revalidateOnFocus: false,
  })

  const top = !data?.tradelines?.length
    ? []
    : [...data.tradelines].sort((a, b) => qualityScore(b) - qualityScore(a)).slice(0, 6)

  if (error || (!isLoading && top.length === 0)) return null

  return (
    <div className="md:hidden">
      <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          top.map((t) => <PreviewCard key={t.id} t={t} />)
        )}
      </div>
      <Link
        href="/inventory"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
      >
        Browse the full inventory <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
