import Link from 'next/link'
import { Phone } from 'lucide-react'
import { site } from '@/lib/site'

const columns = [
  {
    heading: 'Explore',
    links: [
      { href: '/inventory', label: 'Inventory' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/tradelines', label: 'Buy tradelines' },
      { href: '/aged-tradelines', label: 'Aged tradelines' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { href: '/how-tradelines-work', label: 'How tradelines work' },
      { href: '/authorized-user-tradelines', label: 'Authorized user tradelines' },
      { href: '/tradelines-for-mortgage', label: 'Tradelines for a mortgage' },
      { href: '/tradelines-for-auto-loans', label: 'Tradelines for auto loans' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/reviews', label: 'Reviews' },
      { href: '/#contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/refund-policy', label: 'Refund policy' },
      { href: '/privacy-policy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of service' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-14 lg:px-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="max-w-xs">
            <Link href="/" className="font-sans text-xl font-semibold tracking-[-0.04em]">
              A1 <span className="font-normal text-primary">Tradelines</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              A transparent marketplace to compare and buy seasoned authorized-user tradelines.
            </p>
            <a href={site.phoneHref} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <Phone className="size-4" /> {site.phone}
            </a>
            <a href={site.emailHref} className="mt-2 block text-sm text-muted-foreground hover:text-primary">
              {site.email}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3 text-sm">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{col.heading}</span>
                {col.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span className="max-w-xl sm:text-right">
            Tradelines are authorized-user credit lines. Results vary by profile and credit improvement is not guaranteed. This is not credit repair or financial advice.
          </span>
        </div>
      </div>
    </footer>
  )
}
