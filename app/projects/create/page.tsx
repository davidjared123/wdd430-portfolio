import { Suspense } from 'react';
import CreateProjectForm from './create-project-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Project — Portfolio',
  description: 'Add a new project to your developer portfolio.',
};

export default function CreateProjectPage() {
  return (
    <main className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Add New Project</h1>
        <p className="mt-1 text-sm text-slate-400">
          Create and showcase a new open-source tool, client application, or academic milestone.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse" />}>
        <CreateProjectForm />
      </Suspense>
    </main>
  );
}
