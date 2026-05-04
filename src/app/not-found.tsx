import Link from 'next/link';

export default function NotFound() {
  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">Page Not Found</h2>
      </header>
      <section className="about-text">
        <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
        <p>
          <Link href="/" style={{ color: 'hsl(45, 100%, 72%)' }}>
            ← Go back to Home
          </Link>
        </p>
      </section>
    </article>
  );
}
