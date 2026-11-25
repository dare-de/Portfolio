# Design System — Ahad Waseem Portfolio

> **Primary Tagline:** `NOT JUST ONE THING.`  
> **Secondary Tagline:** `Different disciplines. One creative mind.`

---

## 1. Creative Direction (70 / 30 Rule)

- **70% Clean Editorial Design:** Disciplined grid structure, generous negative space, crisp hairline dividers, sharp typography hierarchy, and unambiguous reading order.
- **30% Experimental Creativity:** Kinetic display typography, surrealist mixed-media collage composition, vintage monochromatic cutouts, procedural paper grain, halftone contrast zones, and tactile scroll-linked motion.
- **Anti-Patterns (Forbidden):**
  - Generic SaaS cards with large rounded corners (`12px+`) and soft drop shadows
  - Glassmorphism panels or neon/rainbow gradients
  - Decorative motion that ignores `prefers-reduced-motion`
  - Unjustified visual noise that hurts text contrast or navigation clarity

---

## 2. Color Architecture

Themes are controlled via `[data-theme="dark"]` (default) and `[data-theme="light"]` on `<html>`, persisted in `localStorage` under `ahad-portfolio-theme`.

### Dark Mode — Burnt Orange (Default)

| Role | Token | Hex | Usage |
| --- | --- | --- | --- |
| Background | `--color-bg` | `#151412` | Primary page canvas |
| Surface | `--color-surface` | `#24211E` | Editorial panels, collage frames, secondary controls |
| Primary Accent | `--color-accent` | `#FF6329` | Primary CTAs, active markers, kinetic highlights |
| Primary Text | `--color-text-primary` | `#F2EBDD` | Headlines, body copy, high-contrast ink |
| Secondary Text | `--color-text-secondary` | `#938A80` | Captions, metadata, index numbers, muted labels |
| Accent Ink | `--color-accent-ink` | `#151412` | Text/icons placed directly on `--color-accent` |

### Light Mode — Crimson & Cream

| Role | Token | Hex | Usage |
| --- | --- | --- | --- |
| Background | `--color-bg` | `#F3EDE2` | Primary warm paper canvas |
| Surface | `--color-surface` | `#E8DFD2` | Editorial panels, collage frames, secondary controls |
| Primary Accent | `--color-accent` | `#D92525` | Primary CTAs, active markers, editorial stamps |
| Primary Text | `--color-text-primary` | `#171717` | Headlines, body copy, crisp ink |
| Secondary Text | `--color-text-secondary` | `#655D55` | Captions, metadata, index numbers, muted labels |
| Accent Ink | `--color-accent-ink` | `#F3EDE2` | Text/icons placed directly on `--color-accent` |

### Derived Surface & Structural Tokens

- `--color-border`: 14% primary text alpha for crisp 1px editorial hairlines.
- `--color-border-strong`: 34% primary text alpha for button frames and active containers.
- `--color-halftone`: 9–10% primary text alpha for halftone dot screens.
- `--grain-opacity`: `0.05` (dark) / `0.035` (light) for subtle analog paper grain.

---

## 3. Typography System

Fonts are loaded in `index.html` and mapped via CSS variables in `src/styles/tokens.css` and `src/styles/typography.css`:

| Role | Font Family | CSS Variable | Characteristics |
| --- | --- | --- | --- |
| Display Headings | **Anton** | `--font-display` | Condensed, uppercase, `line-height: 0.90–0.96`, tight tracking (`-0.015em` to `-0.005em`) |
| Secondary Headings & Labels | **Space Grotesk** | `--font-heading` | Geometric editorial headings (`600`/`500`) & tracked uppercase labels (`0.12em`) |
| Body Text | **Inter** | `--font-body` | Clean, neutral legibility (`line-height: 1.55–1.62`) |

### Fluid Type Scale

- `.type-display-xl`: `clamp(3.5rem, 10.5vw, 9.5rem)` — Hero statements (`NOT JUST ONE THING.`)
- `.type-display-lg`: `clamp(2.5rem, 6.5vw, 5.75rem)` — Major section headers
- `.type-display-md`: `clamp(1.875rem, 4.2vw, 3.5rem)` — Sub-section anchors
- `.type-heading-lg`: `clamp(1.5rem, 2.5vw, 2.375rem)` — Secondary taglines (`Different disciplines. One creative mind.`)
- `.type-heading-md`: `clamp(1.25rem, 1.75vw, 1.625rem)` — Card/module headings
- `.type-heading-sm`: `clamp(1rem, 1.2vw, 1.25rem)` — Compact titles
- `.type-body-lg` / `.type-body-md` / `.type-body-sm`: `1.0625–1.25rem` / `1rem` / `0.875rem`
- `.type-label`: `0.75rem`, uppercase, `letter-spacing: 0.12em`

---

## 4. Layout, Spacing & Breakpoints

### Responsive Breakpoints

| Token | Min Width | Editorial Grid Columns |
| --- | --- | --- |
| Mobile (default) | `< 640px` | 4 columns |
| `sm` | `640px` (`40rem`) | 4 columns |
| `md` (Tablet) | `768px` (`48rem`) | 8 columns |
| `lg` (Desktop) | `1024px` (`64rem`) | 12 columns |
| `xl` | `1280px` (`80rem`) | 12 columns (max container `1440px`) |
| `2xl` | `1536px` (`96rem`) | 12 columns (max container `1440px`) |

### Spacing & Geometry

- **Container:** `.editorial-container` (`max-width: 1440px`, fluid horizontal gutter `clamp(1rem, 3.5vw, 3rem)`).
- **Section Rhythm:** `--section-y: clamp(3.5rem, 7vw, 7.5rem)` and `--section-y-tight: clamp(2rem, 4vw, 4rem)`.
- **Border Radius:** `--radius-none: 0px` and `--radius-xs: 2px` to preserve crisp print/collage edges.

---

## 5. Textures & Mixed-Media Surfaces

- `.texture-paper-grain`: Inline SVG `feTurbulence` fractal noise overlay (`pointer-events: none`) providing analog paper warmth without external bitmap bloat.
- `.texture-halftone`: Pure CSS `radial-gradient` screen (`10px` pitch) for zine/print-inspired visual zones.

---

## 6. Buttons & Interactive States

Implemented in `src/components/ui/Button.tsx` and `src/styles/utilities.css`:

- **Variants:** `primary` (accent fill, inverted high-contrast hover), `secondary` (surface fill, border accent hover), `outline` (transparent with strong border), `ghost` (minimal ink link/action).
- **Sizes:** `sm`, `md`, `lg`.
- **Focus Ring:** `2px solid var(--color-accent)` with `3px` offset via `:focus-visible`.

---

## 7. Motion & Accessibility Architecture

- **GSAP + ScrollTrigger:** Registered centrally in `src/lib/motion/gsap.ts`. Components use `gsap.context()` inside `useEffect` with deterministic cleanup (`ctx.revert()`).
- **Lenis Smooth Scroll:** Managed by `src/lib/motion/lenis.ts` and `MotionProvider`, synchronized with `gsap.ticker` (`lagSmoothing(0)`) and `ScrollTrigger.update`.
- **Reduced Motion Support:**
  - CSS `@media (prefers-reduced-motion: reduce)` neutralizes animation/transition durations and disables smooth scroll behavior.
  - `MotionProvider` listens to `(prefers-reduced-motion: reduce)` dynamically; when active, Lenis is destroyed/bypassed in favor of native instant scroll and scrubbed/reveal animations snap cleanly.
