import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionUser, type AdminUser } from '@/data/admin';

export const SESSION_COOKIE = 'admin_session';

// Reads the session cookie and resolves the logged-in admin, or null.
export async function getCurrentUser(): Promise<AdminUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return getSessionUser(token);
}

// For protected pages/layouts: redirects to the login screen when signed out.
export async function requireUser(): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!user) redirect('/admin/login');
  return user;
}
