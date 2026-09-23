import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'A1 Tradelines — buy seasoned authorized-user tradelines'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Official A1 monogram in its true brand colors:
// near-black "A" (#111417) + forest-green "1" (#0A4F29).
const MONOGRAM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314 240"><path fill="#111417" d="M144 0 L0 240 L122 240 L151 189 L90 189 L143 100 L215 240 L276 240 Z"/><path fill="#0A4F29" d="M269 0 L314 0 L314 240 L292 240 L261 189 L261 63 L220 90 L195 55 Z"/></svg>`
const MONOGRAM_SRC = `data:image/svg+xml,${encodeURIComponent(MONOGRAM_SVG)}`

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#faf8f3',
          position: 'relative',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* faint forest-green wash, top right — echoes the site */}
        <div
          style={{
            position: 'absolute',
            top: -280,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: 'rgba(10, 79, 41, 0.10)',
          }}
        />
        <img src={MONOGRAM_SRC} width={230} height={175} alt="" />
        <div
          style={{
            marginTop: 14,
            fontSize: 68,
            fontWeight: 800,
            color: '#111417',
            letterSpacing: -2,
          }}
        >
          A1 Tradelines
        </div>
        <div style={{ marginTop: 16, fontSize: 40, color: '#3f4a42' }}>
          Compare age, limit &amp; bureau reporting.
        </div>
        <div style={{ marginTop: 10, fontSize: 40, fontWeight: 700, color: '#0A4F29' }}>
          Backed by our posting guarantee.
        </div>
        {/* site-style pill CTA */}
        <div
          style={{
            marginTop: 30,
            display: 'flex',
            alignItems: 'center',
            background: '#0A4F29',
            color: '#ffffff',
            fontSize: 32,
            fontWeight: 600,
            padding: '18px 48px',
            borderRadius: 999,
          }}
        >
          Get my free analysis →
        </div>
      </div>
    ),
    { ...size },
  )
}
