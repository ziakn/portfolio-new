import { projectCategories } from '@/data/projects';
import ProjectForm from '../ProjectForm';
import { createProjectAction } from '../actions';

export default function NewProjectPage() {
  return (
    <>
      <div className="admin-header">
        <h1>New project</h1>
      </div>
      <ProjectForm action={createProjectAction} categories={projectCategories()} submitLabel="Create project" />
    </>
  );
}
