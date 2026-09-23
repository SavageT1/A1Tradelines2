'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const SRC =
  'https://app.tradelinescore.com/authorized-user-tradeline/eXgzNXRrM1gyVXN3ZTBkMWo0U2xidz09'

// The third-party widget is served cross-origin, so its internal layout can't be
// restyled. Below ~560px its two-column rows overlap. To keep it clean we render
// the iframe at a fixed logical width where it lays out correctly, then scale the
// whole frame down to fit narrow screens.
const LOGICAL_WIDTH = 560
const LOGICAL_HEIGHT = 1600
const LOAD_TIMEOUT_MS = 12000

export function InventoryEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)
  const [scale, setScale] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const width = el.clientWidth
      setScale(Math.min(1, width / LOGICAL_WIDTH))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // If the third-party widget never loads (blocked, offline, provider outage),
  // don't leave a giant empty box — show a graceful fallback with the same data.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loadedRef.current) setFailed(true)
    }, LOAD_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [])

  const handleLoad = () => {
    loadedRef.current = true
    setLoaded(true)
  }

  if (failed) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center sm:p-12">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Live inventory
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight">
          Browse the full live inventory
        </h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The live booking widget didn&apos;t load. Our full inventory page shows
          the same real-time tradeline data — pricing, age, and limits update in
          real time.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/inventory"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            View live inventory
          </Link>
          <a
            href="tel:+19087675309"
            className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:bg-muted"
          >
            Call 908-767-5309
          </a>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl border border-border bg-card"
      style={{ height: LOGICAL_HEIGHT * scale }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="animate-pulse text-sm text-muted-foreground">
            Loading live inventory…
          </p>
        </div>
      )}
      <iframe
        src={SRC}
        title="A1 Tradelines live inventory and booking"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={handleLoad}
        style={{
          width: LOGICAL_WIDTH,
          height: LOGICAL_HEIGHT,
          border: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      />
    </div>
  )
}
