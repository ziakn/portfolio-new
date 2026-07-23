'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '../actions';

const links = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/posts', label: 'Blog posts' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/projects', label: 'Portfolio' },
  { href: '/admin/content', label: 'Site content' },
];

export default function AdminNav({ email, unread }: { email: string; unread: number }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        Zia<span>.</span>Admin
      </div>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`admin-nav-link${isActive(link.href, link.exact) ? ' active' : ''}`}
        >
          {link.label}
          {link.href === '/admin/messages' && unread > 0 && (
            <span className="admin-nav-badge">{unread}</span>
          )}
        </Link>
      ))}
      <div className="admin-nav-spacer" />
      <Link href="/" className="admin-nav-link" target="_blank">
        View site ↗
      </Link>
      <div className="admin-user">{email}</div>
      <form action={logoutAction}>
        <button type="submit" className="admin-btn secondary small" style={{ width: '100%' }}>
          Sign out
        </button>
      </form>
    </aside>
  );
}
