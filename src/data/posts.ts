import posts from '../../data/blog-posts.json';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  img: string;
}

const siteTimeZone = 'Asia/Qatar';
const allPosts = posts as BlogPost[];

function getCurrentPublishDate(): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: siteTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

export function getPosts(): BlogPost[] {
  const publishDate = getCurrentPublishDate();

  return allPosts.filter((post) => post.date <= publishDate);
}

export function getPost(slug: string): BlogPost | undefined {
  const publishDate = getCurrentPublishDate();

  return allPosts.find((post) => post.slug === slug && post.date <= publishDate);
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const publishDate = getCurrentPublishDate();

  return allPosts.filter((post) => post.slug !== slug && post.date <= publishDate).slice(0, limit);
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`));
}
