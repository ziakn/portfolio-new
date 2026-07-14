import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Engineering Portfolio',
  description:
    '29 software projects built in Qatar by Zia Muhammad — news platforms at 85M+ views, e-commerce, SaaS, and AI apps. Explore the full portfolio.',
  alternates: { canonical: 'https://ziamuhammad.com/portfolio' },
  openGraph: {
    title: 'Portfolio – Zia Muhammad | Full Stack Engineer Projects in Qatar',
    description: '15+ live software projects by Zia Muhammad in Qatar.',
    url: 'https://ziamuhammad.com/portfolio',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
