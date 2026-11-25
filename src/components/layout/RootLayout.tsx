import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useMotion } from '@/lib/motion/MotionProvider';

export function RootLayout() {
  const { pathname } = useLocation();
  const { refreshScrollTrigger } = useMotion();

  useEffect(() => {
    refreshScrollTrigger();
  }, [pathname, refreshScrollTrigger]);

  return (
    <div className="relative min-h-dvh flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <div className="grain-overlay texture-paper-grain" aria-hidden="true" />

      <header className="sticky top-0 z-[var(--z-header)] border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] backdrop-blur-xs">
        <Container className="flex items-center justify-between py-3.5 gap-4">
          <div className="flex items-baseline gap-3">
            <Link
              to="/"
              className="font-[var(--font-display)] text-xl tracking-tight uppercase text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
            >
              Ahad Waseem
            </Link>
            <span className="hidden sm:inline-block type-label text-[var(--color-text-secondary)]">
              Phase 1 — Foundation
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block type-label text-[var(--color-accent)]">
              Not Just One Thing.
            </span>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--color-border)] py-6">
        <Container className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="type-body-sm text-[var(--color-text-secondary)]">
            Ahad Waseem Portfolio — Design System &amp; Motion Foundation (Phase 1)
          </p>
          <p className="type-label text-[var(--color-text-secondary)]">
            Different disciplines. One creative mind.
          </p>
        </Container>
      </footer>
    </div>
  );
}
