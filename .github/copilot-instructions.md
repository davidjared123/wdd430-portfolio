# GitHub Copilot Instructions — StudySync & WDD 430 Team Project

## 1. Project Overview & Architecture
StudySync is an academic study group and resource hub web application built for university students. It combines real-time course discovery, peer study groups, and curated academic material sharing.

- **Framework:** Next.js 16 (App Router)
- **React Features:** React Server Components (RSC), Partial Prerendering (PPR), `useActionState` for accessible forms
- **Database:** PostgreSQL (`@vercel/postgres`) with resilient in-memory local fallback datasets
- **Form Validation & Schemas:** Zod (`zod`) for server-side validation and typed schemas
- **Styling:** Tailwind CSS v4 with custom glassmorphic dark-mode tokens (`slate-900`, `slate-800`, `cyan-400`, `cyan-500`)

## 2. Component & Folder Structure
```
app/
  api/
    groups/           -> Route handlers for Group CRUD
    resources/        -> Route handlers for Resource CRUD
    projects/         -> Route handlers for Project records
  projects/
    create/           -> Create project form route
    [id]/edit/        -> Edit project dynamic route segment
    error.tsx         -> Scoped Client Component error boundary
    [id]/edit/not-found.tsx -> Dedicated 404 page
  lib/
    actions.ts        -> React Server Actions ('use server')
components/
  ui/                 -> Core primitives (Card, Badge, Button)
  ProjectCard.tsx     -> Project card with Edit & Delete server actions
  ProjectSearch.tsx   -> Debounced URL search input
  Pagination.tsx      -> Accessible URL-based pagination
lib/
  projects-db.ts      -> PostgreSQL queries & fallback data
  types.ts            -> Typed TypeScript interfaces
```

## 3. Data Models
- **`User`**: `id` (UUID/string), `name` (string), `email` (string, unique), `avatarUrl` (string, optional).
- **`Group`**: `id` (UUID/string), `name` (string), `courseCode` (string), `description` (text), `meetingSchedule` (string), `leaderId` (FK -> User).
- **`Resource`**: `id` (UUID/string), `title` (string), `url` (string), `category` ('notes' | 'cheatsheet' | 'video' | 'official-docs'), `groupId` (FK -> Group), `authorId` (FK -> User).
- **`Project`**: `id` (number), `title` (string), `description` (text), `type` ('opensource' | 'school' | 'client'), `technologies` (string[]), `link` (optional string), `yearCompleted` (number).

## 4. Coding & Accessibility Standards
- **Server Actions:** All mutations must use React Server Actions in `app/lib/actions.ts` with `try...catch` blocks and `revalidatePath('/projects')` after execution.
- **Form Accessibility:** Forms must pair `<label htmlFor="id">` with `<input id="id">`, provide `aria-describedby` linking inputs to live error regions (`aria-live="polite"`), and use `useActionState` to track `isPending` and field errors.
- **Next.js 16 Compatibility:** Always wrap Server Components reading dynamic `searchParams` or `params` inside `<Suspense>` boundaries to maintain Partial Prerendering compliance.
