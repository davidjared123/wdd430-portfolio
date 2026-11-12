import { getProjects } from "@/lib/projects-db";
import ProjectCard from "@/components/ProjectCard";

export default async function SchoolProjectList() {
  const schoolProjects = await getProjects("school");

  if (schoolProjects.length === 0) {
    return <p className="text-slate-400">No school projects found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {schoolProjects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          link={project.link}
        />
      ))}
    </div>
  );
}
