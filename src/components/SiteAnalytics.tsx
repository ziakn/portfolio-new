import Script from 'next/script';

// Google Analytics + AdSense as LEAF content (rendered by a page, not a layout).
// Most public pages get these from (site)/layout.tsx. The blog post route is the
// only public route that can call notFound(), and a notFound() replaces the page
// but NOT its ancestor layouts — so putting the scripts in a layout would still
// load them on "Post Not Found" pages. Rendering them here, inside the page's
// own output, means a 404 short-circuits the page and the scripts never load.
export default function SiteAnalytics() {
  return (
    <>
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
