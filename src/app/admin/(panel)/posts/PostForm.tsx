'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import type { PostFormState } from './actions';

export interface PostFormValues {
  slug?: string;
  title?: string;
  publish_date?: string;
  category?: string;
  excerpt?: string;
  content?: string;
  img?: string;
  meta_title?: string | null;
  meta_description?: string | null;
  focus_keyword?: string | null;
  keywords?: string | null;
  canonical?: string | null;
  og_image?: string | null;
  author?: string | null;
}

interface Props {
  action: (prev: PostFormState, formData: FormData) => Promise<PostFormState>;
  values?: PostFormValues;
  categories: string[];
  submitLabel: string;
}

export default function PostForm({ action, values = {}, categories, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, {} as PostFormState);

  return (
    <form action={formAction} className="admin-form" style={{ maxWidth: 860 }}>
      {state.error && <div className="admin-notice error">{state.error}</div>}

      <div className="admin-field">
        <label htmlFor="title">Title *</label>
        <input id="title" name="title" className="admin-input" defaultValue={values.title ?? ''} required />
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" className="admin-input" defaultValue={values.slug ?? ''} placeholder="auto-generated from title if blank" />
          <span className="admin-hint">URL: /blog/&lt;slug&gt;</span>
        </div>
        <div className="admin-field">
          <label htmlFor="publish_date">Publish date * (Asia/Qatar)</label>
          <input id="publish_date" name="publish_date" type="date" className="admin-input" defaultValue={values.publish_date ?? ''} required />
          <span className="admin-hint">A future date schedules the post — it stays hidden until then.</span>
        </div>
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="category">Category *</label>
          <input id="category" name="category" className="admin-input" list="category-list" defaultValue={values.category ?? ''} required />
          <datalist id="category-list">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div className="admin-field">
          <label htmlFor="author">Author</label>
          <input id="author" name="author" className="admin-input" defaultValue={values.author ?? 'Zia Muhammad'} />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="img">Image path *</label>
        <input id="img" name="img" className="admin-input" defaultValue={values.img ?? ''} placeholder="/images/blog/example.webp" required />
      </div>

      <div className="admin-field">
        <label htmlFor="excerpt">Excerpt *</label>
        <textarea id="excerpt" name="excerpt" className="admin-textarea" defaultValue={values.excerpt ?? ''} style={{ minHeight: 80 }} required />
      </div>

      <div className="admin-field">
        <label htmlFor="content">Content (HTML) *</label>
        <textarea id="content" name="content" className="admin-textarea code" defaultValue={values.content ?? ''} required />
        <span className="admin-hint">Raw HTML — rendered directly on the post page.</span>
      </div>

      <fieldset style={{ border: '1px solid var(--admin-border)', borderRadius: 10, padding: 20 }}>
        <legend style={{ padding: '0 8px', color: 'var(--admin-muted)', fontSize: 13 }}>SEO (optional)</legend>
        <div className="admin-form" style={{ gap: 16 }}>
          <div className="admin-field-row">
            <div className="admin-field">
              <label htmlFor="meta_title">Meta title</label>
              <input id="meta_title" name="meta_title" className="admin-input" defaultValue={values.meta_title ?? ''} placeholder="falls back to title" />
            </div>
            <div className="admin-field">
              <label htmlFor="focus_keyword">Focus keyword</label>
              <input id="focus_keyword" name="focus_keyword" className="admin-input" defaultValue={values.focus_keyword ?? ''} />
            </div>
          </div>
          <div className="admin-field">
            <label htmlFor="meta_description">Meta description</label>
            <textarea id="meta_description" name="meta_description" className="admin-textarea" defaultValue={values.meta_description ?? ''} style={{ minHeight: 70 }} placeholder="falls back to excerpt; aim 110–155 chars" />
          </div>
          <div className="admin-field">
            <label htmlFor="keywords">Keywords (comma-separated)</label>
            <input id="keywords" name="keywords" className="admin-input" defaultValue={values.keywords ?? ''} />
          </div>
          <div className="admin-field-row">
            <div className="admin-field">
              <label htmlFor="canonical">Canonical URL</label>
              <input id="canonical" name="canonical" className="admin-input" defaultValue={values.canonical ?? ''} placeholder="defaults to the post URL" />
            </div>
            <div className="admin-field">
              <label htmlFor="og_image">OG image URL</label>
              <input id="og_image" name="og_image" className="admin-input" defaultValue={values.og_image ?? ''} />
            </div>
          </div>
        </div>
      </fieldset>

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? 'Saving…' : submitLabel}
        </button>
        <Link href="/admin/posts" className="admin-btn secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}
