import Link from 'next/link';

const policyLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-and-conditions', label: 'Terms' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site information">
      <p>Copyright 2026 Zia Muhammad. Original software engineering articles, portfolio notes, and professional resources.</p>
      <nav aria-label="Policy links">
        <ul>
          {policyLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
