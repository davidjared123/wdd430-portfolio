interface SkillCardProps {
  skillName: string;
  level: string;
}

export default function SkillCard({ skillName, level }: SkillCardProps) {
  return (
    <div className="glass-panel p-5">
      <h4 className="font-semibold text-base text-slate-200 mb-1">{skillName}</h4>
      <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
        <span>Level</span>
        <span className="text-cyan-400 font-medium">{level}</span>
      </div>
      <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full w-[85%]" />
      </div>
    </div>
  );
}
