import { notFound } from 'next/navigation';
import { getProject, projectCategories } from '@/data/projects';
import ProjectForm from '../../ProjectForm';
import { updateProjectAction } from '../../actions';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(Number(id));
  if (!project) notFound();

  const action = updateProjectAction.bind(null, project.id);

  return (
    <>
      <div className="admin-header">
        <h1>Edit project</h1>
      </div>
      <ProjectForm
        action={action}
        categories={projectCategories()}
        values={{
          title: project.title,
          category: project.category,
          href: project.href,
          img: project.img,
          description: project.description,
          sortOrder: project.sortOrder,
        }}
        submitLabel="Save changes"
      />
    </>
  );
}
