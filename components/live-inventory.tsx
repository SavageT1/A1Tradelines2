'use client'

import useSWR from 'swr'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUp, ArrowUpDown, ArrowUpRight, CalendarClock, ChevronDown, CreditCard, HelpCircle, RefreshCw, TrendingUp } from 'lucide-react'
import type { Tradeline } from '@/app/api/inventory/route'
import { BookingModal } from '@/components/booking-modal'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type SortKey = 'best' | 'lender' | 'limit' | 'posts' | 'purchase' | 'price' | 'age'
type Dir = 'asc' | 'desc'

const sortOptions: { value: string; label: string }[] = [
  { value: 'best:desc', label: 'Best tradelines' },
  { value: 'posts:asc', label: 'Posting date: soonest first' },
  { value: 'price:asc', label: 'Price: low to high' },
  { value: 'price:desc', label: 'Price: high to low' },
  { value: 'limit:desc', label: 'Highest limit' },
  { value: 'age:desc', label: 'Oldest first' },
]

const keyLabel: Record<SortKey, string> = {
  best: 'Best tradelines',
  lender: 'Bank / card',
  limit: 'Credit limit',
  posts: 'Posts by',
  purchase: 'Purchase by',
  price: 'Price',
  age: 'Account age',
}

const columnHelp = {
  lender: 'The bank and credit card this authorized-user tradeline is on.',
  limit: 'The card\u2019s total credit limit. A higher limit generally helps your utilization more.',
  posts: 'The date the tradeline is expected to post to your credit report.',
  purchase: 'Reserve on or before this closing/statement date to make the upcoming reporting cycle.',
  price: 'The cost of this tradeline. Payment is only collected after a specialist confirms availability and fit.',
}

const parseDateValue = (s: string) => {
  const t = Date.parse(s)
  return Number.isNaN(t) ? 0 : t
}
const parseDayValue = (s: string) => parseInt(String(s).replace(/\D/g, ''), 10) || 0

function InfoTip({ text, align = 'left' }: { text: string; align?: 'left' | 'right' }) {
  return (
    <span className="group/tip relative inline-flex">
      <button type="button" aria-label={text} className="inline-flex text-muted-foreground/70 transition-colors hover:text-foreground">
        <HelpCircle className="size-3.5" />
      </button>
      <span
        role="tooltip"
        className={`pointer-events-none absolute top-full z-20 mt-2 w-44 rounded-lg border border-border bg-popover px-3 py-2 text-[11px] font-normal normal-case leading-snug tracking-normal text-popover-foreground opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}
      >
        {text}
      </span>
    </span>
  )
}

function SortHeader({
  label,
  sortKey,
  defaultDir,
  sort,
  onSort,
  help,
  align = 'left',
}: {
  label: string
  sortKey: SortKey
  defaultDir: Dir
  sort: { key: SortKey; dir: Dir }
  onSort: (key: SortKey, defaultDir: Dir) => void
  help: string
  align?: 'left' | 'right'
}) {
  const active = sort.key === sortKey
  return (
    <span className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onSort(sortKey, defaultDir)}
        aria-label={`Sort by ${label}`}
        className={`inline-flex items-center gap-1 transition-colors hover:text-foreground ${active ? 'text-foreground' : ''}`}
      >
        <span>{label}</span>
        {active ? (
          sort.dir === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />
        ) : (
          <ArrowUpDown className="size-3 opacity-40" />
        )}
      </button>
      <InfoTip text={help} align={align} />
    </span>
  )
}

const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

// Higher score = better tradeline. Age is the strongest value driver, with
// credit limit as a secondary factor, matching how tradelines are valued.
const qualityScore = (t: { ageYears: number; limit: number }) => t.ageYears * 10000 + t.limit

export function LiveInventory() {
  const { data, error, isLoading, mutate } = useSWR<{ tradelines: Tradeline[] }>('/api/inventory', fetcher, {
    revalidateOnFocus: false,
  })
  const [sort, setSort] = useState<{ key: SortKey; dir: Dir }>({ key: 'best', dir: 'desc' })
  const [bookingOpen, setBookingOpen] = useState(false)
  const [expandedId, setExpandedId] = useState<string | number | null>(null)

  const tradelines = useMemo(() => {
    const list = data?.tradelines ?? []
    const dir = sort.dir === 'asc' ? 1 : -1
    const sorted = [...list].sort((a, b) => {
      switch (sort.key) {
        case 'best':
          return qualityScore(b) - qualityScore(a)
        case 'lender':
          return dir * a.lender.localeCompare(b.lender)
        case 'limit':
          return dir * (a.limit - b.limit)
        case 'posts':
          return dir * (parseDateValue(a.postingDate) - parseDateValue(b.postingDate))
        case 'purchase':
          return dir * (parseDayValue(a.paymentDueDate) - parseDayValue(b.paymentDueDate))
        case 'price':
          return dir * (a.price - b.price)
        case 'age':
          return dir * (a.ageYears - b.ageYears)
        default:
          return 0
      }
    })
    return sorted
  }, [data, sort])

  const toggleSort = (key: SortKey, defaultDir: Dir) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: defaultDir }))

  const activeSortValue = `${sort.key}:${sort.dir}`

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">We could not load live inventory right now.</p>
        <button onClick={() => mutate()} className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
          <RefreshCw className="size-4" /> Try again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Filter and sort the live A1 inventory feed below.</p>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="sr-only sm:not-sr-only">Sort</span>
          <select
            value={activeSortValue}
            onChange={(e) => {
              const [key, d] = e.target.value.split(':') as [SortKey, Dir]
              setSort({ key, dir: d })
            }}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground"
          >
            {!sortOptions.some((o) => o.value === activeSortValue) && (
              <option value={activeSortValue}>
                {keyLabel[sort.key]} ({sort.dir === 'asc' ? 'ascending' : 'descending'})
              </option>
            )}
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2 pt-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg border border-border bg-card" />
          ))}
        </div>
      ) : (
        <>
          <p className="pt-5 text-sm text-muted-foreground">
            {tradelines.length} tradeline{tradelines.length === 1 ? '' : 's'} available
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            {/* Column headers (desktop) */}
            <div className="hidden grid-cols-[1.5fr_0.9fr_1fr_1fr_1fr_2rem] gap-4 border-b border-border bg-secondary/40 px-5 py-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground lg:grid">
              <SortHeader label="Bank Credit Card" sortKey="lender" defaultDir="asc" sort={sort} onSort={toggleSort} help={columnHelp.lender} />
              <SortHeader label="Credit limit" sortKey="limit" defaultDir="desc" sort={sort} onSort={toggleSort} help={columnHelp.limit} />
              <SortHeader label="Posts by" sortKey="posts" defaultDir="asc" sort={sort} onSort={toggleSort} help={columnHelp.posts} />
              <SortHeader label="Purchase by" sortKey="purchase" defaultDir="asc" sort={sort} onSort={toggleSort} help={columnHelp.purchase} />
              <SortHeader label="Price" sortKey="price" defaultDir="asc" sort={sort} onSort={toggleSort} help={columnHelp.price} align="right" />
              <span className="sr-only">Expand</span>
            </div>

            <ul className="divide-y divide-border">
              {tradelines.map((t) => {
                const isOpen = expandedId === t.id
                return (
                  <li key={t.id} className="bg-card">
                    <button
                      onClick={() => setExpandedId(isOpen ? null : t.id)}
                      aria-expanded={isOpen}
                      className="grid w-full grid-cols-[1fr_2rem] items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/40 lg:grid-cols-[1.5fr_0.9fr_1fr_1fr_1fr_2rem]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-medium leading-tight">{t.lender}</span>
                        <span className="text-xs text-muted-foreground">{t.accountAge}</span>
                      </span>
                      <span className="hidden font-semibold tracking-tight lg:block">{usd(t.limit)}</span>
                      <span className="hidden text-sm text-muted-foreground lg:block">{t.postingDate}</span>
                      <span className="hidden text-sm text-muted-foreground lg:block">{t.paymentDueDate}</span>
                      <span className="hidden items-center gap-2 lg:flex">
                        <span className="font-semibold tracking-tight text-primary">{usd(t.price)}</span>
                      </span>
                      <ChevronDown className={`size-5 justify-self-end text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Compact summary row (below lg): limit, price, dates when collapsed */}
                    {!isOpen && (
                      <div className="flex flex-col gap-2 px-5 pb-4 text-sm lg:hidden">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{usd(t.limit)}</span>
                          <span className="font-semibold text-primary">{usd(t.price)}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>Posts by {t.postingDate}</span>
                          <span>Purchase by {t.paymentDueDate}</span>
                        </div>
                      </div>
                    )}

                    {isOpen && (
                      <div className="border-t border-border px-5 pb-6 pt-5">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                          <div className="flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
                            <Image
                              src={t.lenderImage || '/placeholder.svg'}
                              alt={`${t.lender} card`}
                              width={128}
                              height={80}
                              className="h-auto w-full object-contain"
                              referrerPolicy="no-referrer"
                              unoptimized
                            />
                          </div>

                          <dl className="grid flex-1 grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <CreditCard className="size-4 shrink-0 text-muted-foreground" />
                              <dt className="text-muted-foreground">Credit limit</dt>
                              <dd className="ml-auto font-medium">{usd(t.limit)}</dd>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="size-4 shrink-0 text-muted-foreground" />
                              <dt className="text-muted-foreground">Account age</dt>
                              <dd className="ml-auto font-medium">{t.accountAge}</dd>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarClock className="size-4 shrink-0 text-muted-foreground" />
                              <dt className="text-muted-foreground">Reports</dt>
                              <dd className="ml-auto font-medium">{t.reportingDate}</dd>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="size-4 shrink-0 text-muted-foreground" />
                              <dt className="text-muted-foreground">Posts by</dt>
                              <dd className="ml-auto font-medium">{t.postingDate}</dd>
                            </div>
                            <div className="flex items-center gap-2">
                              <RefreshCw className="size-4 shrink-0 text-muted-foreground" />
                              <dt className="text-muted-foreground">Cycles</dt>
                              <dd className="ml-auto font-medium">{t.cycles}</dd>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="size-4 shrink-0 text-muted-foreground" />
                              <dt className="text-muted-foreground">Purchase by (closing date)</dt>
                              <dd className="ml-auto font-medium">{t.paymentDueDate}</dd>
                            </div>
                          </dl>
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                          <div>
                            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                              Price
                            </p>
                            <p className="text-2xl font-semibold tracking-tight text-primary">{usd(t.price)}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {t.spots} spot{t.spots === 1 ? '' : 's'} left
                            </p>
                          </div>
                          <button
                            onClick={() => setBookingOpen(true)}
                            className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                          >
                            Get my free analysis <ArrowUpRight className="ml-1 size-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} source="inventory" />
    </div>
  )
}
