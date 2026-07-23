import Database from 'better-sqlite3';
import path from 'node:path';

// The blog + admin database lives in the deployment and is now WRITABLE at
// runtime: the admin panel edits posts, projects, and site content, and the
// contact form appends submissions. This requires a persistent Node server
// (the site is served by a long-lived `next start` process behind Apache) so
// that file writes actually persist between requests. On a purely serverless
// host the filesystem is read-only and these writes would not survive — see
// the admin panel notes in the README.
const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');

let db: Database.Database | undefined;

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
    db = new Database(dbPath, { fileMustExist: true });
    // WAL lets readers (public pages) and the occasional admin writer coexist
    // without blocking each other.
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.exec(APP_SCHEMA);
  }

  return db;
}
