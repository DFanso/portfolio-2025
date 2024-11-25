import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          background: 'linear-gradient(45deg, #47FFB2, #47D1FF)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          color: '#1A1A1A',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        LF
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
