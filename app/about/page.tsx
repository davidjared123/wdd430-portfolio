import SkillCard from '@/components/SkillCard';

export default function About() {
    return (
        <main className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-100">About Me</h2>
            <p className="text-lg text-slate-400 mb-6 max-w-3xl leading-relaxed">
                Innovative Web Developer and AI Solutions Specialist with 4+ years of experience. Current Applied Technology student at BYU-Pathway Worldwide / BYU-Idaho, committed to authentic human-first communication and high-performance digital products in remote, agile environments.
            </p>

            <div className="mb-12">
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">Education</h3>
                <p className="text-slate-300 font-medium">Bachelor of Applied Science (BASc) in Applied Technology</p>
                <p className="text-sm text-slate-400">Brigham Young University - Idaho / BYU-Pathway (2021 - Present)</p>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-slate-200">Skills & Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SkillCard skillName="JavaScript / TypeScript" level="Advanced" />
                <SkillCard skillName="React & Astro" level="Advanced" />
                <SkillCard skillName="AI & MCP Solutions" level="Specialist" />
                <SkillCard skillName="Tailwind CSS & UI/UX" level="Advanced" />
                <SkillCard skillName="Databases & Firebase" level="Intermediate" />
                <SkillCard skillName="Agile / Scrum" level="Experienced" />
            </div>
        </main>
    );
}