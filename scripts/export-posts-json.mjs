#!/usr/bin/env node

// Exports the blog content from SQLite into deployable JSON files:
//   data/posts/YYYY/MM/<slug>.json        complete article
//   public/posts/YYYY/MM/index.json       lightweight listing data
//   src/data/posts-index.json             build-time article manifest

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const database = new DatabaseSync(path.join(root, 'data', 'posts.sqlite'), { readOnly: true });
const posts = database
  .prepare(`SELECT slug, title, publish_date, category, excerpt, content, img,
                   meta_title, meta_description, focus_keyword, keywords,
                   canonical, og_image, author, updated_at
            FROM posts
            ORDER BY publish_date DESC, id DESC`)
  .all();
database.close();

const monthlyIndexes = new Map();
const manifest = [];

for (const post of posts) {
  const [year, month] = post.publish_date.split('-');
  const directory = path.join(root, 'data', 'posts', year, month);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, `${post.slug}.json`), `${JSON.stringify(post)}\n`);

  const listing = {
    slug: post.slug,
    title: post.title,
    date: post.publish_date,
    category: post.category,
    excerpt: post.excerpt,
    img: post.img,
  };
  const key = `${year}/${month}`;
  monthlyIndexes.set(key, [...(monthlyIndexes.get(key) ?? []), listing]);
  manifest.push({ ...post, content: '' });
}

for (const [key, entries] of monthlyIndexes) {
  const directory = path.join(root, 'public', 'posts', key);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.json'), `${JSON.stringify(entries)}\n`);
}

fs.writeFileSync(
  path.join(root, 'src', 'data', 'posts-index.json'),
  `${JSON.stringify(manifest)}\n`,
);

console.log(`Exported ${posts.length} posts across ${monthlyIndexes.size} monthly directories.`);
