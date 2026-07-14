import Database from 'better-sqlite3';
import path from 'node:path';

// The blog database ships with the deployment and is read-only at runtime
// (Vercel's filesystem is not writable). Posts are added locally with
// `npm run blog` and committed; scheduled posts already in the database go
// live on their publish date without a redeploy, via the ISR revalidate.
const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');

let db: Database.Database | undefined;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath, { readonly: true, fileMustExist: true });
  }

  return db;
}
