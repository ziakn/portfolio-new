import Link from 'next/link';
import { listPostsAdmin, formatPostDate } from '@/data/posts';
import { deletePostAction } from './actions';
import DeleteButton from './DeleteButton';

type SearchParams = Promise<{ q?: string; page?: string }>;

export default async function PostsListPage({ searchParams }: { searchParams: SearchParams }) {
  const { q = '', page = '1' } = await searchParams;
  const result = listPostsAdmin(q, Number(page) || 1);

  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    return `/admin/posts${qs ? `?${qs}` : ''}`;
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Blog posts</h1>
          <p className="admin-subtitle">{result.total.toLocaleString()} post(s){q && ` matching “${q}”`}</p>
        </div>
        <Link href="/admin/posts/new" className="admin-btn">
          + New post
        </Link>
      </div>

      <form className="admin-toolbar" method="get">
        <input
          type="search"
          name="q"
          className="admin-input"
          placeholder="Search title, slug, or category…"
          defaultValue={q}
        />
        <button type="submit" className="admin-btn secondary">Search</button>
        {q && (
          <Link href="/admin/posts" className="admin-btn secondary">
            Clear
          </Link>
        )}
      </form>

      {result.rows.length === 0 ? (
        <div className="admin-empty">No posts found.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((post) => (
                <tr key={post.id}>
                  <td style={{ maxWidth: 380 }}>{post.title}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{post.category}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{formatPostDate(post.publish_date)}</td>
                  <td>
                    <span className={`badge ${post.isLive ? 'live' : 'scheduled'}`}>
                      {post.isLive ? 'Live' : 'Scheduled'}
                    </span>
                  </td>
                  <td className="actions">
                    {post.isLive && (
                      <Link href={`/blog/${post.slug}`} target="_blank" className="admin-btn secondary small">
                        View
                      </Link>
                    )}
                    <Link href={`/admin/posts/${post.id}/edit`} className="admin-btn secondary small">
                      Edit
                    </Link>
                    <form action={deletePostAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result.totalPages > 1 && (
        <nav className="admin-pagination">
          {result.page > 1 ? (
            <Link href={pageHref(result.page - 1)}>← Prev</Link>
          ) : (
            <span className="disabled">← Prev</span>
          )}
          <span className="current">
            Page {result.page} of {result.totalPages}
          </span>
          {result.page < result.totalPages ? (
            <Link href={pageHref(result.page + 1)}>Next →</Link>
          ) : (
            <span className="disabled">Next →</span>
          )}
        </nav>
      )}
    </>
  );
}
