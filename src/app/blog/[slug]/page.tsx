import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://ziamuhammad.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://ziamuhammad.com/blog/${slug}`,
      images: [{ url: post.img }],
    },
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  // Get related posts (exclude current)
  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="blog-post active">
      <header>
        <h1 className="h1 article-title">{post.title}</h1>
        <div className="blog-meta" style={{ marginBottom: '20px' }}>
          <p className="blog-category">{post.category}</p>
          <span className="dot"></span>
          <time dateTime={post.date}>{post.date}</time>
        </div>
      </header>

      <figure className="blog-banner-box" style={{ height: 'auto', marginBottom: '30px' }}>
        <Image 
          src={post.img} 
          alt={post.title} 
          width={800} 
          height={450} 
          priority 
          style={{ width: '100%', borderRadius: '16px' }} 
        />
      </figure>

      <section className="about-text">
        <Script id="breadcrumb-json-ld" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://ziamuhammad.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Blog",
                  "item": "https://ziamuhammad.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "${post.title}",
                  "item": "https://ziamuhammad.com/blog/${post.slug}"
                }
              ]
            }
          `}
        </Script>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>

      <footer style={{ marginTop: '50px', borderTop: '1px solid var(--jet)', paddingTop: '20px' }}>
        <Link href="/blog" style={{ color: 'var(--orange-yellow-crayola)', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <ion-icon name="arrow-back-outline"></ion-icon>
          <span>Back to Blog</span>
        </Link>

        {relatedPosts.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3 className="h3" style={{ marginBottom: '20px' }}>Related Articles</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <Link 
                    href={`/blog/${related.slug}`}
                    style={{ 
                      display: 'flex', 
                      gap: '15px', 
                      alignItems: 'center', 
                      padding: '15px', 
                      background: 'var(--border-gradient-onyx)',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'var(--white-2)',
                    }}
                  >
                    <Image 
                      src={related.img} 
                      alt={related.title} 
                      width={120} 
                      height={80} 
                      style={{ borderRadius: '8px', objectFit: 'cover' }} 
                    />
                    <div>
                      <h4 style={{ fontSize: 'var(--fs-5)', marginBottom: '5px', color: 'var(--orange-yellow-crayola)' }}>
                        {related.title}
                      </h4>
                      <time style={{ fontSize: 'var(--fs-7)', color: 'var(--light-gray-70)' }}>{related.date}</time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </footer>
    </article>
  );
}
