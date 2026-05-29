import type { BlogPost } from './posts';

const curatedPosts = [
  {
    slug: 'zero-downtime-news-migration-laravel-qatar',
    title: 'How I Plan Zero-Downtime Laravel Migrations for High-Traffic News Sites',
    date: '2026-05-12',
    category: 'Laravel',
    excerpt:
      'A practical field note from migrating large Qatar news platforms: how to protect data integrity, keep editors publishing, and avoid launch-day surprises.',
    img: '/images/al-sharq.webp',
    content: `
      <p>Large publishing migrations are rarely blocked by one difficult SQL query. They fail when editorial work, cache invalidation, media paths, redirects, and rollback planning are treated as separate concerns. On Qatar news platforms where traffic can spike around breaking stories, the migration plan has to protect both readers and the newsroom.</p>
      <p>My starting point is always an inventory of what must keep working during the move. For a Laravel news platform that usually includes articles, authors, sections, tags, media galleries, SEO metadata, legacy URLs, push notification hooks, RSS feeds, sitemaps, and analytics tags. If any of those pieces are moved without a verification path, the migration may look successful in the database while the public site quietly loses value.</p>
      <h3>Map the data before writing import code</h3>
      <p>I prefer to write a source-to-target mapping document before building the importer. It lists each table, the destination model, field transformations, nullable rules, indexes, and the validation query that proves the record landed correctly. This sounds slow, but it prevents the most expensive kind of rework: discovering after launch that a legacy content type was interpreted incorrectly.</p>
      <p>For example, news articles often have multiple date fields. There may be a created date, a first published date, a last edited date, and a scheduled publish date. Search engines, RSS readers, and newsroom dashboards each care about a different one. The migration needs to preserve that meaning rather than simply moving the newest timestamp into every field.</p>
      <h3>Run dual reads and compare results</h3>
      <p>When possible, I run the new Laravel application beside the old system and compare record counts, URL responses, and rendered metadata before switching traffic. A simple dashboard can show how many articles, images, authors, categories, and redirects have passed validation. The goal is not to create a perfect migration tool; it is to make uncertainty visible early enough to act on it.</p>
      <p>For very large tables, batches should be idempotent. Every import step needs to be safe to retry, and every retry needs to avoid duplicate rows. I usually store source IDs in dedicated columns or mapping tables so the importer can resume from a failed batch without guessing.</p>
      <h3>Keep editors publishing</h3>
      <p>The hardest part of a publishing migration is not the archive. It is the content created while the team is testing the new system. For that reason, I separate historical migration from the final sync. The archive can be moved and tested ahead of time, then the launch window only has to handle recent changes, media uploads, and URL verification.</p>
      <p>Before launch, I also prepare redirects for legacy article paths and category pages. This matters for readers, but it also matters for AdSense and search quality because a site with broken internal paths can look unfinished even when the homepage is polished.</p>
      <h3>What I check before the switch</h3>
      <p>My final checklist includes database counts, sample article rendering, canonical URLs, Open Graph images, image alt text, sitemap output, RSS feed validity, robots.txt, 404 handling, cache purge behavior, and mobile layout. I also check backups, access logs, error logs, and a rollback command that has already been tested.</p>
      <p>A good migration is not dramatic. Readers keep reading, editors keep publishing, and the new stack quietly takes over with better performance and cleaner maintainability. That is the standard I aim for on high-traffic Laravel and Next.js projects.</p>
    `,
  },
  {
    slug: 'technical-seo-checklist-nextjs-portfolio-adsense',
    title: 'Technical SEO Checklist I Use Before Requesting an AdSense Review',
    date: '2026-05-08',
    category: 'Technical SEO',
    excerpt:
      'A developer-focused checklist for making a portfolio or service site easier for Google to crawl, understand, and trust before an AdSense review.',
    img: '/images/blog-1.webp',
    content: `
      <p>AdSense review is not only a question of placing an ads.txt file and waiting. Google needs to understand that the site has real publisher content, clear ownership, useful navigation, and pages that are not created only to target keywords. For a small portfolio site, those signals have to be especially clear because there are fewer pages for Google to evaluate.</p>
      <p>When I review a Next.js site before an AdSense submission, I start with the pages a crawler will see first: homepage, blog index, article pages, privacy policy, contact page, sitemap, robots.txt, and ads.txt. Each page needs a job. If a page exists only because a template generated it, it should be improved, noindexed, or removed.</p>
      <h3>Content quality comes first</h3>
      <p>The most important check is whether the site contains original content that could help a specific visitor. A portfolio page should explain the problem solved, the technology used, and the result. A blog article should include experience, tradeoffs, or a practical process. Thin daily posts with similar structures can hurt trust because they look scaled rather than written.</p>
      <p>I would rather publish six strong articles than sixty generic ones. Strong articles usually include a concrete scenario, a decision process, limitations, and a result. They also avoid inflated claims and repeated keyword phrases. If the same paragraph can fit ten different titles, it is probably too generic for a publisher review.</p>
      <h3>Crawlable structure</h3>
      <p>Next.js makes it easy to generate metadata, sitemaps, and canonical URLs, but those pieces still need to agree with each other. The canonical URL in metadata should match the sitemap URL. The robots file should allow important pages. The blog index should link to every public article. Article pages should return a proper 404 when the slug does not exist.</p>
      <p>I also check that images are real assets, not broken placeholders, and that the article has visible text in the HTML. If content depends entirely on client-side rendering or a third-party widget, a crawler may see less value than a human visitor sees.</p>
      <h3>Trust pages</h3>
      <p>AdSense reviewers expect basic publisher trust signals. A privacy policy should mention cookies, analytics, advertising partners, and how visitors can opt out of personalized ads. Contact information should be easy to find. Terms and disclaimer pages do not need to be legal essays, but they should describe what the site publishes and who is responsible for it.</p>
      <p>For service businesses, I also add local context where it is true: city, country, professional role, and links to credible profiles such as LinkedIn or GitHub. This helps separate a real professional site from a low-effort content farm.</p>
      <h3>Final review routine</h3>
      <p>Before clicking request review, I run a production build, open the generated sitemap, verify ads.txt, check several article pages on mobile, and scan for duplicate titles or placeholder copy. The goal is simple: every indexed page should be useful, navigable, and clearly owned.</p>
    `,
  },
  {
    slug: 'building-rag-workflows-for-newsrooms',
    title: 'Building RAG Workflows for Newsrooms Without Breaking Editorial Control',
    date: '2026-04-30',
    category: 'AI Engineering',
    excerpt:
      'How I think about retrieval, review, source boundaries, and human approval when adding LLM workflows to newsroom systems.',
    img: '/images/blog-2.webp',
    content: `
      <p>Newsrooms are a demanding place to introduce AI. The workflow is fast, the cost of mistakes is high, and editors need control over what gets published. A retrieval-augmented generation system can help with research, summaries, tagging, and archive discovery, but only if it is designed as an editorial assistant rather than an automatic publisher.</p>
      <p>My preferred architecture starts with clear source boundaries. The system should know which content it is allowed to retrieve from: published articles, internal notes, wire copy, PDFs, or a curated knowledge base. Each source should have metadata such as publication date, section, language, author, and permission level. Without that structure, retrieval becomes noisy and the model may blend contexts that should remain separate.</p>
      <h3>Retrieval before generation</h3>
      <p>For newsroom work, I treat retrieval quality as the main product. If the retrieved passages are weak, the generated answer will be weak even with a strong model. Chunk size, metadata filters, language handling, and freshness rules matter more than prompt decoration. For Arabic and English archives, I also test query behavior in both languages because names, places, and transliterations can vary.</p>
      <p>A useful RAG workflow should show its sources. Editors need to see which articles or documents informed the response, when they were published, and whether the answer depends on old information. This is especially important for topics that change quickly.</p>
      <h3>Human approval is a feature</h3>
      <p>I do not design newsroom AI tools to bypass editors. I design them to reduce repetitive work while keeping approval in human hands. A good example is suggested tagging. The model can propose section tags, related topics, and SEO metadata, but the editor should be able to accept, edit, or reject them before publishing.</p>
      <p>The same principle applies to summaries. A model-generated summary can be a draft, but the interface should make it obvious that it is not final. I prefer to store the generated draft, the prompt version, the model used, and the editor who approved the final text. That audit trail helps debugging and accountability.</p>
      <h3>Operational checks</h3>
      <p>RAG systems need monitoring just like APIs. I track failed retrievals, empty results, slow queries, rejected suggestions, and user feedback. If editors keep rewriting a certain type of output, that is a product signal. The fix might be better metadata, a narrower prompt, a smaller source set, or a workflow change.</p>
      <p>The best newsroom AI systems feel practical. They help an editor find archive context, prepare a cleaner first draft, or classify content faster. They do not ask the newsroom to trust a black box with publication authority.</p>
    `,
  },
  {
    slug: 'api-design-lessons-payment-gateways-qatar',
    title: 'API Design Lessons From Payment Gateway Integrations in Qatar',
    date: '2026-04-24',
    category: 'API Development',
    excerpt:
      'What payment integrations taught me about idempotency, reconciliation, failure states, and customer support workflows.',
    img: '/images/blog-3.webp',
    content: `
      <p>Payment gateway work looks simple from the outside: send an amount, redirect the customer, receive a callback. In production, the hard part is not the happy path. The hard part is every state between paid and failed, especially when the customer closes a browser tab, the callback arrives late, or the gateway status does not match the local order.</p>
      <p>Across integrations with providers such as Stripe, CyberSource, Qpay, and Sadad, I learned to design payment APIs around reconciliation first. The local application should never depend only on a frontend success screen. It needs server-side callbacks, status polling where available, signed payload verification, and a way for support staff to inspect what happened.</p>
      <h3>Idempotency protects customers</h3>
      <p>Every payment initiation should have an internal reference that can be safely retried. If a user taps the payment button twice or a mobile app retries after a timeout, the system should not create duplicate orders or charge attempts without intention. Idempotency keys and unique transaction references make the flow predictable.</p>
      <p>I also separate the business order from the payment attempt. An order may have multiple attempts: failed card, expired session, successful retry, refund, or manual correction. Keeping those as separate records makes reporting and support much easier.</p>
      <h3>Callbacks are not enough</h3>
      <p>Gateway callbacks can be delayed or blocked by networking issues. For important orders, I add a reconciliation task that checks pending payments after a short interval. This task asks the gateway for the authoritative status and updates the local record only after verifying signatures and expected amounts.</p>
      <p>Amounts deserve special care. Currency, decimal precision, service fees, and refunds should be represented consistently. A mismatch of one minor unit can create hours of support work if the logs do not show how the final amount was calculated.</p>
      <h3>Design for support teams</h3>
      <p>A payment integration is not finished until a non-developer can answer basic questions: did the customer reach the gateway, did the bank approve the payment, did our callback succeed, was the order fulfilled, and what should happen next? I like to expose a compact transaction timeline in the admin panel for exactly this reason.</p>
      <p>Good payment API design is mostly about boring reliability. The smoother the edge cases are, the less visible the integration becomes to customers.</p>
    `,
  },
  {
    slug: 'nextjs-performance-notes-for-media-sites',
    title: 'Next.js Performance Notes for Media and Portfolio Sites',
    date: '2026-04-18',
    category: 'Next.js',
    excerpt:
      'A practical look at images, metadata, routing, and rendering choices that affect real users on content-heavy Next.js sites.',
    img: '/images/blog-4.webp',
    content: `
      <p>Performance work on a Next.js site should begin with the page people actually visit, not a synthetic ideal. For a media or portfolio site, that usually means the homepage, article pages, portfolio grid, and contact page. Each has a different bottleneck: images, scripts, font loading, third-party embeds, or too much client-side JavaScript.</p>
      <p>I prefer to keep content pages as server components whenever possible. Static text, article metadata, and image paths do not need client state. Client components are useful for filters, forms, and interactive controls, but using them for an entire content page increases JavaScript without improving the reading experience.</p>
      <h3>Images are usually the first win</h3>
      <p>Large portfolio screenshots and profile photos can make a good site feel slow if they are not sized correctly. I use Next.js Image for local assets, set meaningful width and height values, and avoid loading every image with priority. The first visible image may deserve priority; the rest should usually lazy load.</p>
      <p>Alt text should describe the image in a useful way. It is not a place to repeat keywords. For portfolio screenshots, a good alt text can mention the project name and what the screenshot shows. This helps accessibility and gives search engines cleaner context.</p>
      <h3>Metadata should be specific</h3>
      <p>Every important page needs a unique title, description, canonical URL, and Open Graph data. Article pages should use the article title and excerpt rather than a generic site description. Portfolio and service pages should explain the actual offer or evidence on the page.</p>
      <p>I also keep sitemap output aligned with real content. If a site has hundreds of generated posts that are not ready for readers, those pages should not appear in the sitemap. Search quality starts with choosing what deserves to be indexed.</p>
      <h3>Third-party scripts</h3>
      <p>Analytics, maps, icon libraries, and ads can all affect page speed. Some are necessary, but they should be loaded intentionally. If a script is not needed on the first paint, I load it after the page becomes interactive or replace it with a lighter local alternative.</p>
      <p>The best performance improvements are usually straightforward: fewer unnecessary client components, correctly sized images, clean metadata, and a content set that is worth crawling.</p>
    `,
  },
  {
    slug: 'portfolio-case-study-al-sharq-peninsula-platforms',
    title: 'Portfolio Notes: Scaling News Platforms for Al Sharq and The Peninsula Qatar',
    date: '2026-04-10',
    category: 'Case Study',
    excerpt:
      'A concise portfolio note on the engineering concerns behind high-traffic publishing platforms in Qatar.',
    img: '/images/peninsula.webp',
    content: `
      <p>Working on major Qatar publishing platforms taught me that news engineering is a mix of speed, discipline, and empathy for editorial teams. A reader sees headlines, images, and article pages. Behind that, the platform has to support breaking news, search visibility, media uploads, mobile apps, APIs, caching, and fast recovery when something fails.</p>
      <p>For platforms such as Al Sharq News and The Peninsula Qatar, the engineering challenge is not only building features. It is keeping the site stable when attention suddenly arrives. Traffic can rise around public events, sports stories, weather, policy announcements, or regional news. The stack needs to absorb those spikes without making editors wait.</p>
      <h3>Backend priorities</h3>
      <p>On the backend, I focus on query performance, clean content models, safe publishing workflows, and predictable API responses. Indexing decisions matter because article pages, category pages, search pages, and mobile feeds all query the same content in different ways. A small inefficient query can become expensive when it runs across many high-traffic pages.</p>
      <p>APIs also need clear contracts. Mobile apps, web frontends, and internal tools should not each invent a different shape for the same article. Consistent API responses make caching easier and reduce bugs when the newsroom changes a content field.</p>
      <h3>Frontend priorities</h3>
      <p>On the frontend, readers need fast page loads and stable layouts. News pages often include images, embeds, related articles, tags, ads, and analytics. If those pieces are not managed carefully, the page shifts while the reader is trying to read. Good layout structure and image dimensions help avoid that.</p>
      <p>SEO metadata is also part of the product. Article titles, canonical URLs, structured data, Open Graph images, and sitemap freshness all help the content travel correctly across search and social platforms.</p>
      <h3>What success looks like</h3>
      <p>Success is a platform that feels calm under pressure. Editors can publish quickly, readers can open pages on mobile connections, and the technical team can measure what is happening. That is the kind of work I want my portfolio to show: not only visual screenshots, but the engineering judgment behind them.</p>
    `,
  },
  {
    slug: 'laravel-api-versioning-for-mobile-apps',
    title: 'Laravel API Versioning Notes for Mobile Apps That Cannot Update Immediately',
    date: '2026-04-02',
    category: 'Laravel',
    excerpt:
      'How I keep Laravel APIs stable for mobile apps while still shipping backend improvements and schema changes.',
    img: '/images/blog-5.webp',
    content: `
      <p>Mobile API work has a constraint that web teams sometimes forget: users do not all update at the same time. A Laravel backend can be deployed in minutes, but an iOS or Android app version may stay in the market for months. That means API changes need a compatibility plan before they reach production.</p>
      <p>I usually start by defining which fields are part of the public contract and which are internal implementation details. Public fields should not disappear without a version change. New optional fields are easier to ship, but renamed fields, changed enum values, and different pagination structures need more care.</p>
      <h3>Version routes around behavior</h3>
      <p>I do not create a new API version for every small response addition. I reserve version changes for behavior that an older client cannot safely understand. In Laravel, that might mean separate route groups such as /api/v1 and /api/v2, separate resource transformers, and tests that pin the exact response shape expected by each client.</p>
      <p>Transformers are especially useful because they keep database changes away from the API surface. The backend can normalize a table, add relationships, or rename internal columns while the mobile response remains stable.</p>
      <h3>Deprecation needs visibility</h3>
      <p>A versioning strategy only works if the team can see which clients are still using older endpoints. I like to log app version, platform, endpoint, and response status for critical API traffic. That data helps decide when an old version can be retired and which users may need an app update reminder.</p>
      <p>For high-risk changes, I also add temporary compatibility code instead of forcing a hard break. It is less elegant in the short term, but it protects customers and support teams.</p>
      <h3>Documentation is part of the API</h3>
      <p>Good API documentation should include sample requests, sample responses, error formats, authentication rules, pagination, and version notes. The best time to update it is in the same pull request as the API change. If documentation is treated as a later task, it usually becomes inaccurate.</p>
      <p>Stable APIs are not frozen APIs. They are APIs that change with a clear contract, measured adoption, and respect for the clients already in the field.</p>
    `,
  },
  {
    slug: 'technical-seo-for-portfolio-project-pages',
    title: 'Technical SEO for Portfolio Project Pages: What I Include Beyond Screenshots',
    date: '2026-03-26',
    category: 'Technical SEO',
    excerpt:
      'A practical structure for portfolio pages that show evidence, context, and implementation detail instead of only thumbnails.',
    img: '/images/qatarpressc.webp',
    content: `
      <p>A portfolio grid can prove that work exists, but it rarely proves how the work was done. For search engines and potential clients, project pages need more context than a title, screenshot, and external link. They should explain the problem, the audience, the technical contribution, and the result.</p>
      <p>When I improve portfolio content, I look for missing evidence. Did the project involve Laravel, React, Next.js, mobile APIs, hosting, or technical SEO? Was the work a migration, redesign, integration, performance improvement, or internal system? Each answer gives the page a clearer purpose.</p>
      <h3>Use specific project descriptions</h3>
      <p>Generic phrases such as "modern website" or "custom solution" do not help readers understand the work. A better description explains what changed: a publishing workflow became faster, an API supported mobile apps, a payment flow became easier to reconcile, or a site structure became easier to crawl.</p>
      <p>I also avoid exaggerating metrics. If a number is public or confidently attributable, I use it. If not, I describe the engineering outcome without pretending to own every business result.</p>
      <h3>Connect screenshots to decisions</h3>
      <p>Screenshots are useful, but captions and alt text should connect them to the implementation. A news homepage screenshot might represent caching, editorial layout, category navigation, and image optimization. An admin dashboard screenshot might represent workflow design, permissions, and reporting.</p>
      <p>That context helps human visitors and gives crawlers more meaningful content around visual assets.</p>
      <h3>Make trust easy to verify</h3>
      <p>External links, clear contact details, an about page, and social profiles all help visitors verify who is behind the work. For AdSense review, those trust signals matter because the site needs to look like a real publisher, not a thin collection of pages made only for ads.</p>
    `,
  },
  {
    slug: 'hosting-checklist-for-laravel-nextjs-sites',
    title: 'Hosting Checklist for Laravel and Next.js Sites Before Launch',
    date: '2026-03-18',
    category: 'Hosting',
    excerpt:
      'The deployment checks I use for SSL, caching, backups, environment variables, logs, and rollback readiness.',
    img: '/images/blog-6.webp',
    content: `
      <p>A launch checklist is useful because production issues are often simple things missed under pressure. For Laravel and Next.js projects, I check the application, server, DNS, cache, storage, and monitoring layers before moving traffic.</p>
      <p>The first step is environment separation. Production credentials, API keys, database connections, mail settings, payment secrets, and analytics IDs should not be copied from local development without review. I also confirm that debug mode is disabled and error pages are user-friendly.</p>
      <h3>Server and SSL checks</h3>
      <p>SSL should be active before launch, with HTTP redirecting to HTTPS. The server should have the correct PHP or Node version, process manager, file permissions, queue workers, scheduler, and storage links. For Laravel, I verify config cache, route cache, migrations, queues, and log permissions. For Next.js, I verify build output, image handling, environment variables, and the start command.</p>
      <p>DNS changes should be planned with TTL in mind. Lowering TTL ahead of migration can make a launch smoother if a rollback is needed.</p>
      <h3>Backups and rollback</h3>
      <p>I do not consider a site ready until backups have been tested. A backup that cannot be restored is only a hopeful file. Before launch, I confirm database backups, uploaded media backups, and a rollback path for the deployed code.</p>
      <p>For content sites, I also verify robots.txt, sitemap.xml, canonical URLs, redirects, and 404 behavior. These are easy to miss because they are not always visible in the main UI.</p>
      <h3>After launch</h3>
      <p>Immediately after launch, I watch logs, analytics, uptime checks, form submissions, and key pages on mobile. The goal is to catch small issues before users report them. Calm launches come from boring preparation.</p>
    `,
  },
  {
    slug: 'ai-feature-readiness-checklist-for-business-apps',
    title: 'AI Feature Readiness Checklist for Business Apps',
    date: '2026-03-10',
    category: 'AI Engineering',
    excerpt:
      'Questions I ask before adding LLM features to production business software, from data boundaries to review workflows.',
    img: '/images/blog-2.webp',
    content: `
      <p>Adding an AI feature to a business app should start with a workflow question, not a model question. The team needs to know what decision or task the feature improves, who reviews the output, and what happens when the model is uncertain.</p>
      <p>My first check is data boundaries. Which records can the model access? Are there private customer notes, payment details, health information, or internal documents that should never be sent to an external API? If the answer is unclear, the project needs data classification before implementation.</p>
      <h3>Define acceptable output</h3>
      <p>Every AI feature needs a definition of acceptable output. For a summary tool, that may mean no invented facts, source references, and a maximum length. For a support assistant, it may mean only answering from approved documentation. For an internal classifier, it may mean confidence thresholds and manual review for low-confidence cases.</p>
      <p>These rules should be visible in tests and product behavior, not only in a prompt.</p>
      <h3>Design the human review path</h3>
      <p>In production software, the review path is as important as the generated text. Users need to edit, accept, reject, or regenerate. The system should store enough context to troubleshoot poor results: model name, prompt version, retrieval sources, user action, and timestamp.</p>
      <p>This does not make the system heavy. It makes it maintainable after real users begin finding edge cases.</p>
      <h3>Measure usefulness</h3>
      <p>I track whether users accept suggestions, how often they edit them, and which tasks still require manual work. If the AI feature creates more review work than it saves, the solution may need a narrower scope, better retrieval, or a simpler automation rule.</p>
      <p>The best AI features feel like reliable workflow improvements. They are clear about boundaries, honest about uncertainty, and easy for humans to supervise.</p>
    `,
  },
] satisfies BlogPost[];

export default curatedPosts;
