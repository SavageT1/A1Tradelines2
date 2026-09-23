import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { InventoryGuarantee } from '@/components/inventory-guarantee'
import { LiveInventory } from '@/components/live-inventory'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Tradeline Inventory — Compare & Reserve Seasoned Tradelines',
  description:
    'Browse the full A1 Tradelines inventory. Sort by price, age, or limit, and see reporting dates and posting windows on every seasoned tradeline. Reserving is free — no payment until a specialist confirms your pick.',
  alternates: { canonical: '/inventory' },
  openGraph: { title: 'Tradeline Inventory — A1 Tradelines', description: 'Compare and reserve seasoned authorized-user tradelines.', url: '/inventory' },
}

export default function InventoryPage() {
  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-10 lg:pb-14 lg:pt-24">
          <div className="max-w-3xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-primary">Full inventory</p>
            <h1 className="text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Compare <span className="text-primary">tradelines</span>, then <span className="text-primary">reserve.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-7 text-muted-foreground">
              Browse live availability below. Select the tradeline that fits your goal and book securely in minutes — pricing, age, and limits update in real time.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
          <LiveInventory />
          <InventoryGuarantee />
          <p className="mt-8 max-w-2xl text-xs leading-5 text-muted-foreground">
            Inventory and pricing can change. Tradelines are authorized-user credit lines. Credit improvement is not guaranteed and this is not credit repair.
          </p>
        </section>

        <SiteFooter />
      </main>
    </>
  )
}
