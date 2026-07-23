'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { destroySession } from '@/data/admin';
import { SESSION_COOKIE } from '@/lib/session';

export async function logoutAction() {
  const store = await cookies();
  destroySession(store.get(SESSION_COOKIE)?.value);
  store.delete(SESSION_COOKIE);
  redirect('/admin/login');
}
