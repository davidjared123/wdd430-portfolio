import { sql } from "@vercel/postgres";

export interface Project {
  id: number;
  title: string;
  description: string;
  type: "opensource" | "school" | "client";
  technologies: string[];
  link?: string;
  yearCompleted?: number;
}

// In-memory fallback dataset for local development or when POSTGRES_URL is not set
let fallbackProjects: Project[] = [
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
    yearCompleted: 2026,
  },
  {
    id: 2,
    title: "My First Open Source Contribution",
    description: "A bug fix contributed to a popular open-source TypeScript library with comprehensive unit tests.",
    type: "opensource",
    technologies: ["TypeScript", "React"],
    link: "https://github.com/example/repo",
    yearCompleted: 2025,
  },
  {
    id: 3,
    title: "Database Design Final Project",
    description: "An ER diagram and normalized PostgreSQL schema for a comprehensive university library system.",
    type: "school",
    technologies: ["PostgreSQL", "SQL"],
    yearCompleted: 2024,
  },
  {
    id: 4,
    title: "Sacrament Meeting Planner",
    description:
      "Sunday agenda management web application with printed bulletins, typed data models, and database persistence.",
    type: "school",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://sacrament-meetings-oct2026.vercel.app",
    yearCompleted: 2026,
  },
  {
    id: 5,
    title: "Artic Solutions Web Apps",
    description: "Responsive user-centric web applications and landing pages built with React and Tailwind CSS.",
    type: "client",
    technologies: ["React.js", "JavaScript", "REST APIs"],
    yearCompleted: 2025,
  },
];

const ITEMS_PER_PAGE = 3;

export async function getProjects(type?: string | null): Promise<Project[]> {
  if (process.env.POSTGRES_URL) {
    try {
      if (type) {
        const { rows } = await sql<Project>`
          SELECT 
            id, title, description, type, technologies, link,
            year_completed as "yearCompleted"
          FROM projects WHERE type = ${type} ORDER BY id
        `;
        return rows;
      }
      const { rows } = await sql<Project>`
        SELECT 
          id, title, description, type, technologies, link,
          year_completed as "yearCompleted"
        FROM projects ORDER BY id
      `;
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
        SELECT 
          id, title, description, type, technologies, link,
          year_completed as "yearCompleted"
        FROM projects WHERE id = ${id}
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
        SELECT 
          id, title, description, type, technologies, link,
          year_completed as "yearCompleted"
        FROM projects
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

export async function insertProject(data: Omit<Project, 'id'>): Promise<Project> {
  if (process.env.POSTGRES_URL) {
    try {
      const techArray = `{${data.technologies.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(',')}}`;
      const { rows } = await sql<Project>`
        INSERT INTO projects (title, description, type, technologies, link, year_completed)
        VALUES (${data.title}, ${data.description}, ${data.type}, ${techArray}::text[], ${data.link ?? null}, ${data.yearCompleted ?? 2026})
        RETURNING id, title, description, type, technologies, link, year_completed as "yearCompleted"
      `;
      return rows[0];
    } catch (err) {
      console.warn("PostgreSQL insert failed, using fallback:", err);
    }
  }

  const nextId = fallbackProjects.length > 0 ? Math.max(...fallbackProjects.map((p) => p.id)) + 1 : 1;
  const newProject: Project = {
    id: nextId,
    ...data,
  };
  fallbackProjects.push(newProject);
  return newProject;
}

export async function updateProjectInDb(
  id: number,
  data: Partial<Omit<Project, 'id'>>
): Promise<Project | null> {
  if (process.env.POSTGRES_URL) {
    try {
      const existing = await getProjectById(id);
      if (!existing) return null;

      const title = data.title ?? existing.title;
      const description = data.description ?? existing.description;
      const type = data.type ?? existing.type;
      const technologies = data.technologies ?? existing.technologies;
      const link = data.link !== undefined ? data.link : existing.link;
      const yearCompleted = data.yearCompleted ?? existing.yearCompleted ?? 2026;
      const techArray = `{${technologies.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(',')}}`;

      const { rows } = await sql<Project>`
        UPDATE projects
        SET title = ${title},
            description = ${description},
            type = ${type},
            technologies = ${techArray}::text[],
            link = ${link ?? null},
            year_completed = ${yearCompleted}
        WHERE id = ${id}
        RETURNING id, title, description, type, technologies, link, year_completed as "yearCompleted"
      `;
      return rows[0] ?? null;
    } catch (err) {
      console.warn("PostgreSQL update failed, using fallback:", err);
    }
  }

  const index = fallbackProjects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  fallbackProjects[index] = {
    ...fallbackProjects[index],
    ...data,
  };
  return fallbackProjects[index];
}

export async function deleteProjectFromDb(id: number): Promise<boolean> {
  if (process.env.POSTGRES_URL) {
    try {
      await sql`DELETE FROM projects WHERE id = ${id}`;
      return true;
    } catch (err) {
      console.warn("PostgreSQL delete failed, using fallback:", err);
    }
  }

  const initialLength = fallbackProjects.length;
  fallbackProjects = fallbackProjects.filter((p) => p.id !== id);
  return fallbackProjects.length < initialLength;
}
