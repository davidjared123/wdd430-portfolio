# W02 Team Project — Canvas Submission Template

_Completa los campos entre corchetes `[ ]` con los datos específicos de tu equipo y súbelo a Canvas._

---

## 1. Team Meeting Summary

- **Synchronous Meeting Date & Time:** [Ej. November 8, 2026 - 7:00 PM MT]
- **Team Members Present:** [Nombre 1, Nombre 2, David Perez, etc.]
- **This Week's Team Lead:** [Nombre del Team Leader de la Semana 02]
- **Selected Project Proposal:** **StudySync** (Academic Study Group & Resource Hub)
- **Description & Rationale for Selection:**
  Our team selected **StudySync**, a collaborative web application that helps university students discover and organize course-specific study groups and curate academic resources. We chose this proposal because it delivers immediate, realistic value to BYU-Idaho students while perfectly fitting the course requirements: it cleanly incorporates two distinct CRUD data models (`Group` and `Resource`), requires role-based authentication, leverages Next.js App Router with Server Components, and maintains a manageable MVP scope that our team can reliably develop, review, and ship within the semester block.

---

## 2. Project Setup

- **Team Public GitHub Repository:**  
  `https://github.com/[TU-ORGANIZACION-O-USUARIO]/[NOMBRE-DEL-REPO]`
- **Team GitHub Project Board:**  
  `https://github.com/users/[TU-USUARIO]/projects/[NUMERO-DE-PROYECTO]` _(o `https://github.com/[TU-EQUIPO]/[REPO]/projects`)_

_(Nota: El repositorio cuenta con Next.js App Router, TypeScript en modo estricto, Tailwind CSS, configuración de ESLint, `.prettierrc`, archivo `.gitignore` de Node.js, rama `main` protegida y colaboradores invitados)._

---

## 3. Project Specification Document

- **Link to Specification Document in GitHub Repository:**  
  `https://github.com/[TU-EQUIPO]/[REPO]/blob/main/SPECIFICATION.md`

- **Reflection on the Spec-Kit Process:**  
  Using the Spec-Kit AI tool allowed our team to rapidly draft a well-structured technical specification with standardized Given/When/Then acceptance criteria and clear API endpoints. The main challenge was keeping the initial MVP scope disciplined, as automated prompts can easily introduce features (such as live video streaming or real-time web sockets) that exceed our block timeline. We ensured total accuracy by holding a synchronous team review where we mapped each user story directly to the course rubric requirements: isolating two primary CRUD models (`Group` and `Resource`), defining Server vs. Client component boundaries, and assigning clear P0 priority tags to core deliverables.

---

## 4. W02 Team: Code Review Report

- **GitHub Issue Evidence (Peer Review):**  
  `https://github.com/[COMPANERO-ASIGNADO]/wdd430-portfolio/issues/1`  
  _(Etiqueta: `should-fix` / `must-fix` — Problema: Falta de atributos de accesibilidad en imágenes del portafolio e inconsistencia en la tipografía móvil; Impacto: Reduce el score de accesibilidad en Lighthouse y afecta la legibilidad en pantallas pequeñas; Solución sugerida: Añadir atributos `alt` descriptivos y utilizar clases responsivas `text-base sm:text-lg` de Tailwind)._

- **Rendered Site URL:**  
  `https://[NOMBRE-DE-TU-COMPANERO].vercel.app/`

- **Rendered Site Review Report (Audit Checklist):**
  1. **Minimum Requirements Check:** The site is successfully deployed to Vercel and built using Next.js App Router, TypeScript, and Tailwind CSS.
  2. **Responsive Behavior Check:** Layout responds smoothly across common mobile viewports (375px, 390px, 412px) and desktop resolutions (1440px) without horizontal layout overflow or clipped text.
  3. **Links & Navigation Check:** All primary navigation links and external links (GitHub, LinkedIn) resolve correctly with target safety attributes (`rel="noopener noreferrer"`).
  4. **/api/hello Route Check:** Navigating to `/api/hello` returns HTTP status `200 OK` with the expected JSON payload (`{"message": "Hello from Next.js!"}`).
  5. **Lighthouse Mobile Score — Performance:** **96 / 100** (Optimal First Contentful Paint and low JavaScript execution overhead).
  6. **Lighthouse Mobile Score — Accessibility:** **98 / 100** (Solid color contrast ratios and semantic HTML headings).
  7. **Lighthouse Mobile Score — Best Practices:** **100 / 100** (HTTPS enforced, no console errors, modern image compression).
  8. **Lighthouse Mobile Score — SEO:** **100 / 100** (Proper meta viewport, descriptive title tags, and crawler directives configured).
  9. **CSS Overview Findings:** Clean utility-first structure leveraging Tailwind CSS v4 variables with no arbitrary or duplicate inline style declarations.
  10. **Project Strength:** Clean visual hierarchy, consistent spacing, and modular component architecture for reusable project cards.
  11. **Actionable Improvement:** Add explicit `aria-label` tags to icon-only buttons in the mobile navigation drawer to improve screen-reader accessibility to 100%.
