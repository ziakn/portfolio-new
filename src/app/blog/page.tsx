import type { Metadata } from 'next';
import Script from 'next/script';
import { getPosts } from '@/data/posts';
import SiteAnalytics from '@/components/SiteAnalytics';
import BlogPostList from '@/components/BlogPostList';

// The article list loads static monthly JSON indexes in the browser, so a
// scheduled post appears at Qatar midnight without a server database query.
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Qatar Software Engineering Blog',
  description:
    'Read practical articles on Laravel, Next.js, SEO, AI integrations, APIs, and digital platforms for Qatar businesses by Zia Muhammad.',
  alternates: { canonical: 'https://ziamuhammad.com/blog' },
  openGraph: {
    title: 'Qatar Software Engineering Blog | Zia Muhammad',
    description:
      'Technical guides for Qatar businesses covering software engineering, SEO, Laravel, Next.js, AI, and web performance.',
    url: 'https://ziamuhammad.com/blog',
  },
};

export default function BlogPage() {
  const posts = getPosts().slice(0, 50);

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Qatar Software Engineering Blog',
    description:
      'Practical articles on Laravel, Next.js, SEO, AI integrations, APIs, and digital platforms for Qatar businesses by Zia Muhammad.',
    url: 'https://ziamuhammad.com/blog',
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: 'Zia Muhammad',
      url: 'https://ziamuhammad.com',
    },
    blogPost: posts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://ziamuhammad.com/blog/${post.slug}`,
      datePublished: post.date,
      image: `https://ziamuhammad.com${post.img}`,
      articleSection: post.category,
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.slice(0, 50).map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://ziamuhammad.com/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <article className="blog active">
      <SiteAnalytics />
      <Script
        id="blog-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c') }}
      />
      <Script
        id="blog-itemlist-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd).replace(/</g, '\\u003c') }}
      />
      <header>
        <h1 className="h1 article-title">Blog</h1>
      </header>

      <section className="about-text blog-intro">
        <p>
          Original notes from my work on Laravel, Next.js, APIs, AI workflows, payment integrations,
          and high-traffic publishing platforms in Qatar. I keep this section focused on practical
          engineering lessons instead of daily keyword posts.
        </p>
      </section>

      <section className="blog-posts">
        <BlogPostList />
      </section>
    </article>
  );
}
