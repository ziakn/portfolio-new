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

export function getPosts(includeFuture = false): BlogPost[] {
  const query = includeFuture
    ? `${SELECT} ORDER BY publish_date DESC`
    : `${SELECT} WHERE publish_date <= ? ORDER BY publish_date DESC`;
  const params = includeFuture ? [] : [getCurrentPublishDate()];
  const rows = getDb().prepare(query).all(...params) as PostRow[];

  return rows.map(toPost);
}

export function getPost(slug: string, includeFuture = false): BlogPost | undefined {
  const query = includeFuture
    ? `${SELECT} WHERE slug = ?`
    : `${SELECT} WHERE slug = ? AND publish_date <= ?`;
  const params = includeFuture ? [slug] : [slug, getCurrentPublishDate()];
  const row = getDb().prepare(query).get(...params) as PostRow | undefined;

  return row ? toPost(row) : undefined;
}

// Prefer posts in the same category (better topical internal linking), then
// fill remaining slots with the most recent other live posts.
export function getRelatedPosts(slug: string, limit = 3, includeFuture = false): BlogPost[] {
  const query = includeFuture
    ? `${SELECT} WHERE slug != ?
       ORDER BY category = (SELECT category FROM posts WHERE slug = ?) DESC,
                publish_date DESC
       LIMIT ?`
    : `${SELECT} WHERE publish_date <= ? AND slug != ?
       ORDER BY category = (SELECT category FROM posts WHERE slug = ?) DESC,
                publish_date DESC
       LIMIT ?`;
  const params = includeFuture
    ? [slug, slug, limit]
    : [getCurrentPublishDate(), slug, slug, limit];
  const rows = getDb().prepare(query).all(...params) as PostRow[];

  return rows.map(toPost);
}

export function getCategories(includeFuture = false): string[] {
  const query = includeFuture
    ? 'SELECT DISTINCT category FROM posts ORDER BY category'
    : 'SELECT DISTINCT category FROM posts WHERE publish_date <= ? ORDER BY category';
  const params = includeFuture ? [] : [getCurrentPublishDate()];
  const rows = getDb().prepare(query).all(...params) as { category: string }[];

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

// ─── Admin CRUD ──────────────────────────────────────────────────────────────
// The public helpers above hide future-dated posts; the admin functions below
// see everything (live + scheduled) and can write.

export interface AdminPostRow {
  id: number;
  slug: string;
  title: string;
  publish_date: string;
  category: string;
  isLive: boolean;
}

export interface PostInput {
  slug: string;
  title: string;
  publish_date: string;
  category: string;
  excerpt: string;
  content: string;
  img: string;
  meta_title?: string | null;
  meta_description?: string | null;
  focus_keyword?: string | null;
  keywords?: string | null;
  canonical?: string | null;
  og_image?: string | null;
  author?: string | null;
}

export interface PostStats {
  total: number;
  live: number;
  scheduled: number;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function getPostStats(): PostStats {
  const now = getCurrentPublishDate();
  const row = getDb()
    .prepare(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN publish_date <= ? THEN 1 ELSE 0 END) AS live
       FROM posts`,
    )
    .get(now) as { total: number; live: number | null };
  const live = row.live ?? 0;
  return { total: row.total, live, scheduled: row.total - live };
}

export interface AdminPostPage {
  rows: AdminPostRow[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export function listPostsAdmin(search = '', page = 1, perPage = 25): AdminPostPage {
  const now = getCurrentPublishDate();
  const term = search.trim();
  const where = term ? 'WHERE title LIKE ? OR slug LIKE ? OR category LIKE ?' : '';
  const likeParams = term ? [`%${term}%`, `%${term}%`, `%${term}%`] : [];

  const totalRow = getDb()
    .prepare(`SELECT COUNT(*) AS c FROM posts ${where}`)
    .get(...likeParams) as { c: number };
  const total = totalRow.c;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const offset = (safePage - 1) * perPage;

  const rows = getDb()
    .prepare(
      `SELECT id, slug, title, publish_date, category
       FROM posts ${where}
       ORDER BY publish_date DESC
       LIMIT ? OFFSET ?`,
    )
    .all(...likeParams, perPage, offset) as Omit<AdminPostRow, 'isLive'>[];

  return {
    rows: rows.map((row) => ({ ...row, isLive: row.publish_date <= now })),
    total,
    page: safePage,
    perPage,
    totalPages,
  };
}

const FULL_SELECT = `SELECT id, slug, title, publish_date, category, excerpt, content, img,
                            meta_title, meta_description, focus_keyword, keywords,
                            canonical, og_image, author
                     FROM posts`;

export function getPostById(id: number): (PostRow & { id: number }) | undefined {
  return getDb().prepare(`${FULL_SELECT} WHERE id = ?`).get(id) as
    | (PostRow & { id: number })
    | undefined;
}

export function slugExists(slug: string, exceptId?: number): boolean {
  const row = exceptId
    ? getDb().prepare('SELECT id FROM posts WHERE slug = ? AND id != ?').get(slug, exceptId)
    : getDb().prepare('SELECT id FROM posts WHERE slug = ?').get(slug);
  return Boolean(row);
}

function normalizeInput(input: PostInput) {
  return {
    slug: input.slug,
    title: input.title,
    publish_date: input.publish_date,
    category: input.category,
    excerpt: input.excerpt,
    content: input.content,
    img: input.img,
    meta_title: input.meta_title?.trim() || null,
    meta_description: input.meta_description?.trim() || null,
    focus_keyword: input.focus_keyword?.trim() || null,
    keywords: input.keywords?.trim() || null,
    canonical: input.canonical?.trim() || null,
    og_image: input.og_image?.trim() || null,
    author: input.author?.trim() || 'Zia Muhammad',
  };
}

export function createPost(input: PostInput): number {
  const info = getDb()
    .prepare(
      `INSERT INTO posts (slug, title, publish_date, category, excerpt, content, img,
                          meta_title, meta_description, focus_keyword, keywords,
                          canonical, og_image, author)
       VALUES (@slug, @title, @publish_date, @category, @excerpt, @content, @img,
               @meta_title, @meta_description, @focus_keyword, @keywords,
               @canonical, @og_image, @author)`,
    )
    .run(normalizeInput(input));
  return Number(info.lastInsertRowid);
}

export function updatePost(id: number, input: PostInput): void {
  getDb()
    .prepare(
      `UPDATE posts SET
         slug=@slug, title=@title, publish_date=@publish_date, category=@category,
         excerpt=@excerpt, content=@content, img=@img,
         meta_title=@meta_title, meta_description=@meta_description,
         focus_keyword=@focus_keyword, keywords=@keywords,
         canonical=@canonical, og_image=@og_image, author=@author,
         updated_at=datetime('now')
       WHERE id=@id`,
    )
    .run({ ...normalizeInput(input), id });
}

export function deletePost(id: number): string | undefined {
  const row = getDb().prepare('SELECT slug FROM posts WHERE id = ?').get(id) as
    | { slug: string }
    | undefined;
  getDb().prepare('DELETE FROM posts WHERE id = ?').run(id);
  return row?.slug;
}

export { getCurrentPublishDate };
