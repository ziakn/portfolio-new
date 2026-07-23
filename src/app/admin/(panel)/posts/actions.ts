'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  slugExists,
  slugify,
  type PostInput,
} from '@/data/posts';

export type PostFormState = { error?: string };

// Refresh every public surface a post can appear on.
function revalidatePostSurfaces(...slugs: (string | undefined)[]) {
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  revalidatePath('/feed.xml');
  for (const slug of slugs) {
    if (slug) revalidatePath(`/blog/${slug}`);
  }
}

function parseForm(formData: FormData): PostInput {
  const title = String(formData.get('title') ?? '').trim();
  const rawSlug = String(formData.get('slug') ?? '').trim();
  return {
    title,
    slug: slugify(rawSlug || title),
    publish_date: String(formData.get('publish_date') ?? '').trim(),
    category: String(formData.get('category') ?? '').trim(),
    excerpt: String(formData.get('excerpt') ?? '').trim(),
    content: String(formData.get('content') ?? ''),
    img: String(formData.get('img') ?? '').trim(),
    meta_title: String(formData.get('meta_title') ?? ''),
    meta_description: String(formData.get('meta_description') ?? ''),
    focus_keyword: String(formData.get('focus_keyword') ?? ''),
    keywords: String(formData.get('keywords') ?? ''),
    canonical: String(formData.get('canonical') ?? ''),
    og_image: String(formData.get('og_image') ?? ''),
    author: String(formData.get('author') ?? ''),
  };
}

function validate(input: PostInput): string | null {
  const required: [keyof PostInput, string][] = [
    ['title', 'Title'],
    ['slug', 'Slug'],
    ['publish_date', 'Publish date'],
    ['category', 'Category'],
    ['excerpt', 'Excerpt'],
    ['content', 'Content'],
    ['img', 'Image path'],
  ];
  for (const [field, label] of required) {
    if (!String(input[field] ?? '').trim()) return `${label} is required.`;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.publish_date)) {
    return 'Publish date must be YYYY-MM-DD.';
  }
  return null;
}

export async function createPostAction(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const input = parseForm(formData);
  const error = validate(input);
  if (error) return { error };
  if (slugExists(input.slug)) {
    return { error: `Slug "${input.slug}" is already used by another post.` };
  }

  createPost(input);
  revalidatePostSurfaces(input.slug);
  redirect('/admin/posts');
}

export async function updatePostAction(
  id: number,
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const existing = getPostById(id);
  if (!existing) return { error: 'Post not found.' };

  const input = parseForm(formData);
  const error = validate(input);
  if (error) return { error };
  if (slugExists(input.slug, id)) {
    return { error: `Slug "${input.slug}" is already used by another post.` };
  }

  updatePost(id, input);
  // Revalidate both the new and (if changed) the old slug.
  revalidatePostSurfaces(input.slug, existing.slug);
  redirect('/admin/posts');
}

export async function deletePostAction(formData: FormData) {
  const id = Number(formData.get('id'));
  const slug = deletePost(id);
  revalidatePostSurfaces(slug);
  redirect('/admin/posts');
}
