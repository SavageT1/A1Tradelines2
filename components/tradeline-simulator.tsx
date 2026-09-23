'use client'

import useSWR from 'swr'
import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  CalendarClock,
  Check,
  CreditCard,
  Phone,
  RefreshCw,
  Search,
  ShieldAlert,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import type { Tradeline } from '@/app/api/inventory/route'
import { BookingModal } from '@/components/booking-modal'
import { site } from '@/lib/site'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const bands = [
  { label: '500–579', mult: 1.15 },
  { label: '580–619', mult: 1.1 },
  { label: '620–659', mult: 1.0 },
  { label: '660–719', mult: 0.9 },
  { label: '720+', mult: 0.8 },
]

const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const pct = (n: number) =>
  `${n.toLocaleString('en-US', { maximumFractionDigits: n < 10 ? 1 : 0 })}%`

const parseMoney = (s: string) => {
  const n = Number(String(s).replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) && n >= 0 ? n : 0
}

function StepHeading({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div className="mb-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Step {n}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{sub}</p>
    </div>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {hint && <span className="mt-1 block text-xs leading-5 text-muted-foreground">{hint}</span>}
      <span className="mt-2 block">{children}</span>
    </label>
  )
}

const inputCls =
  'w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none'

export function TradelineSimulator() {
  const { data, error, isLoading, mutate } = useSWR<{ tradelines: Tradeline[] }>('/api/inventory', fetcher, {
    revalidateOnFocus: false,
  })
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [bandIdx, setBandIdx] = useState(2)
  const [limitsRaw, setLimitsRaw] = useState('15000')
  const [balancesRaw, setBalancesRaw] = useState('6000')
  const [accountsRaw, setAccountsRaw] = useState('4')
  const [oldestRaw, setOldestRaw] = useState('6')
  const [bookingOpen, setBookingOpen] = useState(false)

  const tradelines = useMemo(() => data?.tradelines ?? [], [data])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q
      ? tradelines.filter((t) => t.lender.toLowerCase().includes(q))
      : tradelines
    return [...list].sort((a, b) => b.ageYears * 10000 + b.limit - (a.ageYears * 10000 + a.limit))
  }, [tradelines, query])

  const selected = useMemo(
    () => tradelines.find((t) => t.id === selectedId) ?? null,
    [tradelines, selectedId]
  )

  const result = useMemo(() => {
    const limits = parseMoney(limitsRaw)
    const balances = parseMoney(balancesRaw)
    const accounts = Math.max(0, Math.round(Number(accountsRaw) || 0))
    const oldest = Math.max(0, Number(oldestRaw) || 0)
    const band = bands[bandIdx]

    if (!selected || limits <= 0 || accounts <= 0) return null

    const currentUtil = balances / limits
    const newUtil = balances / (limits + selected.limit)
    const utilDropPts = (currentUtil - newUtil) * 100

    // Average age is estimated from the oldest account's age as the baseline.
    const currentAAoA = oldest
    const newAAoA = (accounts * oldest + selected.ageYears) / (accounts + 1)
    const aaoaGain = Math.max(0, newAAoA - currentAAoA)

    // Conservative, illustrative impact model. Utilization improvement is the
    // main driver; crossing common scoring thresholds adds a modest bump.
    let bonus = 0
    if (currentUtil >= 0.5 && newUtil < 0.5) bonus += 8
    if (currentUtil >= 0.3 && newUtil < 0.3) bonus += 18
    if (currentUtil >= 0.1 && newUtil < 0.1) bonus += 12
    const utilPts = Math.min(Math.max(0, utilDropPts) * 0.6, 15)
    const aaoaPts = Math.min(aaoaGain * 2, 8)
    const raw = (bonus + utilPts + aaoaPts) * band.mult

    const noGain = utilDropPts <= 0 && aaoaGain <= 0
    const low = noGain ? 0 : Math.max(0, Math.round(raw * 0.6))
    const high = noGain ? 5 : Math.min(75, Math.round(raw * 1.25))
    const mid = (low + high) / 2
    const level = mid < 15 ? 'Low' : mid < 35 ? 'Moderate' : 'High'

    return { currentUtil, newUtil, utilDropPts, currentAAoA, newAAoA, aaoaGain, low, high, level }
  }, [selected, limitsRaw, balancesRaw, accountsRaw, oldestRaw, bandIdx])

  const answers = selected
    ? {
        goal: `Simulated impact for ${selected.lender} — ${usd(selected.limit)} limit, ${selected.accountAge}`,
        timeline: 'As soon as possible',
      }
    : undefined

  return (
    <div>
      {/* STEP 1 — pick a tradeline */}
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <StepHeading
          n="1"
          title="Pick a tradeline from live inventory"
          sub="Real, currently available tradelines — never samples. Search by bank and tap one to select it."
        />

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by bank — try Chase, Capital One, Discover…"
            aria-label="Search tradelines by bank"
            className={`${inputCls} pl-11`}
          />
        </div>

        <div className="mt-4">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl border border-border bg-background" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-xl border border-border bg-background p-8 text-center">
              <p className="text-sm text-muted-foreground">We could not load live inventory right now.</p>
              <button
                onClick={() => mutate()}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary"
              >
                <RefreshCw className="size-4" /> Try again
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                {filtered.length} of {tradelines.length} tradelines
                {selected && (
                  <span className="text-primary"> · {selected.lender} selected</span>
                )}
              </p>
              <ul className="mt-3 max-h-80 divide-y divide-border overflow-y-auto rounded-xl border border-border">
                {filtered.map((t) => {
                  const active = t.id === selectedId
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(active ? null : t.id)}
                        aria-pressed={active}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50 ${
                          active ? 'bg-primary/10' : ''
                        }`}
                      >
                        <span
                          className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${
                            active ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-transparent'
                          }`}
                        >
                          <Check className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">{t.lender}</span>
                          <span className="block text-xs text-muted-foreground">{t.accountAge} · {t.spots} spot{t.spots === 1 ? '' : 's'} left</span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="block text-sm font-semibold">{usd(t.limit)}</span>
                          <span className="block text-xs text-primary">{usd(t.price)}</span>
                        </span>
                      </button>
                    </li>
                  )
                })}
                {filtered.length === 0 && (
                  <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No tradelines match “{query}”. Try another bank.
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* STEP 2 — your profile */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <StepHeading
          n="2"
          title="Tell us about your credit today"
          sub="Rough numbers are fine — nothing here is saved or shared. No SSN, no credit pull."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Current credit score">
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Current credit score band">
              {bands.map((b, i) => (
                <button
                  key={b.label}
                  type="button"
                  role="radio"
                  aria-checked={i === bandIdx}
                  onClick={() => setBandIdx(i)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    i === bandIdx
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:bg-secondary'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Total credit limits" hint="Add up the limits on all your cards.">
            <input
              type="text"
              inputMode="numeric"
              value={limitsRaw}
              onChange={(e) => setLimitsRaw(e.target.value)}
              placeholder="15,000"
              aria-label="Total credit limits in dollars"
              className={inputCls}
            />
          </Field>
          <Field label="Total balances" hint="What you currently owe across those cards.">
            <input
              type="text"
              inputMode="numeric"
              value={balancesRaw}
              onChange={(e) => setBalancesRaw(e.target.value)}
              placeholder="6,000"
              aria-label="Total balances in dollars"
              className={inputCls}
            />
          </Field>
          <div className="grid grid-cols-2 gap-6">
            <Field label="Open accounts">
              <input
                type="number"
                min={0}
                value={accountsRaw}
                onChange={(e) => setAccountsRaw(e.target.value)}
                aria-label="Number of open accounts"
                className={inputCls}
              />
            </Field>
            <Field label="Oldest account (yrs)">
              <input
                type="number"
                min={0}
                value={oldestRaw}
                onChange={(e) => setOldestRaw(e.target.value)}
                aria-label="Age of oldest account in years"
                className={inputCls}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* STEP 3 — results */}
      <section className="mt-6">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Step 3</p>
        {!result || !selected ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <TrendingUp className="mx-auto size-8 text-muted-foreground/50" />
            <h2 className="mt-4 text-xl font-semibold tracking-tight">Your estimate appears here</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {!selected
                ? 'Select a tradeline from the live inventory above to see how it could change your numbers.'
                : 'Enter your total limits and account count above so we can run the math.'}
            </p>
          </div>
        ) : (
          <div id="simulator-results" className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border bg-secondary/40 px-6 py-4 sm:px-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Tradeline Wizard · Impact estimate
              </p>
              <p className="mt-1 text-lg font-semibold tracking-tight">
                {selected.lender} · {usd(selected.limit)} limit · {selected.accountAge}
              </p>
            </div>

            <div className="grid gap-6 px-6 py-8 sm:grid-cols-2 sm:px-8">
              <div className="rounded-xl border border-border bg-background p-5">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Wallet className="size-4 text-primary" /> Credit utilization
                </p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Now</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight">{pct(result.currentUtil * 100)}</p>
                  </div>
                  <TrendingUp className="mb-2 size-5 text-primary" aria-hidden />
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">With tradeline</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight text-primary">{pct(result.newUtil * 100)}</p>
                  </div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Math.min(100, Math.max(2, result.newUtil * 100))}%` }}
                  />
                </div>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Balances stay the same — your total available credit grows by {usd(selected.limit)}.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-background p-5">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <CalendarClock className="size-4 text-primary" /> Average age of accounts
                </p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Now (est.)</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight">
                      {result.currentAAoA.toFixed(1)} <span className="text-base font-normal text-muted-foreground">yrs</span>
                    </p>
                  </div>
                  <TrendingUp className="mb-2 size-5 text-primary" aria-hidden />
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">With tradeline</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight text-primary">
                      {result.newAAoA.toFixed(1)} <span className="text-base font-normal text-muted-foreground">yrs</span>
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Adding a {selected.accountAge}-old account raises the average across your accounts.
                </p>
              </div>
            </div>

            <div className="border-t border-border px-6 py-8 sm:px-8">
              <p className="flex items-center gap-2 text-sm font-medium">
                <CreditCard className="size-4 text-primary" /> Estimated score impact
              </p>
              <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-5xl font-semibold tracking-[-0.04em]">
                  +{result.low} <span className="text-2xl text-muted-foreground">to</span> +{result.high}
                  <span className="ml-2 align-middle text-lg font-normal text-muted-foreground">pts</span>
                </p>
                <div className="w-full max-w-xs">
                  <div className="flex justify-between text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    <span className={result.level === 'Low' ? 'text-foreground' : ''}>Low</span>
                    <span className={result.level === 'Moderate' ? 'text-foreground' : ''}>Moderate</span>
                    <span className={result.level === 'High' ? 'text-foreground' : ''}>High</span>
                  </div>
                  <div className="mt-2 flex gap-1.5" aria-label={`Impact level: ${result.level}`}>
                    {['Low', 'Moderate', 'High'].map((l) => {
                      const order = ['Low', 'Moderate', 'High']
                      const active = order.indexOf(l) <= order.indexOf(result.level)
                      return (
                        <span
                          key={l}
                          className={`h-2.5 flex-1 rounded-full ${active ? 'bg-primary' : 'bg-secondary'}`}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 rounded-xl border border-border bg-secondary/40 p-4">
                <ShieldAlert className="size-5 shrink-0 text-primary" aria-hidden />
                <p className="text-xs leading-5 text-muted-foreground">
                  <span className="font-semibold text-foreground">For educational purposes only — not a guarantee of any score change.</span>{' '}
                  Individual results vary based on your full credit profile, bureau behavior, and timing. This is not financial advice.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Reserve this tradeline <ArrowUpRight className="ml-1 size-4" />
                </button>
                <a
                  href={site.phoneHref}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  <Phone className="mr-2 size-4 text-primary" /> Talk to a specialist — {site.phone}
                </a>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Reserving is free. No payment is collected until a specialist confirms availability and fit.
              </p>
              <p className="mt-2 text-center text-xs text-muted-foreground/70">
                Tip: screenshot your results to share them.
              </p>
            </div>
          </div>
        )}
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} answers={answers} />
    </div>
  )
}
