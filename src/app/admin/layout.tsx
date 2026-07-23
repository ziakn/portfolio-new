import type { Metadata } from 'next';
import './admin.css';

// Admin is private: never index it, and opt every admin route out of static
// generation since they depend on the session cookie and live DB.
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
