# Admin panel

A self-contained, SQLite-backed admin panel for this site. No third-party
services — everything lives in the existing `data/posts.sqlite` file.

## One-time setup

1. **Create your admin account** (single admin):

   ```bash
   npm run admin:create -- you@example.com 'a-strong-password'
   ```

   Re-running with the same email resets that password. Run with no arguments to
   be prompted interactively.

2. **(Already done once)** Seed the portfolio projects that used to be
   hardcoded into the page:

   ```bash
   npm run seed:projects          # skips if the table already has rows
   npm run seed:projects -- --force   # wipe and reseed from the script
   ```

3. Sign in at **`/admin/login`**.

## What you can manage

| Section              | URL                | What it does                                                        |
| -------------------- | ------------------ | ------------------------------------------------------------------ |
| Dashboard            | `/admin`           | Counts (posts live/scheduled, unread messages, projects) + recent messages |
| Blog posts           | `/admin/posts`     | Search + paginate all posts, create / edit / delete, schedule by date |
| Messages             | `/admin/messages`  | Contact-form submissions: read, mark read/unread, delete           |
| Portfolio            | `/admin/projects`  | Add / edit / delete / reorder project cards                        |
| Site content         | `/admin/content`   | Edit home "About", home "Services", and résumé "Key Achievements"  |

After any change, the affected public pages are revalidated immediately
(`revalidatePath`), so edits go live without waiting for the 1-hour ISR window.

## How it works

- **Storage:** all new tables (`admin_users`, `sessions`, `contact_submissions`,
  `projects`, `site_content`) live in `data/posts.sqlite` and are auto-created on
  first boot (`src/data/db.ts`). The DB is opened read-**write** with WAL mode.
- **Auth:** password hashed with Node `scrypt` (no native bcrypt). A random
  session token is stored in `sessions` and set as an httpOnly, Secure,
  SameSite=Lax cookie. `src/lib/session.ts#requireUser` gates every route under
  `src/app/admin/(panel)/`. Login lives outside that group so it isn't gated.
- **Contact form:** `POST /api/contact` validates, applies a honeypot + a
  per-IP rate limit (5 / 10 min), and inserts into `contact_submissions`.
- **Content fallbacks:** `src/data/content.ts` holds the original text as
  defaults, so any unset key renders the original site copy — nothing breaks by
  omission, and every field has a "Reset to default" button.
- **Admin is hidden from search:** `noindex` metadata on the admin layout +
  `Disallow: /admin` in `public/robots.txt`. The portfolio sidebar/navbar are
  suppressed on `/admin` via `src/components/SiteChrome.tsx`.

## ⚠️ Hosting requirement (important)

Runtime SQLite writes only persist on a host with a **persistent filesystem and
a long-lived Node process** (e.g. `next start` behind Apache/Nginx on a VPS,
which is how this site is served). On a **pure serverless** platform (Vercel
Functions) the filesystem is read-only and `/tmp` is wiped between invocations,
so admin edits and contact submissions would NOT persist. If you ever move to
serverless, the storage layer (`src/data/db.ts`) must be swapped for a hosted
libSQL/Turso database — the rest of the code stays the same.

## Not yet editable via the panel

The résumé timeline (education, jobs, skill bars, skill details) and the home
certifications are still hardcoded in their page files. They can be moved into
`site_content` the same way `resume.achievements` was if you want them editable.
