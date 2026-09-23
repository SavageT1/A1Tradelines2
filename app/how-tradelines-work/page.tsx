import type { Metadata } from 'next'
import { ServicePage } from '@/components/service-page'
import { serviceContent } from '@/lib/service-content'

const content = serviceContent['how-tradelines-work']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/how-tradelines-work' },
  openGraph: { title: content.metaTitle, description: content.metaDescription, url: '/how-tradelines-work' },
}

export default function Page() {
  return <ServicePage content={content} />
}
