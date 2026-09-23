import type { Metadata } from 'next'
import { ServicePage } from '@/components/service-page'
import { serviceContent } from '@/lib/service-content'

const content = serviceContent['tradelines-for-auto-loans']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/tradelines-for-auto-loans' },
  openGraph: { title: content.metaTitle, description: content.metaDescription, url: '/tradelines-for-auto-loans' },
}

export default function Page() {
  return <ServicePage content={content} />
}
