'use client'

import Link from 'next/link'
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { site } from '@/lib/site'

const serviceLinks = [
  { href: '/tradelines', label: 'Buy tradelines' },
  { href: '/authorized-user-tradelines', label: 'Authorized user tradelines' },
  { href: '/aged-tradelines', label: 'Aged tradelines' },
  { href: '/tradelines-for-mortgage', label: 'Tradelines for a mortgage' },
  { href: '/tradelines-for-auto-loans', label: 'Tradelines for auto loans' },
  { href: '/how-tradelines-work', label: 'How tradelines work' },
]

const mainLinks = [
  { href: '/inventory', label: 'Inventory' },
  { href: '/simulator', label: 'Impact simulator' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <span className="font-sans text-xl font-bold tracking-[-0.04em] text-foreground">
            A1 <span className="text-primary">Tradelines</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex" aria-label="Main navigation">
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 transition-colors hover:text-foreground" aria-expanded={servicesOpen}>
              Tradelines <ChevronDown className="size-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-72 border border-border bg-card p-2 shadow-lg">
                {serviceLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block rounded-sm px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={site.phoneHref} className="inline-flex items-center justify-center rounded-full border border-border p-2 text-primary transition-colors hover:bg-secondary" aria-label={`Call ${site.name} at ${site.phone}`} title={`Call ${site.phone}`}>
            <Phone className="size-4" />
          </a>
          <Link href="/inventory" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
            View tradelines <ArrowUpRight className="ml-1 inline size-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={site.phoneHref} className="rounded-full border border-border p-2 text-primary" aria-label={`Call ${site.name} at ${site.phone}`}>
            <Phone className="size-5" />
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-border p-2" aria-label="Toggle menu">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 text-sm lg:hidden" aria-label="Mobile navigation">
          {serviceLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="py-2 text-foreground">
              {link.label}
            </Link>
          ))}
          <div className="my-2 border-t border-border" />
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="py-2 text-foreground">
              {link.label}
            </Link>
          ))}
          <a href={site.phoneHref} onClick={() => setMenuOpen(false)} className="py-2 font-medium text-primary">
            Call {site.phone}
          </a>
        </nav>
      )}
    </header>
  )
}
