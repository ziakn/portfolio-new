import posts from './curated-posts';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  img: string;
}

const siteTimeZone = 'Asia/Qatar';
const allPosts = posts as BlogPost[];

function getCurrentPublishDate(): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: siteTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

export function getPosts(): BlogPost[] {
  const publishDate = getCurrentPublishDate();

  return allPosts.filter((post) => post.date <= publishDate);
}

export function getPost(slug: string): BlogPost | undefined {
  const publishDate = getCurrentPublishDate();

  return allPosts.find((post) => post.slug === slug && post.date <= publishDate);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const publishDate = getCurrentPublishDate();
  const current = allPosts.find((post) => post.slug === slug);

  const live = allPosts.filter((post) => post.slug !== slug && post.date <= publishDate);

  // Prefer posts in the same category (better topical internal linking),
  // then fill the remaining slots with the most recent other posts.
  const sameCategory = current
    ? live.filter((post) => post.category === current.category)
    : [];
  const others = live.filter((post) => !sameCategory.includes(post));

  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategories(): string[] {
  return Array.from(new Set(getPosts().map((post) => post.category))).sort();
}

// Base keywords every blog page should carry, plus category-specific terms.
const baseKeywords = [
  'Zia Muhammad',
  'Software Engineer Qatar',
  'Web Development Qatar',
];

const categoryKeywords: Record<string, string[]> = {
  Laravel: ['Laravel Developer Qatar', 'Laravel Development Doha', 'PHP Developer Qatar'],
  'Next.js': ['Next.js Developer Qatar', 'React Developer Doha', 'Next.js Development'],
  'Next.js SEO': ['Next.js SEO', 'Technical SEO Qatar', 'Next.js Developer Qatar'],
  'Technical SEO': ['Technical SEO Qatar', 'SEO Consultant Doha', 'Search Engine Optimization Qatar'],
  Performance: ['Web Performance', 'Core Web Vitals', 'Website Speed Optimization Qatar'],
  'API Development': ['REST API Development', 'API Developer Qatar', 'Backend API Doha'],
  'AI Engineering': ['AI Integration Qatar', 'LLM Integration', 'RAG Pipelines'],
  Security: ['Web Application Security', 'Laravel Security', 'Secure Development Qatar'],
  Hosting: ['Web Hosting Qatar', 'Cloud Deployment', 'Server Management Doha'],
  Ecommerce: ['Ecommerce Development Qatar', 'Online Store Doha', 'Ecommerce SEO'],
  Backend: ['Backend Development Qatar', 'Database Optimization', 'Backend Engineer Doha'],
  'Mobile Apps': ['Mobile App Development Qatar', 'React Native Developer', 'Mobile Backend Doha'],
  Localization: ['Bilingual Website Qatar', 'Arabic Website Development', 'RTL Website Doha'],
  Strategy: ['Software Strategy Qatar', 'Technology Consulting Doha', 'CTO Advisory'],
  Startups: ['Startup MVP Qatar', 'MVP Development Doha', 'Startup Tech Stack'],
  'Case Study': ['Software Case Study', 'Qatar Software Project', 'Engineering Portfolio'],
};

export function getPostKeywords(post: BlogPost): string[] {
  const categoryTerms = categoryKeywords[post.category] ?? [`${post.category} Qatar`];
  return Array.from(new Set([...categoryTerms, post.category, ...baseKeywords]));
}

export function getPlainText(content: string): string {
  return content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getWordCount(content: string): number {
  const text = getPlainText(content);
  return text ? text.split(' ').length : 0;
}

// Average adult reading speed ~200 wpm; minimum of one minute.
export function getReadingTimeMinutes(content: string): number {
  return Math.max(1, Math.round(getWordCount(content) / 200));
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00.000Z`));
}
