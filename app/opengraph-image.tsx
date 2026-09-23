import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'A1 Tradelines — buy seasoned authorized-user tradelines'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Official A1 monogram in its true brand colors:
// near-black "A" (#111417) + forest-green "1" (#0A4F29).
const MONOGRAM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314 240"><path fill="#111417" d="M144 0 L0 240 L122 240 L151 189 L90 189 L143 100 L215 240 L276 240 Z"/><path fill="#0A4F29" d="M269 0 L314 0 L314 240 L292 240 L261 189 L261 63 L220 90 L195 55 Z"/></svg>`
const MONOGRAM_SRC = `data:image/svg+xml,${encodeURIComponent(MONOGRAM_SVG)}`

// Ghosted credit card echoing the homepage card marquee — very light so the
// copy stays legible, but unmistakably a credit card.
function GhostCard({
  left,
  top,
  rotate,
  bg,
}: {
  left: number
  top: number
  rotate: string
  bg: string
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: 300,
        height: 188,
        borderRadius: 22,
        background: bg,
        border: '1px solid rgba(10, 79, 41, 0.18)',
        transform: rotate,
        opacity: 0.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '22px 26px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 30, fontWeight: 800, color: '#0A4F29' }}>A1</div>
        <div style={{ width: 44, height: 32, borderRadius: 7, background: '#c9a86a' }} />
      </div>
      <div style={{ fontSize: 24, letterSpacing: 3, color: '#41503f' }}>•••• •••• •••• 4021</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 15, letterSpacing: 2, color: '#5c6a5c' }}>MEMBER SINCE</div>
        <div style={{ fontSize: 15, color: '#5c6a5c' }}>&apos;14</div>
      </div>
    </div>
  )
}

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
          overflow: 'hidden',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* ghosted credit cards drifting across the top, behind the wordmark */}
        <GhostCard left={-70} top={24} rotate="rotate(-7deg)" bg="#e6ece1" />
        <GhostCard left={255} top={-14} rotate="rotate(4deg)" bg="#dde7d8" />
        <GhostCard left={580} top={30} rotate="rotate(-4deg)" bg="#e9efe4" />
        <GhostCard left={905} top={-10} rotate="rotate(6deg)" bg="#dfe8da" />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={MONOGRAM_SRC} width={190} height={145} alt="" />
          <div
            style={{
              marginTop: 10,
              fontSize: 66,
              fontWeight: 800,
              color: '#111417',
              letterSpacing: -2,
            }}
          >
            A1 Tradelines
          </div>
          <div style={{ marginTop: 16, fontSize: 40, fontWeight: 700, color: '#111417' }}>
            Authorized-user tradelines available now.
          </div>
          <div style={{ marginTop: 10, fontSize: 38, color: '#3f4a42' }}>
            Compare account age, credit limit &amp; reporting date —
          </div>
          <div style={{ marginTop: 8, fontSize: 38, fontWeight: 700, color: '#0A4F29' }}>
            all backed by our guarantee.
          </div>
          {/* site-style pill CTA */}
          <div
            style={{
              marginTop: 28,
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
      </div>
    ),
    { ...size },
  )
}
