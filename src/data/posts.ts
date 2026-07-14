import { getDb } from './db';
import { siteUrl } from './schema';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  img: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string | null;
  keywords: string[];
  canonical: string;
  ogImage: string | null;
  author: string;
}

interface PostRow {
  slug: string;
  title: string;
  publish_date: string;
  category: string;
  excerpt: string;
  content: string;
  img: string;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  keywords: string | null;
  canonical: string | null;
  og_image: string | null;
  author: string;
}

const siteTimeZone = 'Asia/Qatar';

// A post is live once its publish date has arrived in Qatar. Future-dated posts
// are excluded from every read path — index, sitemap, feed, and the post route
// itself (which 404s) — so a scheduled post cannot be reached early by URL.
function getCurrentPublishDate(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: siteTimeZone }).format(new Date());
}

function toPost(row: PostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    date: row.publish_date,
    category: row.category,
    excerpt: row.excerpt,
    content: row.content,
    img: row.img,
    metaTitle: row.meta_title?.trim() || row.title,
    metaDescription: row.meta_description?.trim() || row.excerpt,
    focusKeyword: row.focus_keyword?.trim() || null,
    keywords: row.keywords
      ? row.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
      : [],
    canonical: row.canonical?.trim() || `${siteUrl}/blog/${row.slug}`,
    ogImage: row.og_image?.trim() || null,
    author: row.author,
  };
}

const SELECT = `SELECT slug, title, publish_date, category, excerpt, content, img,
                       meta_title, meta_description, focus_keyword, keywords,
                       canonical, og_image, author
                FROM posts`;

export function getPosts(): BlogPost[] {
  const rows = getDb()
    .prepare(`${SELECT} WHERE publish_date <= ? ORDER BY publish_date DESC`)
    .all(getCurrentPublishDate()) as PostRow[];

  return rows.map(toPost);
}

export function getPost(slug: string): BlogPost | undefined {
  const row = getDb()
    .prepare(`${SELECT} WHERE slug = ? AND publish_date <= ?`)
    .get(slug, getCurrentPublishDate()) as PostRow | undefined;

  return row ? toPost(row) : undefined;
}

// Prefer posts in the same category (better topical internal linking), then
// fill remaining slots with the most recent other live posts.
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const publishDate = getCurrentPublishDate();
  const rows = getDb()
    .prepare(
      `${SELECT} WHERE publish_date <= ? AND slug != ?
       ORDER BY category = (SELECT category FROM posts WHERE slug = ?) DESC,
                publish_date DESC
       LIMIT ?`,
    )
    .all(publishDate, slug, slug, limit) as PostRow[];

  return rows.map(toPost);
}

export function getCategories(): string[] {
  const rows = getDb()
    .prepare('SELECT DISTINCT category FROM posts WHERE publish_date <= ? ORDER BY category')
    .all(getCurrentPublishDate()) as { category: string }[];

  return rows.map((row) => row.category);
}

// Base keywords every blog page should carry, plus category-specific terms.
const baseKeywords = ['Zia Muhammad', 'Software Engineer Qatar', 'Web Development Qatar'];

const categoryKeywords: Record<string, string[]> = {
  Laravel: ['Laravel Developer Qatar', 'Laravel Development Doha', 'PHP Developer Qatar'],
  'Next.js': ['Next.js Developer Qatar', 'React Developer Doha', 'Next.js Development'],
  'Next.js SEO': ['Next.js SEO', 'Technical SEO Qatar', 'Next.js Developer Qatar'],
  'Technical SEO': ['Technical SEO Qatar', 'SEO Consultant Doha', 'Search Engine Optimization Qatar'],
  Performance: ['Web Performance', 'Core Web Vitals', 'Website Speed Optimization Qatar'],
  'API Development': ['REST API Development', 'API Developer Qatar', 'Backend API Doha'],
  'AI Engineering': ['AI Integration Qatar', 'LLM Integration', 'RAG Pipelines'],
  Security: ['Web Application Security', 'Laravel Security', 'Secure Development Qatar'],
  Hosting: ['Web Hosting Qatar', 'Cloud Deployment', 'Server Management Doha'],
  Ecommerce: ['Ecommerce Development Qatar', 'Online Store Doha', 'Ecommerce SEO'],
  Backend: ['Backend Development Qatar', 'Database Optimization', 'Backend Engineer Doha'],
  'Mobile Apps': ['Mobile App Development Qatar', 'React Native Developer', 'Mobile Backend Doha'],
  Localization: ['Bilingual Website Qatar', 'Arabic Website Development', 'RTL Website Doha'],
  Strategy: ['Software Strategy Qatar', 'Technology Consulting Doha', 'CTO Advisory'],
  Startups: ['Startup MVP Qatar', 'MVP Development Doha', 'Startup Tech Stack'],
  'Case Study': ['Software Case Study', 'Qatar Software Project', 'Engineering Portfolio'],
};

// Per-post keywords take precedence; the focus keyword always leads.
export function getPostKeywords(post: BlogPost): string[] {
  const fallback = categoryKeywords[post.category] ?? [`${post.category} Qatar`];
  const terms = post.keywords.length ? post.keywords : fallback;

  return Array.from(
    new Set(
      [post.focusKeyword, ...terms, post.category, ...baseKeywords].filter(
        (keyword): keyword is string => Boolean(keyword),
      ),
    ),
  );
}

export function getPlainText(content: string): string {
  return content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getWordCount(content: string): number {
  const text = getPlainText(content);
  return text ? text.split(' ').length : 0;
}

// Average adult reading speed ~200 wpm; minimum of one minute.
export function getReadingTimeMinutes(content: string): number {
  return Math.max(1, Math.round(getWordCount(content) / 200));
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`));
}
