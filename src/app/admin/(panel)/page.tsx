import Link from 'next/link';
import { getPostStats } from '@/data/posts';
import { countUnread, listSubmissions } from '@/data/contact';
import { countProjects } from '@/data/projects';

export default function AdminDashboard() {
  const posts = getPostStats();
  const unread = countUnread();
  const projects = countProjects();
  const recent = listSubmissions().slice(0, 5);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p className="admin-subtitle">Overview of your site</p>
        </div>
        <Link href="/admin/posts/new" className="admin-btn">
          + New post
        </Link>
      </div>

      <div className="admin-grid">
        <Link href="/admin/posts" className="admin-card">
          <div className="stat">{posts.total.toLocaleString()}</div>
          <div className="label">Total posts</div>
        </Link>
        <div className="admin-card">
          <div className="stat">{posts.live.toLocaleString()}</div>
          <div className="label">Live posts</div>
        </div>
        <div className="admin-card">
          <div className="stat">{posts.scheduled.toLocaleString()}</div>
          <div className="label">Scheduled posts</div>
        </div>
        <Link href="/admin/messages" className="admin-card">
          <div className="stat">{unread}</div>
          <div className="label">Unread messages</div>
        </Link>
        <Link href="/admin/projects" className="admin-card">
          <div className="stat">{projects}</div>
          <div className="label">Portfolio projects</div>
        </Link>
      </div>

      <h2 style={{ fontSize: 18, margin: '34px 0 14px' }}>Recent messages</h2>
      {recent.length === 0 ? (
        <div className="admin-empty">No contact messages yet.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Message</th>
                <th>Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map((m) => (
                <tr key={m.id}>
                  <td>
                    {!m.isRead && <span className="badge unread" style={{ marginRight: 8 }}>new</span>}
                    {m.name}
                  </td>
                  <td style={{ maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
