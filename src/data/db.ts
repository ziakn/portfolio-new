import Database from 'libsql';
import path from 'node:path';

// The blog + admin database is WRITABLE at runtime: the admin panel edits
// posts, projects, and site content, and the contact form appends
// submissions.
//
// The site always reads the committed SQLite database directly. The libsql
// package is used only as the local SQLite driver; no network database is used.
const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');

let db: Database.Database | undefined;

function validateDatabase(candidate: Database.Database): void {
  // Fail during connection setup rather than on the first page query. This
  // verifies the complete public-post shape used by the blog routes.
  candidate
    .prepare(`SELECT slug, title, publish_date, category, excerpt, content, img,
                     meta_title, meta_description, focus_keyword, keywords,
                     canonical, og_image, author
              FROM posts
              LIMIT 1`)
    .get();
}

function openBundledDatabase(): Database.Database {
  // Vercel's deployed filesystem is read-only. The committed database is a
  // content snapshot, so public pages can safely query it without WAL or DDL.
  if (process.env.VERCEL) {
    const candidate = new Database(dbPath, { readonly: true, fileMustExist: true });
    validateDatabase(candidate);
    return candidate;
  }

  const candidate = new Database(dbPath, { fileMustExist: true });
  candidate.pragma('journal_mode = WAL');
  candidate.pragma('foreign_keys = ON');
  candidate.exec(APP_SCHEMA);
  validateDatabase(candidate);
  return candidate;
}

// Tables the admin panel owns. `posts` already exists (created by
// scripts/blog-db.mjs); these are additive and safe to (re)run on every boot.
const APP_SCHEMA = `
CREATE TABLE IF NOT EXISTS admin_users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,          -- scrypt: "<saltHex>:<hashHex>"
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token       TEXT PRIMARY KEY,          -- random 256-bit hex
  user_id     INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at  TEXT NOT NULL              -- ISO8601 UTC
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions (user_id);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  ip          TEXT,
  user_agent  TEXT,
  is_read     INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions (created_at DESC);

CREATE TABLE IF NOT EXISTS projects (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,
  href        TEXT,
  img         TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects (sort_order);

CREATE TABLE IF NOT EXISTS site_content (
  key        TEXT PRIMARY KEY,           -- e.g. "home.about", "resume.intro"
  value      TEXT NOT NULL,              -- JSON blob
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

export function getDb(): Database.Database {
  if (!db) {
    db = openBundledDatabase();
  }

  return db;
}
