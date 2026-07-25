import Database from 'libsql';
import path from 'node:path';

// The blog + admin database is WRITABLE at runtime: the admin panel edits
// posts, projects, and site content, and the contact form appends
// submissions.
//
// `libsql` is a drop-in, better-sqlite3-compatible driver that also speaks to
// a hosted Turso/libSQL database over the network. Storage is chosen from the
// environment:
//   • TURSO_DATABASE_URL set  → remote libSQL (Turso). This is how production
//     runs on Vercel, whose filesystem is read-only and non-persistent, so a
//     local SQLite file could never persist writes there. Turso is still
//     plain SQLite, just hosted, so nothing else in the app changes.
//   • unset                   → the on-disk data/posts.sqlite file, used for
//     local development (and any persistent-filesystem host).
const remoteUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
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
    if (remoteUrl) {
      // Remote libSQL (Turso). `authToken` is a valid runtime option that the
      // bundled better-sqlite3 typings just don't declare, hence the cast.
      db = new Database(remoteUrl, { authToken } as unknown as Database.Options);
    } else {
      db = new Database(dbPath, { fileMustExist: true });
      // WAL lets readers (public pages) and the occasional admin writer coexist
      // without blocking each other. Local-file mode only — the pragmas are a
      // no-op / unsupported against a remote database.
      db.pragma('journal_mode = WAL');
      db.pragma('foreign_keys = ON');
    }
    // Additive `CREATE TABLE IF NOT EXISTS` — idempotent and safe on every boot
    // against either backend.
    db.exec(APP_SCHEMA);
  }

  return db;
}
