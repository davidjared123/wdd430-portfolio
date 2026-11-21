'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { updateProject, type State } from '@/app/lib/actions';
import type { Project } from '@/lib/projects-db';

const initialState: State = { message: null, errors: {} };

export default function EditProjectForm({ project }: { project: Project }) {
  const updateProjectWithId = updateProject.bind(null, String(project.id));
  const [state, formAction, isPending] = useActionState(updateProjectWithId, initialState);
  const currentYear = 2026;

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 backdrop-blur shadow-xl"
    >
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-200">
          Project Title <span className="text-cyan-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={project.title}
          className="block w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          aria-describedby="title-error"
          required
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          {state.errors?.title?.map((error) => (
            <p key={error} className="mt-1.5 text-xs text-rose-400 font-medium">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-200">
          Description <span className="text-cyan-400">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={project.description}
          className="block w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          aria-describedby="description-error"
          required
        />
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors?.description?.map((error) => (
            <p key={error} className="mt-1.5 text-xs text-rose-400 font-medium">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="technologies" className="mb-2 block text-sm font-medium text-slate-200">
            Technologies (comma-separated) <span className="text-cyan-400">*</span>
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            defaultValue={project.technologies.join(', ')}
            className="block w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            aria-describedby="technologies-error"
            required
          />
          <div id="technologies-error" aria-live="polite" aria-atomic="true">
            {state.errors?.technologies?.map((error) => (
              <p key={error} className="mt-1.5 text-xs text-rose-400 font-medium">
                {error}
              </p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="yearCompleted" className="mb-2 block text-sm font-medium text-slate-200">
            Year Completed <span className="text-cyan-400">*</span>
          </label>
          <input
            id="yearCompleted"
            name="yearCompleted"
            type="number"
            min="2000"
            max={currentYear}
            defaultValue={project.yearCompleted ?? currentYear}
            className="block w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            aria-describedby="yearCompleted-error"
            required
          />
          <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
            {state.errors?.yearCompleted?.map((error) => (
              <p key={error} className="mt-1.5 text-xs text-rose-400 font-medium">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="type" className="mb-2 block text-sm font-medium text-slate-200">
            Project Category
          </label>
          <select
            id="type"
            name="type"
            defaultValue={project.type}
            className="block w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          >
            <option value="client">Client Project</option>
            <option value="school">School / Coursework</option>
            <option value="opensource">Open Source</option>
          </select>
        </div>

        <div>
          <label htmlFor="link" className="mb-2 block text-sm font-medium text-slate-200">
            Live URL / Repository (Optional)
          </label>
          <input
            id="link"
            name="link"
            type="url"
            defaultValue={project.link || ''}
            className="block w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            aria-describedby="link-error"
          />
          <div id="link-error" aria-live="polite" aria-atomic="true">
            {state.errors?.link?.map((error) => (
              <p key={error} className="mt-1.5 text-xs text-rose-400 font-medium">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      {state.message && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-400 font-medium" role="alert">
          {state.message}
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Link
          href="/projects"
          className="rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-cyan-500/20"
        >
          {isPending ? 'Updating...' : 'Update Project'}
        </button>
      </div>
    </form>
  );
}
