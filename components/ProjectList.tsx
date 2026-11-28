import ProjectCard from "./ProjectCard";

export interface ProjectItem {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  yearCompleted?: number;
  type?: string;
}

interface ProjectListProps {
  projects: ProjectItem[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard key={project.id ?? `${project.title}-${index}`} {...project} />
      ))}
    </section>
  );
}
