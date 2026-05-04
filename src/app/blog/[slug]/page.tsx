import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
    openGraph: {
      title: post.title,
      description: post.excerpt,
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

      <section className="about-text" dangerouslySetInnerHTML={{ __html: post.content }} />

      <footer style={{ marginTop: '50px', borderTop: '1px solid var(--jet)', paddingTop: '20px' }}>
        <Link href="/blog" style={{ color: 'var(--orange-yellow-crayola)', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <ion-icon name="arrow-back-outline"></ion-icon>
          <span>Back to Blog</span>
        </Link>
      </footer>
    </article>
  );
}
