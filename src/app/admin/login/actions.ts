'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authenticate, createSession } from '@/data/admin';
import { SESSION_COOKIE } from '@/lib/session';

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { error: 'Enter your email and password.' };
  }

  const user = authenticate(email, password);
  if (!user) {
    // Deliberately vague to avoid revealing whether the email exists.
    return { error: 'Invalid email or password.' };
  }

  const token = createSession(user.id);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 86_400,
  });

  redirect('/admin');
}
