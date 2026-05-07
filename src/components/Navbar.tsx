'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map(({ href, label }) => (
          <li className="navbar-item" key={href}>
             <Link
               href={href}
               className={`navbar-link${pathname === href ? ' active' : ''}`}
               aria-current={pathname === href ? 'page' : undefined}
             >
               {label}
             </Link>
           </li>
        ))}
      </ul>
    </nav>
  );
}
