import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    '',
    '/inventory',
    '/pricing',
    '/tradelines',
    '/authorized-user-tradelines',
    '/aged-tradelines',
    '/tradelines-for-mortgage',
    '/tradelines-for-auto-loans',
    '/how-tradelines-work',
    '/blog',
    '/about',
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
