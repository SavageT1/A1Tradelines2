import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    '',
    '/inventory',
    '/simulator',
    '/pricing',
    '/tradelines',
    '/authorized-user-tradelines',
    '/buy-tradelines',
    '/seasoned-tradelines',
    '/best-tradelines-for-credit-utilization',
    '/aged-tradelines',
    '/tradelines-for-mortgage',
    '/tradelines-for-auto-loans',
    '/how-tradelines-work',
    '/blog',
    '/blog/credit-report-checklist-before-buying-tradeline',
    '/links',
    '/about',
    '/contact',
    '/reviews',
    '/refund-policy',
    '/privacy-policy',
    '/terms',
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  return routes
}
