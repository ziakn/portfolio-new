import { getDb } from './db';

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  ip: string | null;
  userAgent: string | null;
  isRead: boolean;
  createdAt: string;
}

interface ContactRow {
  id: number;
  name: string;
  email: string;
  message: string;
  ip: string | null;
  user_agent: string | null;
  is_read: number;
  created_at: string;
}

function toSubmission(row: ContactRow): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    ip: row.ip,
    userAgent: row.user_agent,
    isRead: row.is_read === 1,
    createdAt: row.created_at,
  };
}

export function createSubmission(input: {
  name: string;
  email: string;
  message: string;
  ip?: string | null;
  userAgent?: string | null;
}): void {
  getDb()
    .prepare(
      `INSERT INTO contact_submissions (name, email, message, ip, user_agent)
       VALUES (@name, @email, @message, @ip, @userAgent)`,
    )
    .run({
      name: input.name,
      email: input.email,
      message: input.message,
      ip: input.ip ?? null,
      userAgent: input.userAgent ?? null,
    });
}

export function listSubmissions(): ContactSubmission[] {
  const rows = getDb()
    .prepare('SELECT * FROM contact_submissions ORDER BY created_at DESC')
    .all() as ContactRow[];
  return rows.map(toSubmission);
}

export function getSubmission(id: number): ContactSubmission | undefined {
  const row = getDb()
    .prepare('SELECT * FROM contact_submissions WHERE id = ?')
    .get(id) as ContactRow | undefined;
  return row ? toSubmission(row) : undefined;
}

export function countUnread(): number {
  const row = getDb()
    .prepare('SELECT COUNT(*) AS c FROM contact_submissions WHERE is_read = 0')
    .get() as { c: number };
  return row.c;
}

export function markRead(id: number, read = true): void {
  getDb().prepare('UPDATE contact_submissions SET is_read = ? WHERE id = ?').run(read ? 1 : 0, id);
}

export function deleteSubmission(id: number): void {
  getDb().prepare('DELETE FROM contact_submissions WHERE id = ?').run(id);
}

// Best-effort throttle: how many submissions from this IP in the last N minutes.
export function recentSubmissionCount(ip: string, minutes = 10): number {
  const row = getDb()
    .prepare(
      `SELECT COUNT(*) AS c FROM contact_submissions
       WHERE ip = ? AND created_at >= datetime('now', ?)`,
    )
    .get(ip, `-${minutes} minutes`) as { c: number };
  return row.c;
}
