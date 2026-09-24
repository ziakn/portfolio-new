import Database from 'libsql';
import path from 'node:path';

// Shared local SQLite opener for the CLI scripts. Mirrors src/data/db.ts.
export function openDb(options = {}) {
  const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');
  return new Database(dbPath, options);
}
