'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { site } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

type CallLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** Where the call button lives, e.g. 'header', 'footer', 'inventory'. */
  source: string
  children: ReactNode
}

/**
 * Tracked "call us" link. Every tap fires a `phone_call_clicked` GA4 event so
 * phone calls — one of the main conversion paths — are measurable.
 */
export function CallLink({ source, children, onClick, ...rest }: CallLinkProps) {
  return (
    <a
      href={site.phoneHref}
      onClick={(e) => {
        trackEvent('phone_call_clicked', { source })
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
