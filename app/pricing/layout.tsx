import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tradeline Pricing',
  description:
    'See clear, upfront tradeline pricing with account age, credit limit, and bureau reporting shown for every option. No hidden fees.',
  alternates: { canonical: '/pricing' },
  openGraph: { title: 'Tradeline Pricing | A1 Tradelines', description: 'Clear, upfront tradeline pricing.', url: '/pricing' },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
