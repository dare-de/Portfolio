# Project Roadmap — Ahad Waseem Portfolio

> **Positioning:** Multidisciplinary creative portfolio across Graphic Design, Web Development, Photography, Cinematography, Video Editing, Social Media Management, and Computer Engineering.

---

## Phase 1 — Foundation & Design System *(Completed)*

- Initialize Vite + React + TypeScript + Tailwind CSS + GSAP/ScrollTrigger + Lenis + Lucide React + React Router.
- Establish modular folder structure (`app/`, `styles/`, `lib/theme/`, `lib/motion/`, `components/`, `pages/`, `types/`).
- Implement **Dark Mode — Burnt Orange** (default) and **Light Mode — Crimson & Cream** with `localStorage` persistence and pre-hydration flash prevention.
- Configure **Anton**, **Space Grotesk**, and **Inter** fluid typography scale, spacing tokens, paper grain/halftone textures, and responsive breakpoints.
- Integrate Lenis + GSAP ScrollTrigger with live `prefers-reduced-motion` accessibility handling.
- Ship temporary `DesignSystemPreviewPage` + `DESIGN_SYSTEM.md` + `ROADMAP.md`.

---

## Phase 2 — Intro Sequence, Navigation & Page Transition Architecture *(Next)*

- Design and build the custom opening preloader / kinetic entrance sequence (respecting `prefers-reduced-motion` and session skip behavior).
- Implement primary editorial header, full-screen kinetic index/navigation overlay, and route transitions.
- Remove or move `/design-system` behind a dev/reference route while preparing `/` for the main portfolio.

---

## Phase 3 — Editorial Homepage & Surrealist Mixed-Media Hero

- Build the flagship homepage featuring `"NOT JUST ONE THING."` and `"Different disciplines. One creative mind."`.
- Craft the 70% editorial / 30% experimental mixed-media hero composition (vintage monochromatic cutout framing, kinetic typography, parallax collage layers).
- Build interactive discipline strip covering all seven creative & engineering domains.

---

## Phase 4 — Selected Works & Multidisciplinary Archive

- Define structured content schemas for real projects across design, engineering, film/video, photography, and social strategy (populated strictly with verified user-provided work).
- Build filterable/kinetic work index, case study detail view, and bespoke media viewers (editorial gallery, video reel embed/player, technical breakdown blocks).

---

## Phase 5 — About, Philosophy & Contact Experience

- Build the editorial bio & capabilities view highlighting the intersection of visual storytelling and computer engineering.
- Build an expressive, accessible contact/inquiry section with copy-to-clipboard actions and social links.
- Add thoughtful micro-interactions (custom cursor/magnetics only where accessible and non-intrusive).

---

## Phase 6 — Performance, SEO & Production Hardening

- Audit Core Web Vitals, font loading, image/asset optimization, and GSAP/Lenis memory cleanup across routes.
- Configure Open Graph metadata, semantic landmarks, keyboard navigation audit, and cross-browser responsive QA.
- Clean up temporary Phase 1 preview scaffolding if no longer needed and prepare deployment build.
