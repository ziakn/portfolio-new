'use server';

import { revalidatePath } from 'next/cache';
import {
  contentDefaults,
  resetContent,
  setContent,
  type ContentKey,
  type ServiceItem,
} from '@/data/content';

export type ContentFormState = { error?: string; success?: string };

// Pages that must refresh when a given content key changes.
const AFFECTED: Record<ContentKey, string[]> = {
  'home.about': ['/'],
  'home.services': ['/'],
  'resume.achievements': ['/resume'],
};

function refresh(key: ContentKey) {
  for (const path of AFFECTED[key]) revalidatePath(path);
  revalidatePath('/admin/content');
}

export async function saveAboutAction(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  const html = String(formData.get('value') ?? '').trim();
  if (!html) return { error: 'About content cannot be empty.' };
  setContent('home.about', html);
  refresh('home.about');
  return { success: 'Home “About” section saved.' };
}

export async function saveAchievementsAction(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  const lines = String(formData.get('value') ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return { error: 'Add at least one achievement.' };
  setContent('resume.achievements', lines);
  refresh('resume.achievements');
  return { success: 'Résumé achievements saved.' };
}

export async function saveServicesAction(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  const raw = String(formData.get('value') ?? '');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { error: 'Services must be valid JSON.' };
  }
  if (
    !Array.isArray(parsed) ||
    !parsed.every(
      (s) =>
        s &&
        typeof s.icon === 'string' &&
        typeof s.title === 'string' &&
        typeof s.text === 'string',
    )
  ) {
    return { error: 'Each service needs "icon", "title", and "text" string fields.' };
  }
  setContent('home.services', parsed as ServiceItem[]);
  refresh('home.services');
  return { success: 'Home services saved.' };
}

export async function resetContentAction(formData: FormData) {
  const key = String(formData.get('key') ?? '') as ContentKey;
  if (key in contentDefaults) {
    resetContent(key);
    refresh(key);
  }
}
