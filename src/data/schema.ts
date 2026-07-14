// Single source of truth for the site's JSON-LD entities.
//
// Everything is addressed by @id so pages can reference the shared Person /
// WebSite / business nodes instead of redeclaring them. Google resolves the
// references across the graph, which keeps author and publisher identity
// consistent on every page.

export const siteUrl = 'https://ziamuhammad.com';

export const ids = {
  website: `${siteUrl}/#website`,
  person: `${siteUrl}/#person`,
  business: `${siteUrl}/#business`,
  logo: `${siteUrl}/#logo`,
  employer: 'https://daralsharq.net/#organization',
} as const;

const sameAs = [
  'https://twitter.com/ziamuhmmad2',
  'https://www.linkedin.com/in/zia-software/',
  'https://github.com/ziakn',
];

const address = {
  '@type': 'PostalAddress',
  addressLocality: 'Doha',
  addressCountry: 'QA',
};

// Site-wide nodes, injected once from the root layout.
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ImageObject',
      '@id': ids.logo,
      url: `${siteUrl}/images/Profile-W.webp`,
      caption: 'Zia Muhammad',
    },
    {
      '@type': 'Person',
      '@id': ids.person,
      name: 'Zia Muhammad',
      url: siteUrl,
      image: { '@id': ids.logo },
      jobTitle: 'Full Stack Software Engineer',
      email: 'mailto:ziakn03@gmail.com',
      telephone: '+97450684583',
      address,
      sameAs,
      knowsAbout: [
        'Laravel',
        'Next.js',
        'React',
        'REST API design',
        'Technical SEO',
        'LLM integration',
      ],
      worksFor: { '@id': ids.employer },
    },
    {
      '@type': 'Organization',
      '@id': ids.employer,
      name: 'Dar Al-Sharq Group',
      url: 'https://daralsharq.net/',
      address,
    },
    {
      '@type': 'WebSite',
      '@id': ids.website,
      url: siteUrl,
      name: 'Zia Muhammad',
      description:
        'Full Stack Software Engineer in Doha, Qatar. Laravel, React, Next.js, APIs, and AI integration.',
      inLanguage: 'en',
      publisher: { '@id': ids.person },
    },
    {
      '@type': 'ProfessionalService',
      '@id': ids.business,
      name: 'Zia Muhammad Software Engineering',
      url: siteUrl,
      image: { '@id': ids.logo },
      description:
        'Full Stack Software Engineer in Doha, Qatar offering Laravel, React, Next.js, API, AI integration, hosting, and technical SEO services.',
      founder: { '@id': ids.person },
      address,
      areaServed: { '@type': 'Country', name: 'Qatar' },
      telephone: '+97450684583',
      email: 'mailto:ziakn03@gmail.com',
      priceRange: '$$',
      sameAs,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software engineering services in Qatar',
        itemListElement: [
          'Laravel Development',
          'Next.js Development',
          'Technical SEO',
          'AI Integration',
        ].map((name) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name },
        })),
      },
    },
  ],
};

type Crumb = { name: string; path: string };

export function breadcrumbGraph(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  };
}

// Serialize for embedding in a <script> tag. Escaping `<` prevents a string
// inside the JSON from closing the script element early.
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
