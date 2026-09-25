#!/usr/bin/env node

// Rewrites repeated articles with Gemini. One canonical article per title is
// retained; every repeated title or repeated body is replaced with distinct,
// search-focused content. Progress is recorded after each successful update.

import { openDb } from './db.mjs';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const statePath = path.join(root, 'data', 'ai-rewrite-progress.json');
const limitIndex = process.argv.indexOf('--limit');
const limit = limitIndex >= 0 ? Number(process.argv[limitIndex + 1]) : Infinity;
const concurrencyIndex = process.argv.indexOf('--concurrency');
const concurrency = concurrencyIndex >= 0 ? Number(process.argv[concurrencyIndex + 1]) : 8;

function loadEnvironment() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

function normalize(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function writeState(state) {
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

function createState(posts) {
  const canonicalTitleIds = new Set();
  const titles = new Map();
  for (const post of posts) {
    const key = normalize(post.title);
    if (!titles.has(key)) {
      titles.set(key, post.id);
      canonicalTitleIds.add(post.id);
    }
  }

  const targetIds = new Set(posts.filter((post) => !canonicalTitleIds.has(post.id)).map((post) => post.id));
  const retained = posts.filter((post) => canonicalTitleIds.has(post.id));
  const bodies = new Map();
  for (const post of retained) {
    const key = normalize(post.content);
    if (!bodies.has(key)) {
      bodies.set(key, post.id);
    } else {
      targetIds.add(post.id);
    }
  }

  return {
    version: 1,
    createdAt: new Date().toISOString(),
    targetIds: [...targetIds],
    completedIds: [],
  };
}

function imageFor(category, fallback) {
  const images = {
    'Technology & IT': '/images/blog-1.webp',
    'Business & Management': '/images/blog-2.webp',
    'Government & Enterprise': '/images/blog-2.webp',
    'Data & Analytics': '/images/blog-3.webp',
    'Healthcare & Technology': '/images/blog-3.webp',
    'Real Estate': '/images/blog-4.webp',
    'Finance & Accounting': '/images/blog-5.webp',
    'Marketing & SEO': '/images/blog-6.webp',
    'Career & Professional Development': '/images/blog-6.webp',
  };
  return images[category] ?? fallback;
}

function parseModelJson(value) {
  const cleaned = value.trim().replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  const result = JSON.parse(cleaned);
  const required = ['title', 'excerpt', 'metaTitle', 'metaDescription', 'focusKeyword', 'keywords', 'content'];
  if (required.some((field) => typeof result[field] !== 'string' || !result[field].trim())) {
    throw new Error('Gemini returned an incomplete article payload.');
  }
  return result;
}

async function rewritePost(post, position, total) {
  const angle = `a distinct 2026-${post.publish_date.slice(5)} editorial angle for article ${position} of ${total}`;
  const prompt = `Return valid JSON only. Rewrite this blog article into a genuinely original, useful, technically accurate article.\n\nOriginal topic: ${post.title}\nCategory: ${post.category}\nPublication date: ${post.publish_date}\nRequired angle: ${angle}\n\nThe JSON object must have exactly these string fields: title, excerpt, metaTitle, metaDescription, focusKeyword, keywords, content.\n\nRequirements:\n- title: unique, specific, 50-65 characters, no generic filler\n- excerpt: unique, 120-155 characters\n- metaTitle: unique, maximum 60 characters\n- metaDescription: unique, 140-160 characters\n- focusKeyword: a natural long-tail phrase\n- keywords: 5-8 comma-separated relevant terms\n- content: 1,200-1,600 words of clean HTML using p, h2, h3, ul, ol, li, table, thead, tbody, tr, th, td, strong, code when useful\n- write for a Qatar and global professional audience, but do not invent client results, citations, statistics, or legal claims\n- cover a specific problem, a practical implementation path, tradeoffs, common mistakes, and an actionable checklist\n- do not reuse the original wording, generic repeated headings, or phrases such as \"global blueprint\"\n- no markdown fences and no introductory text outside the JSON object.`;
  const optimizedPrompt = prompt.replace('1,200-1,600 words', '900-1,100 words');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: optimizedPrompt }] }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 5000,
          responseMimeType: 'application/json',
        },
      }),
    },
  );
  if (!response.ok) throw new Error(`Gemini request failed with ${response.status}: ${await response.text()}`);
  const payload = await response.json();
  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned no article content.');
  return parseModelJson(text);
}

async function main() {
  loadEnvironment();
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured. Add it to .env or the shell environment.');
  }
  if (limitIndex >= 0 && (!Number.isFinite(limit) || limit <= 0)) {
    throw new Error('--limit must be a positive number.');
  }
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 10) {
    throw new Error('--concurrency must be a whole number from 1 to 10.');
  }

  const db = openDb();
  const posts = db
    .prepare(`SELECT id, slug, title, publish_date, category, excerpt, content, img
              FROM posts ORDER BY publish_date ASC, id ASC`)
    .all();
  const byId = new Map(posts.map((post) => [post.id, post]));
  const state = fs.existsSync(statePath)
    ? JSON.parse(fs.readFileSync(statePath, 'utf8'))
    : createState(posts);
  if (!fs.existsSync(statePath)) writeState(state);

  const completed = new Set(state.completedIds);
  const pending = state.targetIds.filter((id) => !completed.has(id)).slice(0, limit);
  console.log(`${state.targetIds.length} posts need rewrites; ${pending.length} selected for this run.`);

  let nextIndex = 0;
  let nextRequestAt = Date.now();
  const rewriteOne = async () => {
    const index = nextIndex;
    nextIndex += 1;
    if (index >= pending.length) return;

    const post = byId.get(pending[index]);
    if (!post) throw new Error(`Post ${pending[index]} no longer exists.`);
    console.log(`[${index + 1}/${pending.length}] Rewriting ${post.slug}`);

    // Keep request starts below the standard 15-per-minute Gemini quota
    // while multiple article generations are in flight.
    const waitMs = Math.max(0, nextRequestAt - Date.now());
    nextRequestAt += 4_100;
    if (waitMs) await new Promise((resolve) => setTimeout(resolve, waitMs));

    let article;
    for (let attempt = 1; attempt <= 4; attempt += 1) {
      try {
        article = await rewritePost(post, state.completedIds.length + 1, state.targetIds.length);
        break;
      } catch (error) {
        if (attempt === 4) throw error;
        await new Promise((resolve) => setTimeout(resolve, attempt * 5_000));
      }
    }

    db.prepare(
      `UPDATE posts SET title=@title, excerpt=@excerpt, content=@content,
       meta_title=@metaTitle, meta_description=@metaDescription,
       focus_keyword=@focusKeyword, keywords=@keywords, img=@img,
       updated_at=datetime('now') WHERE id=@id`,
    ).run({ ...article, img: imageFor(post.category, post.img), id: post.id });
    state.completedIds.push(post.id);
    writeState(state);
    await rewriteOne();
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, pending.length) }, rewriteOne),
  );

  db.close();
  console.log(`Completed ${state.completedIds.length}/${state.targetIds.length} rewrites.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
