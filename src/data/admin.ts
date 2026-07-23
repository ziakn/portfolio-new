import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { getDb } from './db';

export interface AdminUser {
  id: number;
  email: string;
}

interface AdminUserRow {
  id: number;
  email: string;
  password_hash: string;
}

const SESSION_TTL_DAYS = 30;

// scrypt with a per-user random salt. Stored as "<saltHex>:<hashHex>".
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `${salt.toString('hex')}:${hash.toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(':');
  if (!saltHex || !hashHex) return false;
  const hash = Buffer.from(hashHex, 'hex');
  const candidate = scryptSync(password, Buffer.from(saltHex, 'hex'), hash.length);
  // Constant-time compare to avoid leaking timing information.
  return hash.length === candidate.length && timingSafeEqual(hash, candidate);
}

export function countAdmins(): number {
  const row = getDb().prepare('SELECT COUNT(*) AS c FROM admin_users').get() as { c: number };
  return row.c;
}

export function upsertAdmin(email: string, password: string): void {
  const normalized = email.trim().toLowerCase();
  getDb()
    .prepare(
      `INSERT INTO admin_users (email, password_hash, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(email) DO UPDATE SET
         password_hash = excluded.password_hash,
         updated_at = datetime('now')`,
    )
    .run(normalized, hashPassword(password));
}

// Returns the user on success, null on bad credentials.
export function authenticate(email: string, password: string): AdminUser | null {
  const row = getDb()
    .prepare('SELECT id, email, password_hash FROM admin_users WHERE email = ?')
    .get(email.trim().toLowerCase()) as AdminUserRow | undefined;

  if (!row || !verifyPassword(password, row.password_hash)) return null;
  return { id: row.id, email: row.email };
}

export function createSession(userId: number): string {
  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + SESSION_TTL_DAYS * 86_400_000).toISOString();
  getDb()
    .prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)')
    .run(token, userId, expires);
  return token;
}

// Validates a session token and returns the user, or null if missing/expired.
// Expired rows are cleaned up opportunistically.
export function getSessionUser(token: string | undefined): AdminUser | null {
  if (!token) return null;
  const row = getDb()
    .prepare(
      `SELECT u.id AS id, u.email AS email, s.expires_at AS expires_at
       FROM sessions s JOIN admin_users u ON u.id = s.user_id
       WHERE s.token = ?`,
    )
    .get(token) as { id: number; email: string; expires_at: string } | undefined;

  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    destroySession(token);
    return null;
  }
  return { id: row.id, email: row.email };
}

export function destroySession(token: string | undefined): void {
  if (!token) return;
  getDb().prepare('DELETE FROM sessions WHERE token = ?').run(token);
}
