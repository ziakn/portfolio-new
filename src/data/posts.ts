export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  img: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'integrating-llms-laravel',
    title: 'Integrating LLMs with Laravel: A Practical Guide',
    date: 'April 20, 2026',
    category: 'AI & Backend',
    excerpt: 'Learn how to leverage OpenAI and Gemini APIs within your Laravel applications to build intelligent features like automated tagging and RAG pipelines.',
    img: '/images/blog-1.jpg',
    content: `
      <p>Integrating Large Language Models (LLMs) into production Laravel applications is becoming a standard requirement for modern web platforms. Whether you are building automated content tagging, intelligent search via RAG (Retrieval-Augmented Generation), or article summarization, Laravel provides an excellent ecosystem to manage these integrations.</p>
      
      <h3>1. Choosing the Right Model</h3>
      <p>Depending on your needs, you might choose OpenAI's GPT-4o for high reasoning capabilities, or Google's Gemini for large context windows. For local development or privacy-sensitive data, running Ollama locally is a great alternative.</p>

      <h3>2. Implementing RAG Pipelines</h3>
      <p>To provide accurate answers based on your private data, you need to implement a RAG pipeline. This involves converting your content into vectors (embeddings) using models like 'text-embedding-3-small' and storing them in a vector database like ChromaDB or Pinecone.</p>

      <h3>3. Handling Concurrency</h3>
      <p>API calls to LLMs can be slow. It's crucial to use Laravel's Queue system to handle these tasks in the background, ensuring a smooth user experience.</p>
    `
  },
  {
    slug: 'scaling-nextjs-high-traffic',
    title: 'Scaling Next.js Apps for High Traffic Platforms',
    date: 'March 15, 2026',
    category: 'Frontend',
    excerpt: 'Best practices for optimizing Next.js performance, handling 85M+ yearly views, and implementing zero-downtime migrations.',
    img: '/images/blog-2.jpg',
    content: `
      <p>Scaling a Next.js application to handle millions of monthly users requires a deep understanding of rendering strategies and caching mechanisms.</p>

      <h3>1. Incremental Static Regeneration (ISR)</h3>
      <p>ISR allows you to update static content without needing to rebuild the entire site. This is perfect for news platforms where articles are frequently added or updated.</p>

      <h3>2. Image Optimization</h3>
      <p>Using the Next.js Image component is non-negotiable. It automatically serves WebP images, resizes them based on the viewport, and prevents layout shifts (CLS).</p>

      <h3>3. Edge Runtime</h3>
      <p>Moving logic to the Edge (Middleware or Edge Functions) can significantly reduce latency by running code closer to your users in Doha or globally.</p>
    `
  },
  {
    slug: 'future-web-dev-qatar',
    title: 'The Future of Web Development in Qatar',
    date: 'February 10, 2026',
    category: 'Tech Trends',
    excerpt: 'Exploring the digital transformation in Doha and how local businesses are adopting modern tech stacks like React and Headless CMS.',
    img: '/images/blog-3.jpg',
    content: `
      <p>Qatar is undergoing a rapid digital transformation. With the growth of Qatar Vision 2030, businesses are moving away from legacy systems to more agile, high-performance tech stacks.</p>

      <h3>1. Headless Architecture</h3>
      <p>Decoupling the frontend from the backend (using Headless CMS like Strapi or Contentful with Next.js) allows for multi-channel content delivery, which is essential for modern media groups.</p>

      <h3>2. Localization & RTL</h3>
      <p>Building high-quality Arabic interfaces requires more than just translating text. It involves full RTL (Right-to-Left) layout optimization and ensuring typography (like Poppins or Cairo) is perfectly balanced.</p>

      <h3>3. AI Adoption</h3>
      <p>From government services to eCommerce, AI is being integrated to personalize user experiences and automate complex workflows.</p>
    `
  }
];
