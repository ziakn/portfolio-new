import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Engineering Portfolio',
  description:
    "Explore Zia Muhammad's software engineering portfolio. 29 projects built in Qatar — high-traffic news platforms (85M+ views), e-commerce systems, SaaS apps, and AI-powered solutions.",
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
