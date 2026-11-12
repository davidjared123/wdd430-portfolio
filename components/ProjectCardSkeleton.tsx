export default function ProjectCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse" aria-busy="true">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="h-6 w-3/4 rounded bg-slate-800" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-slate-800/80" />
            <div className="h-4 w-5/6 rounded bg-slate-800/80" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-5 w-16 rounded bg-slate-800" />
            <div className="h-5 w-20 rounded bg-slate-800" />
            <div className="h-5 w-14 rounded bg-slate-800" />
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex justify-between">
            <div className="h-4 w-24 rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
