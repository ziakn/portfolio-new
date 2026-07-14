#!/usr/bin/env node
//
// Blog database CLI.
//
//   npm run blog init            create data/posts.sqlite with the schema
//   npm run blog seed <file>     import posts from a JSON array
//   npm run blog list            show every post with its publish date + status
//   npm run blog add <file>      insert/update a single post from a JSON file
//
// After changing the database, commit data/posts.sqlite. Posts dated in the
// future stay hidden until their publish date arrives (see src/data/posts.ts).

import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');
const [command, arg] = process.argv.slice(2);

const SCHEMA = `
CREATE TABLE IF NOT EXISTS posts (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  slug             TEXT NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  publish_date     TEXT NOT NULL,              -- YYYY-MM-DD, Asia/Qatar
  category         TEXT NOT NULL,
  excerpt          TEXT NOT NULL,
  content          TEXT NOT NULL,
  img              TEXT NOT NULL,

  -- SEO fields
  meta_title       TEXT,                       -- falls back to title
  meta_description TEXT,                       -- falls back to excerpt; aim 110-155 chars
  focus_keyword    TEXT,                       -- the one phrase this post targets
  keywords         TEXT,                       -- comma-separated supporting terms
  canonical        TEXT,                       -- absolute URL; defaults to the post URL
  og_image         TEXT,                       -- defaults to the generated 1200x630 card
  author           TEXT NOT NULL DEFAULT 'Zia Muhammad',

  created_at       TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_posts_publish_date ON posts (publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts (category);
`;

function openDb({ create = false } = {}) {
  if (!create && !fs.existsSync(dbPath)) {
    console.error(`No database at ${dbPath}. Run: npm run blog init`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  return new Database(dbPath);
}

function upsert(db, post) {
  const required = ['slug', 'title', 'publish_date', 'category', 'excerpt', 'content', 'img'];
  const missing = required.filter((field) => !post[field]);
  if (missing.length) {
    throw new Error(`Post "${post.slug ?? '(no slug)'}" is missing: ${missing.join(', ')}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.publish_date)) {
    throw new Error(`Post "${post.slug}" has an invalid publish_date (want YYYY-MM-DD)`);
  }

  db.prepare(
    `INSERT INTO posts (slug, title, publish_date, category, excerpt, content, img,
                        meta_title, meta_description, focus_keyword, keywords,
                        canonical, og_image, author, updated_at)
     VALUES (@slug, @title, @publish_date, @category, @excerpt, @content, @img,
             @meta_title, @meta_description, @focus_keyword, @keywords,
             @canonical, @og_image, @author, datetime('now'))
     ON CONFLICT(slug) DO UPDATE SET
       title=excluded.title, publish_date=excluded.publish_date,
       category=excluded.category, excerpt=excluded.excerpt,
       content=excluded.content, img=excluded.img,
       meta_title=excluded.meta_title, meta_description=excluded.meta_description,
       focus_keyword=excluded.focus_keyword, keywords=excluded.keywords,
       canonical=excluded.canonical, og_image=excluded.og_image,
       author=excluded.author, updated_at=datetime('now')`,
  ).run({
    meta_title: null,
    meta_description: null,
    focus_keyword: null,
    keywords: null,
    canonical: null,
    og_image: null,
    author: 'Zia Muhammad',
    ...post,
  });
}

function today() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Qatar' }).format(new Date());
}

switch (command) {
  case 'init': {
    const db = openDb({ create: true });
    db.exec(SCHEMA);
    console.log(`Schema ready at ${dbPath}`);
    break;
  }

  case 'seed':
  case 'add': {
    if (!arg) {
      console.error(`Usage: npm run blog ${command} <file.json>`);
      process.exit(1);
    }
    const db = openDb({ create: true });
    db.exec(SCHEMA);
    const raw = JSON.parse(fs.readFileSync(arg, 'utf8'));
    const posts = Array.isArray(raw) ? raw : [raw];
    const run = db.transaction((rows) => rows.forEach((row) => upsert(db, row)));
    run(posts);
    console.log(`Wrote ${posts.length} post(s) to ${dbPath}`);
    break;
  }

  case 'list': {
    const db = openDb();
    const now = today();
    const rows = db
      .prepare('SELECT slug, title, publish_date, category FROM posts ORDER BY publish_date DESC')
      .all();
    console.log(`Today in Asia/Qatar: ${now}\n`);
    for (const row of rows) {
      const status = row.publish_date <= now ? 'LIVE     ' : 'SCHEDULED';
      console.log(`${status} ${row.publish_date}  ${row.title}`);
    }
    const live = rows.filter((row) => row.publish_date <= now).length;
    console.log(`\n${live} live, ${rows.length - live} scheduled, ${rows.length} total`);
    break;
  }

  default:
    console.log(`Usage:
  npm run blog init          create the database
  npm run blog seed <file>   import a JSON array of posts
  npm run blog add <file>    insert or update one post from JSON
  npm run blog list          show live vs scheduled posts`);
}
