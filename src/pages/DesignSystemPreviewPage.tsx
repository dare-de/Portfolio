import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Layers,
  Monitor,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container, EditorialGrid, Section } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { gsap } from '@/lib/motion/gsap';
import { useMotion } from '@/lib/motion/MotionProvider';
import { useTheme } from '@/lib/theme/useTheme';

interface SwatchToken {
  name: string;
  token: string;
  darkHex: string;
  lightHex: string;
  role: string;
}

const COLOR_SWATCHES: SwatchToken[] = [
  {
    name: 'Background',
    token: '--color-bg',
    darkHex: '#151412',
    lightHex: '#F3EDE2',
    role: 'Primary editorial canvas',
  },
  {
    name: 'Surface',
    token: '--color-surface',
    darkHex: '#24211E',
    lightHex: '#E8DFD2',
    role: 'Collage frames, panels, and blocks',
  },
  {
    name: 'Primary Accent',
    token: '--color-accent',
    darkHex: '#FF6329',
    lightHex: '#D92525',
    role: 'Kinetic highlights, CTAs, active states',
  },
  {
    name: 'Primary Text',
    token: '--color-text-primary',
    darkHex: '#F2EBDD',
    lightHex: '#171717',
    role: 'Headlines, primary body copy',
  },
  {
    name: 'Secondary Text',
    token: '--color-text-secondary',
    darkHex: '#938A80',
    lightHex: '#655D55',
    role: 'Metadata, captions, editorial indices',
  },
];

const DISCIPLINES = [
  'Graphic Design',
  'Web Development',
  'Photography',
  'Cinematography',
  'Video Editing',
  'Social Media Management',
  'Computer Engineering',
];

const SPACING_TOKENS = [
  { name: '--space-2', px: '8px' },
  { name: '--space-4', px: '16px' },
  { name: '--space-6', px: '24px' },
  { name: '--space-8', px: '32px' },
  { name: '--space-12', px: '48px' },
  { name: '--space-16', px: '64px' },
  { name: '--space-24', px: '96px' },
];

function getBreakpointLabel(width: number): string {
  if (width >= 1536) return '2XL (>= 1536px)';
  if (width >= 1280) return 'XL (>= 1280px)';
  if (width >= 1024) return 'LG Desktop (>= 1024px)';
  if (width >= 768) return 'MD Tablet (>= 768px)';
  if (width >= 640) return 'SM Tablet (>= 640px)';
  return 'Mobile (< 640px)';
}

export function DesignSystemPreviewPage() {
  const { theme, isDark, setTheme } = useTheme();
  const { reducedMotion, lenis, scrollTo } = useMotion();
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280,
  );
  const motionSectionRef = useRef<HTMLElement | null>(null);
  const scrubbedTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const container = motionSectionRef.current;
    const track = scrubbedTrackRef.current;
    if (!container || !track) return;

    if (reducedMotion) {
      gsap.set(track, { xPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      gsap.from('.js-reveal-specimen', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      });
    }, motionSectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div>
      {/* 1. Temporary Specimen Hero */}
      <Section className="border-b border-[var(--color-border)]">
        <Container>
          <EditorialGrid className="items-end">
            <div className="col-span-4 md:col-span-8 lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="type-label px-2.5 py-1 border border-[var(--color-border-strong)] bg-[var(--color-surface)]">
                  Phase 1 Preview
                </span>
                <span className="type-label text-[var(--color-accent)]">
                  Design System &amp; Motion Foundation
                </span>
              </div>

              <h1 className="type-display-xl text-[var(--color-text-primary)]">
                Not Just
                <br />
                <span className="text-[var(--color-accent)]">One Thing.</span>
              </h1>

              <p className="type-heading-lg text-[var(--color-text-primary)] max-w-2xl">
                Different disciplines. One creative mind.
              </p>
            </div>

            <div className="col-span-4 md:col-span-8 lg:col-span-4 space-y-5 lg:border-l lg:border-[var(--color-border)] lg:pl-6">
              <p className="type-body-sm text-[var(--color-text-secondary)]">
                Temporary verification page for Ahad Waseem&apos;s portfolio foundation. Use this
                surface to validate color tokens, Anton / Space Grotesk / Inter typography,
                asymmetric grids, button variants, paper grain &amp; halftone textures, Lenis +
                GSAP ScrollTrigger, and reduced-motion accessibility.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowDown size={16} />}
                  onClick={() => scrollTo('#motion-test', -72)}
                >
                  Test Scroll Motion
                </Button>
                <ThemeToggle />
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] grid grid-cols-2 gap-3">
                <div>
                  <span className="type-label text-[var(--color-text-secondary)] block">
                    Breakpoint
                  </span>
                  <span className="type-body-sm font-medium">{getBreakpointLabel(viewportWidth)}</span>
                </div>
                <div>
                  <span className="type-label text-[var(--color-text-secondary)] block">
                    Motion Engine
                  </span>
                  <span className="type-body-sm font-medium">
                    {reducedMotion ? 'Reduced Motion' : lenis ? 'Lenis + GSAP Active' : 'Initializing'}
                  </span>
                </div>
              </div>
            </div>
          </EditorialGrid>
        </Container>
      </Section>

      {/* 2. Theme & Color Tokens */}
      <Section className="border-b border-[var(--color-border)]">
        <Container className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="type-label text-[var(--color-accent)]">01 / Color Architecture</span>
              <h2 className="type-display-md">
                {isDark ? 'Burnt Orange (Dark)' : 'Crimson & Cream (Light)'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={theme === 'dark' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTheme('dark')}
              >
                Dark — Burnt Orange
              </Button>
              <Button
                variant={theme === 'light' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
              >
                Light — Crimson &amp; Cream
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COLOR_SWATCHES.map((swatch) => {
              const activeHex = isDark ? swatch.darkHex : swatch.lightHex;
              return (
                <div key={swatch.token} className="editorial-surface overflow-hidden flex flex-col">
                  <div
                    className="h-28 w-full border-b border-[var(--color-border)]"
                    style={{ backgroundColor: `var(${swatch.token})` }}
                  />
                  <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="type-heading-sm">{swatch.name}</span>
                        <code className="text-xs font-mono text-[var(--color-accent)]">
                          {activeHex}
                        </code>
                      </div>
                      <p className="text-xs font-mono text-[var(--color-text-secondary)] mt-1">
                        var({swatch.token})
                      </p>
                    </div>
                    <p className="type-body-sm text-[var(--color-text-secondary)] pt-2">
                      {swatch.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. Typography Hierarchy */}
      <Section className="border-b border-[var(--color-border)]">
        <Container className="space-y-8">
          <div className="space-y-2">
            <span className="type-label text-[var(--color-accent)]">02 / Typography System</span>
            <h2 className="type-display-md">Anton + Space Grotesk + Inter</h2>
          </div>

          <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline">
              <div className="lg:col-span-3 space-y-1">
                <span className="type-label text-[var(--color-accent)]">Display / Anton</span>
                <p className="text-xs font-mono text-[var(--color-text-secondary)]">
                  .type-display-lg
                </p>
              </div>
              <div className="lg:col-span-9">
                <p className="type-display-lg">Not Just One Thing.</p>
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline">
              <div className="lg:col-span-3 space-y-1">
                <span className="type-label text-[var(--color-accent)]">
                  Secondary / Space Grotesk
                </span>
                <p className="text-xs font-mono text-[var(--color-text-secondary)]">
                  .type-heading-lg
                </p>
              </div>
              <div className="lg:col-span-9">
                <p className="type-heading-lg">Different disciplines. One creative mind.</p>
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline">
              <div className="lg:col-span-3 space-y-1">
                <span className="type-label text-[var(--color-accent)]">Body / Inter</span>
                <p className="text-xs font-mono text-[var(--color-text-secondary)]">.type-body-lg</p>
              </div>
              <div className="lg:col-span-9 max-w-2xl space-y-3">
                <p className="type-body-lg">
                  Built on a 70% clean editorial foundation and 30% experimental mixed-media energy.
                  High-contrast ink on warm paper surfaces keeps long-form captions and technical
                  notes legible across desktop and mobile.
                </p>
                <p className="type-body-sm text-[var(--color-text-secondary)]">
                  Disciplines in scope: {DISCIPLINES.join(' / ')}.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Buttons & Interactive Controls */}
      <Section className="border-b border-[var(--color-border)]">
        <Container className="space-y-8">
          <div className="space-y-2">
            <span className="type-label text-[var(--color-accent)]">
              03 / Buttons &amp; Controls
            </span>
            <h2 className="type-display-md">Tactile Editorial Actions</h2>
          </div>

          <div className="editorial-surface p-6 md:p-8 space-y-8">
            <div className="space-y-3">
              <span className="type-label text-[var(--color-text-secondary)]">Variants (MD)</span>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" icon={<ArrowUpRight size={16} />}>
                  Primary Action
                </Button>
                <Button variant="secondary" icon={<Layers size={16} />}>
                  Secondary Action
                </Button>
                <Button variant="outline" icon={<ArrowRight size={16} />}>
                  Outline Action
                </Button>
                <Button variant="ghost" icon={<SlidersHorizontal size={16} />} iconPosition="left">
                  Ghost Action
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)] space-y-3">
              <span className="type-label text-[var(--color-text-secondary)]">
                Size Scale (SM / MD / LG)
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">
                  Small (SM)
                </Button>
                <Button variant="primary" size="md">
                  Medium (MD)
                </Button>
                <Button variant="primary" size="lg" icon={<Sparkles size={17} />}>
                  Large (LG)
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Asymmetric Layout, Textures & Spacing */}
      <Section className="border-b border-[var(--color-border)]">
        <Container className="space-y-8">
          <div className="space-y-2">
            <span className="type-label text-[var(--color-accent)]">
              04 / Grid, Spacing &amp; Textures
            </span>
            <h2 className="type-display-md">70% Editorial / 30% Experimental</h2>
          </div>

          <EditorialGrid>
            <div className="col-span-4 md:col-span-5 lg:col-span-7 editorial-surface p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="type-label">Asymmetric 7/5 Grid Block</span>
                <Monitor size={16} className="text-[var(--color-accent)]" />
              </div>
              <p className="type-body-md text-[var(--color-text-secondary)]">
                The 12-column desktop grid (8-column tablet, 4-column mobile) allows sharp
                asymmetric editorial splits without generic rounded SaaS cards or drop-shadow
                clutter.
              </p>

              <div className="space-y-2.5 pt-2">
                {SPACING_TOKENS.map((token) => (
                  <div key={token.name} className="flex items-center gap-4">
                    <code className="w-24 text-xs font-mono text-[var(--color-text-secondary)]">
                      {token.name}
                    </code>
                    <div
                      className="h-3 bg-[var(--color-accent)]"
                      style={{ width: `var(${token.name})` }}
                    />
                    <span className="text-xs font-mono text-[var(--color-text-secondary)]">
                      {token.px}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-4 md:col-span-3 lg:col-span-5 grid grid-cols-1 gap-4">
              <div className="editorial-surface texture-halftone p-6 flex flex-col justify-between min-h-44">
                <span className="type-label text-[var(--color-accent)]">Halftone Surface</span>
                <div>
                  <p className="type-heading-sm">.texture-halftone</p>
                  <p className="type-body-sm text-[var(--color-text-secondary)] mt-1">
                    Pure CSS dot screen for print-inspired contrast zones.
                  </p>
                </div>
              </div>

              <div className="editorial-surface relative overflow-hidden p-6 flex flex-col justify-between min-h-44">
                <div
                  className="absolute inset-0 texture-paper-grain opacity-30 pointer-events-none"
                  aria-hidden="true"
                />
                <span className="type-label text-[var(--color-accent)] relative">
                  Paper Grain Surface
                </span>
                <div className="relative">
                  <p className="type-heading-sm">.texture-paper-grain</p>
                  <p className="type-body-sm text-[var(--color-text-secondary)] mt-1">
                    Procedural SVG fractal noise overlay—zero external raster bloat.
                  </p>
                </div>
              </div>
            </div>
          </EditorialGrid>
        </Container>
      </Section>

      {/* 6. GSAP + ScrollTrigger + Lenis Verification */}
      <Section id="motion-test" ref={motionSectionRef} className="overflow-hidden">
        <Container className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="type-label text-[var(--color-accent)]">
                05 / Motion &amp; Accessibility
              </span>
              <h2 className="type-display-md">GSAP + ScrollTrigger + Lenis</h2>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={<ArrowUp size={15} />}
              onClick={() => scrollTo(0)}
            >
              Scroll To Top
            </Button>
          </div>

          <div className="border-y border-[var(--color-border)] py-5 overflow-hidden">
            <div
              ref={scrubbedTrackRef}
              className="flex items-center gap-8 whitespace-nowrap will-change-transform"
            >
              {Array.from({ length: 4 }).map((_, idx) => (
                <span key={idx} className="type-display-lg flex items-center gap-8">
                  <span>NOT JUST ONE THING.</span>
                  <span className="text-[var(--color-accent)]">/</span>
                  <span className="text-[var(--color-text-secondary)]">AHAD WASEEM</span>
                  <span className="text-[var(--color-accent)]">/</span>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="js-reveal-specimen editorial-surface p-5 space-y-2">
              <span className="type-label text-[var(--color-accent)]">Lenis Sync</span>
              <p className="type-heading-sm">Frame-Locked Ticker</p>
              <p className="type-body-sm text-[var(--color-text-secondary)]">
                Lenis RAF is driven directly by GSAP&apos;s ticker with ScrollTrigger updates bound
                on scroll.
              </p>
            </div>

            <div className="js-reveal-specimen editorial-surface p-5 space-y-2">
              <span className="type-label text-[var(--color-accent)]">Reduced Motion</span>
              <p className="type-heading-sm">
                {reducedMotion ? 'Active (Native Scroll)' : 'Standard Motion'}
              </p>
              <p className="type-body-sm text-[var(--color-text-secondary)]">
                Respects OS prefers-reduced-motion dynamically by disabling smooth wheel inertia and
                skipping scrubbed transforms.
              </p>
            </div>

            <div className="js-reveal-specimen editorial-surface p-5 space-y-2">
              <span className="type-label text-[var(--color-accent)]">Theme Persistence</span>
              <p className="type-heading-sm">localStorage Synced</p>
              <p className="type-body-sm text-[var(--color-text-secondary)]">
                Active mode ({theme}) persists across reloads with pre-hydration script protection
                against theme flashes.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
