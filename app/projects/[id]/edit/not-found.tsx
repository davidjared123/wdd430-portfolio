import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center shadow-xl backdrop-blur">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-slate-100">Project Not Found</h1>
      <p className="mt-2 text-sm text-slate-400">
        The project you are attempting to edit does not exist or may have been removed.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/projects"
          className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
