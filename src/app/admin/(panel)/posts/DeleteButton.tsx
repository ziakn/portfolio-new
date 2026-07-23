'use client';

import { useFormStatus } from 'react-dom';

// Submit button for a delete <form>; confirms before the action fires and
// shows a pending state. Lives inside the form so it uses the form's status.
export default function DeleteButton({ label = 'Delete', confirm = 'Delete this item? This cannot be undone.' }: { label?: string; confirm?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="admin-btn danger small"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(confirm)) e.preventDefault();
      }}
    >
      {pending ? '…' : label}
    </button>
  );
}
