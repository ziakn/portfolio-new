import Link from 'next/link';
import { listSubmissions } from '@/data/contact';

export default function MessagesPage() {
  const messages = listSubmissions();

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Messages</h1>
          <p className="admin-subtitle">{messages.length} total contact submission(s)</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="admin-empty">No messages yet. Submissions from the contact form appear here.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Email</th>
                <th>Message</th>
                <th>Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {!m.isRead && <span className="badge unread" style={{ marginRight: 8 }}>new</span>}
                    {m.name}
                  </td>
                  <td>{m.email}</td>
                  <td style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {m.message}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{new Date(m.createdAt + 'Z').toLocaleString()}</td>
                  <td className="actions">
                    <Link href={`/admin/messages/${m.id}`} className="admin-btn secondary small">
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
