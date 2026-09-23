import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'A1 Tradelines — buy seasoned authorized-user tradelines'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Official A1 monogram (near-black "A" + forest-green "1"), knocked out to white
// for use on the dark brand background.
const MONOGRAM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314 240"><path fill="#ffffff" d="M144 0 L0 240 L122 240 L151 189 L90 189 L143 100 L215 240 L276 240 Z"/><path fill="#ffffff" d="M269 0 L314 0 L314 240 L292 240 L261 189 L261 63 L220 90 L195 55 Z"/></svg>`
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
          background: '#111417',
          position: 'relative',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* soft forest-green glow, top right */}
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: 'rgba(10, 79, 41, 0.5)',
          }}
        />
        {/* soft forest-green glow, bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: -300,
            left: -180,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: 'rgba(10, 79, 41, 0.35)',
          }}
        />
        <img src={MONOGRAM_SRC} width={250} height={191} alt="" />
        <div
          style={{
            marginTop: 28,
            fontSize: 76,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: -2,
          }}
        >
          A1 Tradelines
        </div>
        <div style={{ marginTop: 18, fontSize: 34, color: '#93a89b' }}>
          Compare age, limit &amp; bureau reporting.
        </div>
        <div style={{ marginTop: 10, fontSize: 34, fontWeight: 700, color: '#ffffff' }}>
          Backed by our posting guarantee.
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 44,
            fontSize: 26,
            color: '#3d8b5f',
            letterSpacing: 1,
          }}
        >
          Free expert consultation · a1tradelines.com
        </div>
      </div>
    ),
    { ...size },
  )
}
