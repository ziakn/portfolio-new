import Script from 'next/script';
import { listProjects, projectCategories } from '@/data/projects';
import PortfolioClient from './PortfolioClient';

export const revalidate = 3600;

export default function PortfolioPage() {
  const projects = listProjects();
  const categories = projectCategories();

  return (
    <article className="portfolio active" data-page="portfolio">
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
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Portfolio",
                "item": "https://ziamuhammad.com/portfolio"
              }
            ]
          }
        `}
      </Script>
      <header>
        <h1 className="h1 article-title">Portfolio</h1>
      </header>

      <PortfolioClient projects={projects} categories={categories} />
    </article>
  );
}
