import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school" | "client";
  technologies: string[];
  link?: string;
}

// In-memory fallback dataset for local development or when POSTGRES_URL is not set
const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Healthcare Calendy — WordPress Multisite & Custom Theme",
    description:
      "Custom WordPress Multisite network and bespoke PHP theme for a clinical psychological network. Features a dynamic multi-branch selector, custom appointment scheduling, ACF field groups, WhatsApp automation, and performance optimization.",
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
    description: "A bug fix contributed to a popular open-source TypeScript library.",
    type: "opensource",
    technologies: ["TypeScript", "React"],
    link: "https://github.com/example/repo",
  },
  {
    id: 3,
    title: "Database Design Final Project",
    description: "An ER diagram and normalized PostgreSQL schema for a university library system.",
    type: "school",
    technologies: ["PostgreSQL", "SQL"],
  },
  {
    id: 4,
    title: "Sacrament Meeting Planner",
    description:
      "Sunday agenda management web application with printed bulletins and typed models.",
    type: "school",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://sacrament-meetings-oct2026.vercel.app",
  },
  {
    id: 5,
    title: "Artic Solutions Web Apps",
    description: "Responsive user-centric web applications and landing pages built with React.",
    type: "client",
    technologies: ["React.js", "JavaScript", "REST APIs"],
  },
];

const ITEMS_PER_PAGE = 3;

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (process.env.POSTGRES_URL) {
    try {
      if (type) {
        const { rows } = await sql<Project>`
          SELECT * FROM projects WHERE type = ${type} ORDER BY id
        `;
        return rows;
      }
      const { rows } = await sql<Project>`SELECT * FROM projects ORDER BY id`;
      return rows;
    } catch {
      // Fallback if DB is unreachable
    }
  }

  if (type) {
    return fallbackProjects.filter((p) => p.type === type);
  }
  return fallbackProjects;
}

export async function getProjectById(id: number): Promise<Project | null> {
  if (process.env.POSTGRES_URL) {
    try {
      const { rows } = await sql<Project>`
        SELECT * FROM projects WHERE id = ${id}
      `;
      return rows[0] ?? null;
    } catch {
      // Fallback
    }
  }

  return fallbackProjects.find((p) => p.id === id) ?? null;
}

export async function fetchFilteredProjects(
  query: string,
  currentPage: number = 1
): Promise<Project[]> {
  const normalizedQuery = query.toLowerCase().trim();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  if (process.env.POSTGRES_URL) {
    try {
      const searchPattern = `%${normalizedQuery}%`;
      const { rows } = await sql<Project>`
        SELECT * FROM projects
        WHERE title ILIKE ${searchPattern} 
           OR description ILIKE ${searchPattern}
        ORDER BY id
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return rows;
    } catch {
      // Fallback to local filtering
    }
  }

  const filtered = fallbackProjects.filter((project) => {
    if (!normalizedQuery) return true;
    return (
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.description.toLowerCase().includes(normalizedQuery) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(normalizedQuery))
    );
  });

  return filtered.slice(offset, offset + ITEMS_PER_PAGE);
}

export async function fetchProjectsPages(query: string): Promise<number> {
  const normalizedQuery = query.toLowerCase().trim();

  if (process.env.POSTGRES_URL) {
    try {
      const searchPattern = `%${normalizedQuery}%`;
      const { rows } = await sql<{ count: string }>`
        SELECT COUNT(*) as count FROM projects
        WHERE title ILIKE ${searchPattern} 
           OR description ILIKE ${searchPattern}
      `;
      const totalCount = Number(rows[0]?.count || 0);
      return Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;
    } catch {
      // Fallback
    }
  }

  const filtered = fallbackProjects.filter((project) => {
    if (!normalizedQuery) return true;
    return (
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.description.toLowerCase().includes(normalizedQuery) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(normalizedQuery))
    );
  });

  return Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
}
