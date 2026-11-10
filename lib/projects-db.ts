export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school" | "client";
  technologies: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Healthcare Calendy — WordPress Multisite & Custom Theme",
    description:
      "Custom WordPress Multisite network and bespoke PHP theme for a clinical psychological network. Features a dynamic multi-branch selector (Barquisimeto, Cabudare, Online), custom appointment scheduling, ACF field groups, WhatsApp automation, and performance optimization.",
    type: "client",
    technologies: [
      "WordPress Multisite",
      "PHP (Custom Theme)",
      "ACF (Advanced Custom Fields)",
      "JavaScript (DOM)",
      "CSS3 / SCSS",
      "Simply Schedule Appointments",
      "Speed Optimizer & WebP",
    ],
    link: "https://healthcare.eurekraftve.com/",
  },
  {
    id: 2,
    title: "My First Open Source Contribution",
    description: "A bug fix contributed to a popular library.",
    type: "opensource",
    technologies: ["TypeScript", "React"],
    link: "https://github.com/example/repo",
  },
  {
    id: 3,
    title: "Database Design Final Project",
    description: "An ER diagram and normalized schema for a library system.",
    type: "school",
    technologies: ["PostgreSQL", "SQL"],
  },
];

export function getProjects(type?: string | null): Project[] {
  if (type) return projects.filter((p) => p.type === type);
  return projects;
}

export function getProjectById(id: number): Project | null {
  return projects.find((p) => p.id === id) ?? null;
}
