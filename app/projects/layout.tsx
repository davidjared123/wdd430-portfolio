import Link from "next/link";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <div>
        <span className="text-cyan-400 text-xs font-semibold tracking-wider uppercase">
          Portfolio Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-1">
          Projects &amp; Contributions
        </h1>
      </div>

      <nav
        aria-label="Projects sub-navigation"
        className="flex items-center gap-2 border-b border-slate-800 pb-4 text-sm font-medium"
      >
        <Link
          href="/projects"
          className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Overview &amp; Search
        </Link>
        <span className="text-slate-700">•</span>
        <Link
          href="/projects/opensource"
          className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Open Source
        </Link>
        <span className="text-slate-700">•</span>
        <Link
          href="/projects/school"
          className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          School Projects
        </Link>
      </nav>

      {children}
    </div>
  );
}
