'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import type { ProjectFormState } from './actions';

export interface ProjectFormValues {
  title?: string;
  category?: string;
  href?: string | null;
  img?: string;
  description?: string;
  sortOrder?: number;
}

export default function ProjectForm({
  action,
  values = {},
  categories,
  submitLabel,
}: {
  action: (prev: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
  values?: ProjectFormValues;
  categories: string[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {} as ProjectFormState);

  return (
    <form action={formAction} className="admin-form">
      {state.error && <div className="admin-notice error">{state.error}</div>}

      <div className="admin-field">
        <label htmlFor="title">Title *</label>
        <input id="title" name="title" className="admin-input" defaultValue={values.title ?? ''} required />
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="category">Category *</label>
          <input id="category" name="category" className="admin-input" list="cats" defaultValue={values.category ?? ''} required />
          <datalist id="cats">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <span className="admin-hint">Used by the portfolio filter (e.g. web development, applications).</span>
        </div>
        <div className="admin-field">
          <label htmlFor="sortOrder">Sort order</label>
          <input id="sortOrder" name="sortOrder" type="number" className="admin-input" defaultValue={values.sortOrder ?? ''} placeholder="lower = first" />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="img">Image path *</label>
        <input id="img" name="img" className="admin-input" defaultValue={values.img ?? ''} placeholder="/images/project.webp" required />
      </div>

      <div className="admin-field">
        <label htmlFor="href">Link URL (optional)</label>
        <input id="href" name="href" className="admin-input" defaultValue={values.href ?? ''} placeholder="https://… (leave blank for no link)" />
      </div>

      <div className="admin-field">
        <label htmlFor="description">Description *</label>
        <textarea id="description" name="description" className="admin-textarea" defaultValue={values.description ?? ''} style={{ minHeight: 90 }} required />
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? 'Saving…' : submitLabel}
        </button>
        <Link href="/admin/projects" className="admin-btn secondary">
          Cancel
        </Link>
      </div>
    </form>
  );
}
