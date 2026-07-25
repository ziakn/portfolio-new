import Database from 'libsql';
import path from 'node:path';

// Shared DB opener for the CLI scripts. Mirrors src/data/db.ts:
//   • TURSO_DATABASE_URL set → remote Turso/libSQL (so `npm run admin:create`
//     and friends operate on the same database production uses).
//   • unset                  → the local data/posts.sqlite file.
export function openDb(options = {}) {
  const remoteUrl = process.env.TURSO_DATABASE_URL;
  if (remoteUrl) {
    return new Database(remoteUrl, { authToken: process.env.TURSO_AUTH_TOKEN, ...options });
  }
  const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');
  return new Database(dbPath, options);
}
