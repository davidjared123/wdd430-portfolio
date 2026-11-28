import { Suspense } from "react";
import Link from "next/link";
import ProjectSearch from "@/components/ProjectSearch";
import ProjectsContent from "@/components/ProjectsContent";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";

interface ProjectsPageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1 text-slate-100">All Projects</h1>
          <p className="text-slate-400 text-sm">
            Search, filter, and browse open-source contributions, academic coursework, and client
            applications.
          </p>
        </div>
        <div>
          <Link
            href="/projects/create"
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 shadow-md shadow-cyan-500/20"
          >
            <span className="text-lg leading-none">+</span> New Project
          </Link>
        </div>
      </div>

      {/* Dynamic Search Component with Debounce */}
      <Suspense
        fallback={<div className="h-10 w-full max-w-md rounded-xl bg-slate-800 animate-pulse" />}
      >
        <ProjectSearch />
      </Suspense>

      {/* Streaming Filtered Projects and Pagination via Suspense */}
      <Suspense fallback={<ProjectCardSkeleton />}>
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
