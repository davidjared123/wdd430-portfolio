import Link from 'next/link';
import { deleteProject } from '@/app/lib/actions';

interface ProjectCardProps {
  id?: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  yearCompleted?: number;
}

export default function ProjectCard({
  id,
  title,
  description,
  technologies,
  link,
  yearCompleted,
}: ProjectCardProps) {
  const deleteProjectWithId = id ? deleteProject.bind(null, String(id)) : undefined;

  return (
    <article className="glass-panel p-6 flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 transition hover:border-slate-700">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-slate-100">{title}</h3>
          {yearCompleted && (
            <span className="shrink-0 text-xs font-mono font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
              {yearCompleted}
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-slate-900/80 text-cyan-300 px-2.5 py-1 rounded-md border border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-sm">
        <div>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
            >
              View Project →
            </a>
          ) : (
            <span className="text-xs text-slate-500">Internal Reference</span>
          )}
        </div>

        {id && (
          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${id}/edit`}
              className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              aria-label={`Edit ${title}`}
            >
              Edit
            </Link>
            {deleteProjectWithId && (
              <form action={deleteProjectWithId}>
                <button
                  type="submit"
                  className="text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                  aria-label={`Delete ${title}`}
                >
                  Delete
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
