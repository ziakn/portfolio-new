import type { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import { getContent } from '@/data/content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Software Engineer in Doha, Qatar | Laravel, React, Next.js',
  description:
    'Full Stack Software Engineer in Doha, Qatar. I build Laravel, React, and Next.js platforms with APIs, AI integration, and technical SEO. Get in touch.',
  keywords: [
    'Software Engineer in Doha',
    'Software Engineer Qatar',
    'Laravel Developer Qatar',
    'React Developer Qatar',
    'Next.js Developer Qatar',
    'Web Development Qatar',
    'Technical SEO Qatar',
  ],
  alternates: { canonical: 'https://ziamuhammad.com' },
  openGraph: {
    title: 'Software Engineer in Doha, Qatar | Zia Muhammad',
    description:
      'Laravel, React, Next.js, API, AI integration, hosting, and technical SEO services for Qatar businesses.',
    url: 'https://ziamuhammad.com',
  },
};

const certifications = [
  { title: 'National Cyber Security Drill – NCSA Qatar', href: 'https://drive.google.com/file/d/12YQUkp1YYUh46x2vc_5T9L-5PJ8leAEz/view?usp=drive_link' },
  { title: 'GCP Fundamentals: Big Data & Machine Learning – Cloud Onboard', href: 'https://drive.google.com/file/d/1WTm0cJTXCmSf8j2i4Pi4o4keCA4DqEPL/view?usp=drive_link' },
  { title: 'MS Word – Microsoft', href: 'https://drive.google.com/file/d/1XXESYM6JkBI8wqFyz88As6GpulOCu834/view' },
  { title: 'MS Excel – Microsoft', href: 'https://drive.google.com/file/d/17NW9qB-pZTHXNkf0ZF9_zDKrSJcCaTCI/view' },
  { title: 'MS PowerPoint – Microsoft', href: 'https://drive.google.com/file/d/1Q-SQn6fVjeA2B3_oEhabToSO7X5kw-Ea/view' },
];

export default function AboutPage() {
  const aboutHtml = getContent('home.about');
  const services = getContent('home.services');

  return (
    <article className="about active" data-page="about">
      <Script id="breadcrumb-json-ld" type="application/ld+json" strategy="afterInteractive">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ziamuhammad.com"
              }
            ]
          }
        `}
      </Script>
      <header>
        <h1 className="h1 article-title">About Me</h1>
      </header>

      <section className="about-text" dangerouslySetInnerHTML={{ __html: aboutHtml }} />

      <section className="service">
        <h2 className="h2 service-title">What I&apos;m Doing</h2>
        <ul className="service-list">
          {services.map((s) => (
            <li className="service-item" key={s.title}>
              <div className="service-icon-box">
                <Image src={s.icon} alt={`${s.title} icon`} width={40} height={40} />
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{s.title}</h4>
                <p className="service-item-text">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="certifications-section">
        <h2 className="h2 certifications-title">Certifications</h2>
        <ul className="certifications-list">
          {certifications.map((c) => (
            <li className="cert-card" key={c.title}>
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
