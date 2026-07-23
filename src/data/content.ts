import { getDb } from './db';

// Editable site copy lives in the `site_content` key→JSON table. Every field
// has a hardcoded default below, so a missing/undefined key always falls back
// to the original site text and nothing can break by omission.

export interface ServiceItem {
  icon: string;
  title: string;
  text: string;
}

export interface ContentDefaults {
  'home.about': string; // HTML
  'home.services': ServiceItem[];
  'resume.achievements': string[]; // list of HTML <li> inner strings
}

export const contentDefaults: ContentDefaults = {
  'home.about': `<p>I'm a <strong>Full Stack Software Engineer &amp; Laravel Developer in Qatar</strong> with <strong>7+ years</strong> of experience building high-performance web applications. I specialize in scaling enterprise platforms, including <strong>Al Sharq News and The Peninsula Qatar (85M+ yearly views)</strong>.</p>
<p>As a <strong>Next.js &amp; React Expert</strong>, I focus on creating fast, SEO-optimized frontends integrated with robust PHP/Laravel backends. My current focus is <strong>AI Engineering</strong>—integrating <strong>LLMs (OpenAI, Gemini)</strong> and <strong>RAG pipelines</strong> into production systems to automate content workflows and enhance user engagement.</p>
<p>If you are looking to <strong>hire a software engineer in Doha</strong> or need a consultant for <strong>zero-downtime database migrations</strong> and <strong>API architecture</strong>, let's connect. I help businesses in Qatar and globally transform their digital presence with state-of-the-art technology. Check out my <a href="/portfolio">portfolio projects</a> and <a href="/blog">recent articles</a>.</p>`,
  'home.services': [
    { icon: '/images/icon-dev.svg', title: 'Web Development', text: 'Building fast, scalable, and secure websites using Laravel, React.js, Vue.js, and Next.js. From corporate websites to high-traffic platforms in Qatar, I deliver tailor-made solutions with excellent performance.' },
    { icon: '/images/icon-api.svg', title: 'API Development', text: 'Designing and integrating secure REST APIs for mobile and web applications. Experienced in payment gateways, SMS services, Google Maps, and real-time apps with WebSockets & Pusher.' },
    { icon: '/images/icon-app.svg', title: 'Mobile Development', text: 'Creating cross-platform mobile apps with React Native. Delivering intuitive, responsive, and feature-rich applications for iOS and Android to help businesses connect with customers in Qatar and beyond.' },
    { icon: '/images/icon-hosting.svg', title: 'Hosting & Deployment', text: 'Offering reliable hosting solutions including VPS, cloud-based hosting, and dedicated servers. Expertise in deployment on Linux environments (Ubuntu, CentOS, AlmaLinux) with Apache/Nginx.' },
    { icon: '/images/icon-seo.svg', title: 'SEO Optimization', text: 'Boosting online visibility and search rankings with tailored SEO strategies. Helping businesses in Qatar attract more visitors and achieve higher conversions.' },
    { icon: '/images/icon-consulting.svg', title: 'IT Consultation', text: 'Providing expert IT consulting services in Qatar, helping organizations make the right technology choices for growth, security, and scalability.' },
  ],
  'resume.achievements': [
    'Scaled Al Sharq News &amp; The Peninsula Qatar to 2M+ monthly users and 85M+ yearly views.',
    'Integrated LLMs (OpenAI, Gemini, Ollama) and RAG pipelines into live news platforms.',
    'Engineered zero-downtime migration of 12M+ records with full data integrity.',
    'Shipped 30+ RESTful APIs across mobile and web apps in 5 industries.',
    'Integrated payment gateways (CyberSource, Stripe, Qpay, Sadad) and SMS providers.',
    'Delivered React Native apps for news, e-commerce, and food delivery.',
  ],
};

export type ContentKey = keyof ContentDefaults;

// Reads a content value, falling back to the default when unset or unparseable.
export function getContent<K extends ContentKey>(key: K): ContentDefaults[K] {
  const row = getDb().prepare('SELECT value FROM site_content WHERE key = ?').get(key) as
    | { value: string }
    | undefined;
  if (!row) return contentDefaults[key];
  try {
    return JSON.parse(row.value) as ContentDefaults[K];
  } catch {
    return contentDefaults[key];
  }
}

export function setContent<K extends ContentKey>(key: K, value: ContentDefaults[K]): void {
  getDb()
    .prepare(
      `INSERT INTO site_content (key, value, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
    )
    .run(key, JSON.stringify(value));
}

// Whether a key has been customized (vs. still using the default).
export function isCustomized(key: ContentKey): boolean {
  const row = getDb().prepare('SELECT 1 FROM site_content WHERE key = ?').get(key);
  return Boolean(row);
}

export function resetContent(key: ContentKey): void {
  getDb().prepare('DELETE FROM site_content WHERE key = ?').run(key);
}
