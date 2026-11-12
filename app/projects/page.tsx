import { Suspense } from "react";
import ProjectSearch from "@/components/ProjectSearch";
import ProjectsContent from "@/components/ProjectsContent";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";

interface ProjectsPageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-1 text-slate-100">All Projects</h3>
        <p className="text-slate-400 text-sm">
          Search, filter, and browse open-source contributions, academic coursework, and client
          applications.
        </p>
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
