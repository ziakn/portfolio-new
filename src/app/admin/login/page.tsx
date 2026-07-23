import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';
import { countAdmins } from '@/data/admin';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  // Already signed in → straight to the dashboard.
  if (await getCurrentUser()) redirect('/admin');

  const hasAdmin = countAdmins() > 0;

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1>Admin sign in</h1>
        <p className="sub">Zia Muhammad — site control panel</p>
        {hasAdmin ? (
          <LoginForm />
        ) : (
          <div className="admin-notice error">
            No admin account exists yet. Create one on the server with:
            <br />
            <code>npm run admin:create -- you@example.com &apos;password&apos;</code>
          </div>
        )}
      </div>
    </div>
  );
}
