'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createProject,
  updateProject,
  deleteProject,
  type ProjectInput,
} from '@/data/projects';

export type ProjectFormState = { error?: string };

function parse(formData: FormData): ProjectInput {
  const sortRaw = String(formData.get('sortOrder') ?? '').trim();
  return {
    title: String(formData.get('title') ?? '').trim(),
    category: String(formData.get('category') ?? '').trim(),
    href: String(formData.get('href') ?? '').trim(),
    img: String(formData.get('img') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    sortOrder: sortRaw ? Number(sortRaw) : undefined,
  };
}

function validate(input: ProjectInput): string | null {
  if (!input.title) return 'Title is required.';
  if (!input.category) return 'Category is required.';
  if (!input.img) return 'Image path is required.';
  if (!input.description) return 'Description is required.';
  return null;
}

export async function createProjectAction(
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const input = parse(formData);
  const error = validate(input);
  if (error) return { error };
  createProject(input);
  revalidatePath('/portfolio');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function updateProjectAction(
  id: number,
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const input = parse(formData);
  const error = validate(input);
  if (error) return { error };
  updateProject(id, input);
  revalidatePath('/portfolio');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function deleteProjectAction(formData: FormData) {
  deleteProject(Number(formData.get('id')));
  revalidatePath('/portfolio');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}
