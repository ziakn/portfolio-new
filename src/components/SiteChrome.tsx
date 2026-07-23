'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import SiteFooter from './SiteFooter';

// The public site renders inside the portfolio shell (sidebar + navbar +
// footer). The admin panel has its own chrome, so on /admin routes we render
// the children bare and let the admin layout provide its own frame.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <main>
      <Sidebar />
      <div className="main-content">
        <Navbar />
        {children}
        <SiteFooter />
      </div>
    </main>
  );
}
