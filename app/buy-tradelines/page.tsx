import type { Metadata } from 'next'
import { ServicePage } from '@/components/service-page'
import { serviceContent } from '@/lib/service-content'

const content = serviceContent['buy-tradelines']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/buy-tradelines' },
  openGraph: { title: content.metaTitle, description: content.metaDescription, url: '/buy-tradelines' },
}

export default function Page() {
  return <ServicePage content={content} />
}
