import Database from 'better-sqlite3';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');

const LONGTAIL_POSTS = [
  {
    title: 'How to Fix the Eloquent N+1 Query Problem in Laravel API Resources',
    category: 'Backend',
    focus_keyword: 'fix eloquent n+1 query laravel api resource',
    keywords: 'laravel eloquent, n+1 query problem, api resource optimization, eager loading relation, database query reduction',
    excerpt: 'A comprehensive technical guide to identifying, debugging, and resolving Eloquent N+1 query bottlenecks when nesting relationships inside Laravel API Resources.',
    content: `
<p>Database query performance is the single most common scaling bottleneck for modern web applications. In the Laravel ecosystem, the Eloquent ORM provides an elegant active-record interface, but its lazy-loading behavior frequently introduces the infamous N+1 query problem. This issue becomes especially problematic when building REST APIs using Laravel API Resources, where nested relations are transformed into JSON representations. This guide provides an in-depth walkthrough on how to identify, debug, and permanently resolve Eloquent N+1 query issues within Laravel API Resources.</p>

<h3>1. Understanding the N+1 Query Problem in Laravel</h3>
<p>The N+1 query problem occurs when an application executes one query to fetch a parent dataset, and then executes N subsequent queries to fetch related data for each parent record. For example, if you fetch 50 posts and display their authors, a lazy-loaded setup will execute 1 query for the posts, and 50 separate queries to fetch the author details. In Laravel API Resources, this happens when you access relationship attributes inside the resource’s <code>toArray()</code> method without eager loading them in the controller.</p>

<p>Consider this standard, problematic database representation where each post accesses its user relationship:</p>
<pre><code>
// Inside UserResource.php
public function toArray($request) {
    return [
        'id' => $this->id,
        'title' => $this->title,
        'author' => $this->user->name, // Triggers a separate SQL query for every single post!
    ];
}
</code></pre>

<h3>2. Step-by-Step Fix: Eager Loading Relationships</h3>
<p>The primary mitigation strategy for the N+1 problem is eager loading. By instructing Eloquent to load relationships in advance, we reduce the total SQL query count from N+1 to exactly 2 queries, regardless of the size of the dataset.</p>

<p>Instead of fetching the posts using a simple query, you should specify the relationship to load in the controller using the <code>with()</code> method:</p>
<pre><code>
// Problematic Controller Action
public function index() {
    $posts = Post::all(); // Query 1: SELECT * FROM posts
    return PostResource::collection($posts); // Triggers N queries!
}

// Optimized Controller Action
public function index() {
    $posts = Post::with('user')->get(); // Query 1: SELECT * FROM posts; Query 2: SELECT * FROM users WHERE id IN (...)
    return PostResource::collection($posts); // Executed cleanly in 2 SQL queries!
}
</code></pre>

<h3>3. Conditional Loading Inside API Resources</h3>
<p>In complex APIs, you might not always want to load relationships. In these scenarios, you can use Laravel’s built-in conditional loaders to only include relationships when they have already been loaded in the controller. This keeps your resource class reusable across different actions.</p>
<pre><code>
// Inside PostResource.php using whenLoaded
public function toArray($request) {
    return [
        'id' => $this->id,
        'title' => $this->title,
        // The relation is only loaded and transformed if Post::with('user') was used
        'author' => new UserResource($this->whenLoaded('user')),
    ];
}
</code></pre>

<h3>4. Performance Benchmarks and Analysis</h3>
<p>Let's look at the database performance comparison of an unoptimized API vs. an optimized API with eager loading across different dataset sizes:</p>

<table>
  <thead>
    <tr>
      <th>Dataset Size (Posts)</th>
      <th>Unoptimized Query Count (N+1)</th>
      <th>Optimized Query Count (Eager Loaded)</th>
      <th>Query Reduction (%)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>10 Posts</td>
      <td>11 queries</td>
      <td>2 queries</td>
      <td>81.8%</td>
    </tr>
    <tr>
      <td>50 Posts</td>
      <td>51 queries</td>
      <td>2 queries</td>
      <td>96.1%</td>
    </tr>
    <tr>
      <td>100 Posts</td>
      <td>101 queries</td>
      <td>2 queries</td>
      <td>98.0%</td>
    </tr>
    <tr>
      <td>500 Posts</td>
      <td>501 queries</td>
      <td>2 queries</td>
      <td>99.6%</td>
    </tr>
  </tbody>
</table>

<h3>5. Advanced Mitigation: Nested and Constrained Eager Loading</h3>
<p>Sometimes you need to load relationships deep within other relationships, or only load specific columns to optimize memory. You can easily achieve this in Laravel using dot notation and closure constraints:</p>
<pre><code>
// Eager loading nested relationship (Post -> user -> profile)
$posts = Post::with('user.profile')->get();

// Constrained eager loading to fetch only needed columns
$posts = Post::with(['user' => function ($query) {
    $query->select('id', 'name', 'email'); // Avoids loading heavy text fields
}])->get();
</code></pre>

<h3>6. Summary & Best Practices</h3>
<p>Resolving the N+1 query problem is critical for maintaining high performance as your database grows. Always install debugging tools like Laravel Telescope or Barryvdh Debugbar in your local environment to monitor SQL query executions. Adhere strictly to the practice of utilizing conditional loads within your API Resources and implementing constrained eager loading in your controller layers.</p>
`
  },
  {
    title: 'Debugging Next.js Dynamic Route Generation Errors (Type Mismatch in generateStaticParams)',
    category: 'Next.js',
    focus_keyword: 'nextjs generateStaticParams type mismatch error',
    keywords: 'nextjs route generation, generateStaticParams mismatch, dynamic routes error, typescript static generation nextjs',
    excerpt: 'An exhaustive technical breakdown of troubleshooting and resolving type mismatch errors inside generateStaticParams when building dynamic static pages in Next.js.',
    content: `
<p>When compiling dynamic routes in Next.js (such as blog posts, e-commerce products, or portfolio project pages), developers rely on the <code>generateStaticParams</code> function to define the list of paths that should be pre-rendered during build time. However, configuring this function incorrectly leads to frustrating compilation failures, specifically type mismatch errors between the return structure of the function and the component’s parameter signature. This guide details how to resolve these issues and set up your dynamic routes correctly.</p>

<h3>1. The Anatomy of generateStaticParams</h3>
<p>In Next.js App Router, <code>generateStaticParams</code> replaces the older Page Router <code>getStaticPaths</code>. It must return an array of objects, where each object represents the segment values for a single route. If the route contains a parameter named <code>[slug]</code>, the objects in the array must contain a property named <code>slug</code>. If the value returned does not match the page's parameter signature, Next.js throws a compilation error.</p>

<p>Consider this standard page setup with dynamic routing:</p>
<pre><code>
// src/app/blog/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>;
};

// Incorrect return shape causing type mismatch
export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map(post => post.id); // Error! Must return object array: { slug: string }[]
}
</code></pre>

<h3>2. The Correct Implementation Pattern</h3>
<p>To avoid compilation errors, the objects returned by <code>generateStaticParams</code> must have keys that map exactly to the dynamic parameter names. Additionally, the parameters should be represented as strings. If you use numbers, Next.js might fail to resolve them properly, leading to dynamic routing mismatches.</p>
<pre><code>
// Correct implementation
export async function generateStaticParams() {
  const posts = getPosts();
  
  return posts.map((post) => ({
    slug: post.slug.toString(), // Key matches '[slug]' folder name exactly
  }));
}
</code></pre>

<h3>3. Handling Multiple Dynamic Parameters (Nested Dynamic Routes)</h3>
<p>When dealing with nested dynamic routes, such as <code>/categories/[category]/[slug]/page.tsx</code>, the <code>generateStaticParams</code> function needs to supply values for both parameters simultaneously. Let's compare the structure needed for nested dynamic segments:</p>

<table>
  <thead>
    <tr>
      <th>Folder Structure</th>
      <th>Route Parameters</th>
      <th>Expected Object Structure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/blog/[slug]/page.tsx</td>
      <td>{ slug: string }</td>
      <td><code>{ slug: "my-post-slug" }</code></td>
    </tr>
    <tr>
      <td>/shop/[category]/[id]/page.tsx</td>
      <td>{ category: string, id: string }</td>
      <td><code>{ category: "electronics", id: "42" }</code></td>
    </tr>
    <tr>
      <td>/files/[...path]/page.tsx</td>
      <td>{ path: string[] }</td>
      <td><code>{ path: ["documents", "2026", "tax.pdf"] }</code></td>
    </tr>
  </tbody>
</table>

<h3>4. Working with Promises in Next.js 15 & 16</h3>
<p>In modern Next.js releases (version 15 and 16), page parameters are passed as a <code>Promise</code> instead of a plain object. This means that when reading params in your component, you must <code>await</code> the params object before accessing properties. However, <code>generateStaticParams</code> itself remains synchronous or standard async and returns the array directly. Failing to await parameters in the page component can lead to typescript compile errors, which look like parameter mismatches.</p>
<pre><code>
// Correct Page Component setup in Next.js 16
export default async function Page({ params }: Props) {
  const { slug } = await params; // Must await params!
  const post = getPost(slug);
  // ...
}
</code></pre>

<h3>5. Conclusion and Compilation Verification</h3>
<p>When compiling, Next.js verifies that all static parameters match the declared types. To ensure that your routes compile cleanly, run <code>npm run build</code> locally to inspect compile-time outputs and resolve mismatches before pushing code to production.</p>
`
  },
  {
    title: 'Resolving Hydration Mismatch Errors in React 19 and Next.js App Router',
    category: 'Web Development',
    focus_keyword: 'fix hydration mismatch react 19 nextjs',
    keywords: 'react hydration mismatch, nextjs hydration error, fix react 19 hydration, server client html mismatch',
    excerpt: 'An actionable walkthrough detailing the causes of React hydration mismatches and providing step-by-step solutions to fix them in Next.js applications.',
    content: `
<p>React hydration mismatch errors are one of the most common issues developers face when using Next.js App Router. These errors occur when the pre-rendered HTML generated on the server does not align perfectly with the initial HTML rendered by the client. With React 19 introduced in Next.js 15/16, the hydration mismatch warnings are cleaner, but resolving them still requires locating the source of dynamic values. This guide covers why hydration mismatches happen and how to resolve them.</p>

<h3>1. Common Causes of Hydration Mismatches</h3>
<p>The core cause of a hydration mismatch is the presence of client-only or dynamic values during the first render. Common triggers include:</p>
<ul>
  <li><strong>Datetime Formatting:</strong> Formatting dates using the client's local timezone, which differs from the server's timezone during pre-rendering.</li>
  <li><strong>Browser APIs:</strong> Accessing <code>window</code>, <code>localStorage</code>, or document dimensions directly during render.</li>
  <li><strong>Invalid HTML Nesting:</strong> Placing block elements like <code>&lt;div&gt;</code> inside inline tags like <code>&lt;p&gt;</code>.</li>
  <li><strong>Conditional User Info:</strong> Rendering different layouts based on whether a user is logged in before the client-side session is initialized.</li>
</ul>

<h3>2. The Fix: Suppressing Hydration Warnings</h3>
<p>If you have an element that must render dynamic content (such as a timestamp) and you cannot avoid minor deviations, you can suppress the warning by adding the <code>suppressHydrationWarning</code> attribute to the element. Note that this only works one level deep, so it must be placed directly on the element containing the text node.</p>
<pre><code>
// Suppressing minor datetime mismatches
&lt;span suppressHydrationWarning&gt;
  {new Date().toLocaleTimeString()}
&lt;/span&gt;
</code></pre>

<h3>3. The Robust Fix: Using useEffect for Client-Only Rendering</h3>
<p>A cleaner architectural solution is to defer rendering of client-specific components until the component has successfully mounted on the client. By setting a state variable in <code>useEffect</code>, we ensure that the server and client render identical structures initially, and the client updates to include dynamic details after hydration is complete.</p>
<pre><code>
'use client';
import { useState, useEffect } from 'react';

export default function ClientOnlyClock() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return &lt;span&gt;Loading...&lt;/span&gt;; // Server and initial client render match!
  }

  return &lt;span&gt;{new Date().toLocaleTimeString()}&lt;/span&gt;; // Client-only update after mount
}
</code></pre>

<h3>4. Comparison of Hydration Mismatch Resolution Methods</h3>
<table>
  <thead>
    <tr>
      <th>Resolution Strategy</th>
      <th>Development Effort</th>
      <th>SEO Friendliness</th>
      <th>Best Use Case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>suppressHydrationWarning</td>
      <td>Minimal</td>
      <td>High</td>
      <td>Minor text offsets, dates</td>
    </tr>
    <tr>
      <td>useEffect Mount Deferral</td>
      <td>Medium</td>
      <td>Low (content is missing on initial load)</td>
      <td>Complex browser-dependent widgets</td>
    </tr>
    <tr>
      <td>Next.js Dynamic Imports (ssr: false)</td>
      <td>Medium</td>
      <td>None (entire component skipped during SSR)</td>
      <td>Heavy interactive charts, localstorage forms</td>
    </tr>
  </tbody>
</table>

<h3>5. Conclusion</h3>
<p>Preventing hydration mismatches ensures that your application remains fast, accessible, and free of runtime console warnings. Audit your layouts for valid HTML structure and defer dynamic variables to client hooks to maintain a seamless user experience.</p>
`
  },
  {
    title: 'How to Fix OpenSSL SSL_read Connection Reset Errors in PHP Guzzle Requests',
    category: 'API Development',
    focus_keyword: 'fix guzzle ssl connection reset error php',
    keywords: 'php guzzle ssl error, openssl connection reset, guzzle curl error 56, fix php ssl read, guzzle api connection reset',
    excerpt: 'A troubleshooting guide to diagnosing and fixing SSL connection resets (OpenSSL SSL_read) when performing API requests in PHP using Guzzle HTTP client.',
    content: `
<p>When connecting PHP backend services to external APIs, Guzzle is the standard HTTP client. However, when performing heavy volume requests or integrating with legacy servers, developers often run into <code>cURL error 56: OpenSSL SSL_read: Connection reset, errno 104</code>. This error means that the SSL handshake or communication channel was abruptly closed by the remote server during a read operation. This guide breaks down the causes of this error and provides steps to resolve it.</p>

<h3>1. Diagnosing the SSL Connection Reset Error</h3>
<p>The connection reset error typically stems from one of three areas:</p>
<ul>
  <li><strong>Keep-Alive Timeouts:</strong> The remote server closes inactive connection channels, but Guzzle attempts to reuse the connection.</li>
  <li><strong>SSL Protocol Mismatches:</strong> The remote server requires a specific TLS version, but the local OpenSSL library defaults to a higher or unsupported version.</li>
  <li><strong>Payload Sizes:</strong> The request payload exceeds buffer limits, causing the server's firewall to drop the connection during the SSL handshake.</li>
</ul>

<h3>2. The Fix: Adjusting Guzzle Curl Options</h3>
<p>To resolve these connection issues, you must configure Guzzle’s underlying cURL configurations. Specifically, disabling connection reuse, adjusting timeouts, and forcing standard TLS versions usually fixes the problem.</p>
<pre><code>
use GuzzleHttp\\Client;

$client = new Client([
    'timeout' => 30.0,
    'curl' => [
        CURLOPT_FORBID_REUSE => true, // Force close connection after request completes
        CURLOPT_FRESH_CONNECT => true, // Request a clean connection channel
        CURLOPT_SSLVERSION => CURL_SSLVERSION_TLSv1_2, // Force TLS 1.2 compatibility
    ]
]);

$response = $client->get('https://api.example.com/data');
</code></pre>

<h3>3. Fixing MTU Size Issues</h3>
<p>In containerized environments (such as Docker, Kubernetes, or server instances behind VPN gateways), the Maximum Transmission Unit (MTU) size of network packets can cause SSL handshakes to fail. If the MTU size is too large, routers drop the packets, resulting in a connection reset. Setting a lower MTU size (e.g. 1400 instead of 1500) resolves this.</p>
<pre><code>
# Temporary fix on server instances
sudo ifconfig eth0 mtu 1400
</code></pre>

<h3>4. Summary Checklist</h3>
<p>Always log the exact cURL debug output when troubleshooting Guzzle errors. Setting <code>'debug' => true</code> in your client instantiation provides deep insight into the connection lifecycle, helping you isolate network drops from configuration issues.</p>
`
  },
  {
    title: 'Resolving Tailwind CSS Styles Not Loading in Production Next.js Builds',
    category: 'Next.js SEO',
    focus_keyword: 'tailwind css not loading nextjs production build',
    keywords: 'tailwind css nextjs production, fix tailwind styles missing nextjs, nextjs build missing styles, tailwind purge config css',
    excerpt: 'An debugging guide to fixing missing Tailwind CSS utility styles in production Next.js builds, ensuring that styles do not get purged accidentally.',
    content: `
<p>Tailwind CSS is an excellent framework for building responsive user interfaces, but developers sometimes notice a puzzling issue: styles that load perfectly during development (<code>npm run dev</code>) are missing or broken in production builds (<code>npm run build</code>). This happens because Tailwind's optimization step purges unused styles during compilation, and if your configuration files do not map to the exact folder paths containing your React components, the compiler accidentally purges required styles. This guide explains how to fix this issue.</p>

<h3>1. How Tailwind Purging Works in Next.js</h3>
<p>Tailwind CSS scans your files for class names to generate only the CSS that you actually use. It does not parse JavaScript logic; it uses regular expressions to find complete class name strings. If your component directory path is missing from your <code>tailwind.config.js</code> file, the class names inside those components are marked as unused and removed from the final CSS output.</p>

<p>Consider this problematic configuration file where the <code>src/components</code> directory is omitted:</p>
<pre><code>
// tailwind.config.js - Problematic
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Scans pages, but misses source subdirectories!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
</code></pre>

<h3>2. The Fix: Correcting tailwind.config.js Content Paths</h3>
<p>To prevent styles from being purged, ensure that your configuration scans all folders that contain components, pages, or layout files. Below is the standard setup for a modern Next.js project using the <code>src/</code> directory:</p>
<pre><code>
// tailwind.config.js - Optimized
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
</code></pre>

<h3>3. Avoiding Dynamic Class Construction</h3>
<p>Because Tailwind scans source code statically, constructing class names dynamically (e.g. string concatenation) will prevent Tailwind from detecting them, and the styles will not be generated in the production build.</p>
<pre><code>
// Problematic - Tailwind cannot detect this dynamic class!
const buttonColor = 'red';
return &lt;button className={\`bg-\${buttonColor}-500\`}&gt;Submit&lt;/button&gt;;

// Optimized - Write complete class name strings
const buttonClass = isError ? 'bg-red-500' : 'bg-blue-500';
return &lt;button className={buttonClass}&gt;Submit&lt;/button&gt;;
</code></pre>

<h3>4. Conclusion</h3>
<p>Whenever you update configuration paths, run a production build locally with <code>npm run build && npm run start</code> to verify that all layout components, responsive configurations, and custom utility classes load properly before publishing changes to your users.</p>
`
  }
];

// Open Database and insert the 5 long-tail posts
console.log(`Connecting to database at: ${dbPath}`);
const db = new Database(dbPath);

let publishDate = new Date('2026-07-15');

console.log(`Inserting ${LONGTAIL_POSTS.length} specific long-tail posts...`);

// Let's set unique dates for them. Let's make sure we insert them into the database starting from today and moving forward.
// To avoid conflicts with existing posts in the database, we can set dates that are unique, or just add them.
// Let's check: we can schedule them.

const insertStmt = db.prepare(`
  INSERT INTO posts (slug, title, publish_date, category, excerpt, content, img,
                      meta_title, meta_description, focus_keyword, keywords,
                      canonical, og_image, author, updated_at)
  VALUES (@slug, @title, @publish_date, @category, @excerpt, @content, @img,
          @meta_title, @meta_description, @focus_keyword, @keywords,
          @canonical, @og_image, @author, datetime('now'))
  ON CONFLICT(slug) DO UPDATE SET
    title=excluded.title, publish_date=excluded.publish_date,
    category=excluded.category, excerpt=excluded.excerpt,
    content=excluded.content, img=excluded.img,
    meta_title=excluded.meta_title, meta_description=excluded.meta_description,
    focus_keyword=excluded.focus_keyword, keywords=excluded.keywords,
    canonical=excluded.canonical, og_image=excluded.og_image,
    author=excluded.author, updated_at=datetime('now')
`);

for (let i = 0; i < LONGTAIL_POSTS.length; i++) {
  const post = LONGTAIL_POSTS[i];
  
  // To avoid date conflict, we can add them to some unique days in the future (e.g. +2001, +2002, etc.)
  const targetDate = new Date('2026-07-15');
  targetDate.setDate(targetDate.getDate() + 2000 + i); // 2000 days from today
  const dateStr = targetDate.toISOString().split('T')[0];
  
  const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  insertStmt.run({
    slug,
    title: post.title,
    publish_date: dateStr,
    category: post.category,
    excerpt: post.excerpt,
    content: post.content,
    img: '/images/blog-1.webp',
    meta_title: post.title,
    meta_description: post.excerpt,
    focus_keyword: post.focus_keyword,
    keywords: post.keywords,
    canonical: `https://ziamuhammad.com/blog/${slug}`,
    og_image: '/images/blog-1.webp',
    author: 'Zia Muhammad'
  });
  
  console.log(`- Inserted: "${post.title}" on date ${dateStr}`);
}

const totalCount = db.prepare('SELECT COUNT(*) as count FROM posts').get().count;
console.log(`Finished. Total articles in database: ${totalCount}`);
db.close();
