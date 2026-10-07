import type { Metadata } from 'next'
import { ServicePage } from '@/components/service-page'
import { serviceContent } from '@/lib/service-content'

const content = serviceContent['best-tradelines-for-credit-utilization']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/best-tradelines-for-credit-utilization' },
  openGraph: { title: content.metaTitle, description: content.metaDescription, url: '/best-tradelines-for-credit-utilization' },
}

export default function Page() {
  return <ServicePage content={content} />
}
