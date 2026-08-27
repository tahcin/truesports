import type { MetadataRoute } from 'next'
import { programs } from '@/content/programs'
import { site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/team',
    '/gallery',
    '/partner-with-us',
    '/programs',
    '/programs/savya-fit',
    '/contact',
  ].map(
    (route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  )

  const programRoutes = programs.map((p) => ({
    url: `${site.url}/programs/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...programRoutes]
}
