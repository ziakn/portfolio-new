import { ImageResponse } from 'next/og';

export const alt = 'Zia Muhammad – Full Stack Software Engineer in Doha, Qatar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, hsl(240, 2%, 13%) 0%, hsl(0, 0%, 7%) 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'hsl(45, 100%, 72%)',
          }}
        >
          Doha, Qatar
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 76,
            fontWeight: 600,
            color: 'hsl(0, 0%, 98%)',
          }}
        >
          Zia Muhammad
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 16,
            fontSize: 42,
            color: 'hsl(0, 0%, 84%)',
          }}
        >
          Full Stack Software Engineer
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 30,
            color: 'hsl(0, 0%, 84%)',
          }}
        >
          Laravel · React · Next.js · APIs · AI Integration
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            width: 160,
            height: 6,
            background: 'hsl(45, 100%, 72%)',
          }}
        />
      </div>
    ),
    size,
  );
}
