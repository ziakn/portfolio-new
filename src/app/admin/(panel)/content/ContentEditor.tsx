'use client';

import { useActionState } from 'react';
import { resetContentAction, type ContentFormState } from './actions';

export default function ContentEditor({
  title,
  hint,
  value,
  action,
  resetKey,
  customized,
  code = false,
}: {
  title: string;
  hint: string;
  value: string;
  action: (prev: ContentFormState, formData: FormData) => Promise<ContentFormState>;
  resetKey: string;
  customized: boolean;
  code?: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, {} as ContentFormState);

  return (
    <section className="admin-card" style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <h2 style={{ fontSize: 17, margin: 0 }}>{title}</h2>
        {customized ? (
          <span className="badge live">customized</span>
        ) : (
          <span className="badge scheduled">default</span>
        )}
      </div>
      <p className="admin-hint" style={{ marginBottom: 12 }}>{hint}</p>

      {state.error && <div className="admin-notice error" style={{ marginBottom: 12 }}>{state.error}</div>}
      {state.success && <div className="admin-notice success" style={{ marginBottom: 12 }}>{state.success}</div>}

      <form action={formAction} className="admin-form" style={{ maxWidth: '100%' }}>
        <textarea
          name="value"
          className={`admin-textarea${code ? ' code' : ''}`}
          defaultValue={value}
          style={{ minHeight: code ? 260 : 180 }}
        />
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="admin-btn" disabled={pending}>
            {pending ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>

      {customized && (
        <form action={resetContentAction} style={{ marginTop: 10 }}>
          <input type="hidden" name="key" value={resetKey} />
          <button
            type="submit"
            className="admin-btn secondary small"
            onClick={(e) => {
              if (!window.confirm('Reset to the original default text?')) e.preventDefault();
            }}
          >
            Reset to default
          </button>
        </form>
      )}
    </section>
  );
}
