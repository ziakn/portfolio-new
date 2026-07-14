import type { Metadata } from 'next';
import Script from 'next/script';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import { Poppins } from 'next/font/google';
import { jsonLd, siteGraph } from '@/data/schema';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ziamuhammad.com'),
  title: {
    default: 'Zia Muhammad | Full Stack Software Engineer in Doha, Qatar',
    template: '%s | Zia Muhammad',
  },
  description:
    'Zia Muhammad – Full Stack Software Engineer in Doha, Qatar. 7+ years building Laravel, React, and Next.js platforms, REST APIs, and LLM integrations.',
  keywords: [
    'Full Stack Developer Qatar',
    'Software Engineer Qatar',
    'Laravel Developer Doha',
    'Laravel Developer Qatar',
    'React.js Engineer',
    'React Developer Qatar',
    'Next.js Developer',
    'Next.js Developer Qatar',
    'Technical SEO Qatar',
    'Web Development Qatar',
    'Doha Software Consultant',
    'LLM Integration',
    'Software Engineer Doha',
  ],
  authors: [{ name: 'Zia Muhammad' }],
  creator: 'Zia Muhammad',
  openGraph: {
    type: 'website',
    siteName: 'Zia Muhammad | Software Engineer',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ziamuhmmad2',
    creator: '@ziamuhmmad2',
  },
  icons: {
    icon: '/images/logo.ico',
    apple: '/images/logo.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ziamuhammad.com',
    types: {
      'application/rss+xml': 'https://ziamuhammad.com/feed.xml',
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-9790243158087298',
    'geo.region': 'QA-DA',
    'geo.placename': 'Doha, Qatar',
    'geo.position': '25.2854;51.5310',
    ICBM: '25.2854, 51.5310',
    'format-detection': 'telephone=no',
    'theme-color': '#1e1e2e',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  'viewport-fit': 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <main>
          <Sidebar />
          <div className="main-content">
            <Navbar />
            {children}
            <SiteFooter />
          </div>
        </main>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PKC08M31Q4"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PKC08M31Q4');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9790243158087298"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* JSON-LD: one linked @graph for the whole site. Rendered server-side
            (not via next/script) so crawlers see it without executing JS. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteGraph) }}
        />

        {/* Ionicons */}
        <Script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          strategy="afterInteractive"
        />
        <Script
          noModule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
