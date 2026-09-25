'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface PostListing {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  img: string;
}

function qatarDate(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Qatar',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function monthPaths(today: string): string[] {
  const [year, month] = today.split('-').map(Number);
  const cursor = new Date(Date.UTC(year, month - 1, 1));
  const paths: string[] = [];

  // Twelve monthly indexes are enough to find the 50 newest posts while
  // keeping the initial browser payload small.
  for (let index = 0; index < 12; index += 1) {
    const currentYear = cursor.getUTCFullYear();
    const currentMonth = String(cursor.getUTCMonth() + 1).padStart(2, '0');
    paths.push(`/posts/${currentYear}/${currentMonth}/index.json`);
    cursor.setUTCMonth(cursor.getUTCMonth() - 1);
  }
  return paths;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export default function BlogPostList() {
  const [posts, setPosts] = useState<PostListing[]>([]);

  useEffect(() => {
    const today = qatarDate();
    const cacheKey = `zia-blog-list:${today}`;

    try {
      const cached = window.sessionStorage.getItem(cacheKey);
      if (cached) {
        setPosts(JSON.parse(cached) as PostListing[]);
        return;
      }
    } catch {
      // Storage can be unavailable in privacy-restricted browsers. The
      // network path below remains the source of truth.
    }

    void Promise.all(
      monthPaths(today).map(async (url) => {
        const response = await fetch(url, { cache: 'force-cache' });
        return response.ok ? (response.json() as Promise<PostListing[]>) : [];
      }),
    ).then((months) => {
      const nextPosts =
        months
          .flat()
          .filter((post) => post.date <= today)
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 50);
      setPosts(nextPosts);
      try {
        window.sessionStorage.setItem(cacheKey, JSON.stringify(nextPosts));
      } catch {
        // The list still renders when session storage is full or unavailable.
      }
    });
  }, []);

  if (!posts.length) return <p className="blog-text">Loading articles…</p>;

  return (
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
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h3 className="h3 blog-item-title">{post.title}</h3>
              <p className="blog-text">{post.excerpt}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
