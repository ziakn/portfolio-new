import Database from 'better-sqlite3';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  img: string;
}

const dbPath = path.join(process.cwd(), 'data', 'blog.sqlite');
const siteTimeZone = 'Asia/Qatar';

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

function getDb() {
  return new Database(dbPath, { readonly: true, fileMustExist: true });
}

export function getPosts(): BlogPost[] {
  const db = getDb();

  try {
    return db
      .prepare(
        'SELECT slug, title, date, category, excerpt, content, img FROM posts WHERE date <= ? ORDER BY date DESC, id DESC',
      )
      .all(getCurrentPublishDate()) as BlogPost[];
  } finally {
    db.close();
  }
}

export function getPost(slug: string): BlogPost | undefined {
  const db = getDb();

  try {
    return db
      .prepare('SELECT slug, title, date, category, excerpt, content, img FROM posts WHERE slug = ? AND date <= ?')
      .get(slug, getCurrentPublishDate()) as BlogPost | undefined;
  } finally {
    db.close();
  }
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const db = getDb();

  try {
    return db
      .prepare(
        'SELECT slug, title, date, category, excerpt, content, img FROM posts WHERE slug != ? AND date <= ? ORDER BY date DESC, id DESC LIMIT ?',
      )
      .all(slug, getCurrentPublishDate(), limit) as BlogPost[];
  } finally {
    db.close();
  }
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`));
}
