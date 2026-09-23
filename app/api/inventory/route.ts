import { NextResponse } from 'next/server'
import { site } from '@/lib/site'

export const dynamic = 'force-dynamic'
export const revalidate = 300

type RawTradeline = {
  id: string
  limit: string
  cycles: number
  price: string
  payment_due_date: string
  spots: number
  lenderImage: string
  lenderName: string
  posting_date: string
  reporting_date: string
  final_reporting_date: string
  accountAge: string
}

export type Tradeline = {
  id: string
  lender: string
  lenderImage: string
  limit: number
  price: number
  cycles: number
  spots: number
  paymentDueDate: string
  reportingDate: string
  postingDate: string
  accountAge: string
  ageYears: number
}

function ageToYears(age: string): number {
  const years = /(\d+)\s*year/.exec(age)?.[1]
  const months = /(\d+)\s*month/.exec(age)?.[1]
  return (years ? Number(years) : 0) + (months ? Number(months) / 12 : 0)
}

// The upstream feed ships strings like "1 years 6 months". Normalize grammar
// for display: "1 year 6 months", "7 months", "2 years".
function formatAge(age: string): string {
  const years = Number(/(\d+)\s*year/.exec(age)?.[1] ?? 0)
  const months = Number(/(\d+)\s*month/.exec(age)?.[1] ?? 0)
  const y = years ? `${years} year${years === 1 ? '' : 's'}` : ''
  const m = months ? `${months} month${months === 1 ? '' : 's'}` : ''
  return [y, m].filter(Boolean).join(' ') || '—'
}

export async function GET() {
  try {
    const url = `https://api.tradelinescore.com/api/tradelines/${site.bookingToken}?search=&page=1&perPage=all&order_by=&order=asc`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        Origin: 'https://app.tradelinescore.com',
        Referer: 'https://app.tradelinescore.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(25000),
      cache: 'no-store',
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'upstream', status: res.status }, { status: 502 })
    }
    const json = (await res.json()) as { data: RawTradeline[] }
    const tradelines: Tradeline[] = (json.data ?? []).map((t) => ({
      id: t.id,
      lender: t.lenderName.trim(),
      lenderImage: t.lenderImage,
      limit: Math.round(Number(t.limit)),
      price: Number(t.price),
      cycles: t.cycles,
      spots: t.spots,
      paymentDueDate: t.payment_due_date,
      reportingDate: t.reporting_date,
      postingDate: t.posting_date,
      accountAge: formatAge(t.accountAge),
      ageYears: ageToYears(t.accountAge),
    }))
    return NextResponse.json({ tradelines })
  } catch {
    return NextResponse.json({ error: 'fetch-failed' }, { status: 502 })
  }
}
