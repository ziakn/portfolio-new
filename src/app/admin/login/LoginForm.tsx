'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from './actions';

const initial: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="admin-form">
      {state.error && <div className="admin-notice error">{state.error}</div>}
      <div className="admin-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="admin-input" autoComplete="username" required autoFocus />
      </div>
      <div className="admin-field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="admin-input" autoComplete="current-password" required />
      </div>
      <button type="submit" className="admin-btn" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
