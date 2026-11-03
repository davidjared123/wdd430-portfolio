interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
    return (
        <article className="glass-panel p-6 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold mb-2 text-slate-100">{title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {technologies.map((tech) => (
                        <span key={tech} className="text-xs bg-slate-900/80 text-cyan-300 px-2.5 py-1 rounded-md border border-slate-800">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
                >
                    View Project →
                </a>
            )}
        </article>
    );
}