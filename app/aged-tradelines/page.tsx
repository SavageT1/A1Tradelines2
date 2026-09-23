import type { Metadata } from 'next'
import { ServicePage } from '@/components/service-page'
import { serviceContent } from '@/lib/service-content'

const content = serviceContent['aged-tradelines']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/aged-tradelines' },
  openGraph: { title: content.metaTitle, description: content.metaDescription, url: '/aged-tradelines' },
}

export default function Page() {
  return <ServicePage content={content} />
}
