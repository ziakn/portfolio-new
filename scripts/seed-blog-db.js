const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'blog.sqlite');
const jsonPath = path.join(dbDir, 'blog-posts.json');

fs.mkdirSync(dbDir, { recursive: true });

const TARGET_TOTAL = 1000;
// Generated posts are scheduled one per day starting here, so exactly one new
// post becomes live each day (the app shows posts whose date <= today).
const GENERATED_START = new Date('2026-06-22T00:00:00.000Z');

/* ============================================================================
 * 1) EVERGREEN LIBRARY — genuinely hand-written, already live (past dates).
 *    These are the strongest, original articles and lead the blog.
 * ========================================================================== */
const evergreenPosts = [
  {
    slug: 'how-to-choose-a-laravel-developer-in-qatar',
    title: 'How to Choose a Laravel Developer in Qatar',
    date: '2026-06-12',
    category: 'Laravel',
    excerpt:
      'A practical, vendor-neutral guide for Qatar businesses evaluating a Laravel developer: how to judge fit, process, code quality, and long-term maintainability.',
    img: '/images/al-sharq.webp',
    content: `
      <p>Hiring a Laravel developer in Qatar is rarely about finding someone who can write PHP. Most developers can build a feature that works in a demo. The real question is whether the person can build software that stays maintainable, performs under real traffic, and can be handed to another engineer two years from now without a rewrite.</p>
      <p>This guide is written for business owners and project managers who are not developers themselves but still have to make a confident decision.</p>
      <h3>Start with the problem, not the technology</h3>
      <p>Before comparing developers, write down what the project must achieve in plain language: the users, the core workflow, the integrations, and what success looks like in six months. A strong Laravel developer will ask about these things before talking about frameworks. If the first conversation is only about tools and price, that is a warning sign.</p>
      <h3>What to look for in their work</h3>
      <ul>
        <li><strong>Readable code over clever code.</strong> Ask to see a real repository or a sample. Clear naming, small functions, and tests matter more than impressive one-liners.</li>
        <li><strong>Database discipline.</strong> Good Laravel work shows thoughtful migrations, indexes, and relationships — not everything crammed into one table.</li>
        <li><strong>Validation and error handling.</strong> Production apps live or die on the unhappy path. Ask how they handle failed payments, bad input, and third-party outages.</li>
        <li><strong>Deployment story.</strong> Can they describe how code goes from their machine to production safely, with backups and a rollback plan?</li>
      </ul>
      <h3>Questions that reveal experience</h3>
      <p>Useful interview questions are specific: "How would you keep the site fast if traffic suddenly doubled?", "How do you handle a database change without downtime?", "What do you do when a payment callback arrives late?" The answers show whether the developer has shipped real systems or only tutorials.</p>
      <h3>Local context matters</h3>
      <p>In Qatar, projects often need bilingual Arabic and English content, local payment gateways such as Qpay or Sadad, and hosting choices that respect latency for regional users. A developer who has worked on these specifics will save you weeks of discovery.</p>
      <h3>Protect yourself with ownership</h3>
      <p>Agree in writing that you own the code, the repository, the domains, and the hosting accounts. Ask for documentation and a short handover. The goal is never to be locked to one person. A confident developer is comfortable making themselves replaceable.</p>
      <p>The best hire is usually the one who explains tradeoffs honestly, scopes the work realistically, and talks about maintenance — not the one who promises everything quickly and cheaply.</p>
    `,
  },
  {
    slug: 'nextjs-seo-fundamentals-metadata-sitemaps-structured-data',
    title: 'Next.js SEO Fundamentals: Metadata, Sitemaps, and Structured Data',
    date: '2026-06-05',
    category: 'Next.js SEO',
    excerpt:
      'A developer-focused walkthrough of the SEO building blocks the App Router gives you — and the mistakes that quietly keep good pages from ranking.',
    img: '/images/blog-1.webp',
    content: `
      <p>Next.js gives you everything you need for strong technical SEO, but the pieces only help if they agree with each other. A page can have a perfect title and still be invisible if its canonical URL, sitemap entry, and robots rules contradict it. This article walks through the fundamentals in the order I actually check them.</p>
      <h3>1. Unique, specific metadata per page</h3>
      <p>Every important route should export its own <code>metadata</code> with a unique title and description that match what is on the page. The most common mistake is letting a generic site-wide description leak onto article and service pages. A title that describes the page beats a title stuffed with keywords every time.</p>
      <h3>2. One honest canonical URL</h3>
      <p>Each page should declare a single canonical URL, and that URL must be the same one you put in the sitemap. Conflicting canonicals are one of the quietest causes of "Google found it but didn't index it." Pick the real address and use it everywhere consistently.</p>
      <h3>3. A sitemap that reflects reality</h3>
      <p>Generate your sitemap from the same data that renders your pages, so it never drifts out of date. Just as important: only include pages that deserve to be indexed. If you have hundreds of thin or unfinished pages, leaving them out of the sitemap is a feature, not a limitation.</p>
      <h3>4. Structured data that is true</h3>
      <p>JSON-LD for articles, breadcrumbs, and your organization helps search engines understand the page. The rule is simple: only describe what is actually visible. Marking up a rating or author that does not appear on the page is the kind of mismatch that erodes trust.</p>
      <h3>5. Render the content on the server</h3>
      <p>Keep content pages as server components so the text exists in the initial HTML. If the main content only appears after client-side JavaScript runs, crawlers may see far less than your visitors do. Reserve client components for genuinely interactive controls.</p>
      <blockquote>The fastest SEO win on most Next.js sites is not a new tool — it is making the title, canonical, sitemap, and on-page content tell the same story.</blockquote>
      <p>Get these five fundamentals aligned before reaching for anything more advanced. They cover the majority of real-world ranking problems on content and service sites.</p>
    `,
  },
  {
    slug: 'core-web-vitals-guide-content-sites',
    title: 'A Practical Core Web Vitals Guide for Content-Heavy Sites',
    date: '2026-05-28',
    category: 'Performance',
    excerpt:
      'What LCP, INP, and CLS actually measure, where content sites usually lose points, and the fixes that move the numbers most.',
    img: '/images/blog-3.webp',
    content: `
      <p>Core Web Vitals can feel abstract until you connect each metric to something a reader feels. Once you do, the fixes become obvious. This guide focuses on content-heavy sites — blogs, news, and portfolios — where images, fonts, and third-party scripts are usually the culprits.</p>
      <h3>Largest Contentful Paint (LCP) — how fast the main thing appears</h3>
      <p>On an article page, the largest element is usually the hero image or the headline. To improve LCP, give the hero image an explicit size, mark it as priority so it loads early, and serve it in a modern format like WebP. Slow server response and render-blocking fonts also hurt LCP, so keep the critical path lean.</p>
      <h3>Interaction to Next Paint (INP) — how responsive the page feels</h3>
      <p>INP measures how quickly the page reacts when someone taps or clicks. The biggest enemy is too much JavaScript running on the main thread. On content pages, the cure is usually to ship less client-side code: keep reading pages as server components and load non-essential scripts after the page is interactive.</p>
      <h3>Cumulative Layout Shift (CLS) — how stable the page is</h3>
      <p>Nothing frustrates a reader more than text jumping as an ad or image loads. CLS is almost always fixable by reserving space: set width and height on every image, give ad slots a fixed container, and avoid injecting banners above existing content.</p>
      <h3>A simple working order</h3>
      <ol>
        <li>Measure real pages, not the homepage only — article pages behave differently.</li>
        <li>Fix the hero image first (size, format, priority). This often moves LCP the most.</li>
        <li>Audit third-party scripts; defer or remove anything not needed on first paint.</li>
        <li>Reserve space for every image and embed to kill layout shift.</li>
        <li>Re-measure on a mid-range phone with a throttled connection, not your laptop.</li>
      </ol>
      <p>Performance work rewards honesty about what real users experience. A site that feels fast on a developer's machine can still feel slow on a phone in a moving car — and that is the experience Google is measuring.</p>
    `,
  },
  {
    slug: 'designing-rest-apis-frontend-mobile-teams-enjoy',
    title: 'Designing REST APIs Frontend and Mobile Teams Actually Enjoy',
    date: '2026-05-20',
    category: 'API Development',
    excerpt:
      'Consistency, predictable errors, sensible pagination, and clear contracts — the design choices that make an API pleasant instead of painful.',
    img: '/images/blog-5.webp',
    content: `
      <p>A good API is one that another team can use without messaging you. Most API frustration does not come from missing features — it comes from inconsistency, surprising errors, and contracts that change without warning. Here is how I keep server APIs pleasant for the people consuming them.</p>
      <h3>Be relentlessly consistent</h3>
      <p>Pick conventions and apply them everywhere: the same casing for fields, the same date format, the same shape for lists, the same envelope for errors. A consumer should be able to guess the shape of an endpoint they have never called because every other endpoint taught them the pattern.</p>
      <h3>Design errors as carefully as success</h3>
      <p>Every error should return a correct HTTP status, a stable machine-readable code, and a human-readable message. Validation failures should say which field failed and why. Frontend and mobile teams build real user experiences on top of these errors, so a vague "something went wrong" forces them to guess.</p>
      <h3>Paginate predictably</h3>
      <p>Decide on one pagination style and document it: page-based for simple lists, cursor-based for large or fast-changing data. Always return enough metadata for the client to know whether more results exist. Inconsistent pagination across endpoints is a common source of subtle bugs.</p>
      <h3>Separate the API shape from the database</h3>
      <p>Use a transformer or resource layer so your API responses are not a direct mirror of your tables. This lets you rename columns, add relationships, or optimize storage without breaking clients. The API is a contract; the database is an implementation detail.</p>
      <h3>Version only when behavior breaks</h3>
      <p>Adding an optional field is safe and needs no new version. Removing a field, renaming it, or changing what a value means does. Reserve version bumps for genuine breaking changes, and log which clients still use old versions so you know when it is safe to retire them — this matters especially for mobile apps that update slowly.</p>
      <h3>Document in the same change</h3>
      <p>The best moment to update the docs is in the same pull request that changes the API. Sample request, sample response, error formats, and auth rules belong together. Documentation written "later" is documentation that is wrong.</p>
      <p>None of this is glamorous, and that is the point. The APIs people love are the ones that are boring, predictable, and never surprise them.</p>
    `,
  },
  {
    slug: 'wordpress-vs-laravel-business-website',
    title: 'WordPress vs Laravel: Choosing the Right Stack for a Business Website',
    date: '2026-05-14',
    category: 'Strategy',
    excerpt:
      'A balanced comparison for business owners deciding between a CMS and a custom framework — based on workflow, budget, and how custom the product really is.',
    img: '/images/blog-4.webp',
    content: `
      <p>"Should we build it in WordPress or Laravel?" is one of the most common questions I hear from businesses in Qatar. The honest answer is that they solve different problems, and the right choice depends on how custom your product actually is — not on which technology is more fashionable.</p>
      <h3>When WordPress is the right call</h3>
      <p>WordPress is excellent when the site is mostly content: a company website, a blog, a brochure site, or a simple catalog. Editors can publish without a developer, there is a huge ecosystem of themes and plugins, and the cost to launch is low. If your main need is pages, posts, and a contact form, a custom framework is usually overkill.</p>
      <h3>When Laravel earns its cost</h3>
      <p>Laravel shines when the product has real business logic: custom workflows, dashboards, role-based permissions, payment reconciliation, mobile APIs, or integrations that do not fit a plugin. You pay more upfront, but you get a codebase shaped exactly around your operations, without the plugin sprawl that makes some WordPress sites fragile over time.</p>
      <h3>A simple way to decide</h3>
      <ul>
        <li>Mostly publishing content and marketing pages? <strong>WordPress.</strong></li>
        <li>An application with custom rules, accounts, and integrations? <strong>Laravel.</strong></li>
        <li>A content site today, but a custom platform within a year? Consider Laravel with a headless CMS, or start lean and plan the migration.</li>
      </ul>
      <h3>The hidden costs people forget</h3>
      <p>WordPress is cheap to start but needs ongoing care: plugin updates, security hardening, and performance tuning as plugins accumulate. Laravel costs more to build but tends to be cheaper to reason about as it grows, because the logic is yours and explicit. Neither is "low maintenance" — they just move the maintenance to different places.</p>
      <h3>It is not always either/or</h3>
      <p>Many businesses run both: a WordPress site for marketing content and a Laravel application for the actual product or portal. Letting each tool do what it is best at is often smarter than forcing everything into one stack.</p>
      <p>Choose based on how much of your product is genuinely custom. That single question answers the WordPress-versus-Laravel debate more reliably than any feature checklist.</p>
    `,
  },
  {
    slug: 'bilingual-arabic-english-websites-engineering-seo',
    title: 'Building Bilingual Arabic and English Websites: Engineering and SEO',
    date: '2026-05-06',
    category: 'Localization',
    excerpt:
      'The engineering and SEO decisions behind bilingual sites for Qatar — RTL layout, URL strategy, hreflang, and content models that do not make translation an afterthought.',
    img: '/images/alarab.webp',
    content: `
      <p>Bilingual Arabic and English websites are normal in Qatar, but they are often treated as a translation task bolted on at the end. The result is broken layouts, duplicate content problems, and URLs that confuse search engines. Done properly, bilingual support is an architecture decision made at the start.</p>
      <h3>Right-to-left is more than text direction</h3>
      <p>Arabic is read right-to-left, and that affects far more than paragraph alignment. Navigation, icons, form layouts, progress steps, and spacing all need to mirror. Building with logical CSS properties (start/end instead of left/right) lets one stylesheet serve both directions instead of maintaining two fragile layouts.</p>
      <h3>Give each language a real URL</h3>
      <p>Each language version should live at its own crawlable URL — typically a path prefix like <code>/en</code> and <code>/ar</code>. Avoid switching languages only with cookies or JavaScript, because search engines then see one ambiguous page instead of two indexable ones.</p>
      <h3>Tell search engines about the pair</h3>
      <p>Use hreflang tags so Google knows the English and Arabic pages are alternates of each other, not duplicates. This helps the right version appear for the right audience and prevents the two from competing. Each page should also carry its own canonical pointing to itself.</p>
      <h3>Model content for two languages from the start</h3>
      <p>The database should treat translations as first-class data, not as copied rows that drift apart. Store a shared identity for a piece of content with per-language fields for title, slug, body, and metadata. This keeps the two versions linked, makes it obvious what still needs translating, and lets editors manage both without duplicating the entire workflow.</p>
      <h3>Localize the details, not just the body</h3>
      <p>Real localization includes dates, numbers, currency, form validation messages, and metadata. A page that translates the article but leaves the buttons and error messages in English feels unfinished — to readers and to search engines judging quality.</p>
      <p>Plan bilingual support as a foundation and it becomes invisible: both audiences get a site that feels native, and search engines understand exactly what each page is for.</p>
    `,
  },
  {
    slug: 'caching-strategies-high-traffic-laravel',
    title: 'Caching Strategies for High-Traffic Laravel Applications',
    date: '2026-04-28',
    category: 'Laravel',
    excerpt:
      'A layered look at caching in Laravel — from query and response caching to invalidation discipline — for apps that need to stay fast under load.',
    img: '/images/alsharqtech.webp',
    content: `
      <p>Caching is the difference between a Laravel app that calmly handles a traffic spike and one that falls over the moment it gets attention. But caching is also where subtle bugs live, because a cache that is never invalidated correctly will happily serve wrong data to everyone. The goal is to cache aggressively and invalidate precisely.</p>
      <h3>Think in layers</h3>
      <p>There is no single cache. A high-traffic app usually has several working together:</p>
      <ul>
        <li><strong>Application config and routes.</strong> Cached at deploy time so the framework boots fast.</li>
        <li><strong>Database query results.</strong> Expensive or frequently repeated queries cached for seconds or minutes.</li>
        <li><strong>Rendered fragments or full responses.</strong> Pages or components that rarely change, cached close to the user.</li>
        <li><strong>External API responses.</strong> Third-party data cached to protect against rate limits and outages.</li>
      </ul>
      <h3>Cache the expensive, not the trivial</h3>
      <p>Measure before caching. The right targets are queries and computations that are both slow and frequent. Caching a query that already runs in a millisecond adds complexity for no benefit, and every cache you add is something you must remember to invalidate.</p>
      <h3>Invalidation is the hard part</h3>
      <p>The famous joke that cache invalidation is one of the two hard problems in computing is true. Tie cache keys to the data they represent and clear them when that data changes — for example, clearing an article's cache when an editor updates it. Tag-based invalidation helps when many cached items depend on the same record. Avoid blanket "clear everything" calls, which throw away good cache and cause stampedes.</p>
      <h3>Guard against stampedes</h3>
      <p>When a popular cached item expires, hundreds of requests can try to regenerate it at once and overload the database. Techniques like locking during regeneration, or serving slightly stale data while one process refreshes, keep the system stable during these moments.</p>
      <h3>Make cache state visible</h3>
      <p>In production, you want to know your hit rate, what is cached, and how to safely clear a single key. A cache you cannot inspect is a cache you cannot trust when something looks wrong. A small admin view or a few good log lines pay for themselves the first time data looks stale.</p>
      <p>Done with discipline, caching is invisible to users and to the database alike. It is one of the highest-leverage tools for keeping a Laravel platform fast as it grows.</p>
    `,
  },
  {
    slug: 'mvp-tech-stack-for-startups',
    title: 'From Idea to MVP: A Pragmatic Tech Stack for New Products',
    date: '2026-04-21',
    category: 'Startups',
    excerpt:
      'How to choose a stack for a first version that ships fast, stays cheap, and does not trap you when the product finds traction.',
    img: '/images/blog-6.webp',
    content: `
      <p>Choosing a tech stack for an MVP is a balancing act. Pick something too trendy and you spend your runway fighting tooling. Pick something too rigid and you cannot pivot when you learn what users actually want. The right MVP stack is boring, well-documented, and fast to change.</p>
      <h3>Optimize for speed of learning</h3>
      <p>The point of an MVP is to learn whether anyone wants the product. Every technical choice should serve that goal. That usually means a single, well-understood framework, a managed database, and a hosting platform that deploys with one command. Save the microservices and exotic infrastructure for when you have users to justify them.</p>
      <h3>A stack that rarely lets you down</h3>
      <p>For most products, a proven full-stack framework (Laravel or Next.js, depending on whether the heart of the product is backend logic or a rich interface), a relational database like PostgreSQL or MySQL, and a managed host will take you a long way. These are tools with huge communities, so when you hit a problem at 2am, the answer already exists.</p>
      <h3>Build only the core loop</h3>
      <p>Identify the one workflow that delivers your product's value and build only that, end to end. Resist the urge to add settings pages, admin dashboards, and edge cases before a single user has tried the core loop. Most of those features will change once real people use the product.</p>
      <h3>Choices that buy you flexibility</h3>
      <ul>
        <li>Keep business logic out of the UI so you can change the interface without rewriting the rules.</li>
        <li>Use a relational database — it is far easier to grow into than to migrate away from later.</li>
        <li>Put third-party services (email, payments, SMS) behind a thin layer so you can swap providers.</li>
        <li>Write down decisions, not just code, so the next developer understands the why.</li>
      </ul>
      <h3>Avoid premature scaling</h3>
      <p>The most common MVP mistake is building for a million users you do not have yet. A single well-configured server handles more traffic than most early startups will ever see. Scale when the metrics demand it, and let real usage tell you where the bottleneck actually is — it is rarely where you guessed.</p>
      <p>A good MVP stack is one you stop thinking about, so you can spend your attention on customers instead of infrastructure.</p>
    `,
  },
  {
    slug: 'database-indexing-basics-backend-developers',
    title: 'Database Indexing Basics Every Backend Developer Should Know',
    date: '2026-04-14',
    category: 'Backend',
    excerpt:
      'A plain-language explanation of how indexes work, when they help, when they hurt, and how to find the queries that need them.',
    img: '/images/blog-2.webp',
    content: `
      <p>Indexing is one of those topics that separates an application that stays fast from one that mysteriously slows down as data grows. The good news is that the core idea is simple, and a handful of habits prevent most performance problems.</p>
      <h3>What an index actually is</h3>
      <p>An index is like the index at the back of a book. Without it, the database reads every row to find what you asked for — fine with a thousand rows, painful with a million. With an index, the database jumps almost directly to the matching rows. That is the entire benefit: avoiding full scans of large tables.</p>
      <h3>What to index</h3>
      <p>Index the columns you filter, join, and sort on frequently. Foreign keys are almost always worth indexing because they are used in joins constantly. A column in a <code>WHERE</code> clause on a large, busy table is a strong candidate. The columns in your <code>ORDER BY</code> can benefit too.</p>
      <h3>Why not index everything</h3>
      <p>Indexes are not free. Every index must be updated on every insert, update, and delete, so too many indexes slow down writes and consume storage. The skill is choosing the few indexes that serve your real query patterns rather than blanketing every column.</p>
      <h3>Composite indexes and order</h3>
      <p>When you filter on several columns together, a single composite index covering those columns can beat several separate ones. Order matters: put the most selective or most-frequently-filtered column first. A composite index on (status, created_at) helps a query that filters by status and then sorts by date — but the column order has to match how you query.</p>
      <h3>Find the queries that need help</h3>
      <p>Do not guess. Use your database's slow query log and the <code>EXPLAIN</code> command, which shows whether a query uses an index or scans the whole table. The phrase you are looking to eliminate is the full table scan on a large table. Fix those, and most performance complaints disappear.</p>
      <blockquote>Add indexes in response to real slow queries, not in anticipation of imaginary ones. Measure, then index.</blockquote>
      <p>Indexing well is mostly about knowing your queries. Once you can read an <code>EXPLAIN</code> output, the right indexes usually become obvious.</p>
    `,
  },
  {
    slug: 'securing-laravel-application-checklist',
    title: 'Securing a Laravel Application: A Practical Checklist',
    date: '2026-04-07',
    category: 'Security',
    excerpt:
      'A grounded security checklist for real Laravel apps — authentication, authorization, input handling, secrets, and the operational basics that prevent most incidents.',
    img: '/images/blog-1.webp',
    content: `
      <p>Most security incidents are not exotic. They come from missed basics: an unprotected route, a leaked key, an unvalidated upload, or a dependency that was never updated. This checklist focuses on the practical controls that prevent the majority of real problems in a Laravel application.</p>
      <h3>Authentication and sessions</h3>
      <p>Use the framework's built-in authentication rather than rolling your own. Enforce reasonable password rules, hash passwords with the framework defaults, and consider two-factor authentication for admin accounts. Make sure sessions expire sensibly and that logging out truly invalidates the session.</p>
      <h3>Authorization on every action</h3>
      <p>Authentication confirms who someone is; authorization controls what they can do. Every sensitive action should check permission with policies or gates — not just hide a button in the UI. The most common real-world vulnerability is an endpoint that trusts the request without verifying the user is allowed to touch that specific record.</p>
      <h3>Validate and escape everything from users</h3>
      <ul>
        <li>Validate all input with form requests; never trust data because the frontend "already checked it."</li>
        <li>Use the query builder or Eloquent so queries are parameterized, which prevents SQL injection.</li>
        <li>Let Blade escape output by default; be extremely careful with any raw, unescaped rendering.</li>
        <li>Restrict file uploads by type and size, store them outside the web root, and never trust the original filename.</li>
      </ul>
      <h3>Protect secrets</h3>
      <p>Keep credentials in environment variables, never in the repository. Make sure debug mode is off in production so stack traces never leak configuration. Rotate keys if they were ever exposed, and limit who can read production environment files.</p>
      <h3>Keep dependencies current</h3>
      <p>Outdated packages are a leading cause of breaches. Update regularly, watch for security advisories, and remove dependencies you no longer use. A smaller dependency tree is a smaller attack surface.</p>
      <h3>Operational basics</h3>
      <p>Enforce HTTPS everywhere, set security headers, rate-limit authentication and API endpoints, and keep audit logs for sensitive actions. Test your backups by restoring them. Security is not a one-time task — it is a habit of small, consistent precautions that make an attacker's job not worth the effort.</p>
    `,
  },
  {
    slug: 'zero-downtime-news-migration-laravel-qatar',
    title: 'How I Plan Zero-Downtime Laravel Migrations for High-Traffic News Sites',
    date: '2026-03-26',
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
    date: '2026-03-18',
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
    date: '2026-03-10',
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
    date: '2026-03-02',
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
    date: '2026-02-22',
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
    date: '2026-02-12',
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
    date: '2026-02-02',
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
    date: '2026-01-22',
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
    date: '2026-01-12',
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
    date: '2026-01-02',
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
];

/* ============================================================================
 * 2) GENERATION ENGINE — assembles articles from per-topic pools of distinct,
 *    hand-written paragraphs. Each post draws a different intro, a different
 *    set of body sections, an optional list block, and a different close, so
 *    structure and wording vary meaningfully between posts.
 * ========================================================================== */

// Deterministic PRNG (mulberry32) so re-running the seeder is reproducible.
function makeRng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function titleCase(value) {
  return value.replace(/\b\w/g, (c) => c.toUpperCase());
}

// Tokens that must keep their exact casing in a headline.
const headlineKeep = new Map(
  [
    'SEO', 'API', 'APIs', 'AI', 'LLM', 'RAG', 'REST', 'URL', 'HTTP', 'HTTPS', 'SSL',
    'CMS', 'MVP', 'SaaS', 'CDN', 'DNS', 'RTL', 'iOS', 'UX', 'UI', 'Next.js',
  ].map((t) => [t.toLowerCase(), t]),
);
// Minor words stay lowercase unless they start the title.
const headlineMinor = new Set([
  'a', 'an', 'and', 'or', 'the', 'to', 'for', 'of', 'in', 'on', 'with', 'without', 'vs', 'at', 'by',
]);

function headlineCase(title) {
  const words = title.split(' ');
  return words
    .map((word, i) => {
      if (!word) return word;
      const bare = word.replace(/[^a-zA-Z0-9.+]/g, '');
      const keep = headlineKeep.get(bare.toLowerCase());
      if (keep) return word.replace(bare, keep);
      const lower = word.toLowerCase();
      const startsSegment = i === 0 || /[:—-]$/.test(words[i - 1]);
      if (!startsSegment && headlineMinor.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function pickOne(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function pickDistinct(rng, arr, count) {
  const pool = arr.slice();
  const out = [];
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(rng() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

const audiences = [
  'Qatar businesses',
  'Doha startups',
  'growing product teams',
  'small business owners',
  'enterprise teams',
  'agencies and freelancers',
  'founders',
  'in-house engineering teams',
];

const titlePatterns = [
  (s) => `A Practical Guide to ${s.subject}`,
  (s) => `${s.subjectTitle}: What Actually Matters in Production`,
  (s) => `How ${s.audienceTitle} Should Approach ${s.subject}`,
  (s) => `${s.subjectTitle} for ${s.audienceTitle}`,
  (s) => `Common Mistakes in ${s.subject} (and How to Avoid Them)`,
  (s) => `${s.subjectTitle}: A Field Guide for ${s.year}`,
  (s) => `Planning ${s.subject} Without the Usual Surprises`,
  (s) => `${s.subjectTitle} — Lessons From Real Projects`,
  (s) => `What I Check Before Shipping ${s.subject}`,
  (s) => `${s.subjectTitle}: A Checklist That Holds Up Under Load`,
];

// Cross-cutting sections any article can include for breadth.
const sharedSections = [
  { h: 'Start with the problem, not the tool', p: 'Before choosing a technology, write down the workflow it has to support, the people who depend on it, and what success looks like in a few months. The clearest projects are the ones where everyone can describe the goal in plain language before any code is written.' },
  { h: 'Make it measurable', p: 'A feature you cannot measure is a feature you cannot improve. Decide early what you will track — response times, error rates, conversions, or completed tasks — and make sure the data is collected from day one rather than added after something breaks.' },
  { h: 'Plan for the unhappy path', p: 'Most production pain lives outside the happy path: timeouts, bad input, partial failures, and third-party outages. Designing for these cases up front is far cheaper than patching them under pressure after launch.' },
  { h: 'Keep it maintainable', p: 'Code is read far more often than it is written. Clear names, small functions, and a few honest comments save the next person — often your future self — hours of confusion. Maintainability is a feature, even when no user ever sees it.' },
  { h: 'Document the decisions, not just the code', p: 'The hardest thing to recover later is not how something works but why it was built that way. A short note explaining the tradeoff behind a decision is one of the highest-value things you can leave behind.' },
  { h: 'Test where it counts', p: 'You do not need to test everything, but you should test the parts that would cause real damage if they broke. Money, permissions, and data integrity deserve careful coverage; cosmetic details rarely do.' },
  { h: 'Review performance with real data', p: 'Synthetic benchmarks can be misleading. Whenever possible, profile with realistic data volumes and real device conditions, because problems that are invisible at small scale often dominate once the system is busy.' },
  { h: 'Build a simple rollback path', p: 'Confidence to ship comes from knowing you can undo. A tested rollback — for code, configuration, and data — turns a scary deploy into a routine one and shortens the recovery time when something does go wrong.' },
];

const closes = [
  'None of this is glamorous, and that is the point. Reliable software is usually the result of boring discipline applied consistently rather than any single clever trick.',
  'The goal is not perfection on launch day. It is a system that is easy to understand, safe to change, and honest about its limits as it grows.',
  'Treat this as a starting checklist rather than a finished recipe. Adapt it to your context, measure the results, and refine the parts that matter most for your users.',
  'Get the fundamentals right and the advanced techniques become optional. Most real-world problems are solved by doing the basics consistently and well.',
  'Whatever stack you choose, the same principle applies: clarity, measurement, and respect for the people who will maintain the work after you.',
];

const clusters = [
  {
    key: 'laravel',
    category: 'Laravel',
    images: ['/images/al-sharq.webp', '/images/alsharqtech.webp', '/images/blog-5.webp'],
    subjects: ['Laravel application architecture', 'Laravel queues and background jobs', 'a Laravel REST API', 'Laravel database migrations', 'Eloquent query optimization', 'Laravel service classes', 'Laravel validation and form requests', 'Laravel authentication flows', 'Laravel deployment pipelines', 'Laravel event and listener design'],
    intros: [
      'Laravel makes a lot of things easy, which is exactly why teams sometimes skip the planning that keeps an application healthy as it grows. The framework rewards good structure and quietly punishes shortcuts taken under deadline pressure.',
      'A Laravel project usually starts clean and slowly accumulates complexity. The difference between a codebase that ages well and one that becomes painful is rarely the framework — it is the conventions the team agrees on early.',
      'Most Laravel problems I am called in to fix are not framework limitations. They are decisions about structure, queries, and responsibilities that made sense for a small app but stopped scaling as the product grew.',
      'The strength of Laravel is how much it gives you out of the box. The risk is leaning on those conveniences without understanding what happens underneath when traffic and data grow.',
    ],
    sections: [
      { h: 'Keep controllers thin', p: 'Controllers should coordinate, not contain the logic. Pushing business rules into dedicated service or action classes keeps controllers readable and makes the same logic reusable from jobs, commands, and tests.' },
      { h: 'Respect the database', p: 'Eloquent is convenient, but convenience can hide expensive queries. Eager-load relationships you know you will use, add indexes for the columns you filter on, and watch for the N+1 queries that quietly multiply under load.' },
      { h: 'Use queues for slow work', p: 'Anything that does not need to finish before the user gets a response — emails, notifications, image processing, third-party calls — belongs on a queue. This keeps requests fast and isolates failures in external services.' },
      { h: 'Validate at the edge', p: 'Form requests centralize validation and keep controllers clean. Validate every input as it enters the application and never assume the frontend already checked it, because the frontend is not the only client.' },
      { h: 'Cache the expensive parts', p: 'Identify the queries and computations that are both slow and frequent, and cache those specifically. Tie cache keys to the data they represent so you can invalidate precisely when that data changes.' },
      { h: 'Lean on the framework, carefully', p: 'Laravel ships with authentication, authorization, queues, scheduling, and notifications. Use them instead of reinventing the wheel, but understand each one well enough to debug it when something behaves unexpectedly in production.' },
      { h: 'Make deploys boring', p: 'A good Laravel deploy caches config and routes, runs migrations safely, restarts queue workers, and can roll back cleanly. The more automated and repeatable it is, the less risk each release carries.' },
    ],
    lists: [
      { intro: 'A quick health check I run on most Laravel codebases:', items: ['Are controllers thin, with logic in services or actions?', 'Are slow tasks moved onto queues?', 'Do the busiest queries have appropriate indexes?', 'Is every user input validated through a form request?', 'Is there a tested rollback for the last deploy?'] },
    ],
  },
  {
    key: 'nextjs',
    category: 'Next.js',
    images: ['/images/blog-4.webp', '/images/blog-1.webp'],
    subjects: ['Next.js App Router architecture', 'server and client components', 'Next.js metadata and SEO', 'Next.js image optimization', 'data fetching in Next.js', 'Next.js route structure', 'rendering strategy in Next.js', 'Next.js performance tuning'],
    intros: [
      'Next.js gives you a lot of control over how pages are rendered, which is powerful and easy to misuse. Most performance and SEO problems come from rendering choices made without thinking about who reads the page and who crawls it.',
      'The App Router changed how many Next.js apps are structured. Used well, it keeps pages fast and content server-rendered; used carelessly, it ships far more JavaScript to the browser than a content site ever needs.',
      'A Next.js site can be both fast and SEO-friendly almost for free, but only if the defaults are respected. The trouble starts when everything becomes a client component and the server rendering advantage quietly disappears.',
      'Next.js rewards a clear separation between content and interactivity. The pages that perform best are the ones that render their text on the server and reserve client-side code for the parts that genuinely need it.',
    ],
    sections: [
      { h: 'Default to server components', p: 'Keep pages as server components unless they need state or interactivity. Server components ship no JavaScript for static content, which improves load time and ensures crawlers see the full text in the initial HTML.' },
      { h: 'Push interactivity to the leaves', p: 'When you need a client component, make it small and specific — a single form, a filter, a toggle. Wrapping an entire page in a client component sends unnecessary JavaScript and undermines the framework\'s strengths.' },
      { h: 'Give every page real metadata', p: 'Each route should export a unique title, description, and canonical URL that match its content. Generic site-wide metadata leaking onto every page is one of the most common and most fixable SEO mistakes.' },
      { h: 'Optimize images deliberately', p: 'Use the Image component with explicit dimensions, mark only the hero as priority, and lazy-load the rest. Correctly sized modern-format images are usually the single biggest performance win on a content page.' },
      { h: 'Fetch data close to where it is used', p: 'Co-locating data fetching with the component that needs it keeps the code readable and lets the framework cache and stream efficiently. Avoid fetching everything at the top and threading it down through props.' },
      { h: 'Keep the sitemap honest', p: 'Generate the sitemap from the same source as your pages, and include only routes that deserve indexing. A sitemap full of thin or unfinished pages tells search engines the wrong story about the site.' },
    ],
    lists: [
      { intro: 'Before shipping a Next.js page, I confirm:', items: ['Is this a server component unless it truly needs to be client-side?', 'Does it have a unique title, description, and canonical?', 'Is the hero image sized and prioritized, and the rest lazy-loaded?', 'Does the main content appear in the initial HTML?'] },
    ],
  },
  {
    key: 'seo',
    category: 'Technical SEO',
    images: ['/images/blog-1.webp', '/images/blog-3.webp'],
    subjects: ['technical SEO', 'on-page SEO', 'structured data', 'a content SEO strategy', 'internal linking', 'crawlability and indexing', 'local SEO', 'an SEO content audit'],
    intros: [
      'Technical SEO is less about tricks and more about removing friction. The job is to make sure search engines can find your pages, understand them, and trust that they deserve to rank.',
      'Most SEO problems I see are not penalties. They are pages that contradict themselves — a canonical pointing one way, a sitemap another, and content that does not match the title.',
      'Good SEO starts with content people actually want and ends with the technical plumbing that lets search engines reach it. Skip either half and the results disappoint.',
      'Search engines reward clarity. The clearer your site is about what each page is for, the easier it is for that page to rank for the right query.',
    ],
    sections: [
      { h: 'Match intent before chasing keywords', p: 'A page ranks when it answers what the searcher actually wants, not when it repeats a phrase often enough. Start by understanding the question behind the query, then write the page that genuinely answers it.' },
      { h: 'Keep signals consistent', p: 'Your title, heading, canonical URL, sitemap entry, and on-page content should all tell the same story. Contradictions between these signals are a quiet but common reason good pages never get indexed.' },
      { h: 'Use structured data honestly', p: 'Schema markup helps search engines understand a page, but only describe what is actually visible on it. Marking up content that is not there is the kind of mismatch that costs trust rather than earning rich results.' },
      { h: 'Link internally with purpose', p: 'Internal links pass context and help crawlers discover pages. Link related articles to each other with descriptive text so both readers and search engines understand how your content fits together.' },
      { h: 'Earn local relevance where it is real', p: 'For service businesses, local context matters — city, country, and genuine local detail. Add it where it is true and useful, not as a keyword sprinkled across pages that have nothing local to say.' },
      { h: 'Prune what dilutes the site', p: 'A handful of strong pages outranks a pile of thin ones. Regularly review weak, duplicate, or outdated pages and improve, merge, or remove them so your best content is not buried in noise.' },
    ],
    lists: [
      { intro: 'A short technical SEO pass usually covers:', items: ['Does each important page have a unique, accurate title and description?', 'Do canonicals and the sitemap agree?', 'Is the content visible in the HTML without JavaScript?', 'Are related pages linked to each other with descriptive text?'] },
    ],
  },
  {
    key: 'performance',
    category: 'Performance',
    images: ['/images/blog-3.webp', '/images/blog-4.webp'],
    subjects: ['web performance', 'Core Web Vitals', 'frontend performance', 'page load speed', 'image performance', 'JavaScript performance', 'rendering performance'],
    intros: [
      'Performance is a feature users feel before they can name it. A fast page feels trustworthy and a slow one feels broken, regardless of how good the underlying work is.',
      'Most performance problems are not mysterious. They come from a handful of usual suspects: oversized images, too much JavaScript, render-blocking resources, and layout that shifts as the page loads.',
      'The fastest way to improve performance is to measure the page people actually visit, on the device they actually use, and fix the biggest bottleneck first.',
      'Speed work rewards honesty about real conditions. A site that feels instant on a developer laptop can feel sluggish on a mid-range phone — and that is the experience search engines measure.',
    ],
    sections: [
      { h: 'Fix the largest element first', p: 'The biggest visible element — usually a hero image or headline — drives the perception of load speed. Sizing it correctly, serving a modern format, and loading it early often moves the numbers more than any other single change.' },
      { h: 'Ship less JavaScript', p: 'Every kilobyte of JavaScript has to be downloaded, parsed, and executed before the page responds smoothly. Removing unused code and avoiding unnecessary client-side components is one of the most reliable ways to improve responsiveness.' },
      { h: 'Reserve space to stop layout shift', p: 'Content that jumps as images and ads load is both annoying and penalized. Setting explicit dimensions and reserving space for late-loading elements keeps the layout stable while the page fills in.' },
      { h: 'Tame third-party scripts', p: 'Analytics, ads, maps, and widgets each add weight and risk. Load only what is needed on first paint, defer the rest, and periodically audit whether each third-party script still earns its cost.' },
      { h: 'Cache and compress', p: 'Proper cache headers, compression, and a CDN mean repeat visits and far-away users get a much faster experience for very little ongoing effort. These wins are easy to set up and easy to forget.' },
      { h: 'Measure on real devices', p: 'Lab numbers are a guide, not the truth. Test on a real mid-range phone with a throttled connection, because that is closer to how a large share of your audience actually experiences the site.' },
    ],
    lists: [
      { intro: 'My usual order of attack for a slow page:', items: ['Right-size and prioritize the hero image.', 'Remove or defer non-essential JavaScript and third-party scripts.', 'Reserve space for images and embeds to kill layout shift.', 'Enable caching, compression, and a CDN.', 'Re-measure on a real phone, not the desktop.'] },
    ],
  },
  {
    key: 'api',
    category: 'API Development',
    images: ['/images/blog-5.webp', '/images/blog-3.webp'],
    subjects: ['REST API design', 'API authentication', 'API error handling', 'API pagination', 'API versioning', 'webhook integrations', 'API rate limiting', 'API documentation'],
    intros: [
      'A good API is one another team can use without asking you questions. Most API frustration comes from inconsistency and surprises, not missing features.',
      'APIs are contracts. Once another team or app depends on yours, changing it carelessly breaks their work — so the discipline of an API is mostly about keeping promises.',
      'The difference between an API people enjoy and one they dread is rarely the technology. It is consistency, clear errors, and behavior that never surprises the caller.',
      'Designing an API well means thinking about the developer on the other end. Every inconsistency you leave in becomes a question, a bug, or a support message later.',
    ],
    sections: [
      { h: 'Be consistent everywhere', p: 'Use the same casing, date format, list shape, and error envelope across every endpoint. Consistency lets a developer guess how a new endpoint behaves because every other endpoint taught them the pattern.' },
      { h: 'Treat errors as part of the design', p: 'Return correct status codes, a stable error code, and a clear message. Validation errors should name the field and the reason, because clients build real user experiences directly on top of these responses.' },
      { h: 'Choose one pagination style', p: 'Pick page-based or cursor-based pagination, document it, and apply it consistently. Always include enough metadata for the client to know whether more results remain.' },
      { h: 'Hide the database behind the API', p: 'Use a resource or transformer layer so responses are a deliberate contract, not a direct dump of your tables. This lets you change storage without breaking the clients that depend on you.' },
      { h: 'Version only when behavior breaks', p: 'Adding an optional field is safe. Removing or renaming one, or changing its meaning, is not. Reserve version bumps for genuine breaking changes and track which clients still use old versions.' },
      { h: 'Secure and rate-limit by default', p: 'Authenticate every non-public endpoint, validate all input, and rate-limit to protect against abuse and runaway clients. Security and stability are easier to build in than to add after an incident.' },
    ],
    lists: [
      { intro: 'A quick API review checklist:', items: ['Is the response shape consistent with the rest of the API?', 'Do errors return a useful status, code, and message?', 'Is pagination documented and uniform?', 'Are breaking changes behind a new version?'] },
    ],
  },
  {
    key: 'ai',
    category: 'AI Engineering',
    images: ['/images/blog-2.webp', '/images/alsharqtech.webp'],
    subjects: ['LLM integration', 'a RAG pipeline', 'AI feature design', 'prompt engineering for production', 'AI content workflows', 'an AI support assistant', 'AI data boundaries', 'evaluating AI output'],
    intros: [
      'Adding AI to a product should start with a workflow question, not a model question. The useful version of a feature is the one where everyone knows who reviews the output and what happens when the model is unsure.',
      'The interesting part of AI engineering is rarely the model. It is the plumbing around it: what data it can see, how its output is checked, and how the system behaves when it gets something wrong.',
      'AI features feel magical in a demo and fragile in production unless they are designed with boundaries. Real usage surfaces edge cases that no prompt anticipates on its own.',
      'The best AI features I have shipped feel like reliable assistants, not oracles. They are clear about what they can do, honest about uncertainty, and easy for a human to supervise.',
    ],
    sections: [
      { h: 'Define the data boundaries first', p: 'Decide exactly which records the model may access before writing any prompts. Private notes, payment details, and confidential documents need a clear policy so sensitive data is never sent somewhere it should not go.' },
      { h: 'Make retrieval the real product', p: 'In a RAG system, answer quality depends mostly on what you retrieve. Chunking, metadata filters, and freshness rules matter more than clever prompt wording, because a weak passage produces a weak answer from any model.' },
      { h: 'Keep a human in the loop', p: 'For anything that gets published or acted on, let a person edit, accept, or reject the output. Designing the review path well is what turns an impressive demo into a tool a team actually trusts.' },
      { h: 'Show the sources', p: 'When an answer is built from documents, show which ones and when they were published. Visible sources let users judge whether to trust a response and catch when it is leaning on outdated information.' },
      { h: 'Define acceptable output', p: 'Write down what a good response looks like — no invented facts, a length limit, a citation, a confidence threshold. These rules should live in tests and product behavior, not only in a prompt nobody revisits.' },
      { h: 'Measure usefulness, not novelty', p: 'Track how often suggestions are accepted, edited, or discarded. If a feature creates more review work than it saves, it needs a narrower scope or better retrieval rather than a bigger model.' },
    ],
    lists: [
      { intro: 'Questions I ask before shipping an AI feature:', items: ['What data can the model access, and is that intentional?', 'Who reviews the output before it is used?', 'How will we know if the quality drops?', 'What happens when the model is uncertain?'] },
    ],
  },
  {
    key: 'security',
    category: 'Security',
    images: ['/images/blog-1.webp', '/images/blog-2.webp'],
    subjects: ['web application security', 'authentication security', 'authorization design', 'input validation', 'API security', 'secrets management', 'secure file uploads', 'dependency security'],
    intros: [
      'Most security incidents are not exotic. They come from missed basics — an unprotected route, a leaked key, an unvalidated upload, or a dependency nobody updated.',
      'Security is less about a single defense and more about removing the easy openings. Attackers look for the cheapest way in, so closing the common gaps removes most of the risk.',
      'Good security is mostly boring discipline applied consistently: validate input, check permissions, protect secrets, and keep dependencies current.',
      'The goal of practical security is to make an attack not worth the effort. A handful of consistent precautions stops the overwhelming majority of real-world attempts.',
    ],
    sections: [
      { h: 'Authenticate and authorize separately', p: 'Authentication proves who someone is; authorization controls what they can do. The most common real-world flaw is an endpoint that confirms the user is logged in but never checks they are allowed to touch that specific record.' },
      { h: 'Never trust user input', p: 'Validate everything that enters the application, regardless of what the frontend claims to have checked. Use parameterized queries to prevent injection, and escape output so user content cannot become executable code.' },
      { h: 'Protect secrets carefully', p: 'Keep credentials in environment variables, never in the repository, and make sure production debug output never leaks them. If a key is ever exposed, rotate it immediately rather than hoping nobody noticed.' },
      { h: 'Lock down file uploads', p: 'Restrict uploads by type and size, store them outside the web root, and never trust the original filename. Uploads are a classic entry point precisely because they are easy to treat as harmless.' },
      { h: 'Keep dependencies current', p: 'Outdated packages are a leading cause of breaches. Update regularly, watch security advisories, and remove dependencies you no longer use so your attack surface stays as small as possible.' },
      { h: 'Add the operational basics', p: 'Enforce HTTPS, set sensible security headers, rate-limit authentication endpoints, and keep audit logs for sensitive actions. These low-effort controls quietly prevent a large share of common attacks.' },
    ],
    lists: [
      { intro: 'A baseline security checklist:', items: ['Is every sensitive action authorized, not just authenticated?', 'Is all input validated and every query parameterized?', 'Are secrets out of the repo and is debug mode off in production?', 'Are dependencies updated and unused ones removed?'] },
    ],
  },
  {
    key: 'hosting',
    category: 'Hosting',
    images: ['/images/blog-6.webp', '/images/blog-4.webp'],
    subjects: ['web hosting choices', 'cloud deployment', 'a deployment pipeline', 'server configuration', 'backups and recovery', 'SSL and domains', 'production monitoring', 'a launch checklist'],
    intros: [
      'Hosting decisions are easy to underestimate until something breaks at the worst possible time. Most production emergencies are simple things missed under launch pressure.',
      'The right hosting setup is the one your team can actually operate. A powerful platform nobody understands is riskier than a simpler one everyone can manage confidently.',
      'A calm launch comes from boring preparation. Backups, SSL, environment separation, and a tested rollback turn a stressful release into a routine one.',
      'Choosing where and how to host is a tradeoff between control, cost, and operational effort. The best answer depends on who maintains the system after launch, not on which platform is trendy.',
    ],
    sections: [
      { h: 'Separate environments cleanly', p: 'Production credentials, API keys, and secrets should never be copied from local development without review. Keep environments distinct and confirm debug mode is off before any real traffic arrives.' },
      { h: 'Get SSL and redirects right', p: 'SSL should be active before launch with HTTP redirecting to HTTPS. Plan DNS changes with TTL in mind so a rollback, if needed, can take effect quickly rather than hours later.' },
      { h: 'Test your backups', p: 'A backup you have never restored is only a hopeful file. Confirm that database and media backups actually restore, and that you have a rollback path for the deployed code itself.' },
      { h: 'Automate the deploy', p: 'A repeatable deploy that caches config, runs migrations safely, and restarts workers removes the human error that causes most release incidents. The more boring the deploy, the safer it is.' },
      { h: 'Watch the system after launch', p: 'Immediately after going live, watch logs, uptime, form submissions, and key pages on mobile. Catching small issues early is far cheaper than hearing about them from frustrated users.' },
      { h: 'Right-size the infrastructure', p: 'Most sites need far less than teams assume. A well-configured single server handles a surprising amount of traffic; scale when the metrics demand it, not in anticipation of users you do not have yet.' },
    ],
    lists: [
      { intro: 'My pre-launch hosting checklist:', items: ['Is SSL active with HTTP redirecting to HTTPS?', 'Are production secrets separate and debug mode off?', 'Have backups been restored as a test, not just created?', 'Is there a tested rollback for code and data?'] },
    ],
  },
  {
    key: 'ecommerce',
    category: 'Ecommerce',
    images: ['/images/blog-4.webp', '/images/blog-3.webp'],
    subjects: ['an ecommerce platform', 'ecommerce performance', 'product page SEO', 'checkout design', 'an ecommerce catalog', 'ecommerce search', 'conversion optimization', 'ecommerce data quality'],
    intros: [
      'Ecommerce is where performance, SEO, and reliability meet money directly. A slow page or a confusing checkout is not just a UX problem — it is lost revenue you can measure.',
      'A successful online store depends less on a flashy homepage and more on the unglamorous details: clean product data, fast category pages, and a checkout that never makes the customer hesitate.',
      'The hardest part of ecommerce is rarely listing products. It is keeping inventory accurate, search relevant, and checkout reliable while traffic and catalog size grow.',
      'Online retail rewards trust. Fast pages, clear pricing, accurate stock, and a smooth checkout add up to a store customers feel safe buying from.',
    ],
    sections: [
      { h: 'Treat product data as a foundation', p: 'Clean, consistent product data powers search, filtering, recommendations, and SEO all at once. Investing in good titles, attributes, and images pays off across the entire store rather than one page at a time.' },
      { h: 'Make category and search pages fast', p: 'Shoppers browse far more than they buy, so the pages they browse must be quick. Efficient queries, sensible pagination, and cached results keep large catalogs responsive under real traffic.' },
      { h: 'Reduce friction at checkout', p: 'Every extra field, surprise cost, or confusing step loses customers. A short, clear checkout with trusted payment options and honest totals is one of the highest-leverage things you can improve.' },
      { h: 'Optimize product pages for search', p: 'Product pages should have unique descriptions, structured data, useful images, and internal links to related items. Duplicated manufacturer copy across thousands of pages is a common, fixable SEO weakness.' },
      { h: 'Keep inventory honest', p: 'Nothing erodes trust faster than selling something that is out of stock. Reliable inventory syncing, even when it is unglamorous work, protects both the customer experience and your operations team.' },
      { h: 'Handle payments defensively', p: 'Design checkout around the states between paid and failed: late callbacks, retries, and refunds. Server-side verification and clear transaction records prevent the support nightmares that come from trusting only a success screen.' },
    ],
    lists: [
      { intro: 'A short ecommerce health check:', items: ['Are category and search pages fast under real load?', 'Is checkout short, clear, and free of surprise costs?', 'Do product pages have unique content and structured data?', 'Is inventory accurate and payment handling defensive?'] },
    ],
  },
  {
    key: 'database',
    category: 'Backend',
    images: ['/images/blog-2.webp', '/images/blog-5.webp'],
    subjects: ['database indexing', 'database schema design', 'query optimization', 'database scaling', 'a database migration', 'data modeling', 'database backups', 'handling large tables'],
    intros: [
      'The database is where small design decisions quietly compound. A schema that felt fine with a thousand rows can dominate your performance once it holds millions.',
      'Most "the app got slow" problems trace back to the database — a missing index, an N+1 query, or a schema that made an easy thing expensive. The fixes are usually straightforward once you can see them.',
      'Databases reward forethought more than almost any other part of a system, because changing them later is harder than changing code. Good structure early saves painful migrations down the line.',
      'You do not need to be a database expert to avoid the common traps. A handful of habits around indexing, queries, and modeling prevent most performance problems before they start.',
    ],
    sections: [
      { h: 'Index the columns you query', p: 'Add indexes for the columns you filter, join, and sort on most often, and index foreign keys almost by default. The goal is to eliminate full table scans on large, busy tables.' },
      { h: 'Do not over-index', p: 'Every index speeds reads but slows writes and uses storage. Choose the few indexes that serve your real query patterns instead of blanketing every column, and revisit them as those patterns change.' },
      { h: 'Find the slow queries', p: 'Use the slow query log and the EXPLAIN command instead of guessing. Seeing whether a query uses an index or scans the whole table turns vague performance complaints into specific, fixable problems.' },
      { h: 'Model for how data is used', p: 'Design the schema around the questions the application actually asks. Normalize to keep data consistent, then denormalize deliberately where a critical read path needs the speed — but only with a clear reason.' },
      { h: 'Migrate carefully on large tables', p: 'Schema changes on big tables can lock them and cause downtime. Plan migrations to run in safe steps, test them on realistic data volumes, and always have a way back if something behaves unexpectedly.' },
      { h: 'Back up and actually restore', p: 'Backups only count if they restore. Schedule them, store them safely, and periodically rehearse a restore so that recovering from a real incident is a known procedure rather than an experiment.' },
    ],
    lists: [
      { intro: 'A quick database review:', items: ['Are the busiest queries backed by appropriate indexes?', 'Have you checked EXPLAIN on the slow ones?', 'Does the schema match how the app reads and writes?', 'Have backups been restored as a real test?'] },
    ],
  },
  {
    key: 'mobile',
    category: 'Mobile Apps',
    images: ['/images/blog-5.webp', '/images/blog-6.webp'],
    subjects: ['a mobile app backend', 'mobile API design', 'offline-friendly apps', 'push notifications', 'mobile app performance', 'cross-platform development', 'mobile authentication', 'syncing data to mobile'],
    intros: [
      'Mobile apps add a constraint web teams sometimes forget: not everyone updates at once. A backend deploys in minutes, but an app version can live on phones for months.',
      'Building for mobile means designing for unreliable networks, delayed updates, and limited battery. The backend has to be forgiving in ways a web-only API does not.',
      'A great mobile experience depends heavily on the backend behind it. Compact responses, graceful offline behavior, and stable contracts matter more than any single screen.',
      'Mobile development rewards respect for the device and the network. The apps that feel reliable are the ones that assume connections will drop and plan for it.',
    ],
    sections: [
      { h: 'Keep responses compact', p: 'Mobile networks are slower and less reliable than office wifi. Returning only the fields a screen needs reduces load time, saves data, and makes the app feel responsive even on a weak connection.' },
      { h: 'Version the API for slow updates', p: 'Because users update apps on their own schedule, the backend must keep older versions working. Reserve breaking changes for new versions and track which app versions still call old endpoints.' },
      { h: 'Plan for offline and retries', p: 'Assume requests will time out and connections will drop. Idempotent endpoints and sensible retry behavior prevent duplicate orders and let the app recover gracefully instead of confusing the user.' },
      { h: 'Use notifications with restraint', p: 'Push notifications are powerful and easy to overuse. Clear rules about what is urgent versus merely informational keep notifications welcome rather than something users disable entirely.' },
      { h: 'Handle authentication smoothly', p: 'Token refresh, secure storage, and graceful re-login matter enormously on mobile, where a clumsy auth flow is a daily annoyance. Get this right and most of the app feels trustworthy.' },
      { h: 'Test on real conditions', p: 'Emulators on fast connections hide the problems real users hit. Test on actual devices with throttled networks to catch the slow, flaky behavior that defines the real mobile experience.' },
    ],
    lists: [
      { intro: 'A mobile backend checklist:', items: ['Are responses trimmed to what each screen needs?', 'Is the API versioned for slowly-updating clients?', 'Are key endpoints idempotent and retry-safe?', 'Is the auth and token-refresh flow smooth?'] },
    ],
  },
  {
    key: 'localization',
    category: 'Localization',
    images: ['/images/alarab.webp', '/images/blog-1.webp'],
    subjects: ['a bilingual website', 'Arabic and English content', 'right-to-left layouts', 'multilingual SEO', 'content localization', 'a translation workflow', 'bilingual content modeling'],
    intros: [
      'Bilingual Arabic and English sites are normal in Qatar, yet they are often treated as a translation bolted on at the end. Done that way, the result is broken layouts and confused search engines.',
      'Localization is an architecture decision, not a final step. Sites that handle two languages well were designed for both from the start, not translated after launch.',
      'Supporting Arabic and English properly means more than swapping text. Layout direction, URLs, metadata, and content modeling all change, and ignoring any of them shows.',
      'A truly bilingual site feels native in both languages. That experience comes from decisions made early about layout, URLs, and how translations are stored and managed.',
    ],
    sections: [
      { h: 'Mirror the layout, not just the text', p: 'Arabic reads right-to-left, which affects navigation, icons, forms, and spacing — not only paragraph alignment. Building with logical CSS properties lets one layout serve both directions instead of two fragile ones.' },
      { h: 'Give each language a real URL', p: 'Each language version should have its own crawlable URL, typically a path prefix. Switching languages only with cookies or JavaScript leaves search engines with one ambiguous page instead of two indexable ones.' },
      { h: 'Tell search engines about the pair', p: 'Use hreflang so Google knows the Arabic and English pages are alternates rather than duplicates. This sends the right version to the right audience and stops the two from competing with each other.' },
      { h: 'Model translations as first-class data', p: 'Store a shared identity for each piece of content with per-language fields, rather than copied rows that drift apart. This keeps versions linked and makes it obvious what still needs translating.' },
      { h: 'Localize the details too', p: 'Real localization covers dates, numbers, currency, validation messages, and metadata. A page that translates the body but leaves buttons and errors in one language feels unfinished to readers and search engines alike.' },
      { h: 'Plan the translation workflow', p: 'Decide how content gets translated, reviewed, and kept in sync as it changes. A clear workflow prevents the common situation where one language slowly falls behind the other and quality quietly degrades.' },
    ],
    lists: [
      { intro: 'A bilingual readiness check:', items: ['Does the layout mirror correctly for right-to-left?', 'Does each language have its own crawlable URL and hreflang?', 'Are translations stored as linked, first-class data?', 'Are dates, numbers, and messages localized too?'] },
    ],
  },
];

function buildArticle(cluster, subject, audience, year, patternIndex, seed) {
  const rng = makeRng(seed);
  const subjectTitle = titleCase(subject.replace(/^(a|an) /, ''));
  const audienceTitle = titleCase(audience);

  const title = headlineCase(
    titlePatterns[patternIndex]({ subject, subjectTitle, audience, audienceTitle, year }),
  );

  // Body: intro + 3 cluster sections + 1 shared section + optional list + close.
  const intro = pickOne(rng, cluster.intros);
  const clusterSections = pickDistinct(rng, cluster.sections, 3 + Math.floor(rng() * 2));
  const shared = pickDistinct(rng, sharedSections, 1 + Math.floor(rng() * 2));
  const close = pickOne(rng, closes);
  const list = cluster.lists.length && rng() > 0.4 ? pickOne(rng, cluster.lists) : null;
  const img = pickOne(rng, cluster.images);

  // Interleave shared sections among the cluster-specific ones for variety.
  const allSections = clusterSections.slice();
  shared.forEach((s, i) => allSections.splice(Math.min((i + 1) * 2, allSections.length), 0, s));

  const lead = `<p>${intro} This guide looks at ${subject} with ${audience} in mind, focusing on the practical decisions that hold up once real users and real data arrive.</p>`;

  const sectionHtml = allSections
    .map((s) => `<h3>${s.h}</h3>\n      <p>${s.p}</p>`)
    .join('\n      ');

  const listHtml = list
    ? `\n      <p>${list.intro}</p>\n      <ul>\n        ${list.items.map((it) => `<li>${it}</li>`).join('\n        ')}\n      </ul>`
    : '';

  const closeHtml = `<p>${close}</p>`;

  const content = `\n      ${lead}\n      ${sectionHtml}${listHtml}\n      ${closeHtml}\n    `;

  const excerptSentence = intro.split('. ')[0];
  const excerpt = `${excerptSentence}. A practical look at ${subject} for ${audience}.`;

  return { title, content, img, category: cluster.category, excerpt };
}

function buildGeneratedPosts(needed, existingSlugs) {
  const out = [];
  const seenTitles = new Set();
  const seenSlugs = new Set(existingSlugs);

  let counter = 0;
  let guard = 0;
  const maxGuard = needed * 50;

  while (out.length < needed && guard < maxGuard) {
    guard++;
    const cluster = clusters[counter % clusters.length];
    const rng = makeRng(counter * 2654435761 + 1);

    const subject = pickOne(rng, cluster.subjects);
    const audience = pickOne(rng, audiences);
    const year = 2026 + Math.floor(rng() * 3);
    const patternIndex = Math.floor(rng() * titlePatterns.length);

    const article = buildArticle(cluster, subject, audience, year, patternIndex, counter * 97 + 13);
    counter++;

    if (seenTitles.has(article.title)) continue;
    let slug = slugify(article.title);
    if (!slug || seenSlugs.has(slug)) {
      slug = `${slug}-${out.length + 1}`;
    }
    if (seenSlugs.has(slug)) continue;

    seenTitles.add(article.title);
    seenSlugs.add(slug);

    out.push({
      slug,
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content.trim(),
      img: article.img,
    });
  }

  return out;
}

/* ============================================================================
 * 3) Assemble the full set, schedule generated posts one per day, write stores.
 * ========================================================================== */
function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

const evergreen = evergreenPosts.map((p) => ({
  slug: p.slug,
  title: p.title.trim(),
  date: p.date,
  category: p.category.trim(),
  excerpt: p.excerpt.trim(),
  content: p.content.trim(),
  img: p.img,
}));

const neededGenerated = TARGET_TOTAL - evergreen.length;
const generated = buildGeneratedPosts(neededGenerated, evergreen.map((p) => p.slug));

// Schedule one generated post per day starting GENERATED_START.
generated.forEach((post, i) => {
  const d = new Date(GENERATED_START);
  d.setUTCDate(GENERATED_START.getUTCDate() + i);
  post.date = isoDate(d);
});

const all = [...evergreen, ...generated];

// Safety: enforce unique slugs across the whole set.
const slugSet = new Set();
for (const post of all) {
  if (slugSet.has(post.slug)) {
    throw new Error(`Duplicate slug detected: "${post.slug}"`);
  }
  slugSet.add(post.slug);
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

db.transaction(() => {
  db.prepare('DELETE FROM posts').run();
  all.forEach((post) => insert.run(post));
})();

db.close();

const jsonPosts = [...all].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
fs.writeFileSync(jsonPath, `${JSON.stringify(jsonPosts, null, 2)}\n`);

const liveToday = all.filter((p) => p.date <= isoDate(new Date())).length;

console.log(`Seeded ${all.length} posts into ${path.relative(process.cwd(), dbPath)}`);
console.log(`  - ${evergreen.length} evergreen (live now), ${generated.length} generated (drip one per day)`);
console.log(`  - ${liveToday} live today; the rest publish automatically one per day from ${isoDate(GENERATED_START)}`);
console.log(`Wrote ${jsonPosts.length} posts into ${path.relative(process.cwd(), jsonPath)}`);
