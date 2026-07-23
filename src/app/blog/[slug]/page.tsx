import {
  formatPostDate,
  getPost,
  getPosts,
  getRelatedPosts,
  getPostKeywords,
  getWordCount,
  getReadingTimeMinutes,
} from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { breadcrumbGraph, ids, jsonLd, siteUrl } from '@/data/schema';
import SiteAnalytics from '@/components/SiteAnalytics';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  // Unknown or not-yet-published slug: return a 404-appropriate, non-indexable
  // head so search engines drop the URL instead of indexing an error page.
  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: getPostKeywords(post),
    authors: [{ name: post.author, url: siteUrl }],
    category: post.category,
    alternates: {
      canonical: post.canonical,
    },
    openGraph: {
      type: 'article',
      title: post.metaTitle,
      description: post.metaDescription,
      url: post.canonical,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      tags: getPostKeywords(post),
      ...(post.ogImage ? { images: [{ url: post.ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      ...(post.ogImage ? { images: [post.ogImage] } : {}),
    },
  };
}

export async function generateStaticParams() {
  // Only pre-render LIVE posts. Scheduled (future-dated) posts must NOT be
  // materialized here — the page body 404s them until their publish date, so
  // pre-building them just produces cached "Post Not Found" pages. They are
  // generated on demand (dynamicParams defaults to true) once they go live.
  const posts = getPosts(false);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);
  const wordCount = getWordCount(post.content);
  const readingTime = getReadingTimeMinutes(post.content);
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // The WebPage and BlogPosting for this post, linked by @id into the site-wide
  // graph declared in the root layout (Person, WebSite, logo).
  const postGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${postUrl}#webpage`,
        url: postUrl,
        name: post.title,
        description: post.excerpt,
        isPartOf: { '@id': ids.website },
        inLanguage: 'en',
        breadcrumb: { '@id': `${postUrl}#breadcrumb` },
      },
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: `${siteUrl}${post.img}`,
        url: postUrl,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'en',
        isAccessibleForFree: true,
        articleSection: post.category,
        keywords: getPostKeywords(post).join(', '),
        wordCount: wordCount || undefined,
        timeRequired: `PT${readingTime}M`,
        author: { '@id': ids.person },
        publisher: { '@id': ids.person },
        isPartOf: { '@id': `${postUrl}#webpage` },
        mainEntityOfPage: { '@id': `${postUrl}#webpage` },
      },
      {
        ...breadcrumbGraph([
          { name: 'Home', path: '' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
        '@context': undefined,
        '@id': `${postUrl}#breadcrumb`,
      },
    ],
  };

  return (
    <article className="blog-post active">
      <SiteAnalytics />
      <header>
        <nav className="breadcrumbs" style={{ display: 'flex', gap: '8px', fontSize: 'var(--fs-6)', color: 'var(--light-gray-70)', marginBottom: '15px' }}>
          <Link href="/" style={{ color: 'var(--light-gray-70)', textDecoration: 'none' }}>Home</Link>
          <span>&gt;</span>
          <Link href="/blog" style={{ color: 'var(--light-gray-70)', textDecoration: 'none' }}>Blog</Link>
          <span>&gt;</span>
          <span style={{ color: 'var(--orange-yellow-crayola)' }}>{post.title}</span>
        </nav>
        <h1 className="h1 article-title">{post.title}</h1>
        <div className="blog-meta" style={{ marginBottom: '20px' }}>
          <p className="blog-category">{post.category}</p>
          <span className="dot"></span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className="dot"></span>
          <span>{readingTime} min read</span>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(postGraph) }}
        />
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
                      <time
                        dateTime={related.date}
                        style={{ fontSize: 'var(--fs-7)', color: 'var(--light-gray-70)' }}
                      >
                        {formatPostDate(related.date)}
                      </time>
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
