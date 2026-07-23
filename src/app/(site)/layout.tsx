import Script from 'next/script';

// Layout for the public content pages. Google Analytics and AdSense live HERE
// (not in the root layout) so they load ONLY on real pages. A 404 bubbles to
// the root `not-found.tsx`, which renders outside this group — so error pages
// never load tracking or ads (avoids counting 404s and serving ads on empty
// pages, which is against AdSense policy).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

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
    </>
  );
}
