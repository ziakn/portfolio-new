import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

// Shared local SQLite opener for the CLI scripts. Mirrors src/data/db.ts.
export function openDb(options = {}) {
  const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');
  const db = new DatabaseSync(dbPath, { enableForeignKeyConstraints: true, ...options });

  // Preserve the small transaction helper used by the content scripts.
  db.transaction = (fn) => (...args) => {
    db.exec('BEGIN');
    try {
      const result = fn(...args);
      db.exec('COMMIT');
      return result;
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
  };

  return db;
}
