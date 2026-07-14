import { ImageResponse } from 'next/og';
import { getPost, getPosts, formatPostDate } from '@/data/posts';

export const alt = 'Blog post by Zia Muhammad';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 80px',
          background: 'linear-gradient(135deg, hsl(240, 2%, 13%) 0%, hsl(0, 0%, 7%) 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: 'hsl(45, 100%, 72%)',
          }}
        >
          {post?.category ?? 'Article'}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 1.2,
            color: 'hsl(0, 0%, 98%)',
          }}
        >
          {post?.title ?? 'Zia Muhammad'}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 32, color: 'hsl(0, 0%, 98%)' }}>
              Zia Muhammad
            </div>
            <div style={{ display: 'flex', marginTop: 8, fontSize: 26, color: 'hsl(0, 0%, 84%)' }}>
              Full Stack Software Engineer · Doha, Qatar
            </div>
          </div>
          {post ? (
            <div style={{ display: 'flex', fontSize: 26, color: 'hsl(0, 0%, 84%)' }}>
              {formatPostDate(post.date)}
            </div>
          ) : null}
        </div>
      </div>
    ),
    size,
  );
}
