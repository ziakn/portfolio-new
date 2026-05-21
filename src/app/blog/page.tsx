import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { formatPostDate, getPosts } from '@/data/posts';

export const revalidate = 0;

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
  const posts = getPosts();

  return (
    <article className="blog active">
      <header>
        <h1 className="h1 article-title">Blog</h1>
      </header>

      <section className="blog-posts">
        <ul className="blog-posts-list">
          {posts.map((post) => (
            <li className="blog-post-item" key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <figure className="blog-banner-box">
                  <Image src={post.img} alt={post.title} width={400} height={250} loading="lazy" />
                </figure>
                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{post.category}</p>
                    <span className="dot"></span>
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  </div>
                  <h3 className="h3 blog-item-title">{post.title}</h3>
                  <p className="blog-text">{post.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
