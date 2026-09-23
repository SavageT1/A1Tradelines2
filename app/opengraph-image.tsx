import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'A1 Tradelines — buy seasoned authorized-user tradelines'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f7f5ee',
          padding: '80px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 600, color: '#16351f' }}>
          A1 <span style={{ color: '#1f5133', marginLeft: 10 }}>Tradelines</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: '#16351f', lineHeight: 1.02, letterSpacing: -3 }}>
            Buy tradelines
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, color: '#1f5133', lineHeight: 1.02, letterSpacing: -3 }}>
            with confidence.
          </div>
          <div style={{ fontSize: 30, color: '#4b5a4f', marginTop: 28 }}>
            Compare age, limit, and bureau reporting. Backed by our posting guarantee.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#4b5a4f' }}>www.a1tradelines.com</div>
      </div>
    ),
    { ...size },
  )
}
