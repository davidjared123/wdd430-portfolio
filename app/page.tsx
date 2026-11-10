import ProjectList from "@/components/ProjectList";
import Link from "next/link";

const projects = [
  {
    title: "Healthcare Calendy — WordPress Multisite & Custom Theme",
    description:
      "Full-stack WordPress Multisite solution and custom PHP theme for a multi-city clinical network. Built with custom template hierarchy, ACF field integration, interactive booking calendar, branch selector, and performance optimization.",
    technologies: [
      "WordPress Multisite",
      "PHP & Custom Themes",
      "ACF (Advanced Custom Fields)",
      "HTML5 / CSS3 / SCSS",
      "JavaScript (DOM Manipulation)",
      "Speed Optimizer & WebP",
    ],
    link: "https://healthcare.eurekraftve.com/",
  },
  {
    title: "Eurekraft E-commerce & AI Architecture",
    description:
      "E-commerce platform with dynamic pricing algorithms and AI-driven workflows for custom manufacturing.",
    technologies: ["Astro", "WordPress", "Tailwind CSS", "MCP"],
    link: "https://github.com",
  },
  {
    title: "Artic Solutions Web Apps",
    description:
      "Responsive, user-centric web applications and landing pages built with React and modern component libraries.",
    technologies: ["React.js", "JavaScript", "REST APIs"],
    link: "https://github.com",
  },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Sección Hero */}
      <section className="py-12 md:py-20 flex flex-col items-start gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          AVAILABLE FOR REMOTE WORK
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100">
          Hi, I&apos;m <span className="text-gradient">David Jared</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          Web Developer & AI Solutions Specialist with experience designing and deploying scalable
          web applications, real-time data architectures, and AI-driven workflows.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link href="#projects" className="btn-neon">
            View My Work ↗
          </Link>
          <Link href="/about" className="btn-outline">
            About Me
          </Link>
        </div>
      </section>

      {/* Sección de Proyectos */}
      <section id="projects" className="mt-16">
        <div className="mb-8">
          <span className="text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            Featured Work
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mt-1">
            Selected Projects & Experience
          </h2>
        </div>
        <ProjectList projects={projects} />
      </section>
    </main>
  );
}
