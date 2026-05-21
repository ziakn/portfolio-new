import type { MetadataRoute } from 'next';
import { getPosts } from '@/data/posts';

export const revalidate = 0;

const baseUrl = 'https://ziamuhammad.com';
const siteLastModified = new Date('2026-05-17T00:00:00.000Z');

const portfolioImages = [
  '/images/al-sharq.webp',
  '/images/peninsula.webp',
  '/images/alarab.webp',
  '/images/lusail.webp',
  '/images/qatarpressc.webp',
  '/images/daralsharq.webp',
  '/images/alsharqtech.webp',
  '/images/topsolutionsqatar.webp',
  '/images/solostore.webp',
  '/images/tiollo.webp',
];

function absoluteUrl(path: string) {
  return new URL(path, baseUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();

  return [
    {
      url: baseUrl,
      lastModified: siteLastModified,
      changeFrequency: 'daily',
      priority: 1,
      images: [absoluteUrl('/images/Profile-W.webp')],
    },
    {
      url: absoluteUrl('/resume'),
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/portfolio'),
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: portfolioImages.map(absoluteUrl),
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: posts[0]?.date
        ? new Date(`${posts[0].date}T00:00:00.000Z`)
        : siteLastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/privacy-policy'),
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: absoluteUrl('/terms-and-conditions'),
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: absoluteUrl('/disclaimer'),
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(`${post.date}T00:00:00.000Z`),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
      images: [absoluteUrl(post.img)],
    })),
  ];
}
