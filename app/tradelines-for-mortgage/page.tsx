import type { Metadata } from 'next'
import { ServicePage } from '@/components/service-page'
import { serviceContent } from '@/lib/service-content'

const content = serviceContent['tradelines-for-mortgage']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/tradelines-for-mortgage' },
  openGraph: { title: content.metaTitle, description: content.metaDescription, url: '/tradelines-for-mortgage' },
}

export default function Page() {
  return <ServicePage content={content} />
}
