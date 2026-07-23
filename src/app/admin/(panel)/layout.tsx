import { requireUser } from '@/lib/session';
import { countUnread } from '@/data/contact';
import AdminNav from './AdminNav';

// Every route in this group is behind the auth gate. `requireUser` redirects
// to /admin/login when there's no valid session.
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const unread = countUnread();

  return (
    <div className="admin-shell">
      <AdminNav email={user.email} unread={unread} />
      <div className="admin-main">{children}</div>
    </div>
  );
}
