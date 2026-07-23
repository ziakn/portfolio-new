#!/usr/bin/env node
//
// Create or update the single admin account.
//
//   npm run admin:create -- you@example.com 'your-password'
//
// If no arguments are given, prompts interactively (password hidden). Re-running
// with an existing email resets that account's password.

import Database from 'better-sqlite3';
import path from 'node:path';
import { randomBytes, scryptSync } from 'node:crypto';
import readline from 'node:readline';

const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');

function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `${salt.toString('hex')}:${hash.toString('hex')}`;
}

function ask(question, { hidden = false } = {}) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    if (hidden) {
      const stdout = process.stdout;
      const onData = (char) => {
        const s = char.toString();
        if (s === '\n' || s === '\r' || s === '') return;
        // Erase whatever readline echoed and reprint the prompt + a mask.
        stdout.write(`\x1b[2K\x1b[200D${question}${'*'.repeat(rl.line.length)}`);
      };
      process.stdin.on('data', onData);
      rl.question(question, (answer) => {
        process.stdin.off('data', onData);
        stdout.write('\n');
        rl.close();
        resolve(answer);
      });
    } else {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    }
  });
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS admin_users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);`;

async function main() {
  let [email, password] = process.argv.slice(2);

  if (!email) email = (await ask('Admin email: ')).trim();
  if (!password) password = await ask('Password (min 8 chars): ', { hidden: true });

  email = String(email).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('Invalid email address.');
    process.exit(1);
  }
  if (!password || password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  const db = new Database(dbPath, { fileMustExist: true });
  db.exec(SCHEMA);
  const info = db
    .prepare(
      `INSERT INTO admin_users (email, password_hash, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(email) DO UPDATE SET
         password_hash = excluded.password_hash, updated_at = datetime('now')`,
    )
    .run(email, hashPassword(password));
  db.close();

  console.log(
    info.changes && info.lastInsertRowid
      ? `Admin "${email}" created.`
      : `Admin "${email}" updated (password reset).`,
  );
}

main();
