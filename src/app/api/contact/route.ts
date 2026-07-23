import { NextResponse } from 'next/server';
import { createSubmission, recentSubmissionCount } from '@/data/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: Request) {
  let name = '';
  let email = '';
  let message = '';
  let honeypot = '';

  const contentType = req.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}));
    ({ fullname: name = '', email = '', message = '', _gotcha: honeypot = '' } = body);
  } else {
    const form = await req.formData();
    name = String(form.get('fullname') ?? '');
    email = String(form.get('email') ?? '');
    message = String(form.get('message') ?? '');
    honeypot = String(form.get('_gotcha') ?? '');
  }

  // Bots fill hidden fields; humans don't. Pretend success, save nothing.
  if (honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  name = name.trim();
  email = email.trim();
  message = message.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'All fields are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200 || email.length > 200) {
    return NextResponse.json({ ok: false, error: 'Input too long.' }, { status: 400 });
  }

  const ip = clientIp(req);
  // Best-effort throttle: max 5 messages per IP per 10 minutes.
  if (ip !== 'unknown' && recentSubmissionCount(ip, 10) >= 5) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages. Please try again later.' },
      { status: 429 },
    );
  }

  createSubmission({
    name,
    email,
    message,
    ip,
    userAgent: req.headers.get('user-agent'),
  });

  return NextResponse.json({ ok: true });
}
