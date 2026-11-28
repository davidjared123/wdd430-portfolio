import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects-db';
import EditProjectForm from './edit-project-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Project — Portfolio',
  description: 'Update project information, stack, and details.',
};

async function EditProjectContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId) || !Number.isInteger(numericId)) {
    notFound();
  }

  const project = await getProjectById(numericId);

  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}

export default function EditProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Edit Project</h1>
        <p className="mt-1 text-sm text-slate-400">
          Modify project title, description, technologies, and year of completion.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse" />}>
        <EditProjectContent params={props.params} />
      </Suspense>
    </main>
  );
}
