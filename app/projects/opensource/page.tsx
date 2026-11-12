import { getProjects } from "@/lib/projects-db";
import ProjectCard from "@/components/ProjectCard";

export default async function OpenSourcePage() {
  const openSourceProjects = await getProjects("opensource");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-1 text-slate-100">Open Source Projects</h3>
        <p className="text-slate-400 text-sm">
          Contributions to public libraries, packages, and community repositories.
        </p>
      </div>

      {openSourceProjects.length === 0 ? (
        <p className="text-slate-400">No open source projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {openSourceProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              link={project.link}
            />
          ))}
        </div>
      )}
    </div>
  );
}
