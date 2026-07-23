import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSubmission, markRead } from '@/data/contact';
import { markReadAction, deleteMessageAction } from '../actions';

export default async function MessageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const message = getSubmission(Number(id));
  if (!message) notFound();

  // Opening a message marks it read.
  if (!message.isRead) markRead(message.id, true);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>{message.name}</h1>
          <p className="admin-subtitle">
            <a href={`mailto:${message.email}`} style={{ color: 'var(--admin-accent)' }}>
              {message.email}
            </a>
          </p>
        </div>
        <Link href="/admin/messages" className="admin-btn secondary">
          ← Back
        </Link>
      </div>

      <div className="admin-meta-line">
        <span>Received: {new Date(message.createdAt + 'Z').toLocaleString()}</span>
        {message.ip && <span>IP: {message.ip}</span>}
      </div>

      <div className="admin-message-body">{message.message}</div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <a href={`mailto:${message.email}?subject=Re: your message`} className="admin-btn">
          Reply by email
        </a>
        <form action={markReadAction}>
          <input type="hidden" name="id" value={message.id} />
          <input type="hidden" name="read" value="0" />
          <button type="submit" className="admin-btn secondary">
            Mark unread
          </button>
        </form>
        <form action={deleteMessageAction}>
          <input type="hidden" name="id" value={message.id} />
          <button type="submit" className="admin-btn danger">
            Delete
          </button>
        </form>
      </div>
    </>
  );
}
