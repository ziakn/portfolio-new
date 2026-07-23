'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deleteSubmission, markRead } from '@/data/contact';

export async function markReadAction(formData: FormData) {
  const id = Number(formData.get('id'));
  const read = formData.get('read') !== '0';
  markRead(id, read);
  revalidatePath('/admin/messages');
  revalidatePath(`/admin/messages/${id}`);
}

export async function deleteMessageAction(formData: FormData) {
  const id = Number(formData.get('id'));
  deleteSubmission(id);
  revalidatePath('/admin/messages');
  redirect('/admin/messages');
}
