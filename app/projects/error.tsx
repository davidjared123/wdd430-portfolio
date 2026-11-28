'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('An uncaught error occurred in /projects:', error);
  }, [error]);

  return (
    <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-rose-500/30 bg-slate-900/80 p-8 text-center shadow-xl backdrop-blur">
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
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-slate-100">Something went wrong!</h1>
      <p className="mt-2 text-sm text-slate-400">
        An unexpected error occurred while processing project records. Please try again.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Try Again
        </button>
        <Link
          href="/projects"
          className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          Go Back to Projects
        </Link>
      </div>
    </div>
  );
}
