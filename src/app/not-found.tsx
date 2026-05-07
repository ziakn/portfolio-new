import Link from 'next/link';

export default function NotFound() {
  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">Page Not Found</h2>
      </header>
      <section className="about-text">
        <p style={{ marginBottom: '20px' }}>
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/" style={{ color: 'var(--orange-yellow-crayola)' }}>
            ← Back to Home
          </Link>
          <Link href="/portfolio" style={{ color: 'var(--orange-yellow-crayola)' }}>
            View My Portfolio
          </Link>
          <Link href="/blog" style={{ color: 'var(--orange-yellow-crayola)' }}>
            Read the Blog
          </Link>
        </div>
      </section>
    </article>
  );
}
