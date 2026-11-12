import { Suspense } from "react";
import SchoolProjectList from "@/components/SchoolProjectList";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";

export default function SchoolProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-1 text-slate-100">School Projects</h3>
        <p className="text-slate-400 text-sm">
          Academic web and software development projects built during university coursework at
          BYU-Idaho.
        </p>
      </div>

      {/* Component-level Streaming with Suspense and Loading Skeleton */}
      <Suspense fallback={<ProjectCardSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </div>
  );
}
