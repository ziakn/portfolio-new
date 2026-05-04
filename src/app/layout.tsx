import type { Metadata } from 'next';
import Script from 'next/script';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ziamuhammad.com'),
  title: {
    default: 'Zia Muhammad | Full Stack Software Engineer in Doha, Qatar',
    template: '%s | Zia Muhammad',
  },
  description:
    'Zia Muhammad – Full Stack Software Engineer in Doha, Qatar with 7+ years of experience. Expert in Laravel, React.js, Next.js, REST APIs, and LLM Integrations (OpenAI, Gemini). Scaled Al Sharq News to 85M+ yearly views.',
  keywords: [
    'Full Stack Developer Qatar',
    'Laravel Developer Doha',
    'React.js Engineer',
    'Next.js Developer',
    'LLM Integration',
    'Software Engineer Doha',
  ],
  authors: [{ name: 'Zia Muhammad' }],
  creator: 'Zia Muhammad',
  openGraph: {
    type: 'website',
    siteName: 'Zia Muhammad | Software Engineer',
    locale: 'en_US',
    images: [
      {
        url: '/images/Profile-W.png',
        width: 800,
        height: 800,
        alt: 'Zia Muhammad – Full Stack Software Engineer',
      },
    ],
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
  verification: {
    google: undefined,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>
          <Sidebar />
          <div className="main-content">
            <Navbar />
            {children}
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

        {/* JSON-LD Structured Data */}
        <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Zia Muhammad",
              "url": "https://ziamuhammad.com",
              "image": "https://ziamuhammad.com/images/Profile-W.png",
              "sameAs": [
                "https://twitter.com/ziamuhmmad2",
                "https://www.linkedin.com/in/zia-software/",
                "https://github.com/ziakn"
              ],
              "jobTitle": "Full Stack Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Dar Al-Sharq Group"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Doha",
                "addressCountry": "Qatar"
              }
            }
          `}
        </Script>

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
