'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'About', icon: 'person-outline' },
  { href: '/resume', label: 'Resume', icon: 'document-text-outline' },
  { href: '/portfolio', label: 'Portfolio', icon: 'briefcase-outline' },
  { href: '/blog', label: 'Blog', icon: 'newspaper-outline' },
  { href: '/contact', label: 'Contact', icon: 'chatbubble-ellipses-outline' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map(({ href, label, icon }) => (
          <li className="navbar-item" key={href}>
             <Link
               href={href}
               className={`navbar-link${pathname === href ? ' active' : ''}`}
               aria-current={pathname === href ? 'page' : undefined}
             >
               <ion-icon className="navbar-icon" name={icon} aria-hidden="true"></ion-icon>
               {label}
             </Link>
           </li>
        ))}
      </ul>
    </nav>
  );
}
