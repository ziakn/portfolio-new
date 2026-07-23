import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact – Hire a Full Stack Engineer in Doha',
  description:
    'Contact Zia Muhammad – Full Stack Software Engineer in Doha, Qatar. Available for freelance, contract, and full-time opportunities.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Zia Muhammad | Hire Full Stack Software Engineer in Qatar',
    description: 'Get in touch with Zia Muhammad, Full Stack Software Engineer based in Doha, Qatar.',
    url: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
