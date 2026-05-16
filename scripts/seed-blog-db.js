const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'blog.sqlite');

fs.mkdirSync(dbDir, { recursive: true });

const images = [
  '/images/blog-1.webp',
  '/images/blog-2.webp',
  '/images/blog-3.webp',
  '/images/blog-4.webp',
  '/images/blog-5.webp',
  '/images/blog-6.webp',
];

const topics = [
  ['laravel-developer-qatar-guide', 'How to Choose a Laravel Developer in Qatar', 'Laravel Qatar', 'A practical guide for Qatar companies evaluating Laravel developers, project fit, delivery process, and long-term maintainability.'],
  ['nextjs-seo-doha-businesses', 'Next.js SEO for Doha Businesses', 'Next.js SEO', 'How Doha businesses can use Next.js metadata, performance, structured data, and content strategy to rank for local search terms.'],
  ['qatar-website-performance-checklist', 'Website Performance Checklist for Qatar Companies', 'Performance', 'A focused checklist for improving Core Web Vitals, hosting choices, images, caching, and frontend delivery for Qatar audiences.'],
  ['arabic-english-website-qatar', 'Building Arabic and English Websites for Qatar', 'Localization', 'Key engineering decisions behind bilingual websites, RTL layouts, content modeling, and SEO for Qatar-based brands.'],
  ['doha-real-estate-web-platforms', 'Web Platforms for Doha Real Estate Companies', 'Real Estate Tech', 'What real estate teams in Qatar need from listing portals, CRM integrations, lead routing, and search-friendly property pages.'],
  ['restaurant-ordering-apps-qatar', 'Restaurant Ordering Apps in Qatar: Technical Blueprint', 'Mobile Apps', 'A blueprint for restaurant ordering, delivery, loyalty, and payment workflows built for Qatar customer expectations.'],
  ['qatar-news-portal-architecture', 'Architecture Lessons from High-Traffic Qatar News Portals', 'Media Engineering', 'Engineering patterns for caching, publishing workflows, migrations, and performance on high-traffic Qatar media websites.'],
  ['ai-content-workflows-newsrooms-qatar', 'AI Content Workflows for Qatar Newsrooms', 'AI & Backend', 'How AI can support tagging, summarization, search, moderation, and editorial productivity without replacing editorial judgment.'],
  ['ecommerce-development-qatar', 'Ecommerce Development in Qatar: What Matters Most', 'Ecommerce', 'The technical priorities behind fast, secure, and conversion-friendly ecommerce platforms for Qatar retailers.'],
  ['payment-gateway-integration-qatar', 'Payment Gateway Integration for Qatar Web Apps', 'API Development', 'How to plan payment gateway integrations for Qatar web apps with reliability, clear error handling, and secure checkout flows.'],
  ['seo-consultant-doha-technical-audit', 'What a Technical SEO Audit in Doha Should Cover', 'SEO', 'A technical SEO audit checklist covering crawlability, metadata, schema, content structure, speed, and local relevance.'],
  ['wordpress-vs-laravel-qatar-business', 'WordPress vs Laravel for Qatar Business Websites', 'Strategy', 'A clear comparison of WordPress and Laravel for Qatar businesses that need speed, custom workflows, and room to grow.'],
  ['react-developer-doha-hiring-guide', 'Hiring a React Developer in Doha: A Business Guide', 'Frontend', 'What to look for when hiring React talent in Doha, from component quality to performance, accessibility, and project delivery.'],
  ['qatar-startup-mvp-tech-stack', 'Best Tech Stack for Qatar Startup MVPs', 'Startups', 'How Qatar startups can choose a practical MVP stack that balances speed, cost, future scale, and developer availability.'],
  ['laravel-api-design-mobile-apps-qatar', 'Laravel API Design for Qatar Mobile Apps', 'API Development', 'Design principles for Laravel APIs powering mobile apps, including authentication, versioning, pagination, and observability.'],
  ['cloud-hosting-qatar-websites', 'Cloud Hosting Choices for Qatar Websites', 'Hosting', 'How to choose hosting for Qatar websites based on latency, reliability, deployment workflow, backups, and operational control.'],
  ['local-seo-software-engineer-qatar', 'Local SEO for Software Services in Qatar', 'SEO', 'How software consultants and agencies can build local Qatar visibility with service pages, case studies, schema, and useful content.'],
  ['qatar-event-registration-platforms', 'Event Registration Platforms in Qatar', 'Event Tech', 'Technical features that matter for Qatar events, including high-concurrency registration, ticketing, QR check-in, and reporting.'],
  ['crm-development-qatar-companies', 'CRM Development for Qatar Companies', 'Business Apps', 'How custom CRM platforms support Qatar sales, service, billing, lead follow-up, and management reporting.'],
  ['database-migration-zero-downtime', 'Zero-Downtime Database Migration for Production Apps', 'Backend', 'A practical migration approach for production platforms where downtime, data loss, and user disruption are not acceptable.'],
  ['nextjs-image-optimization-qatar', 'Next.js Image Optimization for Qatar Portfolios and Brands', 'Next.js SEO', 'How image sizing, formats, priority loading, and alt text affect SEO and conversion on Qatar-focused websites.'],
  ['schema-markup-qatar-businesses', 'Schema Markup for Qatar Businesses', 'SEO', 'How structured data helps search engines understand Qatar businesses, services, people, articles, breadcrumbs, and locations.'],
  ['rag-pipelines-laravel-qatar', 'RAG Pipelines with Laravel for Qatar Organizations', 'AI & Backend', 'How retrieval-augmented generation can power internal search, knowledge assistants, and customer support tools in Qatar.'],
  ['doha-portfolio-website-seo', 'Portfolio Website SEO for Doha Professionals', 'SEO', 'How professionals in Doha can improve portfolio visibility with project proof, service language, metadata, and content depth.'],
  ['bilingual-seo-qatar-websites', 'Bilingual SEO for Qatar Websites', 'Localization', 'How to structure English and Arabic content for search visibility, hreflang planning, URL strategy, and localized metadata.'],
  ['laravel-queues-high-traffic-qatar', 'Using Laravel Queues for High-Traffic Qatar Platforms', 'Backend', 'How queues improve performance and reliability for imports, notifications, AI jobs, publishing tasks, and third-party APIs.'],
  ['real-time-notifications-qatar-apps', 'Real-Time Notifications for Qatar Web and Mobile Apps', 'Realtime Apps', 'Architecture options for real-time updates using WebSockets, Pusher-style services, queues, and clear notification rules.'],
  ['qatar-ecommerce-seo-product-pages', 'SEO-Friendly Product Pages for Qatar Ecommerce', 'Ecommerce', 'How Qatar retailers can improve product pages with structured data, images, internal links, content, and performance.'],
  ['technical-content-strategy-qatar-it', 'Technical Content Strategy for Qatar IT Services', 'Content Strategy', 'How IT service providers in Qatar can build search demand through useful guides, case studies, and local landing pages.'],
  ['web-accessibility-qatar-government', 'Accessibility Basics for Qatar Government and Public Websites', 'Accessibility', 'Practical accessibility improvements for public-sector websites, forms, navigation, colors, keyboard support, and content clarity.'],
  ['newsroom-cms-workflows-qatar', 'CMS Workflows for Qatar Media Teams', 'Media Engineering', 'How editorial CMS workflows can support approvals, scheduling, multimedia content, analytics, and multi-publication publishing.'],
  ['server-side-rendering-seo-qatar', 'Server-Side Rendering and SEO for Qatar Websites', 'Next.js SEO', 'When SSR helps search visibility, freshness, personalization, and performance for Qatar service and content websites.'],
  ['landing-pages-qatar-services', 'High-Converting Service Pages for Qatar Businesses', 'SEO', 'How to structure service pages around search intent, proof, process, calls to action, and local Qatar relevance.'],
  ['map-integrations-qatar-apps', 'Google Maps Integration for Qatar Web Apps', 'API Development', 'What to consider when adding maps, location search, directions, geocoding, and branch finders to Qatar applications.'],
  ['sms-whatsapp-integrations-qatar', 'SMS and WhatsApp Integrations for Qatar Applications', 'API Development', 'How Qatar businesses can use transactional messaging for OTPs, delivery updates, booking confirmations, and customer service.'],
  ['qatar-saas-architecture', 'SaaS Architecture for Qatar Service Companies', 'SaaS', 'Foundational architecture choices for multi-tenant dashboards, roles, billing, reporting, onboarding, and secure data separation.'],
  ['portfolio-case-studies-seo', 'Turning Portfolio Projects into SEO Case Studies', 'Content Strategy', 'How software professionals can convert project work into credible case studies that attract local Qatar search traffic.'],
  ['core-web-vitals-doha-websites', 'Core Web Vitals for Doha Websites', 'Performance', 'How local businesses can improve loading, interactivity, visual stability, images, scripts, and hosting decisions.'],
  ['secure-laravel-apps-qatar', 'Security Checklist for Laravel Apps in Qatar', 'Security', 'A practical checklist for authentication, authorization, validation, file uploads, secrets, logging, and production hardening.'],
  ['headless-cms-qatar-brands', 'Headless CMS for Qatar Brands', 'Content Management', 'When a headless CMS helps Qatar brands publish faster across websites, mobile apps, campaigns, and multilingual channels.'],
  ['mobile-first-design-qatar', 'Mobile-First Design for Qatar Audiences', 'Frontend', 'Why mobile-first delivery matters in Qatar and how to design forms, navigation, content, and performance for smaller screens.'],
  ['api-observability-qatar-platforms', 'API Observability for Qatar Digital Platforms', 'Backend', 'How logging, metrics, tracing, alerts, and dashboards help teams operate production APIs with confidence.'],
  ['qatar-hospitality-websites', 'Website Features for Qatar Hospitality Businesses', 'Hospitality Tech', 'What restaurants, cafes, and hospitality brands need from booking, menus, ordering, location pages, and SEO.'],
  ['automated-content-tagging-ai', 'Automated Content Tagging with AI', 'AI & Backend', 'How AI tagging can improve search, recommendations, editorial workflows, and archives for large content platforms.'],
  ['nextjs-sitemap-robots-qatar', 'Sitemaps and Robots.txt for Qatar Websites', 'SEO', 'How to configure sitemaps, robots directives, canonical URLs, and crawl priorities for a growing Qatar website.'],
  ['doha-freelance-software-engineer', 'Working with a Freelance Software Engineer in Doha', 'Consulting', 'How to scope, manage, and evaluate freelance software engineering work for Qatar businesses and startups.'],
  ['legacy-system-modernization-qatar', 'Modernizing Legacy Systems for Qatar Companies', 'Digital Transformation', 'How to plan modernization without interrupting operations, including audits, data migration, APIs, and phased releases.'],
  ['frontend-performance-react-qatar', 'React Frontend Performance for Qatar Platforms', 'Frontend', 'How to reduce bundle weight, avoid unnecessary rendering, optimize images, and keep React interfaces responsive.'],
  ['ai-search-business-websites-qatar', 'AI Search for Qatar Business Websites', 'AI & Backend', 'How semantic search and AI assistants can help visitors find services, documents, FAQs, and product information faster.'],
  ['software-engineer-doha-services', 'Software Engineer in Doha: Services Businesses Usually Need', 'Consulting', 'A service overview for Qatar companies that need websites, APIs, dashboards, mobile apps, AI integrations, and technical SEO.'],
];

const makeContent = ([slug, title, category]) => `
  <p>${title} is a practical topic for organizations in Qatar that want reliable software, stronger search visibility, and better digital customer experiences. The best results usually come from combining clean engineering with a clear understanding of local search intent, bilingual content needs, and the way teams in Doha actually operate.</p>
  <h3>What to prioritize</h3>
  <p>Start with the fundamentals: fast pages, clear information architecture, secure forms, useful metadata, and content that answers real business questions. For Qatar-focused projects, service pages should mention the location naturally, show relevant proof, and connect technical details to business outcomes.</p>
  <h3>Technical implementation</h3>
  <p>A strong implementation uses maintainable components, structured data, optimized images, predictable URLs, and a backend that can grow without becoming fragile. For Laravel, React, and Next.js projects, this also means careful API boundaries, caching, logging, and deployment practices.</p>
  <h3>SEO and trust signals</h3>
  <p>Search engines need consistent signals: canonical URLs, descriptive titles, useful headings, schema markup, internal links, and current content. Visitors need trust signals too, including case studies, measurable outcomes, contact details, and a clear explanation of how the work is delivered.</p>
  <h3>Qatar market fit</h3>
  <p>For Qatar businesses, digital products often need bilingual support, mobile-first UX, local payment and messaging integrations, and performance that works well for both local and international audiences. Planning these needs early reduces rework and makes the product easier to scale.</p>
`;

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    img TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
`);

const insert = db.prepare(`
  INSERT INTO posts (slug, title, date, category, excerpt, content, img)
  VALUES (@slug, @title, @date, @category, @excerpt, @content, @img)
  ON CONFLICT(slug) DO UPDATE SET
    title = excluded.title,
    date = excluded.date,
    category = excluded.category,
    excerpt = excluded.excerpt,
    content = excluded.content,
    img = excluded.img
`);

const seedDate = new Date('2026-05-15T00:00:00.000Z');

db.transaction(() => {
  topics.forEach((topic, index) => {
    const [slug, title, category, excerpt] = topic;
    const date = new Date(seedDate);
    date.setUTCDate(seedDate.getUTCDate() - index * 3);

    insert.run({
      slug,
      title,
      date: date.toISOString().slice(0, 10),
      category,
      excerpt,
      content: makeContent(topic),
      img: images[index % images.length],
    });
  });
})();

db.close();

console.log(`Seeded ${topics.length} blog posts into ${path.relative(process.cwd(), dbPath)}`);
