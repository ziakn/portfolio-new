import Link from 'next/link';
import { listProjects } from '@/data/projects';
import { deleteProjectAction } from './actions';
import DeleteButton from '../posts/DeleteButton';

export default function ProjectsAdminPage() {
  const projects = listProjects();

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Portfolio</h1>
          <p className="admin-subtitle">{projects.length} project(s)</p>
        </div>
        <Link href="/admin/projects/new" className="admin-btn">
          + New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="admin-empty">
          No projects yet. Seed the originals with <code>npm run seed:projects</code> or add one above.
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Category</th>
                <th>Link</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>{p.sortOrder}</td>
                  <td>{p.title}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{p.category}</td>
                  <td>{p.href ? <span className="badge live">linked</span> : <span style={{ color: 'var(--admin-muted)' }}>—</span>}</td>
                  <td className="actions">
                    <Link href={`/admin/projects/${p.id}/edit`} className="admin-btn secondary small">
                      Edit
                    </Link>
                    <form action={deleteProjectAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <DeleteButton confirm={`Delete project “${p.title}”?`} />
                    </form>
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
