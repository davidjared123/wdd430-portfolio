import ProjectList from "@/components/ProjectList";
import Pagination from "@/components/Pagination";
import { fetchFilteredProjects, fetchProjectsPages } from "@/lib/projects-db";

interface ProjectsContentProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export default async function ProjectsContent({ searchParams }: ProjectsContentProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.query || "";
  const currentPage = Number(resolvedParams?.page) || 1;

  const projects = await fetchFilteredProjects(query, currentPage);
  const totalPages = await fetchProjectsPages(query);

  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 p-10 text-center space-y-2">
        <p className="text-slate-300 font-medium">
          No projects found matching &ldquo;{query}&rdquo;
        </p>
        <p className="text-xs text-slate-500">
          Try adjusting your search terms or clearing the filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectList projects={projects} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
