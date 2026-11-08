# StudySync — Project Specification Document

## Project Title & Description

**StudySync** is a web collaboration platform designed for university students to organize study groups by course, share curated academic resources, and coordinate study sessions. The platform centralizes group discovery, membership, and resource curation in a clean, responsive interface, eliminating fragmented communication across informal chats and spreadsheets.

The initial MVP release focuses on the core collaboration lifecycle:

- Secure student authentication and profile onboarding
- Course-based group discovery and group management
- Resource curation and sharing linked to specific study groups
- Role-based moderation for group creators

---

## Purpose & Target Audience

- **Target Audience:** College and university students looking to form or join academic study groups, share study materials, and prepare for exams collectively.
- **Problem Statement:** Students frequently struggle to find peers in their specific course sections, relying on disorganized text channels or static spreadsheets that get lost or abandoned.
- **Value Proposition:** A single, responsive Next.js application where students can browse groups by course code (e.g., `WDD 430`, `CSE 340`), join with one click, and access shared verified study links and files.

---

## Data Models (Full CRUD)

### Model 1: `Group` (Study Group)

- **Fields:**
  - `id`: string (UUID or ObjectID)
  - `name`: string (e.g., "WDD 430 Final Project Sprint")
  - `courseCode`: string (e.g., "WDD 430")
  - `description`: string
  - `meetingSchedule`: string (e.g., "Tuesdays & Thursdays 7:00 PM MT")
  - `leaderId`: string (User foreign key)
  - `createdAt`: DateTime
  - `updatedAt`: DateTime
- **CRUD Operations:**
  - **Create:** Leaders create a study group with schedule preferences.
  - **Read:** Students filter and browse groups by course code or keyword.
  - **Update:** Leaders edit title, meeting times, or description.
  - **Delete:** Leaders can archive or remove a group.

### Model 2: `Resource` (Study Material / Link)

- **Fields:**
  - `id`: string (UUID or ObjectID)
  - `title`: string (e.g., "Next.js App Router Cheatsheet")
  - `url`: string (valid HTTP/HTTPS link)
  - `category`: string ("Documentation", "Video Tutorial", "Repository", "Notes")
  - `groupId`: string (Group foreign key)
  - `authorId`: string (User foreign key)
  - `createdAt`: DateTime
- **CRUD Operations:**
  - **Create:** Members publish a resource to a specific group.
  - **Read:** Group members view and filter resources inside a group.
  - **Update:** Author can update the link or title.
  - **Delete:** Author or group leader can delete obsolete resources.

---

## User Stories

1. **User Story 1 (Sign Up & Authentication):**
   _As a student, I want to create an account and sign in securely so that I can create and join study groups._
2. **User Story 2 (Browse & Search Groups):**
   _As a student, I want to filter study groups by course code so that I can quickly find study partners for my current classes._
3. **User Story 3 (Create Study Group):**
   _As a group leader, I want to create a new study group with description, course code, and meeting times so other students can join._
4. **User Story 4 (Publish Resource):**
   _As a group member, I want to add links to helpful study resources so that my group peers can study the same material._
5. **User Story 5 (Manage & Delete Content):**
   _As a content creator, I want to edit or delete groups and resources I posted when details change or materials become outdated._

---

## Acceptance Criteria (Given / When / Then)

### Story 1: Sign Up & Authentication

- **Given** a new student with valid credentials, **when** they submit the registration form, **then** an account is created in the database and they are redirected to `/groups`.
- **Given** an unauthenticated visitor, **when** they navigate to `/groups/new`, **then** the Next.js middleware redirects them to `/login` with an informative banner.

### Story 2: Browse & Filter Groups

- **Given** an authenticated user on `/groups`, **when** they type a course code into the search box, **then** the list of groups updates in real-time to display matching results.
- **Given** a search query with no matching courses, **when** the search finishes, **then** the UI displays an accessible `EmptyState` component with a button to clear filters or create a new group.

### Story 3: Create Study Group

- **Given** an authenticated user on `/groups/new`, **when** they submit valid name, course code, and schedule, **then** the record is created via `POST /api/groups` and they are navigated to `/groups/[id]`.
- **Given** empty required fields, **when** the user clicks "Create Group", **then** form submission is blocked and accessible inline error messages are displayed.

### Story 4: Publish Resource

- **Given** a group member viewing `/groups/[id]`, **when** they submit a valid resource title and URL in the "Add Resource" modal, **then** the resource is saved via `POST /api/groups/[id]/resources` and appears dynamically in the resource list.
- **Given** an invalid URL format (e.g. missing protocol), **when** submitted, **then** client-side validation prevents the network request and displays a prompt to enter a valid URL.

### Story 5: Edit and Delete Content

- **Given** the author of a resource, **when** they click "Delete" and confirm via the modal dialog, **then** the resource is deleted via `DELETE /api/resources/[id]` and disappears from view without full page reload.
- **Given** a non-owner member, **when** they view group resources, **then** edit and delete action buttons are neither visible nor accessible in the DOM.

---

## Technical Requirements & Architecture

- **Framework:** Next.js 16+ using **App Router** (`app/` directory).
- **Language:** TypeScript in strict mode (`strict: true`, zero usage of `any`).
- **Styling:** Tailwind CSS (utility-first, responsive mobile-first, dark mode ready).
- **Database & ORM:** PostgreSQL with Prisma ORM (or MongoDB with Mongoose).
- **Authentication:** Auth.js v5 (NextAuth) or Clerk.
- **Rendering Strategy:**
  - React Server Components (RSC) by default for data fetching and initial page layout.
  - Client Components (`'use client'`) isolated to interactive elements (search filters, modal dialogues, action buttons).
- **API Route Handlers:**
  - Route handlers handle validation, authentication session verification, and database persistence.
  - Return standardized JSON responses with appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 500).
- **Shared Component Library (5+ Reusable Components):**
  1. `Navbar` — Responsive navigation bar with auth session controls.
  2. `Button` — Reusable button supporting variants (`primary`, `secondary`, `danger`) and loading spinner state.
  3. `Card` — Container card for displaying group previews and resource items.
  4. `EmptyState` — Illustrated fallback component for zero-state search results.
  5. `ModalDialog` — Accessible modal for confirmations and quick-entry forms.

---

## Core API Endpoints

| Method   | Endpoint                    | Description                                             | Auth Required |
| -------- | --------------------------- | ------------------------------------------------------- | ------------- |
| `GET`    | `/api/groups`               | List study groups (supports `?course=` query parameter) | No            |
| `POST`   | `/api/groups`               | Create a new study group                                | Yes           |
| `GET`    | `/api/groups/:id`           | Fetch study group details with attached resources       | No            |
| `PUT`    | `/api/groups/:id`           | Update study group details (leader only)                | Yes           |
| `DELETE` | `/api/groups/:id`           | Delete / archive study group (leader only)              | Yes           |
| `GET`    | `/api/groups/:id/resources` | List all resources for a specific group                 | Yes           |
| `POST`   | `/api/groups/:id/resources` | Add a new resource to a group                           | Yes           |
| `DELETE` | `/api/resources/:id`        | Delete a resource (author or leader only)               | Yes           |

---

## Implementation Priority

### Phase 0: P0 (MVP — Core Block Deliverables)

- Project repository setup with TypeScript, Tailwind CSS, Prettier, and ESLint.
- Database connection & schema migration (User, Group, Resource).
- Authentication setup (Sign up, Sign in, Protected routes).
- Group CRUD: List groups (R) and Create group (C).
- Resource CRUD: List group resources (R) and Add resource (C).
- Responsive layout with 5 shared UI components.

### Phase 1: P1 (Feature Completeness)

- Update and Delete operations for both Groups and Resources.
- Live course filter with debounced search input.
- User profile page listing groups created and joined.
- Form validation feedback, toast notifications, and `loading.tsx` skeletons.

### Phase 2: P2 (Enhancements & Polish)

- Meeting schedule calendar sync (download `.ics` file).
- Upvoting / bookmarking helpful resources.
- Dark mode theme toggle.
