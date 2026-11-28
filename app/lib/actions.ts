'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { insertProject, updateProjectInDb, deleteProjectFromDb } from '@/lib/projects-db';

const currentYear = new Date().getFullYear();

const ProjectFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  technologies: z.string().min(2, 'Add at least one technology (comma-separated).'),
  yearCompleted: z.coerce
    .number()
    .int('Year must be a whole number.')
    .gte(2000, 'Year must be 2000 or later.')
    .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
  type: z.enum(['opensource', 'school', 'client']).default('client'),
  link: z.string().url('Link must be a valid URL.').optional().or(z.literal('')),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    technologies?: string[];
    yearCompleted?: string[];
    type?: string[];
    link?: string[];
  };
  message?: string | null;
};

export async function createProject(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = ProjectFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    yearCompleted: formData.get('yearCompleted'),
    type: formData.get('type') || 'client',
    link: formData.get('link') || '',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create project.',
    };
  }

  const { title, description, technologies, yearCompleted, type, link } = validatedFields.data;
  const techList = technologies
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  try {
    await insertProject({
      title,
      description,
      technologies: techList,
      yearCompleted,
      type,
      link: link || undefined,
    });
  } catch (error) {
    console.error('Error inserting project:', error);
    return {
      message: 'Database Error: Failed to create project.',
    };
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function updateProject(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = ProjectFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    technologies: formData.get('technologies'),
    yearCompleted: formData.get('yearCompleted'),
    type: formData.get('type') || 'client',
    link: formData.get('link') || '',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update project.',
    };
  }

  const { title, description, technologies, yearCompleted, type, link } = validatedFields.data;
  const techList = technologies
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  try {
    const numericId = Number(id);
    const updated = await updateProjectInDb(numericId, {
      title,
      description,
      technologies: techList,
      yearCompleted,
      type,
      link: link || undefined,
    });

    if (!updated) {
      return {
        message: 'Project not found to update.',
      };
    }
  } catch (error) {
    console.error('Error updating project:', error);
    return {
      message: 'Database Error: Failed to update project.',
    };
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function deleteProject(id: string) {
  try {
    const numericId = Number(id);
    await deleteProjectFromDb(numericId);
    revalidatePath('/projects');
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project. Please try again later.');
  }

  revalidatePath('/projects');
  redirect('/projects');
}
