import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/data/posts';

export const metadata: Metadata = {
  title: 'Blog – Tech Insights & Software Engineering Articles',
  description: 'Read the latest articles on Laravel, Next.js, AI integrations, and software engineering by Zia Muhammad.',
  alternates: { canonical: 'https://ziamuhammad.com/blog' },
};

export default function BlogPage() {
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
                    <time dateTime="2026-04-20">{post.date}</time>
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
