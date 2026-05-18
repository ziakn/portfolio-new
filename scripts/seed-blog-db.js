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

const targetPostCount = 1000;
const scheduledStartDate = new Date('2026-05-18T00:00:00.000Z');
const serviceAreas = [
  'Laravel development',
  'Next.js SEO',
  'React frontends',
  'API architecture',
  'mobile app backends',
  'AI search',
  'RAG pipelines',
  'technical SEO',
  'ecommerce platforms',
  'payment integrations',
  'cloud hosting',
  'database optimization',
  'CMS workflows',
  'bilingual websites',
  'Core Web Vitals',
  'SaaS dashboards',
  'real-time notifications',
  'Google Maps integrations',
  'CRM automation',
  'legacy modernization',
];
const audiences = [
  'Qatar startups',
  'Doha businesses',
  'Qatar ecommerce teams',
  'media companies in Qatar',
  'real estate companies in Doha',
  'hospitality brands in Qatar',
  'public-sector teams',
  'service companies in Doha',
  'retailers in Qatar',
  'enterprise teams in Qatar',
];
const angles = [
  'planning checklist',
  'implementation guide',
  'SEO strategy',
  'technical blueprint',
  'performance audit',
  'security checklist',
  'migration plan',
  'content strategy',
  'integration guide',
  'maintenance roadmap',
];
const categoryByService = {
  'Laravel development': 'Laravel Qatar',
  'Next.js SEO': 'Next.js SEO',
  'React frontends': 'Frontend',
  'API architecture': 'API Development',
  'mobile app backends': 'Mobile Apps',
  'AI search': 'AI & Backend',
  'RAG pipelines': 'AI & Backend',
  'technical SEO': 'SEO',
  'ecommerce platforms': 'Ecommerce',
  'payment integrations': 'API Development',
  'cloud hosting': 'Hosting',
  'database optimization': 'Backend',
  'CMS workflows': 'Content Management',
  'bilingual websites': 'Localization',
  'Core Web Vitals': 'Performance',
  'SaaS dashboards': 'SaaS',
  'real-time notifications': 'Realtime Apps',
  'Google Maps integrations': 'API Development',
  'CRM automation': 'Business Apps',
  'legacy modernization': 'Digital Transformation',
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function titleCase(value) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildScheduledTopics() {
  const generated = [];

  for (const service of serviceAreas) {
    for (const audience of audiences) {
      for (const angle of angles) {
        if (topics.length + generated.length >= targetPostCount) return [...topics, ...generated];

        const title = `${titleCase(service)} for ${titleCase(audience)}: ${titleCase(angle)}`;
        const slug = slugify(title);
        const category = categoryByService[service] || 'Software Engineering';
        const excerpt = `A practical ${angle} for ${audience} working on ${service}, with guidance on architecture, search visibility, performance, and long-term maintainability.`;
        const date = new Date(scheduledStartDate);
        date.setUTCDate(scheduledStartDate.getUTCDate() + generated.length);

        generated.push([
          slug,
          title,
          category,
          excerpt,
          date.toISOString().slice(0, 10),
          service,
          audience,
          angle,
        ]);
      }
    }
  }

  return [...topics, ...generated];
}

const cvProofPoints = [
  'In my work with Dar Al-Sharq Group in Doha, the same engineering choices had to support publishing teams, high traffic, mobile readers, and daily production deadlines.',
  'Projects such as Al Sharq News and The Peninsula Qatar shaped the way I think about caching, editorial workflows, Core Web Vitals, and resilient Laravel or React architecture.',
  'A zero-downtime migration of more than 12 million records taught me to plan database changes around rollback paths, validation reports, and calm release windows.',
  'Building more than 30 REST APIs across web and mobile products made authentication, pagination, versioning, logging, and clear error states non-negotiable parts of delivery.',
  'Payment integrations with Stripe, CyberSource, Qpay, and Sadad are a reminder that checkout work is never only frontend design; reconciliation and failure handling matter just as much.',
  'AI integrations with OpenAI, Gemini, Ollama, RAG pipelines, and ChromaDB work best when they are connected to real content operations instead of treated as isolated demos.',
  'Deploying Laravel, React, Vue, and Next.js products on Linux, Apache, Nginx, Docker, cPanel, and cloud hosting has made operational simplicity a practical SEO advantage.',
  'Bilingual English and Arabic products in Qatar need RTL layout care, localized metadata, readable URLs, and content models that do not make translation a last-minute task.',
];

const serviceAdvice = {
  'Laravel development': 'For Laravel work, I usually start with route structure, service boundaries, database indexes, queue usage, validation rules, and a deployment process that keeps production predictable.',
  'Next.js SEO': 'For Next.js SEO, the strongest gains normally come from clean metadata, server-rendered content where it matters, image optimization, structured data, and fast routes that are easy for crawlers to understand.',
  'React frontends': 'For React interfaces, the practical focus is component boundaries, accessible controls, bundle size, render performance, form behavior, and a design system that keeps future screens consistent.',
  'API architecture': 'For API architecture, the foundations are versioning, authentication, pagination, rate limits, audit logs, observability, and documentation that mobile and frontend teams can actually use.',
  'mobile app backends': 'For mobile backends, reliability depends on compact responses, token refresh flows, offline-friendly states, push notification rules, and APIs that handle slow networks gracefully.',
  'AI search': 'For AI search, the important work is content preparation, embeddings, permissions, fallback behavior, answer citations, and analytics that show whether users found the right information.',
  'RAG pipelines': 'For RAG pipelines, quality comes from chunking strategy, vector storage, source freshness, evaluation prompts, and clear boundaries between retrieved facts and generated wording.',
  'technical SEO': 'For technical SEO, the work should connect crawlability, canonical URLs, schema, internal links, performance, and content depth instead of treating rankings as a metadata-only problem.',
  'ecommerce platforms': 'For ecommerce platforms, conversion and SEO depend on product data quality, fast category pages, reliable checkout, inventory accuracy, payment handling, and search-friendly product URLs.',
  'payment integrations': 'For payment integrations, teams need clear payment states, webhook verification, retry logic, reconciliation screens, and careful handling of failed, pending, cancelled, and refunded transactions.',
  'cloud hosting': 'For cloud hosting, the decision should consider latency, backups, SSL, monitoring, deployment rollback, database access, CDN behavior, and who will maintain the server after launch.',
  'database optimization': 'For database optimization, I look at slow queries, missing indexes, data growth, locking risk, reporting needs, backup strategy, and migration plans before changing application code.',
  'CMS workflows': 'For CMS workflows, editors need scheduling, preview, approvals, media handling, role permissions, audit history, and publishing screens that reduce mistakes under deadline pressure.',
  'bilingual websites': 'For bilingual websites, engineering choices should support Arabic and English URLs, RTL components, localized schema, hreflang planning, and content editing without duplicated manual work.',
  'Core Web Vitals': 'For Core Web Vitals, the useful fixes are usually image sizing, script control, caching, route-level rendering decisions, stable layouts, and removal of unnecessary client-side work.',
  'SaaS dashboards': 'For SaaS dashboards, architecture should cover tenant separation, roles, billing states, onboarding, reporting, support tools, and database queries that remain fast as accounts grow.',
  'real-time notifications': 'For real-time notifications, teams need event rules, queue workers, delivery logs, user preferences, retry behavior, and a clear difference between urgent alerts and noisy updates.',
  'Google Maps integrations': 'For Google Maps work, quality depends on location data, geocoding, branch search, distance sorting, rate limits, map loading performance, and mobile usability.',
  'CRM automation': 'For CRM automation, value comes from lead routing, follow-up reminders, invoicing links, reporting, permissions, and integrations that reduce manual coordination for sales teams.',
  'legacy modernization': 'For legacy modernization, the safest path is discovery, data mapping, API layers, phased releases, migration rehearsals, and monitoring before replacing core workflows.',
};

const angleAdvice = {
  'planning checklist': 'A planning checklist should define the business goal, primary users, required integrations, data ownership, content workflow, launch risks, and what success will be measured against after release.',
  'implementation guide': 'An implementation guide should move from data model to interface, then to APIs, QA, deployment, analytics, and post-launch maintenance so the team can deliver without guessing.',
  'SEO strategy': 'An SEO strategy should map keywords to useful pages, connect internal links, add schema only where it is accurate, and keep every article tied to a real service or case study.',
  'technical blueprint': 'A technical blueprint should name the stack, hosting model, database shape, caching plan, background jobs, external APIs, and the monitoring needed once people depend on the product.',
  'performance audit': 'A performance audit should separate server latency, database cost, image weight, JavaScript execution, third-party scripts, caching headers, and layout stability before choosing fixes.',
  'security checklist': 'A security checklist should cover authentication, authorization, validation, upload rules, secrets, dependency updates, audit logs, backups, and operational access control.',
  'migration plan': 'A migration plan should include data profiling, dry runs, checksum checks, fallback steps, stakeholder timing, redirect mapping, and a release window that avoids unnecessary business disruption.',
  'content strategy': 'A content strategy should answer buyer questions, show local proof, avoid repeated thin pages, refresh older posts, and use Search Console data to improve pages with real demand.',
  'integration guide': 'An integration guide should document request formats, failure modes, credentials, webhook behavior, retry policy, logging, and the screens support teams need when something goes wrong.',
  'maintenance roadmap': 'A maintenance roadmap should schedule updates, backups, monitoring reviews, SEO refreshes, dependency checks, content pruning, and periodic performance testing.',
};

const audienceNeeds = {
  'Qatar startups': 'Startups in Qatar usually need a lean release, visible traction signals, analytics, and a stack that can change quickly without throwing away the first build.',
  'Doha businesses': 'Doha businesses often need practical lead generation, trustworthy service pages, WhatsApp or form workflows, and fast mobile pages for customers comparing vendors.',
  'Qatar ecommerce teams': 'Ecommerce teams in Qatar need product data discipline, payment reliability, delivery workflows, Arabic and English content, and search pages that load quickly.',
  'media companies in Qatar': 'Media companies in Qatar need publishing speed, editorial permissions, archive search, ad readiness, analytics, and infrastructure that handles traffic spikes.',
  'real estate companies in Doha': 'Real estate teams in Doha need property search, map views, CRM handoff, lead quality tracking, schema for listings, and simple ways to keep inventory current.',
  'hospitality brands in Qatar': 'Hospitality brands in Qatar need menus, bookings, delivery links, location pages, review signals, and mobile-first content that helps customers act quickly.',
  'public-sector teams': 'Public-sector teams need accessibility, clear information architecture, audit trails, secure forms, bilingual content, and dependable hosting.',
  'service companies in Doha': 'Service companies in Doha need pages that explain offers clearly, show proof, capture enquiries, and connect technical features to business outcomes.',
  'retailers in Qatar': 'Retailers in Qatar need campaign pages, inventory clarity, product discovery, checkout confidence, and analytics that connect traffic to revenue.',
  'enterprise teams in Qatar': 'Enterprise teams in Qatar need roles, reporting, integrations, compliance awareness, change management, and support processes around the software.',
};

function pick(items, index) {
  return items[index % items.length];
}

function inferService(title, category) {
  const lowerTitle = title.toLowerCase();

  return serviceAreas.find((service) => lowerTitle.includes(service.split(' ')[0].toLowerCase())) || category || 'software engineering';
}

function makeContent(topic, index) {
  const [, title, category, excerpt, , topicService, topicAudience, topicAngle] = topic;
  const service = topicService || inferService(title, category);
  const audience = topicAudience || pick(audiences, index);
  const angle = topicAngle || pick(angles, index);
  const primaryKeyword = `${service} ${audience}`.replace(/\s+/g, ' ').trim();
  const proof = pick(cvProofPoints, index);
  const secondProof = pick(cvProofPoints, index + 3);
  const serviceNote = serviceAdvice[service] || 'The technical approach should balance maintainability, search visibility, security, performance, and simple operations after launch.';
  const angleNote = angleAdvice[angle] || angleAdvice['implementation guide'];
  const audienceNote = audienceNeeds[audience] || 'The audience needs a practical digital product that is easy to understand, easy to maintain, and useful for real business workflows.';
  const internalLink = index % 3 === 0 ? '/portfolio' : index % 3 === 1 ? '/contact' : '/resume';
  const internalLabel = index % 3 === 0 ? 'related portfolio projects' : index % 3 === 1 ? 'contact page' : 'resume and technical background';
  const riskFocus = pick([
    'unclear requirements, weak ownership of content, slow hosting, and untested third-party integrations',
    'duplicate landing pages, missing schema, heavy images, and forms that do not explain errors clearly',
    'launching without redirects, analytics events, backup checks, or a rollback plan',
    'choosing a stack for fashion instead of maintainability, team skill, and production support',
    'publishing many pages before there is enough original detail, proof, or local relevance',
  ], index);
  const metricFocus = pick([
    'qualified enquiries, indexed pages, Core Web Vitals, form completion rate, and organic impressions',
    'API error rates, checkout completion, search clicks, page speed, and support tickets',
    'editorial speed, publishing errors, crawl coverage, mobile usability, and uptime',
    'lead quality, conversion rate, ranking movement, server response time, and content freshness',
    'deployment frequency, rollback time, database query cost, search visibility, and user task completion',
  ], index + 2);

  return `
  <p>${title} should be treated as a business and engineering decision, not just a page title. ${excerpt} The primary SEO focus is <strong>${primaryKeyword}</strong>, but the page still needs to read like useful advice for people making a real project decision in Qatar.</p>
  <h3>Why this matters for ${audience}</h3>
  <p>${audienceNote} ${proof}</p>
  <h3>Technical direction</h3>
  <p>${serviceNote} ${angleNote}</p>
  <h3>SEO structure</h3>
  <p>A strong page for this topic should use one focused H1, descriptive title metadata, a short excerpt, internal links, original implementation notes, and schema that matches the content. It should mention Doha or Qatar only where the local context is natural, such as payment providers, bilingual content, hosting expectations, customer behavior, or service-area relevance.</p>
  <h3>Implementation checklist</h3>
  <ul>
    <li>Define the user journey before choosing screens, APIs, or content sections.</li>
    <li>Map the main keyword, supporting keywords, and related internal pages before publishing.</li>
    <li>Plan database fields, media assets, redirects, analytics events, and contact paths together.</li>
    <li>Test the page on mobile, slow connections, and real content rather than placeholder text.</li>
  </ul>
  <h3>Common risks</h3>
  <p>The biggest risks for this topic are ${riskFocus}. ${secondProof}</p>
  <h3>How to measure success</h3>
  <p>After launch, track ${metricFocus}. These measurements are more useful than publishing volume alone, because they show whether the content and engineering are helping real users.</p>
  <h3>Practical next step</h3>
  <p>For a site like ziamuhammad.com, this article should connect naturally to <a href="${internalLink}">${internalLabel}</a>, then be refreshed when there is a new project result, search query, or technical lesson worth adding. That is the kind of content growth Google is more likely to trust than a large set of repeated pages.</p>
`;
}

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
const allTopics = buildScheduledTopics();

db.transaction(() => {
  allTopics.forEach((topic, index) => {
    const [slug, title, category, excerpt, scheduledDate] = topic;
    const date = scheduledDate ? new Date(`${scheduledDate}T00:00:00.000Z`) : new Date(seedDate);

    if (!scheduledDate) {
      date.setUTCDate(seedDate.getUTCDate() - index * 3);
    }

    insert.run({
      slug,
      title,
      date: date.toISOString().slice(0, 10),
      category,
      excerpt,
      content: makeContent(topic, index),
      img: images[index % images.length],
    });
  });
})();

db.close();

console.log(`Seeded ${allTopics.length} blog posts into ${path.relative(process.cwd(), dbPath)}`);
