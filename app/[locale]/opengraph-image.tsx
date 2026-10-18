import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'yeblanca'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Flat brand card: #0a0a0a ground, wordmark, pink line + mono label. No gradients, no shadows.
export default async function OpengraphImage() {
  const [grotesk, mono] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/SpaceGrotesk-Bold.woff')),
    readFile(join(process.cwd(), 'assets/fonts/SpaceMono-Regular.woff')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#0a0a0a',
          color: '#f0f0f0',
        }}
      >
        <div
          style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: 184,
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          yeblanca
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 48 }}>
          <div style={{ width: 48, height: 2, background: '#FF3E7F', marginRight: 20 }} />
          <div
            style={{
              fontFamily: 'Space Mono',
              fontSize: 28,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(240, 240, 240, 0.55)',
            }}
          >
            [ DEV ]
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Space Grotesk', data: grotesk, weight: 700, style: 'normal' },
        { name: 'Space Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  )
}
