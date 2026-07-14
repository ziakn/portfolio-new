import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

// Load environment variables from .env if present
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  }
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY is not set in your environment or .env file.');
  console.error('Please set it using: export GEMINI_API_KEY="your_api_key" or create a .env file.');
  process.exit(1);
}

const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');

const SELECTED_TOPICS = [
  { category: 'Technology & IT', subtopic: 'Artificial Intelligence (AI)' },
  { category: 'Technology & IT', subtopic: 'Cybersecurity' },
  { category: 'Technology & IT', subtopic: 'Cloud Computing' },
  { category: 'Business & Management', subtopic: 'Digital Transformation' },
  { category: 'Business & Management', subtopic: 'Entrepreneurship' },
  { category: 'Data & Analytics', subtopic: 'Data Engineering' },
  { category: 'Data & Analytics', subtopic: 'Predictive Analytics' },
  { category: 'Real Estate', subtopic: 'Real Estate Technology (PropTech)' },
  { category: 'Finance & Accounting', subtopic: 'Financial Technology (FinTech)' },
  { category: 'Marketing & SEO', subtopic: 'Search Engine Optimization' },
  { category: 'Marketing & SEO', subtopic: 'Growth Marketing' },
  { category: 'Career & Professional Development', subtopic: 'Remote Work' },
  { category: 'Healthcare & Technology', subtopic: 'Medical AI' },
  { category: 'Engineering & Industry', subtopic: 'Smart Cities' },
  { category: 'Government & Enterprise', subtopic: 'E-Government Solutions' }
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function getCategoryImage(category) {
  switch (category) {
    case 'Technology & IT':
      return '/images/blog-1.webp';
    case 'Business & Management':
    case 'Government & Enterprise':
      return '/images/blog-2.webp';
    case 'Data & Analytics':
    case 'Healthcare & Technology':
      return '/images/blog-3.webp';
    case 'Real Estate':
      return '/images/blog-4.webp';
    case 'Finance & Accounting':
      return '/images/blog-5.webp';
    case 'Marketing & SEO':
    case 'Career & Professional Development':
    default:
      return '/images/blog-6.webp';
  }
}

async function generateArticleWithAI(topic, category) {
  const prompt = `Write a comprehensive, professional, and detailed blog post about the topic: "${topic}" under the category "${category}".
The post must be written in high-quality English with a global perspective.
It must contain:
1. An engaging introduction.
2. A section on core concepts and fundamentals.
3. A real-world case study or implementation scenario.
4. A strategic analysis of key benefits and value (include an HTML table comparing key metrics).
5. A step-by-step implementation blueprint.
6. Industry best practices and design patterns.
7. Common pitfalls and mitigation strategies.
8. A forward-looking future outlook (2026 and beyond).

FORMATTING RULES:
- Return the content formatted as clean HTML (using <p>, <h3>, <ul>, <li>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <pre>, <code>, <strong>).
- Do NOT wrap the code in markdown blocks like \`\`\`html. Output the HTML directly.
- The article MUST be extremely detailed and reach a MINIMUM of 2000 words. Expand deeply on every concept, explanation, and case study. Do not use placeholders or generic summaries.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Invalid response structure from Gemini API');
  }

  // Strip markdown code block wrappers if generated
  text = text.trim();
  if (text.startsWith('```html')) {
    text = text.substring(7);
  } else if (text.startsWith('```')) {
    text = text.substring(3);
  }
  if (text.endsWith('```')) {
    text = text.substring(0, text.length - 3);
  }

  // Generate Title & Excerpt
  const title = `The Global Impact of ${topic}: Strategic AI Blueprint`;
  const excerpt = `An AI-generated global analysis of ${topic}, exploring strategic integration frameworks, industry metrics, and future implementation roadmaps.`;

  return { title, excerpt, content: text.trim() };
}

async function main() {
  console.log(`Connecting to database at: ${dbPath}`);
  const db = new Database(dbPath);

  // We will insert/upsert these 15 posts starting from today
  let publishDate = new Date('2026-07-15');

  console.log(`Starting AI content generation for 15 selected articles...`);

  for (let i = 0; i < SELECTED_TOPICS.length; i++) {
    const item = SELECTED_TOPICS[i];
    console.log(`[${i + 1}/15] Generating content for: "${item.subtopic}"...`);

    try {
      const { title, excerpt, content } = await generateArticleWithAI(item.subtopic, item.category);
      
      const wordCount = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
      console.log(`   -> Generated successfully! Word count: ${wordCount}`);

      const dateStr = publishDate.toISOString().split('T')[0];
      const slug = `${slugify(title)}-ai-${i + 1}`;
      const imagePath = getCategoryImage(item.category);

      db.prepare(`
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
      `).run({
        slug,
        title,
        publish_date: dateStr,
        category: item.category,
        excerpt,
        content,
        img: imagePath,
        meta_title: title,
        meta_description: excerpt.substring(0, 155),
        focus_keyword: item.subtopic.toLowerCase(),
        keywords: `${item.subtopic.toLowerCase()}, ai-generated, global, scaling, strategy`,
        canonical: `https://ziamuhammad.com/blog/${slug}`,
        og_image: imagePath,
        author: 'Zia Muhammad'
      });

      console.log(`   -> Upserted in database with date: ${dateStr}`);

      // Go forward 1 day
      publishDate.setDate(publishDate.getDate() + 1);

      // Sleep 4 seconds to respect API rate limits (Gemini free tier allows 15 RPM)
      if (i < SELECTED_TOPICS.length - 1) {
        console.log(`   Waiting 4 seconds for API rate limits...`);
        await new Promise(resolve => setTimeout(resolve, 4000));
      }
    } catch (err) {
      console.error(`   Error generating "${item.subtopic}":`, err.message);
    }
  }

  const rowCount = db.prepare('SELECT COUNT(*) as count FROM posts').get().count;
  console.log(`Generation run complete. Total posts in database: ${rowCount}`);
  db.close();
}

main().catch(console.error);
